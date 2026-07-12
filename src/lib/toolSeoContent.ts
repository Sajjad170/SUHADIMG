import type { ToolConfig } from "./tools";
import { formatListForSeo } from "./formatLabels";

function actionVerb(tool: ToolConfig): string {
  switch (tool.operation) {
    case "convert":
      return "convert";
    case "compress":
      return "compress";
    case "resize":
      return "resize";
    case "crop":
      return "crop";
    case "rotate":
      return "rotate";
    case "removeBackground":
      return "remove backgrounds from";
    case "photoEdit":
      return "edit";
    case "watermark":
      return "watermark";
    case "meme":
      return "create memes from";
    case "upscale":
      return "upscale";
    default:
      return "process";
  }
}

function howToSteps(tool: ToolConfig): string[] {
  const verb = actionVerb(tool);
  const base = [
    `Visit the ${tool.title} page on SUHADIMG at suhadimg.site — no account needed.`,
    `Click the upload area or drag and drop your ${formatListForSeo(tool.inputFormats)} file(s). You can select multiple files for batch processing.`,
    `Review the preview and adjust settings such as quality level, width, height, rotation angle, or crop area depending on the tool.`,
    `Click the main action button (${tool.operation === "convert" ? "Convert" : "Process"}) and wait a few seconds. SUHADIMG uses the Sharp library for fast, reliable processing.`,
    `Download your finished file individually, or download all results as a ZIP when processing multiple images. Your originals are never stored on our servers.`,
  ];

  if (tool.operation === "convert") {
    base[3] = `Click Convert. Your new ${tool.outputFormat?.toUpperCase() ?? ""} file will be ready to download in seconds with no watermark applied.`;
  }

  return base;
}

function useCases(tool: ToolConfig): string[] {
  const base: Record<ToolConfig["operation"], string[]> = {
    convert: [
      "Preparing images for websites that require a specific format (JPG, PNG, WebP)",
      "Sharing iPhone HEIC photos with Windows users or email clients",
      "Converting logos from PNG to JPG for smaller email attachments",
      "Batch converting product photos for e-commerce platforms",
      "Creating WebP versions of PNG assets for faster page loads",
    ],
    compress: [
      "Reducing email attachment size without visibly harming photo quality",
      "Speeding up website load times and improving Google Core Web Vitals",
      "Meeting upload size limits on job portals, forms, and government sites",
      "Shrinking large PNG screenshots before sharing in Slack or Teams",
      "Optimizing blog images before publishing in WordPress or CMS",
    ],
    resize: [
      "Creating correctly sized Instagram, Facebook, or YouTube thumbnails",
      "Resizing passport or visa photos to official pixel dimensions",
      "Generating thumbnails for blog posts and product listings",
      "Scaling down high-resolution camera photos for web display",
      "Preparing banner images for newsletters and presentations",
    ],
    crop: [
      "Removing unwanted borders or background areas from photos",
      "Framing a subject for profile pictures and social avatars",
      "Creating square crops for Instagram grid posts",
      "Focusing on a product in catalog photography",
      "Trimming screenshots to highlight a specific UI element",
    ],
    rotate: [
      "Fixing photos taken in the wrong orientation on mobile phones",
      "Rotating scanned documents for readable PDF attachments",
      "Correcting landscape/portrait mistakes before upload",
      "Batch rotating images from a digital camera import",
    ],
    flip: [
      "Creating mirror versions of graphics for design layouts",
      "Correcting reversed text in scanned documents",
    ],
    blur: [
      "Privacy protection before sharing photos publicly",
      "Softening sensitive areas in screenshots",
    ],
    sharpen: [
      "Recovering slightly soft focus in web-ready photos",
      "Enhancing detail after downscaling large images",
    ],
    grayscale: [
      "Creating black-and-white versions for print or artistic effect",
      "Reducing file size when color is not needed",
    ],
    brightness: [
      "Quickly fixing underexposed or overexposed phone photos",
      "Balancing lighting before compressing for web",
    ],
    contrast: [
      "Making text in screenshots more readable",
      "Improving clarity of flat-looking photos",
    ],
    favicon: [
      "Generating favicons from your brand logo for websites",
      "Creating multi-size ICO files for browser tabs",
    ],
    upscale: [
      "Enlarging images for print when source resolution is limited",
      "Improving small product photos for marketplace listings",
    ],
    watermark: [
      "Protecting photography portfolios before sharing online",
      "Branding marketing images with your company name or logo",
    ],
    meme: [
      "Creating shareable memes for social media marketing",
      "Adding top and bottom text captions to images quickly",
    ],
    removeBackground: [
      "Product photos for Amazon, Shopify, or Etsy listings",
      "Profile pictures with clean transparent backgrounds",
      "Marketing materials and presentation slides",
    ],
    photoEdit: [
      "Quick social media graphics without Photoshop",
      "Adding text overlays and basic effects to photos",
      "Simple edits before posting to Instagram or Facebook",
    ],
  };

  return base[tool.operation] ?? [
    "Everyday image tasks for work, school, and personal projects",
    "Quick fixes without installing desktop software",
  ];
}

function commonMistakes(tool: ToolConfig): string[] {
  const mistakes = [
    "Forgetting to keep a backup of the original file before converting or compressing",
    "Uploading images far larger than needed instead of resizing first",
  ];

  if (tool.operation === "convert" && tool.outputFormat === "jpeg") {
    mistakes.push(
      "Expecting transparency in JPG output — use PNG or WebP if you need transparent backgrounds"
    );
  }
  if (tool.operation === "compress") {
    mistakes.push(
      "Re-compressing the same JPG multiple times, which stacks quality loss each time"
    );
  }
  if (tool.operation === "resize") {
    mistakes.push(
      "Stretching images by setting mismatched width and height without locking aspect ratio"
    );
  }
  if (tool.operation === "convert") {
    mistakes.push(
      "Assuming converting JPG to PNG will restore lost quality from earlier compression"
    );
  }

  return mistakes;
}

function benefits(tool: ToolConfig): string[] {
  const common = [
    "100% free with no watermarks or account required",
    "Privacy-first — files deleted immediately after processing",
    "Works on desktop, tablet, and mobile browsers",
    "Batch processing with ZIP download for multiple files",
    "Built by Suhad Tech Solutions — reliable infrastructure",
  ];

  const byCategory: Record<ToolConfig["category"], string[]> = {
    conversion: [
      "Convert between popular formats without installing software",
      "Ideal for web developers, designers, and social media managers",
      "Maintains good visual quality at sensible default settings",
      "Supports bulk conversion to save hours on repetitive tasks",
    ],
    compression: [
      "Reduce file size for faster websites and email attachments",
      "Adjustable quality slider to balance size vs. clarity",
      "Great for SEO — smaller images improve Core Web Vitals scores",
      "Meet strict upload limits on forms and government portals",
    ],
    resize: [
      "Set exact pixel dimensions or scale by percentage",
      "Perfect for passport photos, social posts, and thumbnails",
      "Optional aspect-ratio lock prevents stretched images",
      "Process dozens of images to the same size in one batch",
    ],
    editing: [
      "Quick edits without opening heavy desktop software",
      "Visual crop tool with live preview before download",
      "Professional-looking results in seconds, not minutes",
      "No learning curve — intuitive controls for beginners",
    ],
    advanced: [
      "AI-powered background removal runs in your browser session",
      "Creative tools for memes, watermarks, and upscaling",
      "No plugins, extensions, or desktop installs required",
      "Combine with other SUHADIMG tools in a simple workflow",
    ],
  };

  return [...byCategory[tool.category], ...common];
}

function features(tool: ToolConfig): string[] {
  const list = [
    "Drag-and-drop upload with instant image preview",
    "Batch mode — process many images in one session",
    "Dark mode for comfortable night-time editing",
    "No registration, tracking of image content, or cloud storage",
    "Mobile-responsive layout with easy-to-tap buttons",
    "Clear error messages when a file format is unsupported",
  ];

  if (tool.outputFormat) {
    list.unshift(`Optimized ${tool.outputFormat.toUpperCase()} output encoding`);
  }
  if (tool.options?.quality !== undefined || tool.operation === "compress") {
    list.unshift("Adjustable quality control for fine-tuned results");
  }
  if (tool.operation === "resize" || tool.operation === "crop") {
    list.unshift("Precise dimension controls with aspect-ratio lock");
  }
  if (tool.operation === "removeBackground") {
    list.unshift("AI-powered subject detection for clean cutouts");
  }

  return list;
}

function tips(tool: ToolConfig): string[] {
  const tips: string[] = [
    "Always keep a backup of your original file before converting or compressing.",
    "For web use, resize images to their actual display size before compressing — this saves the most bandwidth.",
    "Use descriptive file names (e.g. product-blue-widget.jpg) for better SEO when uploading to your site.",
    "Check output at 100% zoom before publishing — compression artifacts are easier to spot when zoomed in.",
  ];

  if (tool.operation === "convert" && tool.outputFormat === "jpeg") {
    tips.push(
      "Use 80–90% JPG quality for photos — the best balance of size and clarity for most websites."
    );
  }
  if (tool.operation === "compress") {
    tips.push(
      "Start at 80% quality and reduce only if the file is still too large. One careful pass beats multiple aggressive compressions."
    );
  }
  if (tool.inputFormats.includes("png") && tool.outputFormat === "jpeg") {
    tips.push(
      "Remember that JPG does not support transparency — transparent PNG areas become white when converted."
    );
  }
  if (tool.operation === "resize") {
    tips.push(
      "For passport or ID photos, verify your country's official dimension and DPI requirements before resizing."
    );
  }

  return tips;
}

function whatItDoesExtra(tool: ToolConfig): string {
  const verb = actionVerb(tool);
  const inputs = formatListForSeo(tool.inputFormats);

  if (tool.operation === "convert" && tool.outputFormat) {
    return `In practical terms, the ${tool.title} reads your ${inputs} file, decodes the pixel data, and re-encodes it as ${tool.outputFormat.toUpperCase()} using settings tuned for web and everyday use. This is useful when a platform, client, or colleague requires a specific format and you do not want to install desktop software. Because SUHADIMG runs in the cloud with in-memory processing, you get fast results on any device — Windows, Mac, Linux, Android, or iPhone — with nothing to install.`;
  }
  if (tool.operation === "compress") {
    return `Compression works by removing redundant data from your image file. For JPG and WebP, this is lossy — meaning some detail is discarded in exchange for a smaller file. Our tool lets you control how aggressive that trade-off is. For PNG, we apply optimization that reduces file size while keeping every pixel intact. This makes the ${tool.title} ideal when you need to hit a target size (under 100 KB, under 1 MB) for uploads, email, or faster websites.`;
  }
  if (tool.operation === "resize") {
    return `Resizing changes the pixel dimensions of your image — for example from 4000×3000 down to 1200×800. This dramatically reduces file size and ensures images display correctly on websites and social platforms. Our resizer can scale by exact pixels or by percentage, and you can lock the aspect ratio so subjects never look stretched or squashed.`;
  }
  if (tool.operation === "removeBackground") {
    return `Background removal detects the main subject in your photo and creates a cutout, typically saved as PNG with transparency. This is essential for e-commerce product shots, professional headshots, and marketing creatives where you need a clean subject on any background color. SUHADIMG processes your image with AI models running during your session — your photo is not stored afterward.`;
  }

  return `This tool helps you ${verb} ${inputs} files quickly and securely. Instead of a generic one-size-fits-all converter, SUHADIMG offers a dedicated page for this exact task with settings and guidance tailored to what you are trying to accomplish. That focus makes the workflow faster and the results more predictable than juggling settings inside a complex desktop app.`;
}

function whoShouldUse(tool: ToolConfig): string {
  const audiences: Record<ToolConfig["category"], string> = {
    conversion:
      "Web developers preparing assets for production, e-commerce sellers uploading product photos, students submitting assignments, and anyone who received a file in the wrong format.",
    compression:
      "Bloggers optimizing posts for speed, job seekers reducing resume photo size, real estate agents emailing property shots, and SEO specialists improving page load scores.",
    resize:
      "Social media managers sizing posts for Instagram and Facebook, travelers preparing passport photos, YouTubers creating thumbnails, and designers exporting web-ready mockups.",
    editing:
      "Content creators cropping photos for feeds, small business owners making quick marketing visuals, and teachers preparing slides and worksheets.",
    advanced:
      "Online sellers removing backgrounds from product shots, meme creators, photographers watermarking portfolios, and marketers producing shareable graphics.",
  };

  return audiences[tool.category];
}

export interface ToolSeoSections {
  introduction: string;
  whatItDoes: string;
  whoShouldUse: string;
  howToTitle: string;
  steps: string[];
  useCases: string[];
  benefits: string[];
  features: string[];
  supportedFormatsTitle: string;
  supportedFormatsBody: string;
  tips: string[];
  commonMistakes: string[];
  whyChoose: string[];
}

export function buildToolSeoSections(tool: ToolConfig): ToolSeoSections {
  const verb = actionVerb(tool);
  const inputs = formatListForSeo(tool.inputFormats);
  const output = tool.outputFormat
    ? tool.outputFormat.toUpperCase()
    : "processed output";

  const introduction = `${tool.description} This free online workflow on SUHADIMG — built by Suhad Tech Solutions — lets you ${verb} ${inputs} files in seconds with no signup or software installs. Whether you need a single export or a bulk optimization batch, this page offers focused steps, practical tips, and instant download at suhadimg.site. Unlike thin landing pages that only show an upload button, we explain what the tool does, when to use it, and how to get the best results — because useful content matters for you and for building a trustworthy resource on the web.`;

  const supportedFormatsBody = tool.outputFormat
    ? `This tool accepts ${inputs} as input and produces ${output} files optimized for everyday use. Supported uploads include common extensions for each format. You can process files one at a time or upload multiple images and download everything as a ZIP archive. SUHADIMG runs in modern browsers including Chrome, Firefox, Safari, and Edge on desktop and mobile. If a file fails to upload, check that the extension matches a supported input format and that the file is not corrupted.`
    : `This tool accepts ${inputs}. Upload a single file or batch many at once — SUHADIMG queues and processes them automatically. Output format depends on the tool (often PNG or JPG). All processing happens over HTTPS for security, and files are never written to permanent storage on our servers.`;

  return {
    introduction,
    whatItDoes: whatItDoesExtra(tool),
    whoShouldUse: whoShouldUse(tool),
    howToTitle: `How to Use ${tool.title}`,
    steps: howToSteps(tool),
    useCases: useCases(tool),
    benefits: benefits(tool),
    features: features(tool),
    supportedFormatsTitle: "Supported Formats",
    supportedFormatsBody,
    tips: tips(tool),
    commonMistakes: commonMistakes(tool),
    whyChoose: [
      "Original guides and FAQs on every tool page — not copied from other sites",
      "Built by Suhad Tech Solutions with production-grade Sharp processing",
      "No watermarks on output files, ever",
      "In-memory processing — your photos are never stored or sold",
      "46+ specialized tools: convert, compress, resize, crop, edit, and more",
      "Free blog with PNG vs JPG, WebP, compression, and SEO guides",
      "Mobile-friendly with dark mode and accessible navigation",
      "Part of suhadimg.site — a growing resource for image workflows",
    ],
  };
}
