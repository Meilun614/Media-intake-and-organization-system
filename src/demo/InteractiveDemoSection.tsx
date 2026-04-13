/**
 * Site section wrapping the embedded NiceGUI-parity demo (see src/demo/* comments for file mapping).
 */

import { interactiveDemoIntro } from "../data/content";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { DemoProvider } from "./DemoContext";
import { DemoWorkspace } from "./DemoWorkspace";
import styles from "./InteractiveDemo.module.css";

export function InteractiveDemoSection() {
  return (
    <section id="demo" className={styles.section} aria-labelledby="demo-heading">
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            id="demo-heading"
            eyebrow={interactiveDemoIntro.eyebrow}
            light
            align="center"
            title={interactiveDemoIntro.title}
            subtitle={interactiveDemoIntro.subtitle}
          />
        </Reveal>
        <Reveal slow>
          <p className={styles.intro}>
            <strong>{interactiveDemoIntro.noteLead}</strong> {interactiveDemoIntro.noteBody}
          </p>
        </Reveal>
        <Reveal>
          <DemoProvider>
            <DemoWorkspace />
          </DemoProvider>
        </Reveal>
      </div>
    </section>
  );
}
