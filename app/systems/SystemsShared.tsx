import Image from "next/image";
import Link from "next/link";
import styles from "./SystemsPage.module.css";\nimport PracticeSwitcher from "../components/PracticeSwitcher";

export function SystemsHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/systems" className={styles.brand} aria-label="IMVO Systems home">
          <img src="/brand/imvo-systems.svg" alt="IMVO Systems" />
        </Link>

        <div className={styles.headerCenter}>
          <PracticeSwitcher placement="inline" variant="light" />
          <nav className={styles.nav} aria-label="IMVO Systems navigation">
            <Link href="/systems">Overview</Link>
            <Link href="/systems/about">About</Link>
            <Link href="/systems/contact">Contact</Link>
          </nav>
        </div>

        <Link className={styles.headerCta} href="/systems/contact">
          Talk to Systems
        </Link>
      </div>
    </header>
  );
}

export function SystemsFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <img src="/brand/imvo-systems.svg" alt="IMVO Systems" />
          <p>Digital products and business systems by IMVO Group.</p>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/systems">Systems</Link>
          <Link href="/systems/about">About</Link>
          <Link href="/systems/contact">Contact</Link>
          <Link href="/">IMVO Studio</Link>
          <Link href="/domicile">DŌMICILE</Link>
        </div>
      </div>
    </footer>
  );
}
