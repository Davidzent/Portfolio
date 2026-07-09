import { useState } from "react";
import { contact, site } from "../data/content";
import { Icon } from "./Icon";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — the mailto button still works
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container contact-inner">
        <div data-reveal>
          <p className="section-label label-center">05 · Contact</p>
          <h2 className="section-title">{contact.heading}</h2>
          <p className="section-lead lead-center">{contact.blurb}</p>

          <div className="contact-actions">
            <a className="btn btn-primary" href={`mailto:${site.email}`}>
              <Icon name="mail" size={17} />
              Say hello
            </a>
            <button type="button" className="btn btn-ghost" onClick={copyEmail}>
              <Icon name={copied ? "check" : "copy"} size={16} />
              {copied ? "Copied!" : site.email}
            </button>
          </div>

          <div className="social-row socials-center">
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
          </div>

          <p className="contact-note">{contact.note}</p>
        </div>
      </div>
    </section>
  );
}
