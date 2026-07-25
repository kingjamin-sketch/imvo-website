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
      next: { revalidate: 60, tags: ["sanity-site-content"] },
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Sanity page content is temporarily unavailable.", error);
    }
    return null;
  }
}

const canonicalTeamImageByName = (name?: string) => {
  const normalizedName = name?.toUpperCase().replace(/\s+/g, " ").trim() || "";

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

function withCanonicalTeamImageFallbacks<T extends { teamMembers?: TeamMember[] }>(
  content: T | null,
): T | null {
  if (!content?.teamMembers?.length) return content;

  return {
    ...content,
    teamMembers: content.teamMembers.map((member) => {
      if (member.image?.url) return member;

      const fallbackUrl = canonicalTeamImageByName(member.name);
      if (!fallbackUrl) return member;

      return {
        ...member,
        image: {
          ...member.image,
          alt: member.image?.alt || member.name,
          url: fallbackUrl,
        },
      };
    }),
  } as T;
}

const polishAboutText = (text?: string) => {
  if (!text) return text;

  return text
    .replace(/Zoning Feasibility\s+Feasibility Studies/gi, "Zoning & Regulatory Strategy")
    .replace(/Feasibility\s*&?\s*Zoning\s+Feasibility Studies/gi, "Development Feasibility & Zoning Strategy")
    .replace(/guarantees sustainability,?\s*function,?\s*and long-term architectural value/gi, "supports sustainability, functionality, and long-term architectural value")
    .replace(/ensuring absolute client satisfaction/gi, "supporting a clear, coordinated, and professionally completed handover")
    .replace(/absolute client satisfaction/gi, "a professionally coordinated client handover")
    .replace(/\s{2,}/g, " ")
    .trim();
};

function polishAboutPageContent(content: AboutPageContent | null): AboutPageContent | null {
  if (!content) return content;

  return {
    ...content,
    genesisLead: polishAboutText(content.genesisLead),
    genesisText: polishAboutText(content.genesisText),
    cultureText: polishAboutText(content.cultureText),
    frameworkSubheading: polishAboutText(content.frameworkSubheading),
    stages: content.stages?.map((stage) => ({
      ...stage,
      name: polishAboutText(stage.name),
      description: polishAboutText(stage.description),
    })),
    consultancyCards: content.consultancyCards?.map((card) => ({
      ...card,
      title: polishAboutText(card.title),
      text: polishAboutText(card.text),
    })),
    coordinationCards: content.coordinationCards?.map((card) => ({
      ...card,
      title: polishAboutText(card.title),
      text: polishAboutText(card.text),
    })),
    ctaText: polishAboutText(content.ctaText),
  };
}

export const getSiteSettings = () => fetchSingleton<SiteSettings>(siteSettingsQuery);
export const getHomePageContent = async () =>
  withCanonicalTeamImageFallbacks(await fetchSingleton<HomePageContent>(homePageQuery));
export const getAboutPageContent = async () => {
  const content = await fetchSingleton<AboutPageContent>(aboutPageQuery);
  return withCanonicalTeamImageFallbacks(polishAboutPageContent(content));
};
export const getServicesPageContent = () => fetchSingleton<ServicesPageContent>(servicesPageQuery);
export const getContactPageContent = () => fetchSingleton<ContactPageContent>(contactPageQuery);
export const getLegalPageContent = (kind: "terms" | "privacy" | "cookies") =>
  fetchSingleton<LegalPageContent>(legalPageQuery, { id: `legal-${kind}` });