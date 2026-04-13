import type { TeamMember } from "../data/content";
import styles from "./TeamCard.module.css";

type Props = { member: TeamMember };

export function TeamCard({ member }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.photoWrap}>
        <img
          className={styles.photo}
          src={member.photoSrc}
          alt={`${member.name} — profile photo`}
          width={400}
          height={300}
        />
        <div className={styles.photoOverlay} aria-hidden />
      </div>

      <div className={styles.body}>
        <div className={styles.nameRow}>
          <div>
            <h3 className={styles.name}>{member.name}</h3>
            <p className={styles.role}>{member.role}</p>
          </div>
          <span className={styles.grad}>{member.graduation}</span>
        </div>

        <div className={styles.tagRow}>
          {member.contributions.map((c) => (
            <span key={c} className={styles.tag}>
              {c}
            </span>
          ))}
        </div>

        <div className={styles.block}>
          <strong>Internship goals</strong>
          {member.internshipStatement}
        </div>

        <div className={styles.block}>
          <strong>Dream role</strong>
          {member.dreamJob}
        </div>

        <div className={styles.block}>
          <strong>Other projects</strong>
          <ul className={styles.list}>
            {member.otherProjects.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div className={styles.actions}>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href={`mailto:${member.contactEmail}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 6h16v12H4z" strokeLinejoin="round" />
              <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {member.contactLabel}
          </a>
          <a
            className={styles.btn}
            href={member.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M6.5 8.5h-3V22h3V8.5zM8 5.5a1.9 1.9 0 11-3.8 0A1.9 1.9 0 018 5.5zM22 22h-3v-6.2c0-3.7-4.3-3.6-4.3 0V22h-3V8.5h3v1.8s1.4-2.6 4.6-2.6c3.3 0 5.7 2.4 5.7 7.4V22z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </article>
  );
}
