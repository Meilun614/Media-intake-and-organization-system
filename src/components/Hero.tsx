import { project, siteMeta } from "../data/content";
import styles from "./Hero.module.css";

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section id="top" className={styles.section} aria-label="Introduction">
      <div className={styles.bg} />
      <div className={styles.grid} />
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />

      <div className={styles.inner}>
        <div>
          <RevealHeroText />
          <div className={styles.actions}>
            <button type="button" className={styles.btnPrimary} onClick={() => scrollToId("#demo")}>
              Try live demo
            </button>
            <button type="button" className={styles.btnGhost} onClick={() => scrollToId("#team")}>
              View team
            </button>
            <button type="button" className={styles.btnGhost} onClick={() => scrollToId("#about")}>
              Explore project
            </button>
            <button type="button" className={styles.btnOutline} onClick={() => scrollToId("#contact")}>
              Contact us
            </button>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.cardGlow} aria-hidden />
          <div className={styles.card}>
            <p className={styles.cardTitle}>Intake → organize → discover</p>
            <div className={styles.flow}>
              <div className={styles.flowRow}>
                <span className={styles.badge}>In</span>
                <span className={styles.flowText}>Guided uploads with consistent metadata</span>
              </div>
              <div className={styles.flowRow}>
                <span className={`${styles.badge} ${styles.badgePurple}`}>Core</span>
                <span className={styles.flowText}>Searchable library with role-aware access</span>
              </div>
              <div className={styles.flowRow}>
                <span className={styles.badge}>Out</span>
                <span className={styles.flowText}>Campaign-ready assets without duplicate work</span>
              </div>
            </div>
            <p className={styles.meta}>{project.purposeStatement}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Small delay animation on hero text without IntersectionObserver (above the fold) */
function RevealHeroText() {
  return (
    <div className={styles.heroReveal}>
      <span className={styles.eyebrow}>
        <span className={styles.dot} aria-hidden />
        {siteMeta.affiliation}
      </span>
      <h1 className={styles.title}>
        <span className={styles.titleAccent}>{project.title}</span>
      </h1>
      <p className={styles.lead}>{project.subtitle}</p>
    </div>
  );
}
