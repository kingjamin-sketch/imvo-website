import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getServicesPageContent } from "@/sanity/lib/siteContent";
import ServiceDetailPage from "../ServiceDetailPage";
import {
  SERVICE_SLUGS,
  getServiceDetail,
  isServiceSlug,
} from "../serviceDetails";

export const revalidate = 300;
export const dynamicParams = false;

const siteUrl = "https://www.imvogroup.com";

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
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

  const content = await getServicesPageContent();
  const detail = getServiceDetail(slug, content);
  const canonical = `/services/${slug}`;
  const title = detail.title;
  const description = detail.description;

  return {
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
}

export default async function IndividualServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();

  const content = await getServicesPageContent();
  const detail = getServiceDetail(slug, content);
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
