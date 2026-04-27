import { systemPipeline } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import styles from "./PipelineSection.module.css";

export function PipelineSection() {
  return (
    <section id="pipeline" className={styles.section} aria-labelledby="pipeline-heading">
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            id="pipeline-heading"
            eyebrow={systemPipeline.eyebrow}
            title={systemPipeline.title}
            subtitle={systemPipeline.intro}
          />
        </Reveal>
        <div className={styles.steps}>
          {systemPipeline.steps.map((s, i) => (
            <Reveal key={s.title} slow={i % 2 === 1}>
              <article className={styles.step}>
                <div className={styles.num} aria-hidden>
                  {i + 1}
                </div>
                <div>
                  <h3 className={styles.title}>{s.title}</h3>
                  <p className={styles.body}>{s.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className={styles.hint}>
            For implementation details, refer to the GitHub repository, which includes the full pipeline logic, UI
            components, and export workflows.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
