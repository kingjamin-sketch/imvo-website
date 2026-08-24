"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LazyMotion, m } from "framer-motion";
import HeroRotatingVideo from "./components/HeroRotatingVideo";
import PortfolioSlider from "./components/PortfolioSlider";
import type { Project } from "./projects/projectsData";
import type { HomePageContent } from "@/sanity/types/siteContent";

const loadHomeMotionFeatures = () =>
  import("./components/homeMotionFeatures").then((module) => module.default);

const ArchitecturalDrawingLines = () => (
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      inset: "-18% -8%",
      zIndex: 3,
      pointerEvents: "none",
      opacity: 0.62,
      mixBlendMode: "screen",
    }}
  >
    <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="none">
      <defs>
        <pattern id="imvo-team-grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
        <linearGradient id="imvo-line-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.42)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <rect width="1200" height="700" fill="url(#imvo-team-grid)" />

      {[0, 1, 2, 3].map((item) => (
        <m.path
          key={`team-plan-line-${item}`}
          d={`M ${-120 + item * 45} ${150 + item * 86} L ${1320 - item * 70} ${95 + item * 115}`}
          stroke="url(#imvo-line-fade)"
          strokeWidth={item === 0 ? 2 : 1}
          strokeDasharray={item % 2 === 0 ? "12 18" : "5 14"}
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: [0, 0.75, 0.28] }}
          viewport={{ once: false }}
          transition={{ duration: 7 + item * 1.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: item * 0.45 }}
        />
      ))}

      <m.path
        d="M 150 560 C 330 420 520 458 700 330 S 1040 220 1160 115"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1.2"
        strokeDasharray="7 12"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      <m.rect
        x="780"
        y="120"
        width="250"
        height="180"
        fill="none"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1.4 }}
      />

      <m.circle
        cx="245"
        cy="255"
        r="118"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
        strokeDasharray="8 14"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 0.7 }}
      />
    </svg>
  </div>
);

const teamMembers = [
  {
    name: "ASINGIZWE Benjamin Marie  Merci",
    role: "Built Environment Design & Development Lead",
    image: "/team1.png",
    description:
      "Leads spatial strategy, concept design, and development direction with a commitment to contextually integrated, sustainable, and enduring environments.",
  },
  {
    name: "SHEMA BAMBI Antonella M.",
    role: "Strategy & Digital Systems Lead",
    image: "/team2.png",
    description:
      "Combines expertise in IT development, strategic consultancy, and project coordination to bridge technology, operations, and business strategy—supporting digital systems, client advisory, operational planning, and data-informed development decisions that create long-term value.",
  },
  {
    name: "RUKUNDO Prince",
    role: "Technical Delivery Lead",
    image: "/team3.png",
    description:
      "Experienced in civil engineering, infrastructure systems, and urbanism, with a focus on technical coordination, project execution, coordinated delivery, and planning-oriented solutions that support sustainable and resilient development.",
  },
  {
    name: "KANGWAGYE Sharon",
    role: "Project Coordination & Growth Lead",
    image: "/team4.png",
    description:
      "Experienced in digital commerce, market strategy, and growth coordination, with a focus on strategic planning, market insight, operational alignment, and the development of initiatives that create sustainable competitive advantage.",
  },
];

const inProgressProjects = [
  {
    title: "INZIIRA ESTATE Development",
    type: "Residential Masterplan",
    concept: "Elevated foundations responding to wetland topography.",
    image: "/project-22.jpg",
  },
  {
    title: "VILLA LUME",
    type: "Sports Infrastructure",
    concept: "Crown-themed stadium concept and spatial identity.",
    image: "/project-10.png",
  },
  {
    title: "Amafu apartment Experience",
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
    text: "Turning ambition into a clear development path across design, planning, site coordination, and delivery strategy.",
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
  "2026-06-21": "Father's Day",
  "2026-07-01": "Independence Day",
  "2026-07-04": "Liberation Day",
  "2026-08-01": "Umuganura Day",
  "2026-08-16": "Assumption Day",
  "2026-12-26": "Christmas Day",
  "2026-12-27": "Boxing Day",
};

const openHourMessages: Record<number, string[]> = {
 8: [
"Good morning. The studio is open and the day is taking shape.",
"Fresh ideas, fresh coffee, and a full day of design ahead.",
"Morning planning is underway across active projects.",
"The first sketches of the day are finding their direction.",
"Today's priorities are being mapped out in Kigali.",
"A new day of architecture, planning, and development begins.",
"The studio is awake. Let's build something meaningful today.",
"Design conversations are starting across the team.",
],

9: [
"Project reviews are active. New inquiries are welcome.",
"The studio is fully in motion this morning.",
"Design discussions are setting the direction for the day.",
"Briefs, sites, and opportunities are being explored.",
"Ideas are becoming clearer with every conversation.",
"The day's momentum is building across active projects.",
"Research, strategy, and creativity are working together.",
"The team is turning questions into solutions.",
],

10: [
"Research, planning, and design development are underway.",
"Site context and project goals are being carefully aligned.",
"Good projects begin with the right questions.",
"Concepts are becoming clearer with every review.",
"The team is shaping ideas before they become drawings.",
"Design decisions are being tested and refined.",
"Architecture starts long before construction begins.",
"Vision is being translated into practical direction.",
],

11: [
"The studio is active. Plans, meetings, and coordination continue.",
"Drawings are progressing while strategies are refined.",
"A good time to discuss your project vision.",
"Design development is gaining momentum.",
"Ideas are moving steadily toward implementation.",
"Site planning and technical reviews are underway.",
"The morning's work is taking visible shape.",
"Collaboration is driving progress across the studio.",
],

12: [
"Midday review is underway. The studio remains available.",
"Lunch hour for some, design thinking for everyone.",
"Projects continue moving between meetings and meals.",
"Taking a short pause while keeping long-term visions in focus.",
"The afternoon is already beginning to take shape.",
"Ideas don't stop for lunch, and neither do project goals.",
"The studio remains open while the team recharges.",
"Halfway through the day, with plenty still ahead.",
],

13: [
"The team is back in full rhythm for the afternoon.",
"Fresh energy is driving the next round of project decisions.",
"Design development and coordination continue across the studio.",
"The afternoon session is focused and productive.",
"New inquiries and consultations are welcome.",
"Concepts are advancing into clearer project outcomes.",
"The workday continues with purpose and momentum.",
"Projects are moving steadily toward their next milestones.",
],

14: [
"Drawings, reviews, and project coordination are in motion.",
"Architecture happens through thousands of thoughtful decisions.",
"The studio is translating ideas into actionable plans.",
"Design ambition is being matched with technical clarity.",
"Progress is building across active projects.",
"Project teams are refining details and priorities.",
"Good design is the result of careful coordination.",
"Every revision brings the vision closer to reality.",
],

15: [
"The day's work is reaching its most productive stretch.",
"Project strategies are becoming clearer and more refined.",
"Site conditions, feasibility, and design goals are being aligned.",
"Good planning today creates better outcomes tomorrow.",
"Consultations and project reviews remain open.",
"The studio is balancing creativity with execution.",
"Key decisions are shaping the future of active projects.",
"Progress is measured one thoughtful step at a time.",
],

16: [
"Late-afternoon reviews are underway.",
"The studio is refining details and preparing next steps.",
"Final decisions are being shaped before the day concludes.",
"Progress continues across architecture, planning, and development.",
"Today's work is being organized into tomorrow's momentum.",
"The team is closing loops and clarifying priorities.",
"Project updates and final reviews are in progress.",
"Attention is shifting from ideas to action plans.",
],

17: [
"Closing soon. Final reviews are being completed.",
"The studio is wrapping up today's progress.",
"Last conversations, last checks, and next steps.",
"Today's ideas are being prepared for tomorrow's action.",
"Thank you for spending part of your day with us.",
"The workday is ending, but the projects continue forward.",
"Final notes are being shared before the studio closes.",
"Tomorrow's opportunities are already taking shape.",
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
        `Happy ${holidayToday}. We resume on the next working day.`,
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
    <m.div
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
    </m.div>
  );
}

const ProjectIntelligence = ({ content }: { content?: HomePageContent | null }) => {
  const items = content?.intelligenceItems?.length
    ? content.intelligenceItems.map((item) => ({
        title: item.title || "Project insight",
        text: item.text || "",
      }))
    : projectIntelligenceItems;

  return (
  <section
    className="mobilePad"
    style={{
      padding: "96px 0",
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
      <m.div
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
            {content?.intelligenceKicker || "Project Intelligence"}
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
            <span style={{ whiteSpace: "pre-line" }}>
              {content?.intelligenceHeading || "Better decisions\nbefore design."}
            </span>
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
          {content?.intelligenceText || "Before drawings, approvals, and construction costs begin, IMVO helps clients understand land, context, feasibility, and project direction so resources are committed with clarity."}
        </p>
      </m.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
          marginTop: 70,
        }}
      >
        {items.map((item, index) => (
          <m.div
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
          </m.div>
        ))}
      </div>
    </div>
  </section>
  );
};

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
  // Render the verified final value in the initial HTML for search engines,
  // then begin the approved count-up animation after hydration.
  const [value, setValue] = useState(to);

  useEffect(() => {
    let animationFrame = 0;

    const kickoffFrame = requestAnimationFrame(() => {
      setValue(from);
      const duration = 10000;
      const start = performance.now();

      const animate = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(from + (to - from) * eased));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
    });

    return () => {
      cancelAnimationFrame(kickoffFrame);
      cancelAnimationFrame(animationFrame);
    };
  }, [from, to]);

  const formatted = pad ? String(value).padStart(2, "0") : String(value);
  const finalFormatted = pad ? String(to).padStart(2, "0") : String(to);

  return (
    <div
      aria-label={`${finalFormatted}${suffix}`}
      data-final-value={`${finalFormatted}${suffix}`}
      style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-0.04em" }}
    >
      <span aria-hidden="true">
        {formatted}
        {suffix}
      </span>
    </div>
  );
}

// --- CINEMATIC HERO + COMPACT APPROACH ---
const approachScenes = [
  {
    label: "DESIGN",
    title: "Spatial clarity before form.",
    text: "Every line begins with purpose, proportion, context, and buildable intent.",
    image: "/chosen/horizon-frame.png",
  },
  {
    label: "STRATEGY",
    title: "Better decisions before construction.",
    text: "We connect design ambition with feasibility, planning, risk, and development value.",
    image: "/chosen/meridian-residence.png",
  },
  {
    label: "EXECUTION",
    title: "Design value protected on site.",
    text: "From concept to site delivery, IMVO keeps the work disciplined, coordinated, and accountable.",
    image: "/p01-01.png",
  },
];

function CinematicHero({ content }: { content?: HomePageContent | null }) {
  const [isHeroContentReady, setIsHeroContentReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsHeroContentReady(true), 420);
    return () => window.clearTimeout(timer);
  }, []);

  const rawHeroKicker = content?.heroKicker?.trim();
  const rawHeroIntro = content?.heroIntro?.trim();
  const heroKicker =
    rawHeroKicker && !/INTELLECTU.*MENS.*VISIO.*ORIGO/i.test(rawHeroKicker)
      ? rawHeroKicker
      : "BUILT ENVIRONMENT DESIGN & DEVELOPMENT";
  const heroLead =
    rawHeroIntro &&
    !/^(IMVO develops residential, commercial, and institutional environments|We shape enduring environments through design)/i.test(
      rawHeroIntro,
    )
      ? rawHeroIntro
      : "IMVO shapes residential, commercial, and institutional environments through built-environment design, development strategy, site coordination, and execution-aware planning.";
  const heroSupport =
    "Guided by spatial clarity, contextual sensitivity, technical discipline, and long-term architectural value.";
  const heroButtonLabel = (content?.heroButtonLabel || "EXPLORE WORK")
    .replace(/[↗→]/g, "")
    .trim();

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background:
          "radial-gradient(circle at 72% 18%, #1b2330 0%, #0c0f14 38%, #050505 72%)",
        overflow: "hidden",
      }}
    >
      <HeroRotatingVideo />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.80) 0%, rgba(5,5,5,0.52) 38%, rgba(5,5,5,0.14) 68%, rgba(5,5,5,0.02) 100%), linear-gradient(to top, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.20) 54%, rgba(5,5,5,0.03) 100%)",
          pointerEvents: "none",
          opacity: isHeroContentReady ? 1 : 0,
          transition: "opacity 700ms ease",
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
          paddingBottom: "14vh",
          opacity: isHeroContentReady ? 1 : 0,
          transition: "opacity 700ms ease",
        }}
      >
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroContentReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ ...transition, delay: 0.2 }}
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 800,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          {heroKicker}
        </m.div>

        <m.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroContentReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ ...transition, delay: 0.4 }}
          style={{
            marginTop: 20,
            marginBottom: 0,
            maxWidth: 860,
            fontSize: "clamp(21px, 2vw, 29px)",
            fontWeight: 430,
            lineHeight: 1.46,
            letterSpacing: "-0.015em",
            color: "rgba(255,255,255,0.94)",
          }}
        >
          {heroLead}
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 22 }}
          animate={isHeroContentReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ ...transition, delay: 0.52 }}
          style={{
            margin: "16px 0 0",
            maxWidth: 760,
            fontSize: "clamp(14px, 1.15vw, 17px)",
            lineHeight: 1.65,
            fontWeight: 430,
            letterSpacing: "-0.008em",
            color: "rgba(255,255,255,0.68)",
          }}
        >
          {heroSupport}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroContentReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ ...transition, delay: 0.6 }}
          style={{ marginTop: 30 }}
        >
          <Link
            href="/projects"
            style={{
              width: 220,
              minHeight: 56,
              padding: "0 20px",
              border: "1px solid rgba(255,255,255,0.96)",
              borderRadius: 2,
              background: "rgba(255,255,255,0.98)",
              color: "#050505",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 12,
              fontWeight: 850,
              letterSpacing: "0.075em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "0 14px 34px rgba(0,0,0,0.16)",
            }}
          >
            {heroButtonLabel}
          </Link>
        </m.div>
      </div>
    </section>
  );
}

const ApproachPrinciples = ({ content }: { content?: HomePageContent | null }) => {
  const scenes = content?.principles?.length
    ? content.principles.map((scene, index) => ({
        label: scene.label || `PRINCIPLE ${index + 1}`,
        title: scene.title || "Purposeful design",
        text: scene.text || "",
        image: scene.image?.url || approachScenes[index]?.image || "/p01-01.png",
      }))
    : approachScenes;

  return (
  <section
    className="mobilePad"
    style={{
      padding: "88px 0",
      background: "#050505",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      overflow: "hidden",
    }}
  >
    <div className="containerWide">
      <m.div
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
            {content?.principlesKicker || "Studio Principles"}
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
            <span style={{ whiteSpace: "pre-line" }}>
              {content?.principlesHeading || "Design, strategy,\nand execution."}
            </span>
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
          {content?.principlesText || "Design, strategy, and execution work as one — moving every project from early vision toward coordinated, buildable, and enduring outcomes."}
        </p>
      </m.div>

      <div
        style={{
          marginTop: 60,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {scenes.map((scene, index) => (
          <m.div
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
          </m.div>
        ))}
      </div>
    </div>
  </section>
  );
};

const HomeRegionalReachTeaser = ({ content }: { content?: HomePageContent | null }) => (
  <section
    className="mobilePad"
    style={{
      padding: "92px 0",
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
      <m.div
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
          {content?.regionalKicker || "Regional Reach"}
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
          <span style={{ whiteSpace: "pre-line" }}>
            {content?.regionalHeading || "Kigali based.\nEast & Central Africa focused."}
          </span>
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
          {content?.regionalText || "IMVO supports projects across Rwanda, Uganda, Kenya, Tanzania, Burundi, DRC, Zambia, Angola, and selected parts of Mozambique."}
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
      </m.div>

      <StudioStatus />
    </div>
  </section>
);
export default function HomePageClient({
  content,
  featuredProjects,
}: {
  content?: HomePageContent | null;
  featuredProjects?: Project[];
}) {
  const manualProgressProjects = content?.progressProjects?.length
    ? content.progressProjects.map((project, index) => ({
        title: project.title || "Project in progress",
        type: project.type || "Active study",
        concept: project.concept || "",
        image: project.image?.url || inProgressProjects[index]?.image || "/project-22.jpg",
        badge: "Active Study",
        href: "/projects",
      }))
    : inProgressProjects.map((project) => ({
        ...project,
        badge: "Active Study",
        href: "/projects",
      }));
  const featuredProgressProjects = (featuredProjects || []).map((project) => ({
    title: project.title,
    type: `${project.category} · ${project.location}`,
    concept: project.summary,
    image: project.cover,
    badge: project.status || "Featured Project",
    href: `/projects/${project.slug}`,
  }));
  const activeProgressProjects = [
    ...featuredProgressProjects,
    ...manualProgressProjects,
  ].slice(0, 3);
  const activeServices = content?.services?.length
    ? content.services.map((service, index) => [
        String(index + 1).padStart(2, "0"),
        service.title || "Service",
        service.text || "",
      ])
    : [
        ["01", "Built Environment Design", "Concept development, spatial planning, residential and commercial design, documentation, and context-aware spatial solutions."],
        ["02", "Consultancy", "Feasibility guidance, design advisory, project development support, regulatory awareness, and strategic decision-making."],
        ["03", "Site Coordination", "Site observation, quality review, design implementation support, and coordination between client, consultants, and contractors."],
      ];
  const activeTeamMembers = content?.teamMembers?.length
    ? content.teamMembers.map((member, index) => ({
        name: member.name || "IMVO team member",
        role: member.role || "Team member",
        description: member.description || "",
        image: member.image?.url || teamMembers[index]?.image || "/team1.png",
      }))
    : teamMembers;

  return (
    <LazyMotion features={loadHomeMotionFeatures} strict>
      <div style={{ background: "#050505", color: "white", overflow: "hidden" }}>
      {/* 1. NATIVE STICKY HERO */}
      <CinematicHero content={content} />
      <HomeRegionalReachTeaser content={content} />
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
          <m.div
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
          </m.div>

          <m.div
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
          </m.div>
        </section>

        <ProjectIntelligence content={content} />
        <ApproachPrinciples content={content} />

        {/* 2. MANIFESTO */}
        <section className="mobilePad" style={{ padding: "72px 0 96px 0" }}>
          <div className="containerWide">
            <div
              style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}
            >
              <m.div
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
                  {content?.manifestoKicker || "Architectural Approach"}
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
                  <span style={{ whiteSpace: "pre-line" }}>
                    {content?.manifestoHeading || "Architecture is not decoration.\nIt is structure, context,\nproportion, and long-term value."}
                  </span>
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
                  {content?.manifestoText || "IMVO develops environments through disciplined design thinking, technical coordination, and construction awareness."}
                </p>
              </m.div>

              <m.div
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
              </m.div>
            </div>
          </div>
        </section>

        {/* 3. PORTFOLIO SLIDER */}
        <PortfolioSlider />

        {/* 3.5 ON THE BOARDS */}
        <section
          className="mobilePad"
          style={{
            padding: "96px 0",
            background: "#080808",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="containerWide">
            <m.div
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
                  {content?.progressKicker || "In Progress"}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(32px, 4vw, 54px)",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    margin: "10px 0 0",
                  }}
                >
                  {content?.progressHeading || "On the boards."}
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
                {content?.progressText || "A look at conceptual studies, wireframes, and developments currently taking shape in the studio."}
              </p>
            </m.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 40,
                marginTop: 60,
              }}
            >
              {activeProgressProjects.map((project, index) => (
                <m.div
                  key={`${project.href}-${project.title}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...transition, delay: index * 0.15 }}
                >
                  <Link
                    href={project.href}
                    aria-label={`View ${project.title}`}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      display: "block",
                    }}
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
                        {project.badge}
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
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. SERVICES */}
        <section
          className="mobilePad"
          style={{ padding: "96px 0", background: "#0a0a0a" }}
        >
          <div className="containerWide">
            <m.div
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
                {content?.servicesKicker || "Services"}
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
                {content?.servicesHeading || "Three pillars from vision to execution."}
              </h2>
            </m.div>

            <div
              style={{
                marginTop: 80,
                display: "flex",
                flexDirection: "column",
                gap: 40,
              }}
            >
              {activeServices.map(([number, title, text], index) => (
                <m.div
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
                </m.div>
              ))}
            </div>

            <m.div
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
            </m.div>
          </div>
        </section>

        {/* 5. TEAM */}
        <section className="mobilePad" style={{ padding: "96px 0" }}>
          <div className="containerWide">
            <m.div
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
                {content?.teamKicker || "Team"}
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
                <span style={{ whiteSpace: "pre-line" }}>
                  {content?.teamHeading || "A studio shaped by collaboration,\ntechnical focus, and shared responsibility."}
                </span>
              </h2>
            </m.div>

            <m.div
              className="teamImageFrame"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={transition}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "21/9",
                marginTop: 60,
                overflow: "hidden",
                background: "#090909",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Image
                className="teamImage"
                src={content?.teamImage?.url || "/team.png"}
                alt={content?.teamImage?.alt || "IMVO office team photo"}
                fill
                sizes="100vw"
                style={{
                  objectFit: "contain",
                  objectPosition: "center top",
                  filter: "grayscale(100%) contrast(1.04) brightness(0.86)",
                }}
              />

              <ArchitecturalDrawingLines />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 4,
                  background:
                    "radial-gradient(circle at 25% 10%, rgba(255,255,255,0.1), transparent 28%), linear-gradient(to top, rgba(5,5,5,0.38), transparent 45%)",
                  pointerEvents: "none",
                }}
              />
            </m.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 40,
                marginTop: 40,
              }}
            >
              {activeTeamMembers.map((member, index) => (
                <m.div
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
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CTA */}
        <section
          className="mobilePad"
          style={{
            padding: "88px 0",
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
            <m.div
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
                {content?.ctaKicker || "Start a conversation"}
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
                <span style={{ whiteSpace: "pre-line" }}>
                  {content?.ctaHeading || "Let’s shape an environment that endures."}
                </span>
              </h2>
            </m.div>
            <m.div
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
                {content?.ctaButtonLabel || "Request a Quote"}
              </Link>
            </m.div>
          </div>
        </section>
      </div>
    </div>
    </LazyMotion>
  );
}
