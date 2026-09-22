import Link from "next/link";

type SystemsHeaderProps = {
  section?: "home" | "about" | "contact";
};

export default function SystemsHeader({ section = "home" }: SystemsHeaderProps) {
  return (
    <header className="sysHeader">
      <Link className="sysBrandHome" href="/systems" aria-label="IMVO Systems">
        <img src="/brand/imvo-systems.svg" alt="IMVO Systems" />
      </Link>

      <nav className="sysPracticeLogos" aria-label="IMVO divisions">
        <Link href="/" aria-label="IMVO Studio">
          <img className="sysPracticeStudio" src="/brand/imvo-studio.svg" alt="IMVO Studio" />
        </Link>
        <span aria-hidden="true" />
        <Link href="/systems" className="active" aria-label="IMVO Systems">
          <img className="sysPracticeSystems" src="/brand/imvo-systems.svg" alt="IMVO Systems" />
        </Link>
        <span aria-hidden="true" />
        <Link href="/domicile" aria-label="DŌMICILE">
          <img className="sysPracticeDomicile" src="/domicile/domicile-white-no-tagline.svg" alt="DŌMICILE" />
        </Link>
      </nav>

      <nav className="sysPageNav" aria-label="IMVO Systems pages">
        <Link className={section === "home" ? "active" : ""} href="/systems">Work</Link>
        <Link className={section === "about" ? "active" : ""} href="/systems/about">About</Link>
        <Link className={section === "contact" ? "active" : ""} href="/systems/contact">Contact</Link>
      </nav>
    </header>
  );
}
