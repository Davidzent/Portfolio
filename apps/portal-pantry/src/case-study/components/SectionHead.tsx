import type { SectionLabel } from "../../data/portalPantry";

/**
 * The page is an order, so each section is billed as a course: a menu line
 * carrying the plain topic, then the in-fiction heading. The metaphor still
 * never hides information — it just stops saying it twice.
 */
export function SectionHead({
  label,
  sub,
  id,
}: {
  label: SectionLabel;
  sub?: string;
  id: string;
}) {
  return (
    <header className="cs-head">
      <CourseLine label={label} />
      <h2 className="cs-h2" id={id} tabIndex={-1}>
        {label.title}
      </h2>
      {sub && <p className="cs-sub">{sub}</p>}
    </header>
  );
}

/** A menu row: course number, leader dots, topic. Same shape the app's menus use. */
export function CourseLine({ label }: { label: SectionLabel }) {
  return (
    <p className="cs-course">
      <span className="cs-course__n">Course {label.course}</span>
      <span className="cs-course__leader" aria-hidden="true" />
      <span className="cs-course__topic">{label.topic}</span>
    </p>
  );
}
