import { teamMembers } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TeamCard } from "./TeamCard";
import styles from "./TeamSection.module.css";

export function TeamSection() {
  return (
    <section id="team" className={styles.section} aria-labelledby="team-heading">
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            id="team-heading"
            eyebrow="The team"
            light
            title="People behind the build"
            subtitle="Recruiter-friendly profiles—swap placeholders in content.ts for real photos, LinkedIn URLs, and emails."
            align="center"
          />
        </Reveal>

        <div className={styles.grid}>
          {teamMembers.map((m, i) => (
            <Reveal key={m.id} slow={i % 2 === 1}>
              <TeamCard member={m} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className={styles.hint}>
            <strong style={{ color: "var(--color-text)" }}>Tip:</strong> Add headshots under{" "}
            <code>public/team/</code> and set each member&apos;s <code>photoSrc</code> in{" "}
            <code>src/data/content.ts</code>. You can also refine graduation dates and project bullets there.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
