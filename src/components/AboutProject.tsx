import { project } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import styles from "./AboutProject.module.css";

export function AboutProject() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            id="about-heading"
            eyebrow="About the project"
            title="From scattered media to a structured, reliable library"
          />
        </Reveal>

        <Reveal slow>
          <div className={styles.grid}>
            <article className={styles.card}>
              <div className={styles.cardIcon} aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v5l3 2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>The problem</h3>
              <p className={styles.cardBody}>{project.problem}</p>
            </article>

            <article className={styles.card}>
              <div className={`${styles.cardIcon} ${styles.cardIconPurple}`} aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 6h16M4 12h10M4 18h14" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Our approach</h3>
              <p className={styles.cardBody}>{project.approach}</p>
            </article>

            <article className={styles.card}>
              <div className={`${styles.cardIcon} ${styles.cardIconSky}`} aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M12 3v18M5 10l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Why it matters</h3>
              <p className={styles.cardBody}>{project.whyItMatters}</p>
            </article>
          </div>
        </Reveal>

        <Reveal>
          <aside className={styles.repoCard} aria-labelledby="github-repo-heading">
            <div className={styles.repoMain}>
              <div className={styles.repoIcon} aria-hidden>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
              </div>
              <div style={{ minWidth: 0 }}>
                <h3 id="github-repo-heading" className={styles.repoTitle}>
                  GitHub repository
                </h3>
                <p className={styles.repoDesc}>
                  The full source code and documentation for the NiceGUI and Python-based media intake system are
                  available in this repository. It reflects the same workflow demonstrated in the{" "}
                  <strong>Live Demo</strong> section of this site.
                </p>
                <div className={styles.repoActions}>
                  <a
                    className={styles.repoLink}
                    href={project.githubRepoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path
                        d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Open on GitHub
                  </a>
                </div>
              </div>
            </div>
            <div style={{ flex: "1 1 100%", minWidth: 0 }}>
              <p className={styles.cloneLabel}>Clone (HTTPS)</p>
              <p className={styles.cloneBox}>
                <code>git clone {project.githubCloneUrl}</code>
              </p>
            </div>
          </aside>
        </Reveal>

        <Reveal>
          <p className={styles.note}>
            <strong>Future updates:</strong> Swap copy in <code>src/data/content.ts</code> under the{" "}
            <code>project</code> object—keep paragraphs short for skimmability on mobile.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
