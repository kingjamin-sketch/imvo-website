"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./DomicileWidget.module.css";

export default function DomicileWidget() {
  const [open, setOpen] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  const startHover = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      hoverTimer.current = setTimeout(() => setOpen(true), 450);
    }
  };

  const endHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  const handleIconClick = () => {
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (canHover || open) {
      window.location.href = "/domicile";
      return;
    }
    setOpen(true);
  };

  return (
    <aside
      className={`${styles.widget} ${open ? styles.open : ""}`}
      onMouseEnter={startHover}
      onMouseLeave={endHover}
      aria-label="DŌMICILE property management"
    >
      <div className={styles.panel} aria-hidden={!open}>
        <button
          type="button"
          className={styles.close}
          aria-label="Close DŌMICILE message"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <strong>Need help managing a property?</strong>
        <p>DŌMICILE can help you look after it.</p>
        <Link href="/domicile" className={styles.link}>
          Explore DŌMICILE <span aria-hidden="true">→</span>
        </Link>
      </div>

      <button
        className={styles.icon}
        type="button"
        onClick={handleIconClick}
        aria-label={open ? "Open DŌMICILE" : "Learn about DŌMICILE property management"}
        aria-expanded={open}
      >
        <Image
          src="/domicile/logo-icon-white.png"
          alt=""
          width={727}
          height={919}
          priority={false}
        />
      </button>
    </aside>
  );
}
