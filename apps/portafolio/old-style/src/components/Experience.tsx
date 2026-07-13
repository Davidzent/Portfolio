import { experience } from "../data/content";

export default function Experience() {
  const count = experience.length;

  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <div data-reveal>
          <h2 className="sec-title">Where I&apos;ve been</h2>
        </div>

        <div className="timeline">
          {experience.map((item, i) => (
            <article className="xp" key={`${item.role}-${item.company}`} data-reveal>
              <div className="xp-when">
                <span className="xp-index">
                  {String(count - i).padStart(2, "0")}
                </span>
                {item.period}
              </div>
              <div className="xp-main">
                <h3 className="xp-role">
                  {item.role}
                  <span className="xp-company"> · {item.company}</span>
                </h3>
                <ul className="xp-points">
                  {item.points.map((point) => (
                    <li key={point.slice(0, 24)}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
