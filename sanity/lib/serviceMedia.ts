import type { CmsImage } from "../types/siteContent";
import { sanityClient } from "./client";

export type ServicePillarMedia = {
  index: number;
  image?: CmsImage;
};

export async function getServicePillarMedia(): Promise<ServicePillarMedia[]> {
  try {
    const pillars = await sanityClient.fetch<Array<{ image?: CmsImage }> | null>(
      `*[_id == "servicesPage"][0].servicePillars[]{
        image{
          alt,
          "url": asset->url + "?w=1920&fit=max&auto=format&q=82"
        }
      }`,
      {},
      {
        cache: "force-cache",
        next: { revalidate: 300 },
      },
    );

    return (pillars || []).map((pillar, index) => ({
      index,
      image: pillar.image,
    }));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Sanity service detail media is temporarily unavailable.", error);
    }
    return [];
  }
}
