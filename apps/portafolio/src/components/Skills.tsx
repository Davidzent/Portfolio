import { skillGroups } from "../data/content";
import { Icon, type IconName } from "./Icon";

export default function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="section-label">02 · Skills</p>
          <h2 className="section-title">Tools of the trade</h2>
          <p className="section-lead">
            The stack I reach for when it's time to ship — on the web, on the
            server, and in the engine.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.title} data-reveal>
              <div className="skill-head">
                <span className="skill-icon">
                  <Icon name={group.icon as IconName} size={21} />
                </span>
                <h3>{group.title}</h3>
              </div>
              <p className="skill-blurb">{group.blurb}</p>
              <ul className="chips">
                {group.skills.map((skill) => (
                  <li className="chip" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
