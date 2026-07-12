import type { ToolConfig, ToolFAQ } from "./tools";
import { blogPosts } from "./blogPosts";
import { GLOBAL_FAQS } from "./globalFaqs";
import { buildToolSeoSections } from "./toolSeoContent";
import { formatListForSeo, STANDARD_IMAGE_FORMATS } from "./formatLabels";
import {
  applyToolCopyOverrides,
  compressImageFaqs,
  howToStepsForSchema,
  type HowToStepSchema,
} from "./toolCopyOverrides";

export const COMPARISON_FEATURES = [
  { feature: "Free", suhadimg: true },
  { feature: "No signup", suhadimg: true },
  { feature: "No watermark", suhadimg: true },
  { feature: "Batch processing", suhadimg: true },
  { feature: "Fast Sharp processing", suhadimg: true },
  { feature: "Mobile friendly", suhadimg: true },
  { feature: "HTTPS secure", suhadimg: true },
  { feature: "Files deleted instantly", suhadimg: true },
  { feature: "Dark mode", suhadimg: true },
] as const;

export const TRUST_SIGNALS = [
  "100% Free",
  "HTTPS Secure",
  "No Registration",
  "Privacy First — Edge Processing",
  "Works Worldwide",
  "Instant Processing",
  "46+ Tools",
  "Built by Suhad Tech Solutions",
] as const;

export const WHY_CHOOSE_SUHADIMG = [
  "Faster than installing desktop software",
  "No installation required",
  "No signup or email needed",
  "Unlimited everyday usage",
  "Works on iPhone, Android, and desktop",
  "Clean, modern interface",
  "Dark mode for comfortable editing",
  "Secure HTTPS uploads",
  "Batch processing with ZIP download",
  "Free forever on suhadimg.site",
  "AI-powered tools where it matters",
  "100% browser-based workflow",
  "Smart default quality settings",
  "No watermark on output files",
  "Regular updates and new tools",
  "Professional Sharp-powered quality",
  "Supports modern formats (WebP, AVIF, HEIC)",
  "Beginner-friendly controls",
  "Available worldwide at suhadimg.site",
  "Developed by Suhad Tech Solutions",
] as const;

const RELATED_BY_OPERATION: Record<ToolConfig["operation"], string[]> = {
  compress: [
    "how-to-compress-images-without-losing-quality",
    "image-compression-guide",
    "best-image-format-for-websites",
    "seo-image-optimization-guide",
    "png-vs-jpg",
    "webp-vs-png",
  ],
  convert: [
    "png-vs-jpg",
    "jpeg-vs-png",
    "what-is-webp",
    "best-image-format-for-websites",
    "heic-vs-jpg",
    "webp-vs-png",
  ],
  resize: [
    "how-to-resize-images-online",
    "best-image-size-for-instagram",
    "seo-image-optimization-guide",
    "best-image-format-for-websites",
  ],
  crop: ["how-to-resize-images-online", "seo-image-optimization-guide", "png-vs-jpg"],
  rotate: ["how-to-resize-images-online", "png-vs-jpg"],
  flip: ["png-vs-jpg"],
  blur: ["seo-image-optimization-guide"],
  sharpen: ["how-to-compress-images-without-losing-quality"],
  grayscale: ["png-vs-jpg", "jpeg-vs-png"],
  brightness: ["how-to-compress-images-without-losing-quality"],
  contrast: ["how-to-compress-images-without-losing-quality"],
  removeBackground: ["best-image-format-for-websites", "png-vs-jpg"],
  upscale: ["best-image-format-for-websites"],
  watermark: ["seo-image-optimization-guide"],
  meme: ["best-image-size-for-instagram"],
  photoEdit: ["how-to-resize-images-online", "png-vs-jpg"],
  favicon: ["best-image-format-for-websites", "seo-image-optimization-guide"],
};

const ALL_FORMATS = STANDARD_IMAGE_FORMATS;

export interface IndustryUseCase {
  role: string;
  tabLabel: string;
  body: string;
}

function industryUseCases(tool: ToolConfig): IndustryUseCase[] {
  const task =
    tool.operation === "compress"
      ? "compress and optimize images"
      : tool.operation === "convert"
        ? "convert image formats"
        : tool.operation === "resize"
          ? "resize photos to exact dimensions"
          : tool.operation === "crop"
            ? "crop and frame images"
            : `use ${tool.shortTitle}`;

  return [
    {
      role: "Bloggers & content writers",
      tabLabel: "Bloggers",
      body: `Publish faster with smaller hero images and inline graphics. ${tool.title} on SUHADIMG helps bloggers ${task} before uploading to WordPress, Ghost, or Medium — improving PageSpeed scores without sacrificing clarity.`,
    },
    {
      role: "Students & teachers",
      tabLabel: "Students",
      body: `Assignments and presentations often have strict upload limits. Use SUHADIMG to ${task} for LMS portals, Google Classroom, and printable handouts — free, with no account required.`,
    },
    {
      role: "Graphic designers",
      tabLabel: "Designers",
      body: `When clients send oversized exports, designers use SUHADIMG to ${task} quickly between review rounds. Batch ZIP download keeps multi-asset projects organized.`,
    },
    {
      role: "Photographers",
      tabLabel: "Photographers",
      body: `Deliver web galleries and client previews that load fast on mobile. ${tool.title} reduces delivery size while preserving the look of your work for portfolio sites.`,
    },
    {
      role: "Web developers",
      tabLabel: "Web Developers",
      body: `Core Web Vitals and Lighthouse audits reward lean assets. Developers ${task} with SUHADIMG before deploying to production — Sharp-powered encoding you can trust.`,
    },
    {
      role: "Shopify & WooCommerce sellers",
      tabLabel: "Shopify Sellers",
      body: `Product pages with heavy images hurt conversions. Sellers ${task} for catalog thumbnails and collection banners to meet marketplace speed expectations.`,
    },
    {
      role: "WordPress users",
      tabLabel: "WordPress",
      body: `Plugins help, but pre-processing with SUHADIMG before upload prevents bloated media libraries. ${tool.title} is ideal for featured images and blog posts on suhadimg.site.`,
    },
    {
      role: "Amazon, Etsy & eBay sellers",
      tabLabel: "Marketplace Sellers",
      body: `Marketplaces enforce image rules and load times matter for mobile shoppers. ${task} to stay within listing requirements and keep storefronts snappy.`,
    },
    {
      role: "Social media managers",
      tabLabel: "Social Media",
      body: `Instagram, Facebook, LinkedIn, and TikTok each prefer right-sized files. SUHADIMG helps social teams ${task} before scheduling posts — no watermark, ever.`,
    },
    {
      role: "Digital marketers",
      tabLabel: "Marketers",
      body: `Landing pages, ads, and email campaigns depend on fast visuals. Marketers use ${tool.title} to optimize creatives for better engagement and lower bounce rates.`,
    },
    {
      role: "HR & job seekers",
      tabLabel: "Job Seekers",
      body: `Resume portals and application forms often cap attachment size. Compress or resize ID photos and portfolio samples with SUHADIMG before submitting.`,
    },
    {
      role: "Real estate agents",
      tabLabel: "Real Estate",
      body: `Property listings with dozens of photos need consistent sizing and reasonable file weights. Agents batch-process shoots with SUHADIMG for MLS uploads.`,
    },
    {
      role: "Small business owners",
      tabLabel: "Small Business",
      body: `No budget for heavy Creative Cloud seats? SUHADIMG gives owners a free way to ${task} for websites, flyers, and Google Business profiles.`,
    },
  ];
}

function richIntroduction(tool: ToolConfig): string {
  const inputs = formatListForSeo(tool.inputFormats);

  if (tool.slug === "compress-image") {
    return `SUHADIMG is a free online image compressor that lets you compress JPG, PNG, WebP, GIF, AVIF, SVG, and BMP file sizes safely without losing visual quality. Whether you are optimizing images for websites, WordPress, Shopify, email attachments, social media, online forms, or Google PageSpeed Insights, our free image compressor helps you create smaller files while maintaining excellent visual quality. No signup, no watermark, and your files are automatically deleted after processing on suhadimg.site.`;
  }

  const byOp: Partial<Record<ToolConfig["operation"], string>> = {
    compress: `SUHADIMG is a free online image optimizer that lets you compress and shrink ${inputs} files safely. It reduces the size of your images in kilobytes without quality loss for faster websites, email, and uploads. No signup or watermark, and all images are deleted instantly after download.`,
    convert: `SUHADIMG is a free online image converter that lets you convert ${inputs} images instantly in your browser. Whether you need to change formats for WordPress, Shopify, social media, or client deliverables, this tool handles batch files securely with no registration.`,
    resize: `SUHADIMG is a free online image resizer that lets you change the dimensions of your photos in pixels or percentages. Easily set exact sizes for Instagram, YouTube, passports, and websites, and prepare thumbnails without installing software.`,
    crop: `SUHADIMG is a free online image cropper that lets you crop photo boundaries visually. Perfect for profile pictures, product shots, and social posts with no watermark, batch-friendly speed, and instant file deletion.`,
    removeBackground: `SUHADIMG is a free online AI background remover that automatically isolates subjects and removes image backdrops in seconds. Ideal for e-commerce, headshots, and marketing assets, processing securely in your browser session.`,
  };

  return (
    byOp[tool.operation] ??
    `SUHADIMG is a free online image editor and utility suite that lets you process ${inputs} securely with no signup. Experience fast Sharp-powered results, batch ZIP downloads, and instant file deletion at suhadimg.site.`
  );
}

function compressionStats(): string[] {
  return [
    "Images often make up 50–70% of total page weight on content-heavy websites.",
    "Large uncompressed photos slow Largest Contentful Paint (LCP) and hurt Core Web Vitals.",
    "Smaller files improve mobile performance on slower networks worldwide.",
    "Optimized images can lower hosting bandwidth and CDN costs.",
    "Faster pages tend to keep visitors engaged and reduce bounce rates.",
  ];
}

function imageSeoBullets(): string[] {
  return [
    "Faster page loading and better user experience",
    "Improved Largest Contentful Paint (LCP) in Lighthouse audits",
    "Stronger Core Web Vitals signals for Google Search",
    "Lower bounce rates on image-heavy landing pages",
    "Reduced bandwidth for mobile visitors",
    "Better performance in PageSpeed Insights reports",
  ];
}

function extendedFaqsForTool(tool: ToolConfig): ToolFAQ[] {
  const inputs = formatListForSeo(tool.inputFormats);
  const base: ToolFAQ[] = [
    {
      question: `Can I use ${tool.title} on iPhone?`,
      answer:
        "Yes. SUHADIMG works in Safari and Chrome on iPhone and iPad — upload from Photos or Files, then download the result.",
    },
    {
      question: `Can I use ${tool.title} on Android?`,
      answer:
        "Yes. Open suhadimg.site in Chrome or Firefox on Android, tap upload, and save the processed image to your device.",
    },
    {
      question: "How long are my files stored?",
      answer:
        "They are not stored. Images are processed in temporary server memory and deleted immediately after you download.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "Generous limits apply for everyday use. Very large files may take longer; check the tool page for current maximums.",
    },
    {
      question: "Can I process multiple files at once?",
      answer:
        "Yes. Upload several images in one session and download results individually or as a ZIP archive.",
    },
    {
      question: "What browsers are supported?",
      answer:
        "Chrome, Firefox, Safari, Edge, and modern mobile browsers with JavaScript enabled.",
    },
    {
      question: "Do I need to create an account?",
      answer: "No. SUHADIMG is free with no registration required.",
    },
    {
      question: "Will SUHADIMG add a watermark?",
      answer: "Never. Output files are clean with no branding overlay.",
    },
    {
      question: "Is SUHADIMG better than desktop software for quick tasks?",
      answer:
        "For one-off compress, convert, or resize jobs, SUHADIMG is faster — no install, updates, or license dialogs.",
    },
    {
      question: "Can I use compressed images on Shopify?",
      answer:
        "Yes. Optimize product photos here before uploading to Shopify admin for faster storefront loading.",
    },
    {
      question: "Does SUHADIMG work worldwide?",
      answer:
        "Yes. suhadimg.site is available globally with localized language paths for international users.",
    },
  ];

  const byOp: Partial<Record<ToolConfig["operation"], ToolFAQ[]>> = {
    compress: [
      {
        question: "Does compression reduce image quality?",
        answer:
          "Lossy formats like JPG may show minor changes at low quality settings. Start around 80–85% for photos — often 40–70% smaller with little visible difference.",
      },
      {
        question: "What is the best JPG quality for the web?",
        answer:
          "80–90% is ideal for most websites. Use higher quality for print references; lower only when you must hit a strict KB limit.",
      },
      {
        question: "Can I compress PNG without losing transparency?",
        answer:
          "Yes. PNG compression on SUHADIMG optimizes file size while keeping transparency and lossless pixels.",
      },
      {
        question: "Can I compress GIF animations?",
        answer: "GIF is supported where listed on the tool. Animated GIFs may have limited optimization options.",
      },
      {
        question: "How do I reduce image KB for online forms?",
        answer:
          "Upload your image, set quality to 75–85%, download, and re-check the file size. Combine with resize if dimensions are larger than needed.",
      },
      {
        question: "Is this an image optimizer for WordPress?",
        answer:
          "Yes — optimize images here before uploading to WordPress media library for faster posts and better SEO.",
      },
    ],
    convert: [
      {
        question: `Which formats can I convert from ${inputs}?`,
        answer: `This page accepts ${inputs}. See supported formats section for output types.`,
      },
      {
        question: "Will converting improve image quality?",
        answer:
          "Converting cannot restore detail lost in earlier compression. Choose PNG or WebP when quality preservation matters.",
      },
      {
        question: "Can I batch convert images?",
        answer: "Yes. Upload multiple files and download all converted images as a ZIP.",
      },
    ],
    resize: [
      {
        question: "Can I lock aspect ratio when resizing?",
        answer: "Yes. Use aspect-ratio lock to avoid stretched or squashed images.",
      },
      {
        question: "What size should I use for Instagram?",
        answer:
          "Square posts: 1080×1080 px. Stories/Reels: 1080×1920 px. Use our resize-for-instagram tool for presets.",
      },
    ],
  };

  return [...tool.faqs, ...base, ...(byOp[tool.operation] ?? [])];
}

export interface EnhancedToolSeo {
  richIntroduction: string;
  sections: ReturnType<typeof buildToolSeoSections>;
  comparisonFeatures: typeof COMPARISON_FEATURES;
  trustSignals: typeof TRUST_SIGNALS;
  whyChoose: readonly string[];
  statistics: string[];
  imageSeoBullets: string[];
  showImageSeo: boolean;
  industryUseCases: IndustryUseCase[];
  supportedFormats: readonly string[];
  relatedArticles: { slug: string; title: string }[];
  allFaqs: ToolFAQ[];
  howToSteps: string[];
  howToStepsSchema: HowToStepSchema[];
}

export function buildEnhancedToolSeo(tool: ToolConfig): EnhancedToolSeo {
  const cached = enhancedSeoCache.get(tool.slug);
  if (cached) return cached;

  const sections = applyToolCopyOverrides(tool, buildToolSeoSections(tool));
  const slugs =
    RELATED_BY_OPERATION[tool.operation] ??
    ["png-vs-jpg", "best-image-format-for-websites", "seo-image-optimization-guide"];
  const relatedArticles = slugs
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter(Boolean)
    .map((p) => ({ slug: p!.slug, title: p!.title }));

  const allFaqs =
    tool.slug === "compress-image"
      ? compressImageFaqs()
      : (() => {
          const extended = extendedFaqsForTool(tool);
          const globalFaqs = GLOBAL_FAQS.filter(
            (g) => !extended.some((e) => e.question === g.question)
          );
          return [...extended, ...globalFaqs];
        })();

  const showImageSeo =
    tool.operation === "compress" ||
    tool.operation === "resize" ||
    tool.operation === "convert";

  const howToSteps = sections.steps;

  const result: EnhancedToolSeo = {
    richIntroduction: richIntroduction(tool),
    sections,
    comparisonFeatures: COMPARISON_FEATURES,
    trustSignals: TRUST_SIGNALS,
    whyChoose: WHY_CHOOSE_SUHADIMG,
    statistics:
      tool.operation === "compress" || tool.category === "compression"
        ? compressionStats()
        : [
            "Optimized images improve page speed and user satisfaction.",
            "SUHADIMG helps teams ship web-ready assets without desktop software.",
            "Privacy-first deletion supports GDPR-conscious workflows.",
          ],
    imageSeoBullets: showImageSeo ? imageSeoBullets() : [],
    showImageSeo,
    industryUseCases: industryUseCases(tool),
    supportedFormats: ALL_FORMATS,
    relatedArticles,
    allFaqs,
    howToSteps,
    howToStepsSchema: howToStepsForSchema(tool, howToSteps),
  };

  enhancedSeoCache.set(tool.slug, result);
  return result;
}

const enhancedSeoCache = new Map<string, EnhancedToolSeo>();

export function categoryBreadcrumbLabel(_tool: ToolConfig): string {
  return "Image Tools";
}
