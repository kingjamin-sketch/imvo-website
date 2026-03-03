import { BRAND, SOCIALS, THEME } from "./Brand";

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 hover:border-white/30 hover:text-white"
    >
      {children}
    </a>
  );
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <img src="/imvo-white.png" alt="IMVO" className="h-8 w-auto" />
            <div className="mt-3 text-xs tracking-[0.35em] text-white/70">{BRAND.tagline}</div>
            <div className="mt-4 text-sm text-white/70">
              {BRAND.nameOfficial} · {BRAND.location}
            </div>
            <div className="mt-2 text-sm text-white/70">
              {BRAND.email} · {BRAND.phone}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <SocialIconLink href={SOCIALS.linkedin} label="LinkedIn">
              <LinkedInIcon />
            </SocialIconLink>
            <SocialIconLink href={SOCIALS.x} label="X">
              <XIcon />
            </SocialIconLink>
            <SocialIconLink href={SOCIALS.instagram} label="Instagram">
              <InstagramIcon />
            </SocialIconLink>
            <SocialIconLink href={SOCIALS.facebook} label="Facebook">
              <FacebookIcon />
            </SocialIconLink>
            <SocialIconLink href={SOCIALS.youtube} label="YouTube">
              <YouTubeIcon />
            </SocialIconLink>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/60">
          © {new Date().getFullYear()} {BRAND.nameOfficial}. All rights reserved.
          <span className="ml-3 inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: THEME.ACCENT }} />
            {BRAND.tagline}
          </span>
        </div>
      </div>
    </footer>
  );
}

/* Inline SVG icons */
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 23.5h4V7.98h-4V23.5zM8.5 7.98h3.83v2.12h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1v9.36h-4v-8.3c0-1.98-.04-4.53-2.76-4.53-2.76 0-3.18 2.15-3.18 4.39v8.44h-4V7.98z"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.77 7.73L23.2 22h-6.6l-5.17-6.6L5.6 22H2.5l7.3-8.34L1 2h6.7l4.67 6.02L18.9 2zm-1.16 18h1.72L6.77 3.9H4.93L17.74 20z"/>
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.5A5.5 5.5 0 1 1 6.5 14 5.5 5.5 0 0 1 12 8.5zm0 2A3.5 3.5 0 1 0 15.5 14 3.5 3.5 0 0 0 12 10.5zM18 6.3a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/>
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.25-1.5 1.55-1.5h1.65V4.9c-.29-.04-1.27-.12-2.42-.12-2.4 0-4.03 1.46-4.03 4.14V11H7.6v3h2.6v8h3.3z"/>
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3.1 3.1 0 0 0-2.18-2.2C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.32.5A3.1 3.1 0 0 0 .5 6.2 32.6 32.6 0 0 0 0 12a32.6 32.6 0 0 0 .5 5.8 3.1 3.1 0 0 0 2.18 2.2c1.82.5 9.32.5 9.32.5s7.5 0 9.32-.5a3.1 3.1 0 0 0 2.18-2.2A32.6 32.6 0 0 0 24 12a32.6 32.6 0 0 0-.5-5.8zM9.7 15.5v-7l6.1 3.5-6.1 3.5z"/>
    </svg>
  );
}