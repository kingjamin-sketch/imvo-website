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
  order?: number;
};

const projectsQuery = defineQuery(`
  *[_type == "project"] | order(coalesce(order, 100) asc, year desc, _createdAt desc) {
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
    order
  }
`);

const categories = new Set<ProjectCategory>([
  "Residential",
  "Commercial",
  "Institutional",
  "Urban",
  "Hospitality",
]);

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
    title: record.title,
    category: record.category as ProjectCategory,
    location: record.location,
    year: record.year,
    cover: record.cover,
    images: (record.images || []).filter((image): image is string => Boolean(image)),
    summary: record.summary,
    bedrooms: record.bedrooms,
    bathrooms: record.bathrooms,
    area: record.area,
    mapUrl: record.mapUrl,
    status: record.status,
    scope: record.scope,
    drawings: (record.drawings || []).filter(
      (drawing): drawing is string => Boolean(drawing),
    ),
    timeline: record.timeline || undefined,
    featured: record.featured,
    order: record.order,
  };
}

async function getSanityProjects(): Promise<Project[]> {
  try {
    const records = await sanityClient.fetch<SanityProjectRecord[]>(
      projectsQuery,
      {},
      { next: { revalidate: 60, tags: ["sanity-projects"] } },
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
    ...project,
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
    const orderDifference = (left.order ?? 100) - (right.order ?? 100);

    if (orderDifference !== 0) return orderDifference;
    return right.year.localeCompare(left.year);
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug) || null;
}
