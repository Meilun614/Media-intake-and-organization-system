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
      </div>
    </section>
  );
}
