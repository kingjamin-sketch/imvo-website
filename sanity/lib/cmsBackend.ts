import { defineQuery } from "next-sanity";

import type {
  CareerContent,
  DomicilePageContent,
  HomeHeroMedia,
  HomeSectionControls,
  SeoEntry,
  StudioStatusContent,
  StructuredFaq,
  StructuredTeamMember,
  StructuredTestimonial,
} from "../types/cmsBackend";
import { sanityClient } from "./client";

const REVALIDATE_SECONDS = 300;

const imageProjection = `{
  alt,
  "url": asset->url + "?w=1920&fit=max&auto=format&q=78"
}`;

const teamQuery = defineQuery(`
  *[_type == "teamMember" && active != false] | order(coalesce(order, 100) asc, name asc) {
    _id, name, role, description, email, linkedin, active, order,
    image${imageProjection}
  }
`);

const testimonialQuery = defineQuery(`
  *[_type == "testimonial" && active != false] | order(coalesce(order, 100) asc, date desc) {
    _id, quote, author, role, company, date, source, featured, active, order
  }
`);

const faqQuery = defineQuery(`
  *[_type == "faq" && active != false && ($scope == "all" || scope == $scope || (scope == "general" && $includeGeneral))]
    | order(coalesce(order, 100) asc, question asc) {
      _id, question, answer, scope, active, order
    }
`);

const careersQuery = defineQuery(`
  *[_type == "career" && active == true] | order(coalesce(order, 100) asc, closingDate asc) {
    _id, title, "slug": slug.current, location, employmentType, summary, description,
    responsibilities, requirements, applyEmail, applyUrl, closingDate, active, order
  }
`);

const studioStatusQuery = defineQuery(`
  *[_id == "studioStatus"][0]{
    timezone,
    weeklySchedule[]{day, label, enabled, openTime, closeTime},
    dateOverrides[]{date, label, status, openTime, closeTime, note},
    specialNotices[]{title, message, startsAt, endsAt, priority, enabled},
    openMessages, closedMessages, weekendMessages, openingSoonMessages
  }
`);

const domicilePageQuery = defineQuery(`
  *[_id == "domicilePage"][0]{
    heroEyebrow, heroHeading, heroLead, primaryCtaLabel, secondaryCtaLabel,
    heroImage${imageProjection},
    explainedQuote, explainedHeading, explainedLead, explainedImage${imageProjection},
    explanationItems[]{number, title, text},
    careHeading, careText, carePrimaryImage${imageProjection}, careSecondaryImage${imageProjection},
    ownerHeading, ownerText, ownerImage${imageProjection},
    propertiesHeading, propertiesText,
    propertyStories[]{number, title, status, copy, image${imageProjection}},
    trustHeading, trustText, enquiryHeading, enquiryText, enquiryImage${imageProjection},
    email, phone, location,
    seoTitle, seoDescription, shareImage${imageProjection}, noIndex
  }
`);

const homeControlsQuery = defineQuery(`
  *[_id == "homePage"][0]{sectionControls}
`);

const homeHeroMediaQuery = defineQuery(`
  *[_id == "homePage"][0]{
    "videoUrl": heroVideo.asset->url,
    "posterUrl": heroPoster.asset->url,
    "posterAlt": heroPoster.alt
  }
`);

const seoEntryQuery = defineQuery(`
  *[_id == "siteSettings"][0].seoPages[routePath == $routePath][0]{
    routePath, title, description, shareImage${imageProjection}, noIndex
  }
`);

async function fetchCached<T>(
  query: string,
  params: Record<string, string | boolean> = {},
): Promise<T | null> {
  try {
    return await sanityClient.fetch<T | null>(query, params, {
      cache: "force-cache",
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Sanity CMS backend content is temporarily unavailable.", error);
    }
    return null;
  }
}

export async function getTeamMembers(): Promise<StructuredTeamMember[]> {
  return (await fetchCached<StructuredTeamMember[]>(teamQuery)) || [];
}

export async function getTestimonials(): Promise<StructuredTestimonial[]> {
  return (await fetchCached<StructuredTestimonial[]>(testimonialQuery)) || [];
}

export async function getFaqs(
  scope: StructuredFaq["scope"] | "all" = "all",
  includeGeneral = false,
): Promise<StructuredFaq[]> {
  return (
    (await fetchCached<StructuredFaq[]>(faqQuery, {
      scope,
      includeGeneral,
    })) || []
  );
}

export async function getCareers(): Promise<CareerContent[]> {
  return (await fetchCached<CareerContent[]>(careersQuery)) || [];
}

export const getStudioStatusContent = () =>
  fetchCached<StudioStatusContent>(studioStatusQuery);

export const getDomicilePageContent = () =>
  fetchCached<DomicilePageContent>(domicilePageQuery);

export async function getHomePageControls(): Promise<HomeSectionControls | null> {
  const result = await fetchCached<{ sectionControls?: HomeSectionControls }>(homeControlsQuery);
  return result?.sectionControls || null;
}

export const getHomeHeroMedia = () => fetchCached<HomeHeroMedia>(homeHeroMediaQuery);

export const getSeoEntry = (routePath: string) =>
  fetchCached<SeoEntry>(seoEntryQuery, { routePath });
