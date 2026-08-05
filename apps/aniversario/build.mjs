/**
 * There is no bundler here — the page is a single self-contained HTML file.
 * "Building" it means dropping it into the shared dist/ under the name Firebase
 * serves as the directory index.
 */
import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const outDir = fileURLToPath(new URL("../../dist/aniversario/", import.meta.url));

mkdirSync(outDir, { recursive: true });
copyFileSync(
  fileURLToPath(new URL("./aniversario.html", import.meta.url)),
  `${outDir}index.html`,
);
