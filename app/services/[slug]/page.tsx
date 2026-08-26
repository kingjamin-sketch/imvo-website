import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getServicesPageContent } from "@/sanity/lib/siteContent";
import { getSeoEntry } from "@/sanity/lib/cmsBackend";
import { getServicePillarMedia } from "@/sanity/lib/serviceMedia";
import { mergeCmsMetadata } from "@/app/lib/cmsMetadata";
import ServiceDetailPage from "../ServiceDetailPage";
import {
  SERVICE_SLUGS,
  getServiceDetail,
  isServiceSlug,
  type ServiceDetail,
} from "../serviceDetails";

export const revalidate = 300;
export const dynamicParams = false;

const siteUrl = "https://www.imvogroup.com";

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

function applyCmsMedia(
  detail: ServiceDetail,
  media: Awaited<ReturnType<typeof getServicePillarMedia>>,
): ServiceDetail {
  const image = media.find((item) => item.index === detail.index)?.image;
  if (!image?.url) return detail;
  return {
    ...detail,
    image: image.url,
    imageAlt: image.alt || detail.imageAlt,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (!isServiceSlug(slug)) {
    return {
      title: "Service not found",
      robots: { index: false, follow: false },
    };
  }

  const [content, media, routeSeo] = await Promise.all([
    getServicesPageContent(),
    getServicePillarMedia(),
    getSeoEntry(`/services/${slug}`),
  ]);
  const detail = applyCmsMedia(getServiceDetail(slug, content), media);
  const canonical = `/services/${slug}`;
  const title = detail.title;
  const description = detail.description;

  const fallback: Metadata = {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${title} | IMVO Group`,
      description,
      images: [{ url: detail.image, alt: detail.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | IMVO Group`,
      description,
      images: [detail.image],
    },
  };

  return mergeCmsMetadata(fallback, routeSeo, canonical);
}

export default async function IndividualServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();

  const [content, media] = await Promise.all([
    getServicesPageContent(),
    getServicePillarMedia(),
  ]);
  const detail = applyCmsMedia(getServiceDetail(slug, content), media);
  const serviceUrl = `${siteUrl}/services/${slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
          { "@type": "ListItem", position: 3, name: detail.title, item: serviceUrl },
        ],
      },
      {
        "@type": "Service",
        "@id": `${serviceUrl}#service`,
        name: detail.title,
        serviceType: detail.shortTitle,
        url: serviceUrl,
        description: detail.description,
        areaServed: ["Rwanda", "East Africa"],
        provider: {
          "@type": "ProfessionalService",
          "@id": `${siteUrl}/#organization`,
          name: "IMVO Group",
          url: siteUrl,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ServiceDetailPage detail={detail} content={content} />
    </>
  );
}
