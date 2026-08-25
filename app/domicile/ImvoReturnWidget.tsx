"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./ImvoReturnWidget.module.css";

export default function ImvoReturnWidget() {
  const [open, setOpen] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

  const startHover = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      hoverTimer.current = setTimeout(() => setOpen(true), 220);
    }
  };

  const endHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpen(false);
  };

  const handleIconClick = () => {
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (canHover) {
      window.location.href = "/";
      return;
    }
    setOpen((value) => !value);
  };

  return (
    <aside
      className={`${styles.widget} ${open ? styles.open : ""}`}
      onMouseEnter={startHover}
      onMouseLeave={endHover}
      aria-label="Return to IMVO Group"
    >
      <button
        className={styles.icon}
        type="button"
        onClick={handleIconClick}
        aria-label="Return to IMVO Group"
        aria-expanded={open}
      >
        <Image src="/imvo-white.png" alt="IMVO" width={360} height={124} priority={false} unoptimized />
      </button>
      <div className={styles.panel} aria-hidden={!open}>
        <strong>Back to IMVO Group.</strong>
        <p>Architecture, design, consultancy and built-environment development.</p>
        <Link href="/" className={styles.link}>Return to IMVO <span aria-hidden="true">→</span></Link>
      </div>
    </aside>
  );
}
