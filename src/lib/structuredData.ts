import { GLOBAL_FAQS } from "./globalFaqs";
import { homeTools } from "./homepageTools";
import { COMPANY, SOCIAL_LINKS } from "./site";
import { getToolBySlug, type ToolConfig, type ToolFAQ } from "./tools";
import { buildToolSeoTitle, SITE_NAME, SITE_URL } from "./seo";

const SITE_DESCRIPTION =
  "Free image converter & editor online. Compress, resize, crop & convert JPG, PNG, WebP. Secure, no signup — SUHADIMG.";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
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
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
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
    provider: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
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

/** Unified @graph JSON-LD for tool pages — WebSite, Organization, Breadcrumb, Software, HowTo, FAQ, WebPage. */
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

  return {
    "@context": "https://schema.org",
    "@graph": [
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
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        provider: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
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
      },
      {
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
      },
      {
        "@type": "WebPage",
        "@id": pageUrl,
        name: tool.title,
        description: tool.metaDescription,
        url: pageUrl,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: { "@id": `${pageUrl}#software` },
      },
    ],
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
    isPartOf: { "@id": `${SITE_URL}/#website` },
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
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "All SUHADIMG image tools",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.title,
      url: `${SITE_URL}/${tool.slug}`,
      description: tool.metaDescription,
    })),
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
    isPartOf: { "@id": `${SITE_URL}/#website` },
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
