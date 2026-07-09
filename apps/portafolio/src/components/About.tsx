import { about } from "../data/content";
import { Icon, type IconName } from "./Icon";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="section-label">01 · About</p>
          <h2 className="section-title">Two crafts, one developer</h2>
        </div>

        <div className="about-grid">
          <div className="about-text" data-reveal>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="about-aside" data-reveal>
            <div className="facts-card">
              {about.facts.map((fact) => (
                <div className="fact" key={fact.label}>
                  <span className="fact-icon">
                    <Icon name={fact.icon as IconName} size={17} />
                  </span>
                  <span>
                    <span className="fact-label">{fact.label}</span>
                    <span className="fact-value">{fact.value}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="stats-grid">
              {about.stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <span className="stat-num">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
