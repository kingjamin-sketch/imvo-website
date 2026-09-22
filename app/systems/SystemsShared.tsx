import Image from "next/image";
import Link from "next/link";
import styles from "./SystemsPage.module.css";

export function SystemsHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/systems" className={styles.brand} aria-label="IMVO Systems home">
          <img src="/brand/imvo-systems.svg" alt="IMVO Systems" />
        </Link>

        <nav className={styles.divisionNav} aria-label="IMVO divisions">
          <Link href="/" aria-label="IMVO Studio">
            <img className={styles.divisionStudio} src="/brand/imvo-studio.svg" alt="IMVO Studio" />
          </Link>
          <i aria-hidden="true" />
          <Link href="/systems" className={styles.active} aria-label="IMVO Systems">
            <img className={styles.divisionSystems} src="/brand/imvo-systems.svg" alt="IMVO Systems" />
          </Link>
          <i aria-hidden="true" />
          <Link href="/domicile" aria-label="DŌMICILE">
            <img className={styles.divisionDomicile} src="/domicile/domicile-white-no-tagline.svg" alt="DŌMICILE" />
          </Link>
        </nav>

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
