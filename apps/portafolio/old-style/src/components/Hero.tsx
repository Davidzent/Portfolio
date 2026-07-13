import { site } from "../data/content";
import { Icon } from "./Icon";

const worlds = [
  {
    name: "Systems",
    kind: "Web & Full-Stack",
    stack: ["Angular", "React", "Spring Boot", "Node.js", "PostgreSQL", "GCP"],
  },
  {
    name: "Games",
    kind: "Unity & 3D",
    stack: ["Unity", "C#", "Blender", "Game AI"],
  },
];

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="hero-avail">
            <span className="dot" aria-hidden="true" />
            {site.availability}
          </span>

          <h1 className="hero-name">{site.fullName}</h1>

          <p className="hero-role">
            Full-stack engineer &amp; <span className="mark">game developer</span>
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

        <div className="hero-visual">
          <div className="worlds">
            {worlds.map((world) => (
              <div className="world" key={world.name}>
                <div className="world-head">
                  <span className="world-name">{world.name}</span>
                  <span className="world-kind">{world.kind}</span>
                </div>
                <ul className="chips chips-sm">
                  {world.stack.map((item) => (
                    <li className="chip" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="world-now">
              <b>Now building</b>
              <br />A multiplayer cooking game in Unity, solo: code, design, and
              3D art.
              <span className="term-caret" aria-hidden="true" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
