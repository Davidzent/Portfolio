import { site } from "../data/content";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-brand">
          <Logo size={20} />© {new Date().getFullYear()} {site.fullName} ·{" "}
          {site.domain}
        </p>
        <p className="footer-built">
          Designed &amp; built with React + TypeScript
        </p>
        <a className="icon-btn" href="#top" aria-label="Back to top" title="Back to top">
          <Icon name="arrow-up" size={17} />
        </a>
      </div>
    </footer>
  );
}
