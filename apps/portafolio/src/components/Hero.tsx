import { site } from "../data/content";
import { Icon } from "./Icon";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy" data-reveal>
          <span className="hero-badge">
            <span className="pulse-dot" aria-hidden="true" />
            {site.availability}
          </span>
          <p className="hero-kicker">Hi, my name is</p>
          <h1 className="hero-name">{site.fullName}</h1>
          <p className="hero-role">
            <span className="grad-web">Full-Stack Developer</span>
            {/* <span className="hero-amp"> &amp; </span> */}
            <span className="grad-game">Game Developer</span>
          </p>
          <p className="hero-tagline">{site.tagline}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View my work
            </a>
            <a className="btn btn-ghost" href="#contact">
              Get in touch
            </a>
          </div>

          <div className="hero-meta">
            <div className="social-row">
              <a
                className="social-link"
                href={site.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
              >
                <Icon name="github" size={18} />
              </a>
              <a
                className="social-link"
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn"
              >
                <Icon name="linkedin" size={18} />
              </a>
              <a
                className="social-link"
                // href={site.socials.itchio}
                target="_blank"
                rel="noreferrer"
                aria-label="itch.io profile"
                title="itch.io"
              >
                <Icon name="gamepad" size={18} />
              </a>
              <a
                className="social-link"
                href={`mailto:${site.email}`}
                aria-label="Send an email"
                title="Email"
              >
                <Icon name="mail" size={18} />
              </a>
            </div>
            <span className="hero-location">
              <Icon name="map-pin" size={15} />
              {site.location}
            </span>
          </div>
        </div>

        <div className="hero-visual" data-reveal>
          <div className="terminal">
            <div className="terminal-bar">
              <span className="t-dot t-red" />
              <span className="t-dot t-yellow" />
              <span className="t-dot t-green" />
              <span className="terminal-title">
                {site.name.toLowerCase()}@zntsns: ~/
              </span>
            </div>
            <pre className="terminal-body">
              <code>
                <span className="t-prompt">$ </span>
                <span className="t-cmd">whoami</span>
                {"\n"}
                {/* {site.name.toLowerCase()} — full-stack &amp; game developer */}
                {"\n\n"}
                <span className="t-prompt">$ </span>
                <span className="t-cmd">cat stack.json</span>
                {"\n"}
                {"{\n  "}
                <span className="t-key">"frontend"</span>
                {": ["}
                <span className="t-str">"Angular"</span>
                {", "}
                <span className="t-str">"React"</span>
                {"],\n  "}
                <span className="t-key">"backend"</span>
                {": ["}
                <span className="t-str">"Spring Boot"</span>
                {", "}
                <span className="t-str">"Node.js"</span>
                {"],\n  "}
                <span className="t-key">"engines"</span>
                {": ["}
                <span className="t-str">"Unity"</span>
                {", "}
                <span className="t-str">"C#"</span>
                {"]\n}"}
                {"\n\n"}
                <span className="t-prompt">$ </span>
                <span className="t-cmd">./status --now</span>
                {"\n"}
                <span className="t-ok">▸</span> building a multiplayer cooking game
                {"\n"}
                <span className="t-prompt">$ </span>
                <span className="t-caret" aria-hidden="true" />
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
