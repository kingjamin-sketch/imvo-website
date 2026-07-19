import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { sanityDataset, sanityProjectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "servicesPage",
  "contactPage",
]);

export default defineConfig({
  name: "default",
  title: "IMVO Website CMS",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  document: {
    newDocumentOptions: (previous) =>
      previous.filter((item) => !singletonTypes.has(item.templateId)),
  },
  schema: {
    types: schemaTypes,
  },
});
