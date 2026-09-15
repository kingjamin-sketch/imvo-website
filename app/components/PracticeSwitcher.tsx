"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PracticeSwitcher() {
  const pathname = usePathname();
  const isApplied = pathname.startsWith("/applied");

  return (
    <nav className="practiceSwitcher" aria-label="IMVO practices">
      <Link
        href="/"
        className={!isApplied ? "isActive" : undefined}
        aria-current={!isApplied ? "page" : undefined}
      >
        Studio
      </Link>
      <Link
        href="/applied"
        className={isApplied ? "isActive" : undefined}
        aria-current={isApplied ? "page" : undefined}
      >
        Applied
      </Link>
    </nav>
  );
}
