"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./PracticeSwitcher.module.css";

export default function PracticeSwitcher({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const pathname = usePathname();
  const isSystems = pathname.startsWith("/systems");
  const isDomicile = pathname.startsWith("/domicile");
  const isStudio = !isSystems && !isDomicile;

  const studioLogo = "/brand/imvo-studio.svg";
  const systemsLogo = "/brand/imvo-systems.svg";
  const domicileLogo =
    variant === "dark"
      ? "/domicile/domicile-black-no-tagline.svg"
      : "/domicile/domicile-white-no-tagline.svg";

  return (
    <nav
      className={`${styles.switcher} ${variant === "dark" ? styles.dark : styles.light}`}
      aria-label="IMVO divisions"
    >
      <Link
        href="/"
        className={`${styles.link} ${isStudio ? styles.active : ""}`}
        aria-current={isStudio ? "page" : undefined}
        aria-label="IMVO Studio"
      >
        <img className={styles.imvoDivisionLogo} src={studioLogo} alt="IMVO Studio" />
      </Link>

      <span className={styles.divider} aria-hidden="true" />

      <Link
        href="/systems"
        className={`${styles.link} ${isSystems ? styles.active : ""}`}
        aria-current={isSystems ? "page" : undefined}
        aria-label="IMVO Systems"
      >
        <img className={styles.imvoDivisionLogo} src={systemsLogo} alt="IMVO Systems" />
      </Link>

      <span className={styles.divider} aria-hidden="true" />

      <Link
        href="/domicile"
        className={`${styles.link} ${isDomicile ? styles.active : ""}`}
        aria-current={isDomicile ? "page" : undefined}
        aria-label="DŌMICILE"
      >
        <img className={styles.domicileLogo} src={domicileLogo} alt="DŌMICILE" />
      </Link>
    </nav>
  );
}
