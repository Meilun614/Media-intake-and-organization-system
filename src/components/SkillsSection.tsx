import { skillsShowcase, teamMembers } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import styles from "./SkillsSection.module.css";

export function SkillsSection() {
  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-heading">
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            id="skills-heading"
            eyebrow="Skills & contributions"
            align="center"
            title="Team collaboration and contributions"
            subtitle={skillsShowcase.intro}
          />
        </Reveal>

        <Reveal slow>
          <div className={styles.grid}>
            {skillsShowcase.pillars.map((p) => (
              <div key={p.title} className={styles.pillar}>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <ul className={styles.list}>
                  {p.items.map((item) => (
                    <li key={item}>
                      <span className={styles.check} aria-hidden>
                        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className={styles.memberStrip}>
            <p className={styles.memberStripTitle}>Per-member contributions</p>
            <div className={styles.memberGrid}>
              {teamMembers.map((m) => (
                <div key={m.id} className={styles.memberBlock}>
                  <strong>{m.name}</strong>
                  <p>{m.contributions.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
