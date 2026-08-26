import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

const singleton = (
  S: Parameters<StructureResolver>[0],
  title: string,
  schemaType: string,
  documentId: string,
) =>
  S.listItem()
    .title(title)
    .child(S.document().title(title).schemaType(schemaType).documentId(documentId));

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("IMVO Website Content")
    .items([
      singleton(S, "Site Settings", "siteSettings", "siteSettings"),
      S.divider(),
      singleton(S, "Homepage", "homePage", "homePage"),
      singleton(S, "About Page", "aboutPage", "aboutPage"),
      singleton(S, "Services Page", "servicesPage", "servicesPage"),
      singleton(S, "Contact Page", "contactPage", "contactPage"),
      singleton(S, "DŌMICILE Page", "domicilePage", "domicilePage"),
      S.divider(),
      S.listItem()
        .title("Legal Pages")
        .child(
          S.list()
            .title("Legal Pages")
            .items([
              singleton(S, "Terms & Conditions", "legalPage", "legal-terms"),
              singleton(S, "Privacy Policy", "legalPage", "legal-privacy"),
              singleton(S, "Cookie Policy", "legalPage", "legal-cookies"),
            ]),
        ),
      orderableDocumentListDeskItem({
        type: "project",
        title: "Projects",
        S,
        context,
      }),
    ]);
