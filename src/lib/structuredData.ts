import { GLOBAL_FAQS } from "./globalFaqs";
import { homeTools } from "./homepageTools";
import { COMPANY, SOCIAL_LINKS } from "./site";
import { CATEGORY_LABELS, getToolBySlug, type ToolConfig } from "./tools";
import { buildToolSeoTitle, SITE_NAME, SITE_URL } from "./seo";

const SITE_DESCRIPTION =
  "Convert JPG, PNG, WEBP and other image formats online for free. Fast, secure and no upload limits with SUHADIMG.";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    email: COMPANY.email,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
    description: SITE_DESCRIPTION,
    parentOrganization: {
      "@type": "Organization",
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
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SUHADIMG featured image tools",
    itemListElement: homeTools.map((homeTool, index) => {
      const tool = getToolBySlug(homeTool.slug);
      return {
        "@type": "ListItem",
        position: index + 1,
        name: tool ? buildToolSeoTitle(tool) : homeTool.titlePrefix,
        url: `${SITE_URL}/${homeTool.slug}`,
        description: homeTool.description,
      };
    }),
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
        name: CATEGORY_LABELS[tool.category],
        item: `${SITE_URL}/tools#${tool.category}`,
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

export function toolFaqJsonLd(tool: ToolConfig) {
  const allFaqs = [...tool.faqs, ...GLOBAL_FAQS];

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
