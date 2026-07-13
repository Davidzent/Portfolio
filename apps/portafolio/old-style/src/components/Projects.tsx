import { useState } from "react";
import { projects, site, type Project, type ProjectType } from "../data/content";
import { Icon } from "./Icon";
import { type ProjectLogoName } from "./ProjectLogos";
import { ProjectCover, type CoverName } from "./ProjectCover";

type Filter = "all" | ProjectType;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "web", label: "Web & Full-Stack" },
  { value: "game", label: "Games" },
];

function ProjectCard({
  project,
  featured,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article className={`project-card${featured ? " featured" : ""}`}>
      <div className="project-cover">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
          />
        ) : project.cover ? (
          <ProjectCover
            cover={project.cover as CoverName}
            logo={project.logo as ProjectLogoName | undefined}
          />
        ) : (
          <span className="cover-icon">
            <Icon
              name={project.type === "game" ? "gamepad" : "code"}
              size={featured ? 64 : 46}
            />
          </span>
        )}
        <span className="project-type">
          <Icon name={project.type === "game" ? "gamepad" : "server"} size={12} />
          {project.type === "game" ? "Game" : "Web App"}
        </span>
      </div>

      <div className="project-body">
        <div className="project-title-row">
          <h3 className="project-title">{project.title}</h3>
          <div className="project-links">
            {project.github && (
              <a
                className="plink"
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} source code on GitHub`}
                title="Source code"
              >
                <Icon name="github" size={17} />
              </a>
            )}
            {project.demo && (
              <a
                className="plink"
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                title="Live demo"
              >
                <Icon name="external" size={17} />
              </a>
            )}
          </div>
        </div>

        <p className="project-desc">{project.description}</p>
        {project.highlight && (
          <p className="project-highlight">{project.highlight}</p>
        )}
        <ul className="chips chips-sm">
          {project.tech.map((tech) => (
            <li className="chip" key={tech}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div data-reveal>
          <p className="tag">Selected work</p>
          <h2 className="sec-title" style={{ marginTop: "16px" }}>
            Things I&apos;ve <span className="mark">shipped</span>
          </h2>
          <p className="sec-lead">
            A mix of production web platforms and games, the two halves of how I
            think about software.
          </p>
        </div>

        <div
          className="filter-row"
          role="group"
          aria-label="Filter projects"
          data-reveal
        >
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`filter-btn${filter === f.value ? " active" : ""}`}
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="projects-grid" data-reveal>
          {visible.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              featured={i === 0}
            />
          ))}
        </div>

        <div className="projects-more" data-reveal>
          <a
            className="btn btn-ghost"
            href={site.socials.github}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="github" size={17} />
            More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
