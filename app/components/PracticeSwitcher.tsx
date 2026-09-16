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
  const isApplied = pathname.startsWith("/applied");

  return (
    <nav
      className={`${styles.switcher} ${variant === "dark" ? styles.dark : styles.light}`}
      aria-label="IMVO practices"
    >
      <Link
        href="/"
        className={`${styles.link} ${!isApplied ? styles.active : ""}`}
        aria-current={!isApplied ? "page" : undefined}
        aria-label="IMVO Studio"
      >
        <span className={`${styles.logoCrop} ${styles.studioMark}`} aria-hidden="true">
          <img src="/brand/imvo-studio.svg" alt="" draggable={false} />
        </span>
      </Link>

      <span className={styles.divider} aria-hidden="true" />

      <Link
        href="/applied"
        className={`${styles.link} ${isApplied ? styles.active : ""}`}
        aria-current={isApplied ? "page" : undefined}
        aria-label="IMVO Applied"
      >
        <span className={`${styles.logoCrop} ${styles.appliedMark}`} aria-hidden="true">
          <img src="/brand/imvo-applied.svg" alt="" draggable={false} />
        </span>
      </Link>
    </nav>
  );
}
