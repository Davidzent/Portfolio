import { skillGroups } from "../data/content";
import { Icon, type IconName } from "./Icon";

export default function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <div data-reveal>
          <h2 className="sec-title">Tools of the trade</h2>
          <p className="sec-lead">
            The stack I reach for when it&apos;s time to ship, on the web, on the
            server, and in the engine.
          </p>
        </div>

        <div className="skills-list">
          {skillGroups.map((group) => (
            <div className="skill-row" key={group.title} data-reveal>
              <div className="skill-lead">
                <span className="skill-icon">
                  <Icon name={group.icon as IconName} size={22} />
                </span>
                <div>
                  <h3>{group.title}</h3>
                  <p className="skill-blurb">{group.blurb}</p>
                </div>
              </div>
              <ul className="chips skill-tags">
                {group.skills.map((skill) => (
                  <li className="chip" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
