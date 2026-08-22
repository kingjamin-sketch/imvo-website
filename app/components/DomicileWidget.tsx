"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./DomicileWidget.module.css";

export default function DomicileWidget() {
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
      window.location.href = "/domicile";
      return;
    }
    setOpen((value) => !value);
  };

  return (
    <aside className={`${styles.widget} ${open ? styles.open : ""}`} onMouseEnter={startHover} onMouseLeave={endHover} aria-label="DŌMICILE property management">
      <div className={styles.panel} aria-hidden={!open}>
        <strong>Got a property to look after?</strong>
        <p>Tell DŌMICILE what it needs.</p>
        <Link href="/domicile" className={styles.link}>Explore DŌMICILE <span aria-hidden="true">→</span></Link>
      </div>
      <button className={styles.icon} type="button" onClick={handleIconClick} aria-label="Learn about DŌMICILE property management" aria-expanded={open}>
        <Image src="/domicile/logo-icon-white.webp" alt="" width={253} height={320} priority={false} />
      </button>
    </aside>
  );
}
