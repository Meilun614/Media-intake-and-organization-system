import { project, siteMeta } from "../data/content";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          © {year} {project.title}. {siteMeta.affiliation}
        </p>
        <a className={styles.jump} href="#top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
