"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroRotatingVideo from "./components/HeroRotatingVideo";
import PortfolioSlider from "./components/PortfolioSlider";

// --- CLIENT-ONLY WRAPPER ---
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted ? <>{children}</> : null;
};

const teamMembers = [
  {
    name: "ASINGIZWE BENJAMIN MARIE MERCI",
    role: "Architecture & Design",
    image: "/team1.png",
    description:
      "Experienced in architectural design, urbanism, and environmentally responsive development — focused on spatial clarity, sustainable thinking, contextual integration, and long-term architectural value.",
  },
  {
    name: "SHEMA BAMBI Antonella M.",
    role: "Consultancy & Strategy",
    image: "/team2.png",
    description:
      "Combines expertise in IT development, strategic consultancy, and project coordination — supporting digital systems, operational planning, client advisory, and development-focused decision-making.",
  },
  {
    name: "RUKUNDO Prince",
    role: "Supervision & Execution",
    image: "/team3.png",
    description:
      "PhD holder in Civil Engineering with expertise in roads, infrastructure systems, and urbanism — contributing technical supervision, execution coordination, and planning-oriented engineering insight.",
  },
  {
    name: "KANGWAGYE Sharon",
    role: "Project Coordination",
    image: "/team4.png",
    description:
      "Experienced in digital commerce, market strategy, and growth coordination — supporting project organization through strategic planning, market understanding, and operational communication.",
  },
];

const inProgressProjects = [
  {
    title: "Golden Hill Estate",
    type: "Residential Masterplan",
    concept: "Elevated foundations responding to wetland topography.",
    image: "/project-22.png",
  },
  {
    title: "Rayon Sports FC Arena",
    type: "Sports Infrastructure",
    concept: "Crown-themed stadium concept and spatial identity.",
    image: "/project-10.png",
  },
  {
    title: "AMAKUZA Experience",
    type: "Commercial Environment",
    concept: "Integrated spatial branding and hospitality flow.",
    image: "/project-36.png",
  },
];

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const };

const projectIntelligenceItems = [
  {
    title: "Land acquisition",
    text: "Support before commitment — reading context, access, constraints, opportunity, and long-term development value.",
  },
  {
    title: "Feasibility review",
    text: "Early guidance on what a site can realistically support before drawings, approvals, and construction costs begin.",
  },
  {
    title: "Project direction",
    text: "Turning ambition into a clear development path across architecture, planning, supervision, and delivery strategy.",
  },
];

const rwandaStudioHolidays: Record<string, string> = {
  // Rwanda 2026 public holiday list. Update yearly for moving holidays such as Eid.
  "2026-01-01": "New Year's Day",
  "2026-01-02": "New Year Holiday",
  "2026-02-02": "National Heroes Day",
  "2026-03-20": "Eid al-Fitr",
  "2026-04-03": "Good Friday",
  "2026-04-06": "Easter Monday",
  "2026-04-07": "Genocide against the Tutsi Memorial Day",
  "2026-05-01": "Labour Day",
  "2026-05-27": "Eid al-Adha",
  "2026-07-01": "Independence Day",
  "2026-07-04": "Liberation Day",
  "2026-08-01": "Umuganura Day",
  "2026-08-16": "Assumption Day",
  "2026-12-26": "Christmas Day",
  "2026-12-27": "Boxing Day",
};

const openHourMessages: Record<number, string[]> = {
  8: [
    "Studio open. Morning planning begins in Kigali.",
    "Fresh briefs are being reviewed as the day starts.",
    "The first drawings of the day are moving.",
  ],
  9: [
    "Project reviews are active. New inquiries are welcome.",
    "The studio is aligning briefs, sites, and next steps.",
    "Design conversations are open for the day.",
  ],
  10: [
    "Site context, feasibility, and design direction are under review.",
    "The team is shaping decisions before drawings begin.",
    "A good project starts with clear information.",
  ],
  11: [
    "The studio is active. Project briefs are being studied.",
    "Planning, drawings, and coordination are in motion.",
    "If you have a site in mind, this is a good time to talk.",
  ],
  12: [
    "Midday review is underway. The studio is still receiving inquiries.",
    "Lunch may happen, but the buildings are still on our minds.",
    "Do not eat before you call. Okay, maybe call first.",
  ],
  13: [
    "Afternoon work is active. Project decisions are being refined.",
    "The studio is back in full rhythm after midday review.",
    "New project inquiries are open this afternoon.",
  ],
  14: [
    "Design development and coordination are moving.",
    "The studio is reviewing drawings, sites, and client direction.",
    "Good architecture starts before construction begins.",
  ],
  15: [
    "Project intelligence is active. Land, context, and feasibility matter.",
    "The studio is connecting design ambition with buildable decisions.",
    "Site visits and consultations can be scheduled by request.",
  ],
  16: [
    "Late afternoon checks are in progress.",
    "The studio is wrapping decisions into clearer next steps.",
    "Today's project reviews are still moving.",
  ],
  17: [
    "Closing soon. Today's reviews are being wrapped up.",
    "Last checks before the studio closes for the day.",
    "New inquiries will still be received after hours.",
  ],
};

const openingSoonMessages = [
  "Opening soon. The Kigali studio starts at 08:00 CAT.",
  "The studio is almost back at the drawing board.",
  "Morning project reviews begin shortly.",
];

const closedMessages = [
  "Studio closed. New inquiries will be reviewed next working day.",
  "The lights are down. The project pipeline stays open.",
  "Drawings rest. Ideas do not.",
  "Submitted briefs remain safely routed to IMVO.",
  "The studio reopens at 08:00 CAT.",
  "After-hours inquiries are welcome.",
];

const weekendMessages = [
  "Weekend schedule. The studio is away from the drawing board.",
  "Buildings take years. Rest takes two days.",
  "Weekend mode is active. New inquiries are still received.",
  "The team returns on the next working day.",
  "Monday's ideas are already forming.",
  "The studio is closed today, but project briefs remain open.",
];

const brandPulseMessages = [
  "Current region: Kigali, Rwanda.",
  "Serving Rwanda, East Africa, and selected regional projects.",
  "Planning starts with context.",
  "Project discussions are open.",
  "Every project begins with a better question.",
  "Site visits are available by appointment.",
  "Good decisions happen before construction.",
  "New project inquiries are welcome.",
  "Development value starts with clarity.",
];

const formatKigaliDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const rotatingLine = (lines: string[], minute: number, hour = 0) => {
  if (!lines.length) return "";
  const slot = Math.floor(minute / 5) + hour * 12;
  return lines[slot % lines.length];
};

function StudioStatus() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!now) return null;

  const kigaliTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Africa/Kigali" }),
  );

  const day = kigaliTime.getDay();
  const hour = kigaliTime.getHours();
  const minute = kigaliTime.getMinutes();
  const isWeekend = day === 0 || day === 6;
  const minutesNow = hour * 60 + minute;
  const openMinutes = 8 * 60;
  const closeMinutes = 18 * 60;
  const lunchStart = 12 * 60;
  const lunchEnd = 13 * 60;

  const todayKey = formatKigaliDateKey(kigaliTime);
  const tomorrowKey = formatKigaliDateKey(addDays(kigaliTime, 1));
  const yesterdayKey = formatKigaliDateKey(addDays(kigaliTime, -1));

  const holidayToday = rwandaStudioHolidays[todayKey];
  const holidayTomorrow = rwandaStudioHolidays[tomorrowKey];
  const holidayYesterday = rwandaStudioHolidays[yesterdayKey];

  const isOpen =
    !isWeekend &&
    !holidayToday &&
    minutesNow >= openMinutes &&
    minutesNow < closeMinutes;

  const isOpeningSoon =
    !isWeekend &&
    !holidayToday &&
    minutesNow >= 7 * 60 &&
    minutesNow < openMinutes;

  const isLunch =
    isOpen && minutesNow >= lunchStart && minutesNow < lunchEnd;

  const isClosingSoon = isOpen && closeMinutes - minutesNow <= 60;

  const time = kigaliTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const date = kigaliTime.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const holidayTodayMessages = holidayToday
    ? [
        `The studio is observing ${holidayToday} today.`,
        `${holidayToday} is being observed in Kigali. Project inquiries remain open online.`,
        `IMVO is out of office for ${holidayToday}. We resume on the next working day.`,
      ]
    : [];

  const holidayTomorrowMessages = holidayTomorrow
    ? [
        `The studio will observe ${holidayTomorrow} tomorrow.`,
        `${holidayTomorrow} is approaching. Send your brief today and we will review it around the holiday schedule.`,
        `Tomorrow is ${holidayTomorrow}. Project inquiries remain open through the website.`,
      ]
    : [];

  const holidayYesterdayMessages = holidayYesterday
    ? [
        `The studio is back from ${holidayYesterday}. Project reviews resume today.`,
        `${holidayYesterday} has passed. IMVO is returning to active project coordination.`,
        `Back from ${holidayYesterday}. New briefs are being reviewed again.`,
      ]
    : [];

  const status = holidayToday
    ? {
        label: "Public Holiday",
        text: rotatingLine(holidayTodayMessages, minute, hour),
      }
    : isWeekend
      ? {
          label: "Weekend Schedule",
          text: rotatingLine(weekendMessages, minute, hour),
        }
      : holidayTomorrow
        ? {
            label: "Holiday Approaching",
            text: rotatingLine(holidayTomorrowMessages, minute, hour),
          }
        : holidayYesterday && isOpen
          ? {
              label: "Studio Back",
              text: rotatingLine(holidayYesterdayMessages, minute, hour),
            }
          : isOpeningSoon
            ? {
                label: "Opening Soon",
                text: rotatingLine(openingSoonMessages, minute, hour),
              }
            : isLunch
              ? {
                  label: "Midday Studio",
                  text: rotatingLine(openHourMessages[12], minute, hour),
                }
              : isClosingSoon
                ? {
                    label: "Closing Soon",
                    text: rotatingLine(openHourMessages[17], minute, hour),
                  }
                : isOpen
                  ? {
                      label: "Studio Open",
                      text: rotatingLine(
                        openHourMessages[hour] || brandPulseMessages,
                        minute,
                        hour,
                      ),
                    }
                  : {
                      label: "Studio Closed",
                      text: rotatingLine(closedMessages, minute, hour),
                    };

  const pulse = rotatingLine(brandPulseMessages, minute + 2, hour);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...transition, delay: 0.2 }}
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018))",
        padding: 30,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.1), transparent 34%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontSize: 11,
            fontWeight: 900,
            color: "rgba(255,255,255,0.46)",
          }}
        >
          Studio Status
        </div>

        <div
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "rgba(255,255,255,0.9)",
            fontSize: 14,
            fontWeight: 900,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: isOpen ? "#f8f8f8" : "rgba(255,255,255,0.72)",
              boxShadow: isOpen
                ? "0 0 18px rgba(255,255,255,0.85)"
                : "0 0 12px rgba(255,255,255,0.35)",
              display: "inline-block",
            }}
          />
          {status.label}
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: "clamp(34px, 4vw, 54px)",
            lineHeight: 1,
            letterSpacing: "-0.06em",
            fontWeight: 900,
          }}
        >
          {time}
        </div>

        <div
          style={{
            marginTop: 8,
            fontSize: 13,
            color: "rgba(255,255,255,0.52)",
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Kigali, Rwanda · CAT
        </div>

        <div
          style={{
            marginTop: 18,
            fontSize: 14,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.66)",
          }}
        >
          {date}
          <br />
          {status.text}
        </div>

        <div
          style={{
            marginTop: 18,
            paddingTop: 16,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            fontSize: 12,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.42)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {pulse}
        </div>
      </div>
    </motion.div>
  );
}

const ProjectIntelligence = () => (
  <section
    className="mobilePad"
    style={{
      padding: "120px 0",
      background: "#070707",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 70% 15%, rgba(255,255,255,0.08), transparent 28%), linear-gradient(to bottom, rgba(255,255,255,0.02), transparent)",
        pointerEvents: "none",
      }}
    />

    <div className="containerWide" style={{ position: "relative", zIndex: 2 }}>
      <motion.div
        className="mobileStack"
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={transition}
        style={{
          display: "grid",
          gridTemplateColumns: "0.95fr 1.05fr",
          gap: 70,
          alignItems: "end",
        }}
      >
        <div>
          <div
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontSize: 12,
              opacity: 0.6,
              fontWeight: 800,
            }}
          >
            Project Intelligence
          </div>

          <h2
            style={{
              marginTop: 20,
              fontSize: "clamp(40px, 5vw, 76px)",
              lineHeight: 0.96,
              letterSpacing: "-0.065em",
              fontWeight: 900,
            }}
          >
            Better decisions
            <br />
            before design.
          </h2>
        </div>

        <p
          style={{
            margin: 0,
            maxWidth: 680,
            fontSize: 18,
            lineHeight: 1.85,
            color: "rgba(255,255,255,0.66)",
          }}
        >
          Before drawings, approvals, and construction costs begin, IMVO helps
          clients understand land, context, feasibility, and project direction
          so resources are committed with clarity.
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
          marginTop: 70,
        }}
      >
        {projectIntelligenceItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...transition, delay: index * 0.12 }}
            style={{
              minHeight: 260,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.028)",
              padding: 30,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden",
              position: "relative",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = "rgba(255,255,255,0.055)";
              event.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = "rgba(255,255,255,0.028)";
              event.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.38)",
                fontWeight: 900,
              }}
            >
              0{index + 1}
            </div>

            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 26,
                  letterSpacing: "-0.035em",
                  fontWeight: 900,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: "18px 0 0",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.64)",
                }}
              >
                {item.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

function AnimatedNumber({
  from,
  to,
  suffix = "",
  pad = false,
}: {
  from: number;
  to: number;
  suffix?: string;
  pad?: boolean;
}) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    const duration = 5000;
    const start = performance.now();
    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [from, to]);

  const formatted = pad ? String(value).padStart(2, "0") : String(value);

  return (
    <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-0.04em" }}>
      {formatted}
      {suffix}
    </div>
  );
}

// --- CINEMATIC HERO + COMPACT APPROACH ---
const approachScenes = [
  {
    label: "DESIGN",
    title: "Spatial clarity before form.",
    text: "Every line begins with purpose, proportion, context, and buildable intent.",
    image: "/project-97.png",
  },
  {
    label: "STRATEGY",
    title: "Better decisions before construction.",
    text: "We connect design ambition with feasibility, planning, risk, and development value.",
    image: "/project-99.png",
  },
  {
    label: "EXECUTION",
    title: "Design value protected on site.",
    text: "From concept to supervision, IMVO keeps the work disciplined, coordinated, and accountable.",
    image: "/project-36.png",
  },
];

function CinematicHero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: "#050505",
        overflow: "hidden",
      }}
    >
      <HeroRotatingVideo />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(5,5,5,0.92), rgba(5,5,5,0.35), rgba(5,5,5,0.05))",
          pointerEvents: "none",
        }}
      />

      <div
        className="containerWide"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "10vh",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.2 }}
          style={{
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 700,
            opacity: 0.8,
          }}
        >
          INTELLECTU · MENS · VISIO · ORIGO
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.4 }}
          style={{
            marginTop: 24,
            maxWidth: 800,
            fontSize: "clamp(18px, 2vw, 24px)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          IMVO develops residential, commercial, and institutional environments
          through architectural design, consultancy, supervision, and
          execution-aware planning — balancing spatial clarity, contextual
          sensitivity, technical discipline, and long-term architectural value.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.6 }}
          style={{ marginTop: 40 }}
        >
          <Link
            href="/projects"
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textDecoration: "none",
              color: "white",
              borderBottom: "1px solid white",
              paddingBottom: 4,
            }}
          >
            EXPLORE WORK ↗
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

const ApproachPrinciples = () => (
  <section
    className="mobilePad"
    style={{
      padding: "100px 0",
      background: "#050505",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      overflow: "hidden",
    }}
  >
    <div className="containerWide">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={transition}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontSize: 12,
              opacity: 0.6,
              fontWeight: 800,
            }}
          >
            Studio Principles
          </div>

          <h2
            style={{
              marginTop: 18,
              fontSize: "clamp(38px, 5vw, 72px)",
              lineHeight: 0.96,
              letterSpacing: "-0.065em",
              fontWeight: 900,
            }}
          >
            Design, strategy,
            <br />
            and execution.
          </h2>
        </div>

        <p
          style={{
            margin: 0,
            maxWidth: 560,
            fontSize: 17,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.62)",
          }}
        >
          The same three ideas from the cinematic opening remain, but now they
          work as a tighter statement — so visitors reach proof, projects, and
          contact faster.
        </p>
      </motion.div>

      <div
        style={{
          marginTop: 60,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {approachScenes.map((scene, index) => (
          <motion.div
            key={scene.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...transition, delay: index * 0.1 }}
            style={{
              minHeight: 520,
              position: "relative",
              overflow: "hidden",
              background: "#111",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(event) => {
              const image = event.currentTarget.querySelector("img");
              if (image) {
                image.style.filter = "grayscale(0%) brightness(0.9)";
                image.style.transform = "scale(1.045)";
              }
            }}
            onMouseLeave={(event) => {
              const image = event.currentTarget.querySelector("img");
              if (image) {
                image.style.filter = "grayscale(100%) brightness(0.76)";
                image.style.transform = "scale(1)";
              }
            }}
          >
            <Image
              src={scene.image}
              alt={scene.title}
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
              style={{
                objectFit: "cover",
                filter: "grayscale(100%) brightness(0.76)",
                transition:
                  "filter 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(5,5,5,0.92), rgba(5,5,5,0.38), rgba(5,5,5,0.08))",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: 30,
                right: 30,
                bottom: 34,
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.62)",
                }}
              >
                0{index + 1} · {scene.label}
              </div>

              <h3
                style={{
                  margin: "16px 0 0",
                  fontSize: "clamp(30px, 3vw, 44px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.055em",
                  fontWeight: 900,
                }}
              >
                {scene.title}
              </h3>

              <p
                style={{
                  margin: "20px 0 0",
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.72)",
                }}
              >
                {scene.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const HomeRegionalReachTeaser = () => (
  <section
    className="mobilePad"
    style={{
      padding: "105px 0",
      background: "#050505",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <div
      className="containerWide mobileStack"
      style={{
        display: "grid",
        gridTemplateColumns: "0.9fr 1.1fr",
        gap: 60,
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={transition}
      >
        <div
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontSize: 12,
            opacity: 0.6,
          }}
        >
          Regional Reach
        </div>

        <h2
          style={{
            marginTop: 18,
            fontSize: "clamp(34px, 4vw, 56px)",
            lineHeight: 1.02,
            letterSpacing: "-0.05em",
            fontWeight: 900,
          }}
        >
          Kigali based.
          <br />
          East & Central Africa focused.
        </h2>

        <p
          style={{
            margin: "28px 0 0",
            maxWidth: 620,
            fontSize: 18,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.64)",
          }}
        >
          IMVO supports projects across Rwanda, Uganda, Kenya, Tanzania,
          Burundi, DRC, Zambia, Angola, and selected parts of Mozambique.
        </p>

        <Link
          href="/about"
          style={{
            display: "inline-block",
            marginTop: 30,
            color: "white",
            textDecoration: "none",
            borderBottom: "1px solid white",
            paddingBottom: 5,
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "0.05em",
          }}
        >
          EXPLORE THE STUDIO ↗
        </Link>
      </motion.div>

      <StudioStatus />
    </div>
  </section>
);
export default function HomePage() {
  return (
    <div style={{ background: "#050505", color: "white", overflow: "hidden" }}>
      {/* 1. NATIVE STICKY HERO */}
      <ClientOnly>
        <CinematicHero />
      </ClientOnly>
      <HomeRegionalReachTeaser />
      {/* The rest of the page flows naturally underneath */}
      <div style={{ position: "relative", zIndex: 10, background: "#050505" }}>
        {/* 1.5 DUAL INFINITE MARQUEE */}
        <section
          style={{
            padding: "24px 0",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            overflow: "hidden",
            background: "#050505",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <motion.div
            animate={{ x: [0, "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              width: "fit-content",
            }}
          >
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4vw",
                  paddingRight: "4vw",
                }}
              >
                {[
                  "SPATIAL CLARITY",
                  "CONTEXTUAL SENSITIVITY",
                  "TECHNICAL DISCIPLINE",
                  "EXECUTION AWARENESS",
                  "LONG-TERM VALUE",
                  "PURPOSEFUL DEVELOPMENT",
                ].map((word, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4vw",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.25em",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {word}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.15)",
                      }}
                    >
                      ✦
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>

          <motion.div
            animate={{ x: ["-50%", 0] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              width: "fit-content",
            }}
          >
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4vw",
                  paddingRight: "4vw",
                }}
              >
                {[
                  "RESIDENTIAL",
                  "COMMERCIAL",
                  "INSTITUTIONAL",
                  "LIFESTYLE-CENTRIC AESTHETICS",
                  "HOSPITALITY",
                  "URBANISM",
                ].map((word, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4vw",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        color: "rgba(255,255,255,0.25)",
                      }}
                    >
                      {word}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.1)",
                      }}
                    >
                      ✦
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </section>

        <ProjectIntelligence />
        <ApproachPrinciples />

        {/* 2. MANIFESTO */}
        <section className="mobilePad" style={{ padding: "80px 0 120px 0" }}>
          <div className="containerWide">
            <div
              style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={transition}
              >
                <div
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontSize: 12,
                    opacity: 0.6,
                  }}
                >
                  Architectural Approach
                </div>
                <h2
                  style={{
                    marginTop: 20,
                    fontSize: "clamp(36px, 5vw, 64px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.04em",
                    fontWeight: 900,
                  }}
                >
                  Architecture is not decoration.
                  <br />
                  It is structure, context,
                  <br />
                  proportion, and long-term value.
                </h2>
                <p
                  style={{
                    margin: "30px auto 0",
                    maxWidth: 700,
                    fontSize: 18,
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  IMVO develops environments through disciplined design
                  thinking, technical coordination, and construction awareness.
                </p>
              </motion.div>

              <motion.div
                className="mobileStackCenter"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ ...transition, delay: 0.2 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "40px",
                  flexWrap: "wrap",
                  marginTop: 80,
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  paddingTop: 60,
                }}
              >
                {[
                  { from: 2000, to: 2017, suffix: "", label: "Founded" },
                  { from: 0, to: 40, suffix: "+", label: "Projects" },
                  {
                    from: 0,
                    to: 4,
                    suffix: "",
                    label: "Core disciplines",
                    pad: true,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{ textAlign: "center", minWidth: 140 }}
                  >
                    <AnimatedNumber
                      from={item.from}
                      to={item.to}
                      suffix={item.suffix}
                      pad={item.pad}
                    />
                    <div
                      style={{
                        fontSize: 13,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "rgba(255,255,255,0.5)",
                        marginTop: 8,
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}

                <div style={{ textAlign: "center", minWidth: 140 }}>
                  <div
                    style={{
                      fontSize: 42,
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    RW / EA
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.5)",
                      marginTop: 8,
                    }}
                  >
                    Regional focus
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. PORTFOLIO SLIDER */}
        <ClientOnly>
          <PortfolioSlider />
        </ClientOnly>

        {/* 3.5 ON THE BOARDS */}
        <section
          className="mobilePad"
          style={{
            padding: "120px 0",
            background: "#080808",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="containerWide">
            <motion.div
              className="mobileStack"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={transition}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: 30,
              }}
            >
              <div>
                <div
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 700,
                  }}
                >
                  In Progress
                </div>
                <h2
                  style={{
                    fontSize: "clamp(32px, 4vw, 54px)",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    margin: "10px 0 0",
                  }}
                >
                  On the boards.
                </h2>
              </div>
              <p
                style={{
                  maxWidth: 400,
                  margin: 0,
                  fontSize: 16,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7,
                }}
              >
                A look at conceptual studies, wireframes, and developments
                currently taking shape in the studio.
              </p>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 40,
                marginTop: 60,
              }}
            >
              {inProgressProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...transition, delay: index * 0.15 }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "4/3",
                      overflow: "hidden",
                      background: "#111",
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      style={{
                        objectFit: "cover",
                        filter: "grayscale(100%) contrast(1.1) brightness(0.8)",
                        transition: "filter 0.5s ease, transform 0.5s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter =
                          "grayscale(0%) contrast(1) brightness(1)";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter =
                          "grayscale(100%) contrast(1.1) brightness(0.8)";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 20,
                        left: 20,
                        background: "rgba(0,0,0,0.8)",
                        padding: "6px 12px",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      Active Study
                    </div>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <div
                      style={{
                        fontSize: 12,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {project.type}
                    </div>
                    <h3
                      style={{ margin: "8px 0", fontSize: 22, fontWeight: 800 }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 15,
                        color: "rgba(255,255,255,0.7)",
                        lineHeight: 1.6,
                      }}
                    >
                      {project.concept}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. SERVICES */}
        <section
          className="mobilePad"
          style={{ padding: "120px 0", background: "#0a0a0a" }}
        >
          <div className="containerWide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={transition}
              style={{ maxWidth: 800 }}
            >
              <div
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: 12,
                  opacity: 0.6,
                }}
              >
                Services
              </div>
              <h2
                style={{
                  marginTop: 20,
                  fontSize: "clamp(36px, 5vw, 64px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  fontWeight: 900,
                }}
              >
                Three pillars from vision to execution.
              </h2>
            </motion.div>

            <div
              style={{
                marginTop: 80,
                display: "flex",
                flexDirection: "column",
                gap: 40,
              }}
            >
              {[
                [
                  "01",
                  "Architectural Design",
                  "Concept development, spatial planning, residential and commercial design, documentation, and planning-oriented architectural solutions.",
                ],
                [
                  "02",
                  "Consultancy",
                  "Feasibility guidance, architectural advisory, project development support, regulatory awareness, and strategic decision-making.",
                ],
                [
                  "03",
                  "Supervision",
                  "Site monitoring, quality assurance, design implementation oversight, and coordination between client, consultants, and contractors.",
                ],
              ].map(([number, title, text], index) => (
                <motion.div
                  key={title}
                  className="mobileStack"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ ...transition, delay: index * 0.1 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 1.5fr",
                    gap: 40,
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    paddingTop: 40,
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 900,
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    {number}
                  </div>
                  <h3 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: 18,
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.6)",
                      margin: 0,
                    }}
                  >
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ marginTop: 60 }}
            >
              <Link
                href="/services"
                style={{
                  background: "white",
                  color: "black",
                  padding: "14px 28px",
                  borderRadius: 99,
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Explore Services
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 5. TEAM */}
        <section className="mobilePad" style={{ padding: "120px 0" }}>
          <div className="containerWide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={transition}
            >
              <div
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: 12,
                  opacity: 0.6,
                }}
              >
                Team
              </div>
              <h2
                style={{
                  marginTop: 20,
                  fontSize: "clamp(36px, 5vw, 64px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  fontWeight: 900,
                }}
              >
                A studio shaped by collaboration,
                <br />
                technical focus, and shared responsibility.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={transition}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio:
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? "4/5"
                    : "21/9",
                marginTop: 60,
                overflow: "hidden",
                background: "#111",
              }}
            >
              <Image
                src="/team.png"
                alt="IMVO office team photo"
                fill
                sizes="100vw"
                style={{
                  objectFit:
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? "cover"
                      : "contain",
                  objectPosition: "center top",
                  filter: "grayscale(100%)",
                }}
              />
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 40,
                marginTop: 40,
              }}
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...transition, delay: index * 0.1 }}
                >
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "3/4",
                      background: "#111",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(5,5,5,0.9)",
                        padding: 30,
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "0")
                      }
                    >
                      <p
                        style={{
                          fontSize: 14,
                          lineHeight: 1.7,
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        {member.description}
                      </p>
                    </div>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>
                      {member.name}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.5)",
                        margin: "4px 0 0",
                      }}
                    >
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CTA */}
        <section
          className="mobilePad"
          style={{
            padding: "100px 0",
            background: "#111",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="containerWide mobileStack"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 40,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={transition}
              style={{ maxWidth: 600 }}
            >
              <div
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: 12,
                  opacity: 0.6,
                }}
              >
                Start a conversation
              </div>
              <h2
                style={{
                  marginTop: 16,
                  fontSize: "clamp(36px, 4vw, 54px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  fontWeight: 900,
                }}
              >
                Let’s shape an environment that endures.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...transition, delay: 0.2 }}
            >
              <Link
                href="/contact#quote"
                style={{
                  background: "white",
                  color: "black",
                  padding: "16px 32px",
                  borderRadius: 99,
                  fontWeight: 800,
                  fontSize: 15,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Request a Quote
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
