import styles from "./SectionHeading.module.css";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({ id, eyebrow, title, subtitle, align = "left", light }: Props) {
  return (
    <header
      className={`${styles.wrap} ${align === "center" ? styles.center : ""} ${light ? styles.light : ""}`}
    >
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </header>
  );
}
