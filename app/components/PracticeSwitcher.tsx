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

      <span className={styles.divider} aria-hidden="true" />

      <Link
        href="/domicile"
        className={`${styles.link} ${isDomicile ? styles.active : ""}`}
        aria-current={isDomicile ? "page" : undefined}
        aria-label="DŌMICILE"
      >
        <span className={styles.domicileMark} aria-hidden="true">
          <img
            src={variant === "dark"
              ? "/domicile/domicile-black-no-tagline.svg"
              : "/domicile/domicile-white-no-tagline.svg"}
            alt=""
            draggable={false}
          />
        </span>
      </Link>
    </nav>
  );
}
