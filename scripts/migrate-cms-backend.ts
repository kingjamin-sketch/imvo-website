import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72) || "item";

const keyed = <T extends Record<string, unknown>>(prefix: string, items: T[]) =>
  items.map((item, index) => ({ ...item, _key: `${prefix}-${index + 1}` }));

type LegacyTeamMember = {
  name?: string;
  role?: string;
  description?: string;
  image?: Record<string, unknown>;
};

type LegacyTestimonial = {
  text?: string;
  author?: string;
  date?: string;
};

async function migrateTeamAndTestimonials() {
  const [home, about] = await Promise.all([
    client.fetch<{ teamMembers?: LegacyTeamMember[] } | null>(
      `*[_id == "homePage"][0]{teamMembers[]{name, role, description, image}}`,
    ),
    client.fetch<{
      teamMembers?: LegacyTeamMember[];
      testimonials?: LegacyTestimonial[];
    } | null>(
      `*[_id == "aboutPage"][0]{teamMembers[]{name, role, description, image}, testimonials[]{text, author, date}}`,
    ),
  ]);

  const sourceMembers = home?.teamMembers?.length
    ? home.teamMembers
    : about?.teamMembers || [];
  const seen = new Set<string>();

  for (const [index, member] of sourceMembers.entries()) {
    if (!member.name) continue;
    const key = slugify(member.name);
    if (seen.has(key)) continue;
    seen.add(key);

    await client.createIfNotExists({
      _id: `teamMember-${key}`,
      _type: "teamMember",
      name: member.name,
      role: member.role || "IMVO Group",
      description: member.description,
      image: member.image,
      active: true,
      order: (index + 1) * 10,
    });
  }

  for (const [index, testimonial] of (about?.testimonials || []).entries()) {
    if (!testimonial.text || !testimonial.author) continue;
    const key = slugify(`${testimonial.author}-${testimonial.text.slice(0, 36)}`);
    await client.createIfNotExists({
      _id: `testimonial-${key}`,
      _type: "testimonial",
      quote: testimonial.text,
      author: testimonial.author,
      source: testimonial.date,
      active: true,
      featured: index < 3,
      order: (index + 1) * 10,
    });
  }
}

async function seedDomicileMarketingContent() {
  await client.createIfNotExists({
    _id: "domicilePage",
    _type: "domicilePage",
    heroEyebrow: "PROPERTY MANAGEMENT · KIGALI",
    heroHeading: "Your property,\nhandled.",
    heroLead:
      "One dependable local point of contact for property oversight, maintenance, owner-away care and follow-through.",
    primaryCtaLabel: "START AN ENQUIRY",
    secondaryCtaLabel: "UNDERSTAND DŌMICILE",
    explainedQuote:
      "You should not need six conversations to know what happened at your own property.",
    explainedHeading: "What DŌMICILE actually does.",
    explainedLead:
      "DŌMICILE is the local operating layer between you and everything that needs attention at your property. Instead of coordinating inspectors, technicians, repairs, access and updates separately, you have one responsible point of contact.",
    explanationItems: keyed("domicile-explained", [
      {
        number: "01",
        title: "We understand the property",
        text: "We establish the home, access arrangements, priorities, contacts and the level of authority you want DŌMICILE to hold.",
      },
      {
        number: "02",
        title: "We become the local point of contact",
        text: "Routine checks, technicians, repairs and property matters move through one responsible desk instead of several disconnected conversations.",
      },
      {
        number: "03",
        title: "You approve what matters",
        text: "Costs, works and decisions that require your authority stay visible and are confirmed before action, except where agreed emergency authority applies.",
      },
      {
        number: "04",
        title: "You keep the record",
        text: "Photos, notes, reports, approvals and completed matters stay connected to the same property so you can see what happened and what comes next.",
      },
    ]),
    careHeading: "The property stays visible. The coordination stays quiet.",
    careText:
      "Photography is part of the record—not decoration. The home, the issue, the work and the follow-up remain easy to understand.",
    ownerHeading: "Visibility without chasing updates.",
    ownerText: "See what happened, what needs approval and what comes next.",
    propertiesHeading: "Real homes. Quietly looked after.",
    propertiesText:
      "These visual examples show the kind of residential environments DŌMICILE is designed to care for.",
    propertyStories: keyed("domicile-property", [
      {
        number: "01",
        title: "Private residence",
        status: "ROUTINE CARE ACTIVE",
        copy: "Scheduled checks, issue follow-through and one clear local contact for the owner.",
      },
      {
        number: "02",
        title: "Residential estate",
        status: "INSPECTION SCHEDULED",
        copy: "Property readiness, maintenance coordination and owner visibility kept in one place.",
      },
      {
        number: "03",
        title: "Private home",
        status: "OWNER-AWAY CARE",
        copy: "Local presence while the owner is away, with private reporting and direct escalation when needed.",
      },
    ]),
    trustHeading: "Property care with built-environment thinking behind it.",
    trustText:
      "DŌMICILE combines day-to-day property coordination with IMVO Group’s design, technical and built-environment perspective.",
    enquiryHeading: "Tell us about your property.",
    enquiryText:
      "This is an enquiry, not a registration. We’ll contact you to understand the property and what you need.",
    email: "domicile@imvogroup.com",
    phone: "+250 799 409 409",
    location: "KIGALI · RWANDA",
    seoTitle: "DŌMICILE | Property Management",
    seoDescription:
      "DŌMICILE is property management by IMVO Group for owners who want one reliable point of contact for the ongoing care, maintenance and coordination of their property in Kigali, Rwanda.",
    noIndex: false,
  });

  const domicileFaqs = [
    [
      "Do I need to live outside Rwanda?",
      "No. DŌMICILE is for owners abroad, frequent travellers and Kigali-based owners who want reliable delegated property care.",
    ],
    [
      "Can you manage one property only?",
      "Yes. The service can be shaped around one home, several properties or a defined one-off need.",
    ],
    [
      "How are repairs approved?",
      "The approval process is agreed during onboarding. Work requiring owner approval does not proceed until authority is confirmed.",
    ],
    [
      "What happens if something is urgent?",
      "The matter is triaged, the owner is contacted and DŌMICILE acts within any pre-agreed emergency authority where applicable.",
    ],
    [
      "Will my property appear on the website?",
      "No, not by default. Client properties and identifying information are public only when the owner has explicitly agreed.",
    ],
    [
      "Which areas do you serve?",
      "DŌMICILE is currently focused on properties across Kigali, Rwanda.",
    ],
  ];

  for (const [index, [question, answer]] of domicileFaqs.entries()) {
    await client.createIfNotExists({
      _id: `faq-domicile-${index + 1}`,
      _type: "faq",
      question,
      answer,
      scope: "domicile",
      active: true,
      order: (index + 1) * 10,
    });
  }
}

async function seedStudioStatus() {
  await client.createIfNotExists({
    _id: "studioStatus",
    _type: "studioStatus",
    timezone: "Africa/Kigali",
    weeklySchedule: keyed("studio-day", [
      { day: "monday", label: "Monday", enabled: true, openTime: "08:00", closeTime: "18:00" },
      { day: "tuesday", label: "Tuesday", enabled: true, openTime: "08:00", closeTime: "18:00" },
      { day: "wednesday", label: "Wednesday", enabled: true, openTime: "08:00", closeTime: "18:00" },
      { day: "thursday", label: "Thursday", enabled: true, openTime: "08:00", closeTime: "18:00" },
      { day: "friday", label: "Friday", enabled: true, openTime: "08:00", closeTime: "18:00" },
      { day: "saturday", label: "Saturday", enabled: false, openTime: "08:00", closeTime: "18:00" },
      { day: "sunday", label: "Sunday", enabled: false, openTime: "08:00", closeTime: "18:00" },
    ]),
    dateOverrides: [],
    specialNotices: [],
    openMessages: [
      "The Kigali studio is open and project conversations are welcome.",
      "Design, planning and coordination are active across the studio.",
      "New project inquiries are being routed to the team.",
    ],
    closedMessages: [
      "Studio closed. New inquiries will be reviewed on the next working day.",
      "After-hours inquiries are welcome and remain safely routed to IMVO.",
    ],
    weekendMessages: [
      "Weekend schedule. New project inquiries are still received.",
      "The team returns on the next working day.",
    ],
    openingSoonMessages: [
      "Opening soon. The Kigali studio starts at 08:00 CAT.",
    ],
  });
}

async function main() {
  await migrateTeamAndTestimonials();
  await seedDomicileMarketingContent();
  await seedStudioStatus();

  console.log("CMS backend migration complete.");
  console.log("Review Studio Status date overrides before relying on holiday automation.");
  console.log("DŌMICILE media fields intentionally remain on existing coded fallbacks until approved assets are uploaded in Studio.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
