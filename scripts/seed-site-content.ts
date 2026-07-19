import { getCliClient } from "sanity/cli";

type SeedDocument = {
  _id: string;
  _type: string;
  [key: string]: unknown;
};

const keyed = <T extends Record<string, unknown>>(prefix: string, items: T[]) =>
  items.map((item, index) => ({ ...item, _key: `${prefix}-${index + 1}` }));

const documents: SeedDocument[] = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: "IMVO Group",
    tagline: "A built-environment design and development consultancy",
    legalNotice: "Regulated professional services and statutory sign-off are undertaken only by appropriately registered practitioners.",
    copyright: "© 2026 IMVO Group. All rights reserved.",
    motto: "Intellectu · Mens · Visio · Origo",
    generalEmail: "info@imvogroup.com",
    projectsEmail: "projects@imvogroup.com",
    phone: "+250 787 349 257",
    location: "Kigali, Rwanda",
    mapUrl: "https://maps.google.com/maps?q=-1.9235606,30.0709587&z=18&output=embed",
    socialLinks: keyed("social", [
      { label: "LinkedIn", url: "https://www.linkedin.com/company/imvo-design-group" },
      { label: "Instagram", url: "https://www.instagram.com/imvo_group/" },
      { label: "X", url: "https://x.com/Imvogroupafrica" },
      { label: "Facebook", url: "https://www.facebook.com/people/IMVO-GROUP-Africa/100087615605183/" },
      { label: "YouTube", url: "https://www.youtube.com/@Imvogroupafrica" },
    ]),
    seoTitle: "IMVO Group | Built Environment Design & Development",
    seoDescription: "A Kigali-based built-environment design and development consultancy supporting spatial design, feasibility, site coordination, and project direction across Rwanda and East Africa.",
  },
  {
    _id: "homePage",
    _type: "homePage",
    heroKicker: "INTELLECTU · MENS · VISIO · ORIGO",
    heroIntro: "IMVO develops residential, commercial, and institutional environments through built-environment design, development consultancy, site coordination, and execution-aware planning — balancing spatial clarity, contextual sensitivity, technical discipline, and long-term architectural value.",
    heroButtonLabel: "EXPLORE WORK ↗",
    regionalKicker: "Regional Reach",
    regionalHeading: "Kigali based.\nEast & Central Africa focused.",
    regionalText: "IMVO supports projects across Rwanda, Uganda, Kenya, Tanzania, Burundi, DRC, Zambia, Angola, and selected parts of Mozambique.",
    intelligenceKicker: "Project Intelligence",
    intelligenceHeading: "Better decisions\nbefore design.",
    intelligenceText: "Before drawings, approvals, and construction costs begin, IMVO helps clients understand land, context, feasibility, and project direction so resources are committed with clarity.",
    intelligenceItems: keyed("intelligence", [
      { title: "Land acquisition", text: "Support before commitment — reading context, access, constraints, opportunity, and long-term development value." },
      { title: "Feasibility review", text: "Early guidance on what a site can realistically support before drawings, approvals, and construction costs begin." },
      { title: "Project direction", text: "Turning ambition into a clear development path across design, planning, site coordination, and delivery strategy." },
    ]),
    principlesKicker: "Studio Principles",
    principlesHeading: "Design, strategy,\nand execution.",
    principlesText: "Design, strategy, and execution work as one — moving every project from early vision toward coordinated, buildable, and enduring outcomes.",
    principles: keyed("principle", [
      { label: "DESIGN", title: "Spatial clarity before form.", text: "Every line begins with purpose, proportion, context, and buildable intent." },
      { label: "STRATEGY", title: "Better decisions before construction.", text: "We connect design ambition with feasibility, planning, risk, and development value." },
      { label: "EXECUTION", title: "Design value protected on site.", text: "From concept to site delivery, IMVO keeps the work disciplined, coordinated, and accountable." },
    ]),
    manifestoKicker: "Architectural Approach",
    manifestoHeading: "Architecture is not decoration.\nIt is structure, context,\nproportion, and long-term value.",
    manifestoText: "IMVO develops environments through disciplined design thinking, technical coordination, and construction awareness.",
    progressKicker: "In Progress",
    progressHeading: "On the boards.",
    progressText: "A look at conceptual studies, wireframes, and developments currently taking shape in the studio.",
    progressProjects: keyed("progress", [
      { title: "INZIIRA ESTATE Development", type: "Residential Masterplan", concept: "Elevated foundations responding to wetland topography." },
      { title: "VILLA LUME", type: "Sports Infrastructure", concept: "Crown-themed stadium concept and spatial identity." },
      { title: "Amafu apartment Experience", type: "Commercial Environment", concept: "Integrated spatial branding and hospitality flow." },
    ]),
    servicesKicker: "Services",
    servicesHeading: "Three pillars from vision to execution.",
    services: keyed("home-service", [
      { title: "Built Environment Design", text: "Concept development, spatial planning, residential and commercial design, documentation, and context-aware spatial solutions." },
      { title: "Consultancy", text: "Feasibility guidance, design advisory, project development support, regulatory awareness, and strategic decision-making." },
      { title: "Site Coordination", text: "Site observation, quality review, design implementation support, and coordination between client, consultants, and contractors." },
    ]),
    teamKicker: "Team",
    teamHeading: "A studio shaped by collaboration,\ntechnical focus, and shared responsibility.",
    teamMembers: keyed("home-team", [
      { name: "ASINGIZWE Benjamin Marie Merci", role: "Built Environment Design & Development Lead", description: "Leads spatial strategy, concept design, and development direction with a commitment to contextually integrated, sustainable, and enduring environments." },
      { name: "SHEMA BAMBI Antonella M.", role: "Strategy & Digital Systems Lead", description: "Combines expertise in IT development, strategic consultancy, and project coordination to bridge technology, operations, and business strategy—supporting digital systems, client advisory, operational planning, and data-informed development decisions that create long-term value." },
      { name: "RUKUNDO Prince", role: "Technical Delivery Lead", description: "Experienced in civil engineering, infrastructure systems, and urbanism, with a focus on technical coordination, project execution, coordinated delivery, and planning-oriented solutions that support sustainable and resilient development." },
      { name: "KANGWAGYE Sharon", role: "Project Coordination & Growth Lead", description: "Experienced in digital commerce, market strategy, and growth coordination, with a focus on strategic planning, market insight, operational alignment, and the development of initiatives that create sustainable competitive advantage." },
    ]),
    ctaKicker: "Start a conversation",
    ctaHeading: "Let’s shape an environment that endures.",
    ctaButtonLabel: "Request a Quote",
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    heroKicker: "Studio IMVO",
    heroHeading: "Built on clarity,\ncontext, and execution.",
    genesisHeading: "The Genesis of IMVO.\nIntellectu · Mens.\nVisio · Origo.",
    genesisLead: "The studio was not founded simply to draw. IMVO emerged from a rigorous technical need to merge deep contextual study (Intellectu) with execution-aware planning. We approach the built environment as an integrated system of proportion, function, material logic, and regulatory discipline.",
    genesisText: "Before form comes context. Our foundation is built on analyzing the regional landscape, the history of the site, and the operational ambition of the client. Through advanced BIM modeling and photorealistic visualization, we translate this raw data into technical documentation that guarantees sustainability, function, and long-term architectural value.",
    regionalHeading: "Designed from Kigali.\nConnected across Africa.",
    regionalText: "IMVO operates from Rwanda while supporting design, consultancy, site coordination, and development-oriented work across East, Central, and Southern African corridors.",
    cultureHeading: "A collaborative space built for technical excellence.",
    cultureText: "Our studio operates as a highly integrated unit. We believe that the strongest built environments emerge when design, technical coordination, and project management happen concurrently rather than sequentially. Our team is dedicated to constant learning, using advanced analysis and modeling tools to bring visionary concepts into reality.",
    frameworkHeading: "Built Environment Design.",
    frameworkSubheading: "The IMVO Framework from Stage 0 to Handover.",
    stages: keyed("stage", [
      { step: "01", name: "Brief & Site", description: "Zoning, ambition, and topography analysis." },
      { step: "02", name: "Concept", description: "Volumetric studies and spatial strategies." },
      { step: "03", name: "Schematic", description: "Detailed floor plans and aesthetic language." },
      { step: "04", name: "Engineering", description: "Structural, MEP, and regulatory BIM." },
      { step: "05", name: "Execution", description: "Site coordination and quality review." },
      { step: "06", name: "Handover", description: "Final delivery of the built environment ensuring absolute client satisfaction." },
    ]),
    historyHeading: "Firm History.",
    timeline: keyed("history", [
      { year: "2017", title: "Origins & Ideation", description: "Initial foundation of the studio's philosophy, establishing a core focus on structural integrity and context-driven design logic." },
      { year: "2020", title: "Registration & Operations", description: "Official registration of the company, moving from conceptual philosophy into active design modeling and structured operations." },
      { year: "2021", title: "Asian Architectural Exposure", description: "International study and immersion in major Chinese cities, including Xi'an, integrating broad urban masterplanning concepts into the firm's approach." },
      { year: "2022", title: "Middle Eastern Scaling", description: "Architectural exposure across Dubai, Sharjah, and Abu Dhabi. Absorbing advanced modernism, extreme structural scaling, and high-end commercial aesthetics." },
      { year: "2023", title: "Rwandan Execution", description: "Official commencement of large-scale operations in Rwanda, translating global design exposure into contextually sensitive, local execution." },
    ]),
    consultancyHeading: "Consultancy &\nStrategic Guidance.",
    consultancyCards: keyed("consultancy", [
      { title: "Development Feasibility", text: "Assessing land capability, project viability, and development constraints before design investment begins." },
      { title: "Zoning & Regulatory Strategy", text: "Interpreting planning controls and approval requirements to establish a clear, compliant development path." },
    ]),
    coordinationHeading: "Site Coordination &\nDesign Delivery.",
    coordinationCards: keyed("coordination", [
      { title: "Site Monitoring & Quality Review", text: "Disciplined site presence supporting material quality, workmanship review, and execution logic." },
      { title: "Contractor Coordination", text: "Acting as the bridge between the client's operational vision and construction teams, protecting design intent." },
    ]),
    teamHeading: "The design and strategy team\nbehind the work.",
    teamMembers: keyed("about-team", [
      { name: "ASINGIZWE BENJAMIN MARIE MERCI", role: "Built Environment Design & Development Lead", description: "Leads spatial strategy, concept design, and development direction — focused on clarity, context, and long-term value." },
      { name: "RUKUNDO Prince", role: "Technical Delivery Lead", description: "Leads technical delivery, site coordination, and construction planning across the project lifecycle." },
      { name: "SHEMA BAMBI Antonella M.", role: "Strategy & Digital Systems Lead", description: "Combines expertise in IT development, strategic consultancy, and project coordination." },
      { name: "KANGWAGYE Sharon", role: "Project Coordination & Growth Lead", description: "Experienced in digital commerce, market strategy, and growth coordination." },
    ]),
    reviewsHeading: "Trusted by visionaries.",
    testimonials: keyed("review", [
      { text: "I had an excellent experience with IMVO GROUP AFRICA! Their team is professional, attentive, and dedicated to outstanding service. Communication was seamless, and their commitment to quality and sustainability is impressive. Highly recommended!", author: "Eric IRANKUNDA", date: "6 months ago" },
      { text: "Working with IMVO was a moving experience. They don't just focus on the commercial aspect; their designs genuinely empower people and elevate the built environment.", author: "Peace Aime HIRWA", date: "February 2022" },
      { text: "Thank you for the amazing work you have done for us. Your attention to detail is highly appreciated!", author: "Umutoni Leon Clement", date: "March 2020" },
      { text: "It was an absolute pleasure working with the team.", author: "Nkuliye Stewart", date: "February 2021" },
      { text: "A display of absolute professionalism from concept to execution.", author: "Bahiga Jean Claude", date: "August 2020" },
      { text: "The spatial clarity and execution-aware mindset of IMVO set them apart in the region.", author: "Ukiriho Rene J Felix", date: "Client Review" },
      { text: "Their technical discipline and understanding of structural proportion gave us complete confidence.", author: "Dushime Brown", date: "Client Review" },
      { text: "A brilliant studio. The team's ability to navigate complex zoning and environmental constraints is remarkable.", author: "Lishirabake Olivier", date: "Client Review" },
      { text: "IMVO delivered a contextually sensitive design that perfectly aligned with our operational ambitions.", author: "Shema Blaise Ally", date: "Client Review" },
      { text: "High-end aesthetic merged with strict engineering standards.", author: "Ndizihiwe Alain JS", date: "Client Review" },
      { text: "From the initial site analysis to the final photorealistic visualizations, their communication was flawless.", author: "Staphord N.S", date: "Client Review" },
      { text: "A highly collaborative and innovative team. They protected the design intent through every phase of construction.", author: "Olivier Kamali", date: "Client Review" },
    ]),
    ctaHeading: "Ready to shape\nthe future together?",
    ctaText: "Initiate the IMVO design process. Let’s discuss how we can bring technical discipline and spatial clarity to your next vision.",
    ctaPrimaryLabel: "START A CONVERSATION ↗",
    ctaProjectsLabel: "EXPLORE PROJECTS ↗",
    deckLabel: "DOWNLOAD STUDIO DECK ↓",
  },
  {
    _id: "servicesPage",
    _type: "servicesPage",
    heroKicker: "IMVO Services",
    heroHeading: "Design.\nAdvise.\nCoordinate.",
    heroIntro: "IMVO guides purposeful development through built-environment design, strategic consultancy, and disciplined site coordination — connecting vision, planning, technical clarity, and execution.",
    quoteButtonLabel: "REQUEST A QUOTE ↗",
    projectsButtonLabel: "VIEW PROJECTS",
    positioningKicker: "Purposeful Development",
    positioningHeading: "Architecture should do more than occupy land.",
    positioningParagraphs: [
      "It should organize experience, respond to context, support human wellbeing, and create lasting environmental and economic value through disciplined planning and thoughtful execution.",
      "A successful project begins long before the first line is drawn. It starts by listening to the site—understanding the topography, the climate, and the specific rhythm of the surrounding community. Whether navigating complex topographical constraints like designing elevated foundations near sensitive wetland boundaries, or conducting feasibility analyses for expansive multi-use parcels, our approach remains deeply analytical.",
      "We believe that true spatial clarity emerges when a building feels inevitable to its location. By merging rigorous technical discipline with modern, lifestyle-centric aesthetics, we ensure that every structure not only meets the immediate functional needs of its users but contributes to a broader, forward-looking architectural narrative.",
    ],
    servicePillars: keyed("pillar", [
      { number: "01", title: "Built Environment Design", description: "We translate ambition into buildable environments through concept design, spatial planning, design documentation, and execution-aware detailing." },
      { number: "02", title: "Consultancy & Strategy", description: "Strategic guidance that reduces risk and unlocks development value — from site feasibility to zoning, development logic, and project positioning." },
      { number: "03", title: "Site Coordination & Delivery", description: "We support design intent through disciplined site observation, contractor coordination, quality review, and implementation support." },
    ]),
    coordinationHeading: "Design intent is protected through disciplined execution.",
    coordinationText: "Site observation, coordination, and quality awareness help ensure that what is designed can be built with clarity and responsibility.",
    strategyHeading: "Before a project is built, its direction must be understood.",
    strategyText: "IMVO supports early-stage planning, development thinking, site interpretation, acquisition guidance, and strategic design direction before costly decisions are made.",
    strategyCards: keyed("strategy", [
      { title: "Precision BIM & Immersive Visualization.", text: "We eliminate ambiguity before construction begins. Our workflow is driven by industry-leading structural BIM and immersive visualization environments." },
      { title: "Mastering local topographies.", text: "We translate complex site realities into secure development strategies. Whether engineering elevated structural foundations for wetland-adjacent topographies or conducting multi-use zoning feasibility for expansive 1+ hectare parcels in rapidly developing sectors like Kamonyi, IMVO secures the architectural footprint against environmental and regulatory risks." },
    ]),
    processHeading: "A structured process for clear decisions and responsible delivery.",
    processSteps: keyed("process", [
      { number: "01", title: "Discover", text: "We study goals, site conditions, constraints, budget realities, and stakeholder priorities." },
      { number: "02", title: "Define", text: "We clarify project direction, scope, planning logic, risks, and the strategic path forward." },
      { number: "03", title: "Develop", text: "We translate direction into spatial concepts, documentation, and buildable design." },
      { number: "04", title: "Deliver", text: "We support implementation through site coordination, delivery review, and execution discipline." },
    ]),
    ctaHeading: "Let’s define the right\nservice path for your project.",
    ctaText: "Whether you need design, consultancy, site coordination, development guidance, or acquisition support, IMVO helps structure decisions before they become costly.",
    ctaButtonLabel: "REQUEST A QUOTE ↗",
  },
  {
    _id: "contactPage",
    _type: "contactPage",
    heroKicker: "Contact",
    heroHeading: "Start with\nthe right\nconversation.",
    heroIntro: "Tell us about your project, site, ambition, timeline, and current stage. We will help define whether you need design, consultancy, site coordination, planning support, or development guidance.",
    contactDetails: keyed("contact", [
      { label: "WhatsApp", value: "Start Conversation", href: "https://wa.me/250787349257" },
      { label: "General Enquiries", value: "info@imvogroup.com", href: "mailto:info@imvogroup.com?subject=General Inquiry - IMVO" },
      { label: "Project Discussions", value: "projects@imvogroup.com", href: "mailto:projects@imvogroup.com?subject=Project Discussion - IMVO" },
      { label: "Location", value: "IMVO Group, Kigali", href: "https://maps.google.com/maps?q=-1.9235606,30.0709587&z=18" },
      { label: "Scope", value: "Rwanda · East Africa", href: "/projects" },
    ]),
    inquiryTypes: ["Built Environment Design", "Planning & Design", "Consultancy", "Site Coordination & Delivery Support", "Property Development Guidance", "Property Acquisition Guidance", "Other / Custom Scope"],
    formKicker: "Project Brief",
    formHeading: "Submit your inquiry.",
    submitLabel: "SUBMIT INQUIRY ↗",
    successKicker: "Inquiry Submitted",
    successHeading: "Brief received.",
    successText: "Your inquiry has been received by IMVO Group. Our team will review the project information and contact you through your preferred method with the most appropriate next step.",
    responseTimeText: "We typically respond within one business day",
    locationKicker: "Location",
    locationHeading: "Kigali base.\nRegional reach.",
    locationText: "IMVO Group operates from Kigali, Rwanda, supporting design, consultancy, site coordination, planning, and development-oriented projects across Rwanda and the wider East African region.",
    mapUrl: "https://maps.google.com/maps?q=-1.9235606,30.0709587&z=18&output=embed",
  },
  {
    _id: "legal-terms",
    _type: "legalPage",
    pageKind: "terms",
    kicker: "Legal",
    title: "Terms & Conditions.",
    intro: "By using this website, you agree to the following terms. The website is provided for general information about IMVO Group, our services, and our work.",
    sections: keyed("terms", [
      { heading: "Website Content", body: "All text, imagery, layouts, project descriptions, graphics, and visual materials on this website are provided for informational and presentation purposes." },
      { heading: "No Professional Agreement", body: "Submitting an inquiry, sending an email, or using this website does not create a client relationship, consultancy agreement, professional appointment, or site-coordination agreement with IMVO Group." },
      { heading: "Project Services", body: "All design, consultancy, site coordination, planning, or development guidance services are subject to separate written agreements, scope definitions, timelines, fees, and professional terms. Where professional registration is legally required, statutory submissions, certifications, and professional sign-off are undertaken only by appropriately registered practitioners." },
      { heading: "Accuracy", body: "We aim to keep website information accurate and current, but we do not guarantee that all content is complete, error-free, or continuously updated." },
      { heading: "Intellectual Property", body: "Website content, visual identity, drawings, renders, layouts, and project materials remain the property of IMVO Group or their respective rights holders unless otherwise stated." },
      { heading: "External Links", body: "This website may contain links to third-party websites. IMVO Group is not responsible for the content, policies, or practices of external websites." },
      { heading: "Contact", body: "For questions about these terms, contact us at info@imvogroup.com." },
    ]),
    lastUpdated: "Last updated: 2026",
  },
  {
    _id: "legal-privacy",
    _type: "legalPage",
    pageKind: "privacy",
    kicker: "Legal",
    title: "Privacy Policy.",
    intro: "IMVO Group respects your privacy. This Privacy Policy explains how we collect, use, and protect information submitted through our website.",
    sections: keyed("privacy", [
      { heading: "Information We Collect", body: "We may collect information you voluntarily provide through inquiry forms, email, WhatsApp, or direct communication. This may include your name, email address, phone number, project location, project details, budget range, and requested services." },
      { heading: "How We Use Information", body: "We use submitted information to respond to inquiries, understand project requirements, prepare consultations, coordinate services, and improve our communication process." },
      { heading: "Form Submissions", body: "Website inquiry submissions may be processed through third-party form delivery tools for the purpose of sending your inquiry to our studio email." },
      { heading: "Analytics & Cookies", body: "We may use basic analytics tools to understand website traffic, performance, and visitor behavior. These tools may use cookies or similar technologies." },
      { heading: "Data Protection", body: "We take reasonable steps to protect information submitted through the website. However, no online transmission or storage method is fully secure." },
      { heading: "Contact", body: "For privacy-related questions, contact us at info@imvogroup.com." },
    ]),
    lastUpdated: "Last updated: 2026",
  },
  {
    _id: "legal-cookies",
    _type: "legalPage",
    pageKind: "cookies",
    kicker: "Legal",
    title: "Cookie Policy.",
    intro: "This Cookie Policy explains how IMVO Group may use cookies and similar technologies on our website.",
    sections: keyed("cookies", [
      { heading: "What Cookies Are", body: "Cookies are small files stored on your device to help websites function, remember preferences, improve performance, and understand visitor activity." },
      { heading: "Types of Cookies We May Use", body: "We may use essential cookies for website functionality, performance cookies to improve the browsing experience, and analytics cookies to understand how visitors interact with the website." },
      { heading: "Analytics", body: "If analytics tools are enabled, they may collect general information such as page visits, device type, browser type, and approximate location. This helps us improve the website and user experience." },
      { heading: "Managing Cookies", body: "You can control or disable cookies through your browser settings. Some website features may not function as intended if cookies are disabled." },
      { heading: "Third-Party Services", body: "Some services used on this website, such as embedded maps, analytics tools, or form delivery providers, may use their own cookies or tracking technologies." },
      { heading: "Contact", body: "For cookie-related questions, contact us at info@imvogroup.com." },
    ]),
    lastUpdated: "Last updated: 2026",
  },
];

const shouldCommit = process.argv.includes("--commit");

async function main() {
  if (!shouldCommit) {
    console.log("IMVO full-site CMS seed preview");
    console.log(`Documents ready: ${documents.length}`);
    documents.forEach((document) => console.log(`  - ${document._id} (${document._type})`));
    console.log("\nNo content was changed. Run again with --commit to create missing documents.");
    return;
  }

  const client = getCliClient({ apiVersion: "2026-07-18" });
  console.log("Creating missing IMVO page documents...");

  for (const document of documents) {
    const existing = await client.getDocument(document._id);
    if (existing) {
      console.log(`  skip ${document._id} (already exists)`);
      continue;
    }

    await client.createIfNotExists(document);
    console.log(`  created ${document._id}`);
  }

  console.log("Done. Existing documents were not overwritten.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
