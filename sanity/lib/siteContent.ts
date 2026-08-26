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
    reviewsHeading,
    testimonials[]{text, author, role, company, date, source, featured, active, order},
    ctaHeading, ctaText, ctaPrimaryLabel, ctaProjectsLabel, deckLabel
  }
`);

const servicesPageQuery = defineQuery(`
  *[_id == "servicesPage"][0]{
    heroKicker, heroHeading, heroIntro, quoteButtonLabel, projectsButtonLabel,
    heroImage${imageProjection},
    positioningKicker, positioningHeading, positioningParagraphs,
    servicePillars[]{number, title, description, services, image${imageProjection}},
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

function withCanonicalTeamFallbacks<T extends { teamMembers?: TeamMember[] }>(
  content: T | null,
): T | null {
  if (!content?.teamMembers?.length) return content;

  return {
    ...content,
    teamMembers: content.teamMembers.map((member) => {
      const fallbackUrl = canonicalTeamImageByName(member.name);

      return {
        ...member,
        role: member.role || canonicalTeamRoleByName(member.name),
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

const LEGACY_GENESIS_TEXT =
  "Before form comes context. Our foundation is built on analyzing the regional landscape, the history of the site, and the operational ambition of the client. Through advanced BIM modeling and photorealistic visualization, we translate this raw data into technical documentation that guarantees sustainability, function, and long-term architectural value.";
const SAFE_GENESIS_TEXT =
  "Before form comes context. Our foundation is built on analyzing the regional landscape, the history of the site, and the operational ambition of the client. Through advanced BIM modeling and photorealistic visualization, we translate this raw data into technical documentation that supports sustainability, functionality, and long-term architectural value.";
const LEGACY_HANDOVER_TEXT =
  "Final delivery of the built environment ensuring absolute client satisfaction.";
const SAFE_HANDOVER_TEXT =
  "Final delivery and a clear, professionally coordinated handover.";

function migrateExactLegacyAboutCopy(
  content: AboutPageContent | null,
): AboutPageContent | null {
  if (!content) return content;

  return {
    ...content,
    genesisText:
      content.genesisText === LEGACY_GENESIS_TEXT
        ? SAFE_GENESIS_TEXT
        : content.genesisText,
    stages: content.stages?.map((stage) => ({
      ...stage,
      description:
        stage.description === LEGACY_HANDOVER_TEXT
          ? SAFE_HANDOVER_TEXT
          : stage.description,
    })),
  };
}

export const getSiteSettings = () => fetchSingleton<SiteSettings>(siteSettingsQuery);
export const getHomePageContent = async () =>
  withCanonicalTeamFallbacks(await fetchSingleton<HomePageContent>(homePageQuery));
export const getAboutPageContent = async () =>
  withCanonicalTeamFallbacks(
    migrateExactLegacyAboutCopy(
      await fetchSingleton<AboutPageContent>(aboutPageQuery),
    ),
  );
export const getServicesPageContent = () => fetchSingleton<ServicesPageContent>(servicesPageQuery);
export const getContactPageContent = () => fetchSingleton<ContactPageContent>(contactPageQuery);
export const getLegalPageContent = (kind: "terms" | "privacy" | "cookies") =>
  fetchSingleton<LegalPageContent>(legalPageQuery, { id: `legal-${kind}` });
