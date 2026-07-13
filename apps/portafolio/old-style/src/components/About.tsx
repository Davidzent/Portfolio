import { about } from "../data/content";
import { Icon, type IconName } from "./Icon";
import { CountUp } from "./CountUp";
import { TerminalBackdrop } from "./TerminalBackdrop";

/** Split a stat like "12+" into its number and trailing symbol so the
 *  number can count up and the symbol can carry the accent color. */
function splitStat(value: string): [number, string] {
  const match = value.match(/^([\d.]+)(.*)$/);
  return match ? [parseInt(match[1], 10), match[2]] : [0, value];
}

export default function About() {
  return (
    <section id="about" className="section section-term">
      <TerminalBackdrop />
      <div className="container">
        <div data-reveal>
          <h2 className="sec-title">
            Two crafts, <span className="mark">one developer</span>
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-text" data-reveal>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="about-aside" data-reveal>
            <div className="facts">
              {about.facts.map((fact) => (
                <div className="fact" key={fact.label}>
                  <span className="fact-icon">
                    <Icon name={fact.icon as IconName} size={18} />
                  </span>
                  <span>
                    <span className="fact-label">{fact.label}</span>
                    <span className="fact-value">{fact.value}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="stats-grid">
              {about.stats.map((stat) => {
                const [num, suffix] = splitStat(stat.value);
                return (
                  <div className="stat" key={stat.label}>
                    <CountUp end={num} suffix={suffix} />
                    <span className="stat-label">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
