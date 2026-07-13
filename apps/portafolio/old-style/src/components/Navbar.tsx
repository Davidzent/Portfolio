import { useEffect, useState } from "react";
import { navLinks, site } from "../data/content";
import { useTheme } from "../hooks/useTheme";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const pos = window.scrollY + 160;
      let current = "";
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= pos) current = link.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled || open ? " scrolled" : ""}`}>
      <nav className="container nav" aria-label="Primary">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <Logo size={30} className="brand-logo" />
          <span className="brand-name">
            {site.brand.base}
            <span className="brand-accent">{site.brand.accent}</span>
          </span>
        </a>

        <ul id="primary-menu" className={`nav-links${open ? " open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={active === link.id ? "active" : undefined}
                aria-current={active === link.id ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="nav-cta">
            <a
              className="btn btn-ghost btn-sm"
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              <Icon name="download" size={15} />
              Resume
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
          </button>
          <button
            type="button"
            className="icon-btn nav-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="primary-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}
