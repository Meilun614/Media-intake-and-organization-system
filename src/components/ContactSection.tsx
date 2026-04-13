import { contactSection, teamMembers } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            id="contact-heading"
            eyebrow="Contact"
            light
            align="center"
            title={contactSection.headline}
            subtitle={contactSection.sub}
          />
        </Reveal>

        <Reveal slow>
          <div className={styles.panel}>
            <div>
              <p className={styles.lead}>
                Prefer a single inbox for sponsors and mentors? Start here. For recruiting conversations,
                LinkedIn is often the fastest path to a tailored introduction.
              </p>
              <div className={styles.emailBlock}>
                <span className={styles.emailLabel}>{contactSection.teamEmailLabel}</span>
                <a className={styles.emailLink} href={`mailto:${contactSection.teamEmail}`}>
                  {contactSection.teamEmail}
                </a>
              </div>
              <p className={styles.note}>{contactSection.note}</p>
            </div>

            <div>
              <h3 className={styles.linkedinTitle}>LinkedIn directory</h3>
              <div className={styles.linkGrid}>
                {teamMembers.map((m) => (
                  <a
                    key={m.id}
                    className={styles.personLink}
                    href={m.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{m.name}</span>
                    <span>View profile →</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
