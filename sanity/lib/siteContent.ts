import { defineQuery } from "next-sanity";

import type {
  AboutPageContent,
  ContactPageContent,
  HomePageContent,
  LegalPageContent,
  ServicesPageContent,
  SiteSettings,
  TeamMember,
} from "../types/siteContent";
import { sanityClient } from "./client";

const SANITY_CONTENT_REVALIDATE_SECONDS = 300;

const imageProjection = `{
  alt,
  "url": asset->url + "?w=1920&fit=max&auto=format&q=78"
}`;

const siteSettingsQuery = defineQuery(`
  *[_id == "siteSettings"][0]{
    companyName, tagline, legalNotice, copyright, motto,
    generalEmail, projectsEmail, phone, location, mapUrl,
    socialLinks[]{label, url},
    seoTitle, seoDescription,
    shareImage${imageProjection}
  }
`);

const homePageQuery = defineQuery(`
  *[_id == "homePage"][0]{
    heroKicker, heroIntro, heroButtonLabel,
    regionalKicker, regionalHeading, regionalText,
    intelligenceKicker, intelligenceHeading, intelligenceText,
    intelligenceItems[]{title, text},
    principlesKicker, principlesHeading, principlesText,
    principles[]{label, title, text, image${imageProjection}},
    manifestoKicker, manifestoHeading, manifestoText,
    progressKicker, progressHeading, progressText,
    progressProjects[]{title, type, concept, image${imageProjection}},
    servicesKicker, servicesHeading, services[]{title, text},
    teamKicker, teamHeading, teamImage${imageProjection},
    teamMembers[]{name, role, description, image${imageProjection}},
    ctaKicker, ctaHeading, ctaButtonLabel
  }
`);

const aboutPageQuery = defineQuery(`
  *[_id == "aboutPage"][0]{
    heroKicker, heroHeading, heroImage${imageProjection},
    genesisHeading, genesisLead, genesisText,
    regionalHeading, regionalText,
    cultureHeading, cultureText, cultureImage${imageProjection},
    frameworkHeading, frameworkSubheading,
    stages[]{step, name, description},
    historyHeading, timeline[]{year, title, description},
    consultancyHeading, consultancyCards[]{title, text},
    coordinationHeading, coordinationCards[]{title, text},
    teamHeading, teamMembers[]{name, role, description, image${imageProjection}},
    reviewsHeading, testimonials[]{text, author, date},
    ctaHeading, ctaText, ctaPrimaryLabel, ctaProjectsLabel, deckLabel
  }
`);

const servicesPageQuery = defineQuery(`
  *[_id == "servicesPage"][0]{
    heroKicker, heroHeading, heroIntro, quoteButtonLabel, projectsButtonLabel,
    heroImage${imageProjection},
    positioningKicker, positioningHeading, positioningParagraphs,
    servicePillars[]{number, title, description, services},
    coordinationHeading, coordinationText, coordinationImage${imageProjection},
    strategyHeading, strategyText, strategyImage${imageProjection},
    strategyCards[]{title, text},
    processHeading, processImage${imageProjection},
    processSteps[]{number, title, text},
    ctaHeading, ctaText, ctaButtonLabel
  }
`);

const contactPageQuery = defineQuery(`
  *[_id == "contactPage"][0]{
    heroKicker, heroHeading, heroIntro, heroImage${imageProjection},
    contactDetails[]{label, value, href}, inquiryTypes,
    formKicker, formHeading, formIntro, submitLabel,
    successKicker, successHeading, successText, responseTimeText,
    locationKicker, locationHeading, locationText, mapUrl
  }
`);

const legalPageQuery = defineQuery(`
  *[_id == $id][0]{pageKind, kicker, title, intro, sections[]{heading, body}, lastUpdated}
`);

async function fetchSingleton<T>(
  query: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  try {
    return await sanityClient.fetch<T | null>(query, params, {
      cache: "force-cache",
      next: { revalidate: SANITY_CONTENT_REVALIDATE_SECONDS },
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Sanity page content is temporarily unavailable.", error);
    }
    return null;
  }
}

const normalizeName = (name?: string) =>
  name?.toUpperCase().replace(/\s+/g, " ").trim() || "";

const canonicalTeamImageByName = (name?: string) => {
  const normalizedName = normalizeName(name);

  if (normalizedName.includes("ASINGIZWE") && normalizedName.includes("BENJAMIN")) {
    return "/team1.png";
  }

  if (normalizedName.includes("RUKUNDO") && normalizedName.includes("PRINCE")) {
    return "/team3.png";
  }

  if (normalizedName.includes("SHEMA BAMBI") || normalizedName.includes("ANTONELLA")) {
    return "/team2.png";
  }

  if (normalizedName.includes("KANGWAGYE") && normalizedName.includes("SHARON")) {
    return "/team4.png";
  }

  return undefined;
};

const canonicalTeamRoleByName = (name?: string) => {
  const normalizedName = normalizeName(name);

  if (normalizedName.includes("ASINGIZWE") && normalizedName.includes("BENJAMIN")) {
    return "Built Environment Design & Development Lead";
  }

  if (normalizedName.includes("RUKUNDO") && normalizedName.includes("PRINCE")) {
    return "Technical Delivery Lead";
  }

  if (normalizedName.includes("SHEMA BAMBI") || normalizedName.includes("ANTONELLA")) {
    return "Strategy & Digital Systems Lead";
  }

  if (normalizedName.includes("KANGWAGYE") && normalizedName.includes("SHARON")) {
    return "Project Coordination & Growth Lead";
  }

  return undefined;
};

function withCanonicalTeamImageFallbacks<T extends { teamMembers?: TeamMember[] }>(
  content: T | null,
): T | null {
  if (!content?.teamMembers?.length) return content;

  return {
    ...content,
    teamMembers: content.teamMembers.map((member) => {
      const fallbackUrl = canonicalTeamImageByName(member.name);
      const canonicalRole = canonicalTeamRoleByName(member.name);

      return {
        ...member,
        role: canonicalRole || member.role,
        image: member.image?.url
          ? member.image
          : fallbackUrl
            ? {
                ...member.image,
                alt: member.image?.alt || member.name,
                url: fallbackUrl,
              }
            : member.image,
      };
    }),
  } as T;
}

const polishAboutText = (text?: string) => {
  if (!text) return text;

  return text
    .replace(/Zoning Feasibility\s+Feasibility Studies/gi, "Zoning & Regulatory Strategy")
    .replace(/Feasibility\s*&?\s*Zoning\s+Feasibility Studies/gi, "Development Feasibility")
    .replace(
      /guarantees sustainability,?\s*function,?\s*and long-term architectural value/gi,
      "supports sustainability, functionality, and long-term architectural value",
    )
    .replace(
      /ensuring absolute client satisfaction/gi,
      "supporting a clear, coordinated, and professionally completed handover",
    )
    .replace(/absolute client satisfaction/gi, "a professionally coordinated client handover")
    .replace(/industry-leading/gi, "advanced")
    .replace(/Strict site supervision and quality assurance/gi, "Site coordination and quality review")
    .replace(
      /Rigorous site presence overseeing material quality, structural integrity, and execution logic/gi,
      "Disciplined site observation supporting material quality, workmanship review, and execution coordination",
    )
    .replace(/\s{2,}/g, " ")
    .trim();
};

function polishAboutPageContent(content: AboutPageContent | null): AboutPageContent | null {
  if (!content) return content;

  return {
    ...content,
    frameworkHeading: "Built Environment Design.",
    frameworkSubheading: polishAboutText(content.frameworkSubheading),
    coordinationHeading: "Site Coordination &\nDesign Delivery.",
    teamHeading: "The design and strategy team\nbehind the work.",
    genesisLead: polishAboutText(content.genesisLead),
    genesisText: polishAboutText(content.genesisText),
    cultureText: polishAboutText(content.cultureText),
    stages: content.stages?.map((stage, index) => ({
      ...stage,
      name: polishAboutText(stage.name),
      description:
        index === 4
          ? "Site coordination and quality review."
          : index === 5
            ? "Final delivery and a clear, professionally coordinated handover."
            : polishAboutText(stage.description),
    })),
    consultancyCards: content.consultancyCards?.map((card, index) => ({
      ...card,
      title:
        index === 0
          ? "Development Feasibility"
          : index === 1
            ? "Zoning & Regulatory Strategy"
            : polishAboutText(card.title),
      text: polishAboutText(card.text),
    })),
    coordinationCards: content.coordinationCards?.map((card, index) => ({
      ...card,
      title:
        index === 0
          ? "Site Monitoring & Quality Review"
          : index === 1
            ? "Contractor Coordination"
            : polishAboutText(card.title),
      text: polishAboutText(card.text),
    })),
    teamMembers: content.teamMembers?.map((member) => ({
      ...member,
      role: canonicalTeamRoleByName(member.name) || member.role,
    })),
    ctaText: polishAboutText(content.ctaText),
  };
}

function normalizeHomePageContent(content: HomePageContent | null): HomePageContent | null {
  if (!content?.progressProjects?.length) return content;

  return {
    ...content,
    progressProjects: content.progressProjects.map((project) => {
      const normalizedTitle = project.title?.toUpperCase().trim() || "";

      if (normalizedTitle.includes("UMUCO")) {
        return {
          ...project,
          title: "UMUCO Residence",
          type: "Residential Interior",
          concept:
            "A contemporary residential interior in Kigali shaped by warmth, clarity, and refined material detail.",
        };
      }

      if (normalizedTitle.includes("VILLA LUME")) {
        return {
          ...project,
          title: "VILLA LUME",
          type: "Residential Architecture",
          concept:
            "A contemporary villa study focused on daylight, privacy, proportion, and indoor-outdoor living.",
        };
      }

      if (normalizedTitle.includes("AMAFU")) {
        return {
          ...project,
          title: "Amafu Apartments",
          type: "Residential Development",
          concept:
            "A contemporary apartment development organized around light, efficient circulation, views, and shared living quality.",
        };
      }

      return project;
    }),
  };
}

export const getSiteSettings = () => fetchSingleton<SiteSettings>(siteSettingsQuery);
export const getHomePageContent = async () =>
  withCanonicalTeamImageFallbacks(
    normalizeHomePageContent(await fetchSingleton<HomePageContent>(homePageQuery)),
  );
export const getAboutPageContent = async () => {
  const content = await fetchSingleton<AboutPageContent>(aboutPageQuery);
  return withCanonicalTeamImageFallbacks(polishAboutPageContent(content));
};
export const getServicesPageContent = () => fetchSingleton<ServicesPageContent>(servicesPageQuery);
export const getContactPageContent = () => fetchSingleton<ContactPageContent>(contactPageQuery);
export const getLegalPageContent = (kind: "terms" | "privacy" | "cookies") =>
  fetchSingleton<LegalPageContent>(legalPageQuery, { id: `legal-${kind}` });