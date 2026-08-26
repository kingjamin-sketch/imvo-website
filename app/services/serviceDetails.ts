import type { ServicesPageContent } from "@/sanity/types/siteContent";

export const SERVICE_SLUGS = ["design", "consultancy", "site-coordination"] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type ServiceDetail = {
  slug: ServiceSlug;
  index: number;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  imageAlt: string;
  includedServices: string[];
  valueHeading: string;
  valuePoints: Array<{ title: string; text: string }>;
  whatsappMessage: string;
};

const FALLBACKS: Record<ServiceSlug, Omit<ServiceDetail, "includedServices"> & { includedServices: string[] }> = {
  design: {
    slug: "design",
    index: 0,
    number: "01",
    title: "Built Environment Design",
    shortTitle: "Design",
    description:
      "We translate ambition into buildable environments through concept design, spatial planning, design documentation, and execution-aware detailing.",
    image: "/imvo-services-technical.webp",
    imageAlt: "IMVO built-environment design and technical development",
    includedServices: [
      "Concept Design",
      "Schematic Design",
      "Detailed Design",
      "Construction Documentation",
      "Interior & Spatial Design",
      "BIM Modeling",
      "3D Visualization",
      "Design Coordination",
      "Climate-Responsive Design",
      "Site & Landscape Integration",
    ],
    valueHeading: "From first idea to coordinated design intent.",
    valuePoints: [
      {
        title: "Clarity before complexity",
        text: "We establish the spatial logic, priorities, constraints, and design direction before detail begins to multiply.",
      },
      {
        title: "Context-led decisions",
        text: "Site, climate, access, planning conditions, use, and long-term value inform the design rather than being treated as afterthoughts.",
      },
      {
        title: "Execution-aware documentation",
        text: "Design development is coordinated with buildability and downstream technical requirements in mind.",
      },
    ],
    whatsappMessage: "Hello IMVO, I would like to discuss a built-environment design project.",
  },
  consultancy: {
    slug: "consultancy",
    index: 1,
    number: "02",
    title: "Consultancy & Strategy",
    shortTitle: "Consultancy",
    description:
      "Strategic guidance that reduces risk and unlocks development value — from site feasibility to zoning, development logic, and project positioning.",
    image: "/imvo-services-consultancy.webp",
    imageAlt: "IMVO consultancy, feasibility and development strategy",
    includedServices: [
      "Development Feasibility Studies",
      "Property Development Advisory",
      "Highest & Best Use Analysis",
      "Site Due Diligence",
      "Land Potential Assessment",
      "Urban Planning & Master Planning",
      "Construction Permit Applications",
      "Regulatory Compliance Reviews",
      "Consultant Coordination",
      "Technical Due Diligence",
    ],
    valueHeading: "Better decisions before capital is committed.",
    valuePoints: [
      {
        title: "Feasibility first",
        text: "We test development potential, constraints, planning realities, and project logic before unnecessary design or construction cost is created.",
      },
      {
        title: "Regulatory direction",
        text: "Zoning, permitting, authority requirements, and development compliance are considered as programme dependencies from the beginning.",
      },
      {
        title: "One coordinated view",
        text: "Design, technical, planning, procurement, and development questions are brought together so decisions are made with the wider project in view.",
      },
    ],
    whatsappMessage: "Hello IMVO, I would like to discuss consultancy, feasibility, or development strategy.",
  },
  "site-coordination": {
    slug: "site-coordination",
    index: 2,
    number: "03",
    title: "Site Coordination & Delivery",
    shortTitle: "Site Coordination",
    description:
      "We support design intent through disciplined site observation, contractor coordination, quality review, and implementation support.",
    image: "/imvo-services-coordination.webp",
    imageAlt: "IMVO site coordination and project delivery support",
    includedServices: [
      "Construction Coordination",
      "Site Observation",
      "Construction Monitoring",
      "Design Intent Review",
      "Technical Site Reviews",
      "Quality Review Support",
      "Material & Workmanship Review",
      "Progress Review Support",
      "Variation Assessment",
      "Snagging & Handover Coordination",
    ],
    valueHeading: "Keep the design, decisions, and site aligned.",
    valuePoints: [
      {
        title: "Design-intent continuity",
        text: "Site decisions are reviewed against the approved design direction so changes do not quietly erode the project.",
      },
      {
        title: "Visible coordination",
        text: "Issues, progress, workmanship concerns, and required decisions are surfaced clearly for the relevant project parties.",
      },
      {
        title: "Structured closeout",
        text: "Snagging, outstanding items, documentation review, and handover coordination help move the project toward a controlled finish.",
      },
    ],
    whatsappMessage: "Hello IMVO, I would like to discuss site coordination and project delivery support.",
  },
};

export function isServiceSlug(value: string): value is ServiceSlug {
  return SERVICE_SLUGS.includes(value as ServiceSlug);
}

export function getServiceDetail(
  slug: ServiceSlug,
  content?: ServicesPageContent | null,
): ServiceDetail {
  const fallback = FALLBACKS[slug];
  const pillar = content?.servicePillars?.[fallback.index];

  return {
    ...fallback,
    number: pillar?.number || fallback.number,
    title: pillar?.title || fallback.title,
    description: pillar?.description || fallback.description,
    includedServices: pillar?.services?.length
      ? pillar.services
      : fallback.includedServices,
  };
}

export function getOtherServices(slug: ServiceSlug) {
  return SERVICE_SLUGS.filter((item) => item !== slug).map((item) => FALLBACKS[item]);
}
