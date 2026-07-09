import { experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="section-label">04 · Experience</p>
          <h2 className="section-title">Where I've been</h2>
        </div>

        <div className="timeline">
          {experience.map((item) => (
            <article className="xp" key={`${item.role}-${item.company}`} data-reveal>
              <header className="xp-head">
                <h3 className="xp-role">
                  {item.role}
                  <span className="xp-company"> · {item.company}</span>
                </h3>
                <p className="xp-period">{item.period}</p>
              </header>
              <ul className="xp-points">
                {item.points.map((point) => (
                  <li key={point.slice(0, 24)}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
