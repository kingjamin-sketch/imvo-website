import type { CmsImage, TeamMember } from "./siteContent";

export type StructuredTeamMember = TeamMember & {
  _id?: string;
  email?: string;
  linkedin?: string;
  active?: boolean;
  order?: number;
};

export type StructuredTestimonial = {
  _id?: string;
  quote?: string;
  author?: string;
  role?: string;
  company?: string;
  date?: string;
  source?: string;
  featured?: boolean;
  active?: boolean;
  order?: number;
};

export type StructuredFaq = {
  _id?: string;
  question?: string;
  answer?: string;
  scope?: "general" | "domicile" | "services" | "contact" | "careers";
  active?: boolean;
  order?: number;
};

export type CareerContent = {
  _id?: string;
  title?: string;
  slug?: string;
  location?: string;
  employmentType?: string;
  summary?: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  applyEmail?: string;
  applyUrl?: string;
  closingDate?: string;
  active?: boolean;
  order?: number;
};

export type StudioScheduleDay = {
  day?: string;
  label?: string;
  enabled?: boolean;
  openTime?: string;
  closeTime?: string;
};

export type StudioDateOverride = {
  date?: string;
  label?: string;
  status?: "closed" | "custom" | "open";
  openTime?: string;
  closeTime?: string;
  note?: string;
};

export type StudioSpecialNotice = {
  title?: string;
  message?: string;
  startsAt?: string;
  endsAt?: string;
  priority?: "normal" | "important" | "urgent";
  enabled?: boolean;
};

export type StudioStatusContent = {
  timezone?: string;
  weeklySchedule?: StudioScheduleDay[];
  dateOverrides?: StudioDateOverride[];
  specialNotices?: StudioSpecialNotice[];
  openMessages?: string[];
  closedMessages?: string[];
  weekendMessages?: string[];
  openingSoonMessages?: string[];
};

export type DomicileExplanationItem = {
  number?: string;
  title?: string;
  text?: string;
};

export type DomicilePropertyStory = {
  number?: string;
  title?: string;
  status?: string;
  copy?: string;
  image?: CmsImage;
};

export type DomicilePageContent = {
  heroEyebrow?: string;
  heroHeading?: string;
  heroLead?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  heroImage?: CmsImage;
  explainedQuote?: string;
  explainedHeading?: string;
  explainedLead?: string;
  explainedImage?: CmsImage;
  explanationItems?: DomicileExplanationItem[];
  careHeading?: string;
  careText?: string;
  carePrimaryImage?: CmsImage;
  careSecondaryImage?: CmsImage;
  ownerHeading?: string;
  ownerText?: string;
  ownerImage?: CmsImage;
  propertiesHeading?: string;
  propertiesText?: string;
  propertyStories?: DomicilePropertyStory[];
  trustHeading?: string;
  trustText?: string;
  enquiryHeading?: string;
  enquiryText?: string;
  enquiryImage?: CmsImage;
  email?: string;
  phone?: string;
  location?: string;
  seoTitle?: string;
  seoDescription?: string;
  shareImage?: CmsImage;
  noIndex?: boolean;
};

export type HomeSectionControls = {
  showRegional?: boolean;
  showIntelligence?: boolean;
  showPrinciples?: boolean;
  showManifesto?: boolean;
  showProgress?: boolean;
  showServices?: boolean;
  showTeam?: boolean;
  showStudioStatus?: boolean;
  showFinalCta?: boolean;
};

export type HomeHeroMedia = {
  videoUrl?: string;
  posterUrl?: string;
  posterAlt?: string;
};

export type SeoEntry = {
  routePath?: string;
  title?: string;
  description?: string;
  shareImage?: CmsImage;
  noIndex?: boolean;
};
