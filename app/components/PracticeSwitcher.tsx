"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./PracticeSwitcher.module.css";

export default function PracticeSwitcher({
  variant = "light",
  placement = "fixed",
}: {
  variant?: "light" | "dark";
  placement?: "fixed" | "inline";
}) {
  const pathname = usePathname();
  const isSystems = pathname.startsWith("/systems");
  const isDomicile = pathname.startsWith("/domicile");
  const isStudio = !isSystems && !isDomicile;

  return (
    <nav
      className={`${styles.switcher} ${placement === "inline" ? styles.inline : styles.fixed} ${variant === "dark" ? styles.dark : styles.light}`}
      aria-label="IMVO divisions"
    >
      <Link
        href="/"
        className={`${styles.link} ${isStudio ? styles.active : ""}`}
        aria-current={isStudio ? "page" : undefined}
        aria-label="IMVO Studio"
      >
        <img className={styles.imvoLogo} src="/brand/imvo-studio.svg" alt="IMVO Studio" />
      </Link>

      <Link
        href="/systems"
        className={`${styles.link} ${isSystems ? styles.active : ""}`}
        aria-current={isSystems ? "page" : undefined}
        aria-label="IMVO Systems"
      >
        <img className={styles.imvoLogo} src="/brand/imvo-systems.svg" alt="IMVO Systems" />
      </Link>

      <Link
        href="/domicile"
        className={`${styles.link} ${isDomicile ? styles.active : ""}`}
        aria-current={isDomicile ? "page" : undefined}
        aria-label="DŌMICILE"
      >
        <img
          className={styles.domicileLogo}
          src="/domicile/domicile-black-no-tagline.svg"
          alt="DŌMICILE"
        />
      </Link>
    </nav>
  );
}
