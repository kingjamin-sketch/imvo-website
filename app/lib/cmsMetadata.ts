import type { Metadata } from "next";
import type { SeoEntry } from "@/sanity/types/cmsBackend";

export function mergeCmsMetadata(
  fallback: Metadata,
  entry: SeoEntry | null | undefined,
  canonical: string,
): Metadata {
  const fallbackOpenGraph = fallback.openGraph || {};
  const fallbackTwitter = fallback.twitter || {};
  const title = entry?.title || fallback.title;
  const description = entry?.description || fallback.description;
  const image = entry?.shareImage?.url;
  const imageAlt = entry?.shareImage?.alt || entry?.title || "IMVO Group";

  return {
    ...fallback,
    title,
    description,
    alternates: {
      ...(fallback.alternates || {}),
      canonical,
    },
    robots: entry?.noIndex
      ? { index: false, follow: true }
      : fallback.robots,
    openGraph: {
      ...fallbackOpenGraph,
      title: entry?.title || fallbackOpenGraph.title,
      description: entry?.description || fallbackOpenGraph.description,
      url: canonical,
      images: image
        ? [{ url: image, alt: imageAlt }]
        : fallbackOpenGraph.images,
    },
    twitter: {
      ...fallbackTwitter,
      title: entry?.title || fallbackTwitter.title,
      description: entry?.description || fallbackTwitter.description,
      images: image ? [image] : fallbackTwitter.images,
    },
  };
}
