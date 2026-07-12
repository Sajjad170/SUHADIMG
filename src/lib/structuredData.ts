import { GLOBAL_FAQS } from "./globalFaqs";
import { homeTools } from "./homepageTools";
import { COMPANY, SOCIAL_LINKS } from "./site";
import { getToolBySlug, type ToolConfig, type ToolFAQ } from "./tools";
import { buildToolSeoTitle, SITE_NAME, SITE_URL } from "./seo";

const SITE_DESCRIPTION =
  "Free image converter & editor online. Compress, resize, crop & convert JPG, PNG, WebP. Secure, no signup — SUHADIMG.";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function stripContext<T extends Record<string, unknown>>(node: T): Omit<T, "@context"> {
  const { "@context": _context, ...rest } = node;
  return rest;
}

export function organizationStub() {
  return { "@type": "Organization" as const, "@id": ORG_ID };
}

export function websiteStub() {
  return { "@type": "WebSite" as const, "@id": WEBSITE_ID };
}

export function siteRootJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [stripContext(organizationJsonLd()), stripContext(websiteJsonLd())],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
    description: SITE_DESCRIPTION,
    parentOrganization: {
      "@type": "Organization",
      "@id": `${COMPANY.url}#organization`,
      name: COMPANY.name,
      url: COMPANY.url,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: COMPANY.email,
      contactType: "customer support",
      availableLanguage: ["English"],
    },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function siteNavigationJsonLd() {
  const navLinks = [
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: "About", url: `${SITE_URL}/about` },
    { name: "All Tools", url: `${SITE_URL}/tools` },
    { name: "Contact", url: `${SITE_URL}/contact` },
    ...homeTools.slice(0, 8).map((tool) => ({
      name: tool.titlePrefix,
      url: `${SITE_URL}/${tool.slug}`,
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": navLinks.map((link, index) => ({
      "@type": "SiteNavigationElement",
      "@id": `${SITE_URL}/#nav-${index}`,
      name: link.name,
      url: link.url,
    })),
  };
}

export function homepageItemListJsonLd() {
  const itemListElement = homeTools.map((homeTool, index) => {
    const tool = getToolBySlug(homeTool.slug);
    const url = `${SITE_URL}/${homeTool.slug}`;
    const name = tool ? tool.title : homeTool.titlePrefix;
    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebPage",
        "@id": url,
        name,
        url,
        description: homeTool.description,
      },
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#featured-tools`,
    name: "SUHADIMG featured image tools",
    numberOfItems: itemListElement.length,
    itemListElement,
  };
}

export function homepageFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GLOBAL_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function toolSoftwareApplicationJsonLd(tool: ToolConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    url: `${SITE_URL}/${tool.slug}`,
    description: tool.metaDescription,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/** @deprecated Use toolSoftwareApplicationJsonLd */
export const toolWebApplicationJsonLd = toolSoftwareApplicationJsonLd;

export function toolBreadcrumbJsonLd(tool: ToolConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Image Tools",
        item: `${SITE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.shortTitle,
        item: `${SITE_URL}/${tool.slug}`,
      },
    ],
  };
}

export interface HowToStepForSchema {
  name: string;
  text: string;
}

/** Unified @graph JSON-LD for tool pages — Breadcrumb, Software, HowTo, FAQ, WebPage. */
export function toolPageJsonLdGraph(
  tool: ToolConfig,
  faqs: ToolFAQ[],
  howToSteps: HowToStepForSchema[]
) {
  const pageUrl = `${SITE_URL}/${tool.slug}`;
  const howToName =
    tool.slug === "compress-image"
      ? "How to Compress Images Online Free"
      : `How to use ${tool.title}`;

  const graph: Record<string, unknown>[] = [
    organizationStub(),
    websiteStub(),
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Image Tools",
          item: `${SITE_URL}/tools`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: tool.title,
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#software`,
      name: tool.title,
      url: pageUrl,
      description: tool.metaDescription,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web Browser",
      browserRequirements: "Requires JavaScript",
      image: `${SITE_URL}/og-image.png`,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      provider: { "@id": ORG_ID },
      isPartOf: { "@id": WEBSITE_ID },
    },
  ];

  if (howToSteps.length >= 2) {
    graph.push({
      "@type": "HowTo",
      "@id": `${pageUrl}#howto`,
      name: howToName,
      description: tool.metaDescription,
      step: howToSteps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    });
  }

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  graph.push({
    "@type": "WebPage",
    "@id": pageUrl,
    name: tool.title,
    description: tool.metaDescription,
    url: pageUrl,
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    mainEntity: { "@id": `${pageUrl}#software` },
  });

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function toolHowToJsonLd(tool: ToolConfig, steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${tool.title}`,
    description: tool.metaDescription,
    step: steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `Step ${index + 1}`,
      text,
    })),
    tool: {
      "@type": "HowToTool",
      name: "SUHADIMG web browser",
    },
  };
}

export function toolWebPageJsonLd(tool: ToolConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: tool.title,
    description: tool.metaDescription,
    url: `${SITE_URL}/${tool.slug}`,
    isPartOf: { "@id": WEBSITE_ID },
    about: {
      "@type": "Thing",
      name: tool.shortTitle,
    },
  };
}

export function toolFaqJsonLd(tool: ToolConfig, faqs?: ToolConfig["faqs"]) {
  const allFaqs = faqs ?? [...tool.faqs, ...GLOBAL_FAQS];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function allToolsItemListJsonLd(tools: ToolConfig[]) {
  const itemListElement = tools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${tool.slug}`,
      name: tool.title,
      url: `${SITE_URL}/${tool.slug}`,
      description: tool.metaDescription,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationStub(),
      websiteStub(),
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/tools#tool-list`,
        name: "All SUHADIMG image tools",
        numberOfItems: tools.length,
        itemListElement,
        isPartOf: { "@id": WEBSITE_ID },
      },
    ],
  };
}

export function homepageJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationStub(),
      websiteStub(),
      stripContext(homepageItemListJsonLd()),
      stripContext(homepageFaqJsonLd()),
      {
        "@type": "WebPage",
        "@id": SITE_URL,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": `${SITE_URL}/#featured-tools` },
      },
    ],
  };
}

export function blogPageJsonLdGraph(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
}) {
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationStub(),
      websiteStub(),
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        datePublished: post.date,
        dateModified: post.date,
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        image: {
          "@type": "ImageObject",
          url: `${SITE_URL}/og-image.png`,
          caption: "SUHADIMG blog article",
        },
        mainEntityOfPage: { "@id": url },
        articleSection: post.category,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE_URL}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: url,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": url,
        name: post.title,
        description: post.description,
        url,
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#article` },
      },
    ],
  };
}

export function blogArticleJsonLd(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
}) {
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-image.png`,
      caption: "SUHADIMG blog article",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: post.category,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function blogBreadcrumbJsonLd(post: { slug: string; title: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };
}
