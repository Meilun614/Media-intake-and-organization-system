import { technologyOverview } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import styles from "./TechnologySection.module.css";

export function TechnologySection() {
  return (
    <section id="technology" className={styles.section} aria-labelledby="technology-heading">
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            id="technology-heading"
            eyebrow={technologyOverview.eyebrow}
            title={technologyOverview.title}
            subtitle={technologyOverview.intro}
          />
        </Reveal>
        <div className={styles.grid}>
          {technologyOverview.columns.map((col, i) => (
            <Reveal key={col.title} slow={i === 1}>
              <article className={styles.card}>
                <h3 className={styles.cardTitle}>{col.title}</h3>
                <ul className={styles.list}>
                  {col.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
