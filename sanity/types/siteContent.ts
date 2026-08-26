export type CmsImage = {
  url?: string;
  alt?: string;
};

export type TitleText = {
  title?: string;
  text?: string;
};

export type TeamMember = {
  name?: string;
  role?: string;
  description?: string;
  image?: CmsImage;
};

export type AboutTestimonial = {
  text?: string;
  author?: string;
  role?: string;
  company?: string;
  date?: string;
  source?: string;
  featured?: boolean;
  active?: boolean;
  order?: number;
};

export type SiteSettings = {
  companyName?: string;
  tagline?: string;
  legalNotice?: string;
  copyright?: string;
  motto?: string;
  generalEmail?: string;
  projectsEmail?: string;
  phone?: string;
  location?: string;
  mapUrl?: string;
  socialLinks?: Array<{ label?: string; url?: string }>;
  seoTitle?: string;
  seoDescription?: string;
  shareImage?: CmsImage;
};

export type HomePageContent = {
  heroKicker?: string;
  heroIntro?: string;
  heroButtonLabel?: string;
  regionalKicker?: string;
  regionalHeading?: string;
  regionalText?: string;
  intelligenceKicker?: string;
  intelligenceHeading?: string;
  intelligenceText?: string;
  intelligenceItems?: TitleText[];
  principlesKicker?: string;
  principlesHeading?: string;
  principlesText?: string;
  principles?: Array<TitleText & { label?: string; image?: CmsImage }>;
  manifestoKicker?: string;
  manifestoHeading?: string;
  manifestoText?: string;
  progressKicker?: string;
  progressHeading?: string;
  progressText?: string;
  progressProjects?: Array<{ title?: string; type?: string; concept?: string; image?: CmsImage }>;
  servicesKicker?: string;
  servicesHeading?: string;
  services?: TitleText[];
  teamKicker?: string;
  teamHeading?: string;
  teamImage?: CmsImage;
  teamMembers?: TeamMember[];
  ctaKicker?: string;
  ctaHeading?: string;
  ctaButtonLabel?: string;
};

export type AboutPageContent = {
  heroKicker?: string;
  heroHeading?: string;
  heroImage?: CmsImage;
  genesisHeading?: string;
  genesisLead?: string;
  genesisText?: string;
  regionalHeading?: string;
  regionalText?: string;
  cultureHeading?: string;
  cultureText?: string;
  cultureImage?: CmsImage;
  frameworkHeading?: string;
  frameworkSubheading?: string;
  stages?: Array<{ step?: string; name?: string; description?: string }>;
  historyHeading?: string;
  timeline?: Array<{ year?: string; title?: string; description?: string }>;
  consultancyHeading?: string;
  consultancyCards?: TitleText[];
  coordinationHeading?: string;
  coordinationCards?: TitleText[];
  teamHeading?: string;
  teamMembers?: TeamMember[];
  reviewsHeading?: string;
  testimonials?: AboutTestimonial[];
  ctaHeading?: string;
  ctaText?: string;
  ctaPrimaryLabel?: string;
  ctaProjectsLabel?: string;
  deckLabel?: string;
};

export type ServicesPageContent = {
  heroKicker?: string;
  heroHeading?: string;
  heroIntro?: string;
  quoteButtonLabel?: string;
  projectsButtonLabel?: string;
  heroImage?: CmsImage;
  positioningKicker?: string;
  positioningHeading?: string;
  positioningParagraphs?: string[];
  servicePillars?: Array<{
    number?: string;
    title?: string;
    description?: string;
    services?: string[];
    image?: CmsImage;
  }>;
  coordinationHeading?: string;
  coordinationText?: string;
  coordinationImage?: CmsImage;
  strategyHeading?: string;
  strategyText?: string;
  strategyImage?: CmsImage;
  strategyCards?: TitleText[];
  processHeading?: string;
  processImage?: CmsImage;
  processSteps?: Array<{ number?: string; title?: string; text?: string }>;
  ctaHeading?: string;
  ctaText?: string;
  ctaButtonLabel?: string;
};

export type ContactPageContent = {
  heroKicker?: string;
  heroHeading?: string;
  heroIntro?: string;
  heroImage?: CmsImage;
  contactDetails?: Array<{ label?: string; value?: string; href?: string }>;
  inquiryTypes?: string[];
  formKicker?: string;
  formHeading?: string;
  formIntro?: string;
  submitLabel?: string;
  successKicker?: string;
  successHeading?: string;
  successText?: string;
  responseTimeText?: string;
  locationKicker?: string;
  locationHeading?: string;
  locationText?: string;
  mapUrl?: string;
};

export type LegalPageContent = {
  pageKind?: "terms" | "privacy" | "cookies";
  kicker?: string;
  title?: string;
  intro?: string;
  sections?: Array<{ heading?: string; body?: string }>;
  lastUpdated?: string;
};
