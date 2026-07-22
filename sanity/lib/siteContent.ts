import { defineQuery } from "next-sanity";

import type {
  AboutPageContent,
  ContactPageContent,
  HomePageContent,
  LegalPageContent,
  ServicesPageContent,
  SiteSettings,
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

export const getSiteSettings = () => fetchSingleton<SiteSettings>(siteSettingsQuery);
export const getHomePageContent = () => fetchSingleton<HomePageContent>(homePageQuery);
export const getAboutPageContent = () => fetchSingleton<AboutPageContent>(aboutPageQuery);
export const getServicesPageContent = () => fetchSingleton<ServicesPageContent>(servicesPageQuery);
export const getContactPageContent = () => fetchSingleton<ContactPageContent>(contactPageQuery);
export const getLegalPageContent = (kind: "terms" | "privacy" | "cookies") =>
  fetchSingleton<LegalPageContent>(legalPageQuery, { id: `legal-${kind}` });
