import { useState } from "react";
import { contact, site } from "../data/content";
import { Icon } from "./Icon";
import { NeuralBackdrop } from "./NeuralBackdrop";

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
    <section id="contact" className="section section-term">
      <NeuralBackdrop />
      <div className="container contact-inner" data-reveal>
        <p className="tag">Contact</p>
        <h2 className="contact-title">
          Let&apos;s build <span className="mark">something</span> together
        </h2>
        <p className="contact-lead">{contact.blurb}</p>

        <div className="contact-actions">
          <a className="btn btn-primary" href={`mailto:${site.email}`}>
            <Icon name="mail" size={17} />
            Email me
          </a>
          <button type="button" className="btn btn-ghost" onClick={copyEmail}>
            <Icon name={copied ? "check" : "copy"} size={16} />
            {copied ? "Copied!" : site.email}
          </button>
        </div>

        <div className="contact-foot">
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
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Download résumé"
              title="Résumé"
            >
              <Icon name="download" size={18} />
            </a>
          </div>
          <p className="contact-note">{contact.note}</p>
        </div>
      </div>
    </section>
  );
}
