import { missionHighlight } from "../data/content";
import { Reveal } from "./Reveal";
import styles from "./MissionSection.module.css";

export function MissionSection() {
  return (
    <section className={styles.section} aria-labelledby="mission-heading">
      <Reveal>
        <div className={styles.inner}>
          <div className={styles.iconWrap} aria-hidden>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M12 3l7 4v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p id="mission-heading" className={styles.eyebrow}>
              {missionHighlight.eyebrow}
            </p>
            <h2 className={styles.title}>{missionHighlight.title}</h2>
            <p className={styles.body}>{missionHighlight.body}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
