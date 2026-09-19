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

  return (
    <nav
      className={`${styles.switcher} ${variant === "dark" ? styles.dark : styles.light}`}
      aria-label="IMVO practices"
    >
      <Link
        href="/"
        className={`${styles.link} ${!isSystems ? styles.active : ""}`}
        aria-current={!isSystems ? "page" : undefined}
        aria-label="IMVO Studio"
      >
        <span className={`${styles.logoCrop} ${styles.studioMark}`} aria-hidden="true">
          <img src="/brand/imvo-studio.svg" alt="" draggable={false} />
        </span>
      </Link>

      <span className={styles.divider} aria-hidden="true" />

      <Link
        href="/systems"
        className={`${styles.link} ${isSystems ? styles.active : ""}`}
        aria-current={isSystems ? "page" : undefined}
        aria-label="IMVO Systems"
      >
        <span className={`${styles.logoCrop} ${styles.systemsMark}`} aria-hidden="true">
          <img src="/brand/imvo-systems.svg" alt="" draggable={false} />
        </span>
      </Link>
    </nav>
  );
}
