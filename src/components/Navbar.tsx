import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { project } from "../data/content";

const links = [
  { href: "#about", label: "Project" },
  { href: "#pipeline", label: "Pipeline" },
  { href: "#technology", label: "Technology" },
  { href: "#team", label: "Team" },
  { href: "#skills", label: "Skills" },
  { href: "#demo", label: "Live demo" },
  { href: "#contact", label: "Contact" },
];

function scrollToId(id: string) {
  const el = document.querySelector(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className={`${styles.root} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <span className={styles.brandTitle}>{project.title}</span>
          <span className={styles.brandSub}>Capstone showcase</span>
        </a>

        <nav className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`} aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={styles.link}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                scrollToId(l.href);
              }}
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            className={styles.cta}
            onClick={() => {
              setMenuOpen(false);
              scrollToId("#demo");
            }}
          >
            Try live demo
          </button>
        </nav>

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={styles.menuIcon}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </header>
  );
}
