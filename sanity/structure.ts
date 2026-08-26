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
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Editable Pages")
            .items([
              singleton(S, "Homepage", "homePage", "homePage"),
              singleton(S, "About Page", "aboutPage", "aboutPage"),
              singleton(S, "Services Page", "servicesPage", "servicesPage"),
              singleton(S, "Contact Page", "contactPage", "contactPage"),
              singleton(S, "DŌMICILE", "domicilePage", "domicilePage"),
            ]),
        ),
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
      S.divider(),
      S.listItem()
        .title("Collections")
        .child(
          S.list()
            .title("Structured Collections")
            .items([
              S.documentTypeListItem("teamMember").title("Team Members"),
              S.documentTypeListItem("testimonial").title("Testimonials / Client Reviews"),
              S.documentTypeListItem("faq").title("FAQs"),
              S.documentTypeListItem("career").title("Careers"),
            ]),
        ),
      orderableDocumentListDeskItem({
        type: "project",
        title: "Projects",
        S,
        context,
      }),
      S.divider(),
      S.listItem()
        .title("Operations")
        .child(
          S.list()
            .title("Operational Controls")
            .items([
              singleton(S, "Studio Status", "studioStatus", "studioStatus"),
            ]),
        ),
    ]);
