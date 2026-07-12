import type { ToolConfig, ToolFAQ } from "./tools";
import type { ToolSeoSections } from "./toolSeoContent";

/** Production-polished copy overrides for flagship tool pages. */
export function applyToolCopyOverrides(
  tool: ToolConfig,
  sections: ToolSeoSections
): ToolSeoSections {
  if (tool.slug !== "compress-image") return sections;

  return {
    ...sections,
    introduction:
      "Compress images online to drastically reduce file sizes without noticeable quality loss. Supporting modern formats like JPG, JPEG, PNG, and WebP, SUHADIMG is a free online platform engineered by Suhad Tech Solutions to help you optimize media in seconds with no software installation required. Whether you need to process a single graphic or an entire batch of images, this bulk optimization workflow delivers rapid execution and instant downloads. Unlike thin landing pages that offer nothing but an upload button, our platform provides clear context, expert optimization configurations, and reliable scaling — delivering maximum utility for users while building a trusted web resource.",
    whatItDoes:
      "Media compression works by safely removing redundant metadata and asset data. For formats like JPG and WebP, our online image reduction tool leverages lossy compression, allowing you to fine-tune the balance between file size and visual fidelity. For PNG files, we apply lossless optimization algorithms that shrink the footprint while keeping every pixel perfectly intact. This makes the workspace ideal when you need to hit strict target thresholds (such as under 100 KB or under 1 MB) for portal uploads, email attachments, or high-performance websites.",
    howToTitle: "How to Use This Tool",
    steps: [
      "Visit the Compress Image workspace on SUHADIMG at suhadimg.site — no registration or email required.",
      "Click the upload target area or drag and drop your JPG, JPEG, PNG, WebP, GIF, or SVG files. Select multiple assets simultaneously to activate the batch processing engine.",
      "Review the visual previews and adjust your optimization settings, including quality sliders, custom dimensions, rotation angles, or crop boundaries.",
      "Click the Process action button. SUHADIMG utilizes the server-side Sharp library to compress your files securely in milliseconds.",
      "Download your optimized assets individually or grab the entire batch instantly as a single compressed ZIP archive. Your original files are never retained on our servers.",
    ],
    supportedFormatsBody:
      "Our system seamlessly accepts JPG, JPEG, PNG, WebP, GIF, SVG, AVIF, BMP, TIFF, and HEIC formats. Upload single items or queue dozens of files at once; our backend pipelines process them asynchronously. Output formats adapt dynamically based on your chosen utility configuration. All data transfers take place over highly secure HTTPS encryption, and your original files are never committed to permanent server storage, protecting your digital privacy completely.",
  };
}

export function compressImageFaqs(): ToolFAQ[] {
  return [
    {
      question: "How much can I compress an image?",
      answer:
        "Depending on the original file format, you can typically reduce image file sizes by 50% to 80% without any noticeable loss in visual quality.",
    },
    {
      question: "Which formats are supported?",
      answer:
        "SUHADIMG supports a wide variety of image formats including JPG, JPEG, PNG, WebP, GIF, SVG, AVIF, BMP, TIFF, and HEIC.",
    },
    {
      question: "Will my images be stored?",
      answer:
        "No. SUHADIMG values your privacy. All file processing happens in temporary memory and your files are automatically deleted immediately after completion.",
    },
    {
      question: "Can I use Compress Image on iPhone?",
      answer:
        "Yes, our platform is fully optimized for mobile devices and works seamlessly directly inside any iPhone iOS mobile browser.",
    },
    {
      question: "Can I use Compress Image on Android?",
      answer:
        "Absolutely, SUHADIMG works smoothly on all Android smartphones and tablets without requiring any software installations.",
    },
    {
      question: "How long are my files stored?",
      answer:
        "Files are processed in real-time and wiped instantly from our edge architecture as soon as the session processing ends.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "Yes, you can upload files up to 10MB each, allowing you to optimize high-resolution digital photography effortlessly.",
    },
    {
      question: "Can I process multiple files at once?",
      answer:
        "Yes, our toolkit supports batch processing. You can upload and optimize up to 20 image files at the exact same time.",
    },
    {
      question: "What browsers are supported?",
      answer:
        "All modern, HTML5-compliant web browsers are supported, including Google Chrome, Apple Safari, Mozilla Firefox, and Microsoft Edge.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "No registration or login is required. All 46+ utilities on SUHADIMG are accessible instantly without an account.",
    },
    {
      question: "Will SUHADIMG add a watermark?",
      answer:
        "Never. All output files are clean, unbranded, and free from any watermarks, ready for professional use.",
    },
    {
      question: "Is SUHADIMG better than desktop software for quick tasks?",
      answer:
        "Yes, because it requires zero installation, loads instantly over our edge network, and processes files at high speeds using production-grade libraries.",
    },
    {
      question: "Can I use compressed images on Shopify?",
      answer:
        "Yes. Optimizing your store images reduces page weight, improves Largest Contentful Paint (LCP), and boosts your e-commerce conversion rates.",
    },
    {
      question: "Does SUHADIMG work worldwide?",
      answer:
        "Yes, our edge-ready web hosting distributions ensure rapid loading and file processing speeds for global access.",
    },
    {
      question: "Does compression reduce image quality?",
      answer:
        "For JPG and WebP, it uses smart lossy reduction which significantly cuts KB size while maintaining pristine, imperceptible visual fidelity.",
    },
    {
      question: "What is the best JPG quality for the web?",
      answer:
        "A value between 70% and 80% is the industry sweet spot, giving you massive file savings without visual distortion.",
    },
    {
      question: "Can I compress PNG without losing transparency?",
      answer:
        "Yes, our engine applies lossless structural optimizations to PNG files, saving storage space while fully keeping alpha transparency layers.",
    },
    {
      question: "Can I compress GIF animations?",
      answer:
        "Yes, our tool securely optimizes animated GIF structures to lower web performance overhead.",
    },
    {
      question: "How do I reduce image KB for online forms?",
      answer:
        "Simply drop your document scan or photo into the tool, adjust the quality target, and download a lightweight file under strict application upload limits.",
    },
    {
      question: "Is this an image optimizer for WordPress?",
      answer:
        "Yes, compressing your media assets before uploading them to WordPress avoids media library bloat and speeds up site loading times.",
    },
    {
      question: "Is SUHADIMG free to use?",
      answer:
        "Yes, SUHADIMG is entirely free to use with absolute access to all 46+ frontend image utilities.",
    },
    {
      question: "Does SUHADIMG store my images?",
      answer:
        "No, all system data pipelines process operations locally or via edge memory instances, wiping tracking footprints immediately.",
    },
    {
      question: "Can I convert multiple images at once?",
      answer:
        "Yes, batch tasks are natively supported across our compressor and converter tooling suites.",
    },
    {
      question: "Who built SUHADIMG?",
      answer:
        "SUHADIMG is engineered and maintained by the software development team at Suhad Tech Solutions.",
    },
  ];
}

export interface HowToStepSchema {
  name: string;
  text: string;
}

export function howToStepsForSchema(tool: ToolConfig, steps: string[]): HowToStepSchema[] {
  if (tool.slug === "compress-image") {
    return [
      {
        name: "Upload Files",
        text: "Drag and drop or select up to 20 images (JPG, PNG, WebP, etc.) up to 10MB each into the browse area.",
      },
      {
        name: "Adjust Quality Settings",
        text: "Set your target compression ratio using the quality percentage slider (default 70%).",
      },
      {
        name: "Process and Download",
        text: "Click Process to let the Sharp engine optimize your files, then download individually or as a ZIP file.",
      },
    ];
  }

  return steps.map((text, i) => ({
    name: `Step ${i + 1}`,
    text,
  }));
}
