import { defineQuery } from "next-sanity";

import {
  PROJECTS,
  type Project,
  type ProjectCategory,
  type ProjectTimelineItem,
} from "@/app/projects/projectsData";

import { sanityClient } from "./client";

type SanityProjectRecord = {
  id?: string;
  slug?: string;
  title?: string;
  category?: string;
  location?: string;
  year?: string;
  cover?: string;
  images?: Array<string | null> | null;
  summary?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  mapUrl?: string;
  status?: string;
  scope?: string;
  drawings?: Array<string | null> | null;
  timeline?: ProjectTimelineItem[] | null;
  featured?: boolean;
  orderRank?: string;
  order?: number;
};

const projectsQuery = defineQuery(`
  *[_type == "project"] | order(coalesce(orderRank, "zzzzzz") asc, coalesce(order, 100) asc, year desc, _createdAt desc) {
    "id": _id,
    "slug": slug.current,
    title,
    category,
    location,
    year,
    "cover": cover.asset->url,
    "images": coalesce(gallery[].asset->url, []),
    summary,
    bedrooms,
    bathrooms,
    area,
    mapUrl,
    status,
    scope,
    "drawings": coalesce(drawings[].asset->url, []),
    timeline[]{year, title},
    featured,
    orderRank,
    order
  }
`);

const sanityImageHost = "cdn.sanity.io";

type SanityImageTransform = {
  width: number;
  fit: "max";
  auto: "format";
  quality: number;
};

const projectImageTransform: SanityImageTransform = {
  width: 1920,
  fit: "max",
  auto: "format",
  quality: 78,
};

const drawingImageTransform: SanityImageTransform = {
  width: 1600,
  fit: "max",
  auto: "format",
  quality: 68,
};

function withSanityImageTransform(
  imageUrl: string,
  transform: SanityImageTransform,
): string {
  try {
    const url = new URL(imageUrl);

    if (url.hostname !== sanityImageHost) {
      return imageUrl;
    }

    url.searchParams.set("w", String(transform.width));
    url.searchParams.set("fit", transform.fit);
    url.searchParams.set("auto", transform.auto);
    url.searchParams.set("q", String(transform.quality));

    return url.toString();
  } catch {
    return imageUrl;
  }
}

function transformSanityImageList(
  imageUrls: Array<string | null> | null | undefined,
  transform: SanityImageTransform,
): string[] {
  return (imageUrls || [])
    .filter((imageUrl): imageUrl is string => Boolean(imageUrl))
    .map((imageUrl) => withSanityImageTransform(imageUrl, transform));
}

const categories = new Set<ProjectCategory>([
  "Residential",
  "Commercial",
  "Institutional",
  "Urban",
  "Hospitality",
]);

const localProjectTitleOverrides: Record<string, string> = {
  "project-03": "Urban Villa Amani",
  "project-04": "Axis Commercial Centre",
  "project-05": "Nuru Hospitality Retreat",
  "project-06": "Mji Mixed-Use Quarter",
  "project-07": "Hillcrest House",
  "project-08": "Umusozi Private Estate",
  "project-09": "Courtyard Urban Residence",
  "project-10": "Civic Learning Campus",
  "project-11": "Kigali Growth Framework",
  "project-12": "The Atrium Commercial Block",
  "project-15": "Urban Villa Lumen",
  "project-16": "Arcadia Business Hub",
  "project-17": "Kivu Grand Hospitality",
  "project-18": "Nexus Urban District",
  "project-19": "Ridgeview Residence",
  "project-20": "Terra Verde Estate",
  "project-21": "Skyline Urban Residence",
  "project-22": "Community Institutional Centre",
  "project-23": "Urban Access Masterplan",
  "project-24": "Gateway Retail Centre",
  "project-25": "Terraces Business Centre",
  "project-26": "Courtyard Commerce House",
  "project-27": "Horizon Retail Pavilion",
  "project-28": "Central Market Offices",
  "project-29": "Meridian Commercial House",
  "project-30": "Boulevard Business Centre",
  "project-31": "Canopy Retail Complex",
};

function withDistinctLocalTitle(project: Project): Project {
  const title = localProjectTitleOverrides[project.slug];
  return title ? { ...project, title } : project;
}

function toProject(record: SanityProjectRecord): Project | null {
  if (
    !record.id ||
    !record.slug ||
    !record.title ||
    !record.category ||
    !categories.has(record.category as ProjectCategory) ||
    !record.location ||
    !record.year ||
    !record.cover ||
    !record.summary
  ) {
    return null;
  }

  return {
    id: record.id,
    slug: record.slug,
    title: localProjectTitleOverrides[record.slug] || record.title,
    category: record.category as ProjectCategory,
    location: record.location,
    year: record.year,
    cover: withSanityImageTransform(record.cover, projectImageTransform),
    images: transformSanityImageList(record.images, projectImageTransform),
    summary: record.summary,
    bedrooms: record.bedrooms,
    bathrooms: record.bathrooms,
    area: record.area,
    mapUrl: record.mapUrl,
    status: record.status,
    scope: record.scope,
    drawings: transformSanityImageList(record.drawings, drawingImageTransform),
    timeline: record.timeline || undefined,
    featured: record.featured,
    orderRank: record.orderRank,
    order: record.order,
  };
}

async function getSanityProjects(): Promise<Project[]> {
  try {
    const records = await sanityClient.fetch<SanityProjectRecord[]>(
      projectsQuery,
      {},
      { cache: "no-store" },
    );

    return records
      .map(toProject)
      .filter((project): project is Project => project !== null);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Sanity projects are temporarily unavailable.", error);
    }

    return [];
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const localProjects = PROJECTS.map((project, index) => ({
    ...withDistinctLocalTitle(project),
    order: project.order ?? index + 1,
  }));
  const sanityProjects = await getSanityProjects();
  const merged = new Map<string, Project>(
    localProjects.map((project) => [project.slug, project]),
  );

  for (const project of sanityProjects) {
    merged.set(project.slug, project);
  }

  return Array.from(merged.values()).sort((left, right) => {
    if (left.orderRank && right.orderRank) {
      const rankDifference = left.orderRank.localeCompare(right.orderRank);
      if (rankDifference !== 0) return rankDifference;
    } else if (left.orderRank) {
      return -1;
    } else if (right.orderRank) {
      return 1;
    }

    const orderDifference = (left.order ?? 100) - (right.order ?? 100);

    if (orderDifference !== 0) return orderDifference;
    return right.year.localeCompare(left.year);
  });
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.featured).slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug) || null;
}