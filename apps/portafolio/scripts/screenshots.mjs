/**
 * Capture the README screenshots.
 *
 *   pnpm --filter portafolio dev     # in another terminal
 *   node scripts/screenshots.mjs     # writes ../docs/*.jpg
 *
 * Drives headless Chrome over the DevTools Protocol, the same way
 * apps/portal-pantry/scripts/screenshots.mjs does — no Playwright install for a
 * job that is one WebSocket and three commands.
 *
 * Every shot runs under an emulated `prefers-reduced-motion: reduce`. That is
 * not a compromise: the site already treats that as "show the finished state",
 * so reveals sit at their end position, the boot screen is skipped, Lenis never
 * takes over scrolling, and the knight stays away from the frame. Re-running
 * after a design change therefore produces the same framing every time.
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = process.env.PF_URL ?? "http://localhost:5173/";
const OUT = fileURLToPath(new URL("../docs", import.meta.url));
const PORT = 9334;
const QUALITY = 82;

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---- Recipes ------------------------------------------------------------
   `js` strings run in the page, evaluated with awaitPromise, so returning a
   promise makes the runner wait. */

const waitFor = `
  const waitFor = async (sel, ms = 8000) => {
    const t0 = Date.now();
    for (;;) {
      const el = document.querySelector(sel);
      if (el) return el;
      if (Date.now() - t0 > ms) throw new Error("timeout waiting for " + sel);
      await new Promise(r => setTimeout(r, 80));
    }
  };`;

/** Jump to a section and let its reveal settle. Native scroll: Lenis is off. */
const goTo = (id) => `(async () => {
  ${waitFor}
  const el = await waitFor("#${id}");
  el.scrollIntoView({ behavior: "instant", block: "start" });
  await new Promise(r => setTimeout(r, 500));
  return "at ${id}";
})()`;

const SHOTS = [
  {
    name: "hero",
    caption: "The hero: a draggable seam between a live-typing IDE and a WebGL viewport",
    width: 1440,
    height: 900,
    theme: "dark",
    settle: 1600,
  },
  {
    name: "hero-light",
    caption: "The same hero on the light theme",
    width: 1440,
    height: 900,
    theme: "light",
    settle: 1600,
  },
  {
    name: "about",
    caption: "About — the player card",
    width: 1440,
    height: 900,
    theme: "dark",
    setup: [goTo("about")],
  },
  {
    name: "skills",
    caption: "Skills — a two-branch tree",
    width: 1440,
    height: 900,
    setup: [goTo("skills")],
  },
  {
    name: "projects",
    caption: "Projects — the level select",
    width: 1440,
    height: 900,
    setup: [goTo("projects")],
  },
  {
    name: "project-modal",
    caption: "A project briefing",
    width: 1440,
    height: 900,
    setup: [
      goTo("projects"),
      `(async () => {
        ${waitFor}
        const card = await waitFor("article.group");
        const btn = card.querySelector('button[aria-haspopup="dialog"]');
        btn.click();
        await waitFor('[role="dialog"]');
        await new Promise(r => setTimeout(r, 700));
        return "briefing open";
      })()`,
    ],
    settle: 700,
  },
  {
    name: "journey",
    caption: "Journey — the pinned timeline",
    width: 1440,
    height: 900,
    reload: true,
    setup: [goTo("journey")],
    settle: 900,
  },
  {
    name: "contact",
    caption: "Contact — the quest board",
    width: 1440,
    height: 900,
    setup: [goTo("contact")],
  },
  {
    name: "terminal",
    caption: "The footer terminal, mid-command",
    width: 1440,
    height: 900,
    setup: [
      `(async () => {
        ${waitFor}
        const input = await waitFor("#term-input");
        input.scrollIntoView({ behavior: "instant", block: "center" });
        await new Promise(r => setTimeout(r, 400));
        // React tracks the value internally, so set it through the native setter.
        const set = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype, "value").set;
        set.call(input, "whoami");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        await new Promise(r => setTimeout(r, 150));
        input.closest("form")?.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true }));
        await new Promise(r => setTimeout(r, 600));
        input.scrollIntoView({ behavior: "instant", block: "center" });
        return "terminal ran whoami";
      })()`,
    ],
    settle: 700,
  },
];

/* ---- Minimal CDP client -------------------------------------------------- */

function findChrome() {
  const hit = CHROME_CANDIDATES.find((p) => existsSync(p));
  if (!hit && !process.env.PF_CHROME) throw new Error("Could not find Chrome. Set PF_CHROME.");
  return process.env.PF_CHROME ?? hit;
}

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener("message", (e) => {
      const msg = JSON.parse(e.data);
      const p = this.pending.get(msg.id);
      if (!p) return;
      this.pending.delete(msg.id);
      msg.error ? p.reject(new Error(JSON.stringify(msg.error))) : p.resolve(msg.result);
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => reject(new Error(method + " timed out")), 30000);
    });
  }
}

async function main() {
  mkdirSync(OUT, { recursive: true });

  try {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error(String(res.status));
  } catch {
    console.error(
      `Dev server not reachable at ${BASE}\nStart it with: pnpm --filter portafolio dev`,
    );
    process.exit(1);
  }

  const profile = join(tmpdir(), `pf-shots-${Date.now()}`);
  const chrome = spawn(
    findChrome(),
    [
      "--headless=new",
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${profile}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-color-profile=srgb",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  let wsUrl = null;
  for (let i = 0; i < 60 && !wsUrl; i++) {
    await sleep(250);
    try {
      const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      wsUrl = targets.find((t) => t.type === "page")?.webSocketDebuggerUrl ?? null;
    } catch {
      /* chrome not up yet */
    }
  }
  if (!wsUrl) {
    chrome.kill();
    throw new Error("Chrome did not expose a debugging target.");
  }

  const ws = new WebSocket(wsUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  const cdp = new CDP(ws);

  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });

  let navigated = false;
  let currentTheme = null;

  for (const shot of SHOTS) {
    process.stdout.write(`  ${shot.name} … `);
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: shot.width,
      height: shot.height,
      deviceScaleFactor: 2, // retina — the README is read on good screens
      mobile: false,
    });

    const themeChanged = shot.theme && shot.theme !== currentTheme;

    if (!navigated) {
      await cdp.send("Page.navigate", { url: BASE });
      await sleep(1500);
      navigated = true;
    }

    // The theme is applied by an inline script before first paint, so it only
    // takes effect on a load — set it, then reload.
    if (themeChanged) {
      await cdp.send("Runtime.evaluate", {
        expression: `localStorage.setItem("theme", ${JSON.stringify(shot.theme)})`,
      });
      currentTheme = shot.theme;
      await cdp.send("Page.reload");
      await sleep(1600);
    } else if (shot.reload) {
      await cdp.send("Page.reload");
      await sleep(1500);
    }

    for (const js of shot.setup ?? []) {
      const out = await cdp.send("Runtime.evaluate", {
        expression: js,
        awaitPromise: true,
        returnByValue: true,
      });
      if (out.exceptionDetails) {
        throw new Error(
          `${shot.name}: ${out.exceptionDetails.text} ${out.result?.description ?? ""}`,
        );
      }
    }

    await sleep(shot.settle ?? 600);
    const { data } = await cdp.send("Page.captureScreenshot", {
      format: "jpeg",
      quality: QUALITY,
      captureBeyondViewport: false,
    });
    const buf = Buffer.from(data, "base64");
    writeFileSync(join(OUT, `${shot.name}.jpg`), buf);
    console.log(`${(buf.length / 1024) | 0} kB`);
  }

  ws.close();
  chrome.kill();
  await sleep(300);
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {
    /* windows sometimes holds the profile briefly; harmless */
  }
  console.log(`\nWrote ${SHOTS.length} screenshots to ${OUT}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
