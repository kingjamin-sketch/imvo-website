"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./PracticeSwitcher.module.css";

export default function PracticeSwitcher() {
  const pathname = usePathname();
  const isApplied = pathname.startsWith("/applied");

  return (
    <nav className={styles.switcher} aria-label="IMVO practices">
      <Link
        href="/"
        className={`${styles.link} ${!isApplied ? styles.active : ""}`}
        aria-current={!isApplied ? "page" : undefined}
      >
        Studio
      </Link>
      <Link
        href="/applied"
        className={`${styles.link} ${isApplied ? styles.active : ""}`}
        aria-current={isApplied ? "page" : undefined}
      >
        Applied
      </Link>
    </nav>
  );
}
