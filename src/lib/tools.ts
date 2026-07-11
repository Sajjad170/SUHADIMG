export type ToolCategory =
  | "conversion"
  | "compression"
  | "resize"
  | "editing"
  | "advanced";

export type ToolOperation =
  | "convert"
  | "compress"
  | "resize"
  | "crop"
  | "rotate"
  | "flip"
  | "blur"
  | "sharpen"
  | "grayscale"
  | "brightness"
  | "contrast"
  | "favicon"
  | "upscale"
  | "watermark"
  | "meme"
  | "removeBackground"
  | "photoEdit";

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolConfig {
  slug: string;
  title: string;
  shortTitle: string;
  /** Compelling search-result title (iLoveIMG-style). Used as the page title when set. */
  seoTitle?: string;
  description: string;
  metaDescription: string;
  category: ToolCategory;
  operation: ToolOperation;
  inputFormats: string[];
  outputFormat?: string;
  popular?: boolean;
  featured?: boolean;
  options?: {
    quality?: number;
    width?: number;
    height?: number;
    rotate?: number;
    flip?: "horizontal" | "vertical";
    blur?: number;
    sharpen?: number;
    brightness?: number;
    contrast?: number;
    faviconSizes?: number[];
  };
  faqs: ToolFAQ[];
  relatedSlugs: string[];
}

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  conversion: "Image Conversion",
  compression: "Image Compression",
  resize: "Resize Image",
  editing: "Image Editing",
  advanced: "Advanced Tools",
};

export const tools: ToolConfig[] = [
  {
    slug: "png-to-jpg",
    title: "PNG to JPG Converter",
    shortTitle: "PNG → JPG",
    description:
      "Convert PNG images to JPG format online for free. Reduce file size while maintaining good quality — perfect for web uploads and email.",
    metaDescription:
      "Free online PNG to JPG converter. Convert PNG to JPEG instantly with no watermark. Fast, secure, and private — files are deleted after processing.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["png"],
    outputFormat: "jpeg",
    popular: true,
    featured: true,
    faqs: [
      {
        question: "Will converting PNG to JPG reduce quality?",
        answer:
          "JPG uses lossy compression, so some quality may be lost compared to PNG. For photos and web use, the difference is usually minimal at 85–90% quality.",
      },
      {
        question: "Does PNG transparency work in JPG?",
        answer:
          "No. JPG does not support transparency. Transparent areas will be filled with a white background during conversion.",
      },
      {
        question: "Is this PNG to JPG converter free?",
        answer:
          "Yes, completely free with no watermarks, no signup, and unlimited conversions.",
      },
    ],
    relatedSlugs: ["jpg-to-png", "png-to-webp", "compress-jpg"],
  },
  {
    slug: "jpg-to-png",
    title: "JPG to PNG Converter",
    shortTitle: "JPG → PNG",
    description:
      "Convert JPG/JPEG images to PNG format online. Ideal when you need lossless quality or transparency support.",
    metaDescription:
      "Free JPG to PNG converter. Convert JPEG to PNG online instantly — fast, secure, no watermark.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["jpeg", "jpg"],
    outputFormat: "png",
    popular: true,
    featured: true,
    faqs: [
      {
        question: "Will JPG to PNG improve image quality?",
        answer:
          "Converting JPG to PNG won't restore lost detail from JPG compression, but PNG prevents further quality loss when editing.",
      },
      {
        question: "Will the file size increase?",
        answer:
          "Yes, PNG files are typically larger than JPG because PNG uses lossless compression.",
      },
      {
        question: "Can I convert multiple JPG files at once?",
        answer: "Yes, batch conversion is supported. Upload multiple files and download all results as a ZIP.",
      },
    ],
    relatedSlugs: ["png-to-jpg", "jpeg-to-png", "compress-png"],
  },
  {
    slug: "jpeg-to-png",
    title: "JPEG to PNG Converter",
    shortTitle: "JPEG → PNG",
    description: "Convert JPEG images to PNG format online for free with instant results.",
    metaDescription: "Free JPEG to PNG converter online. No signup, no watermark, privacy-first processing.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["jpeg", "jpg"],
    outputFormat: "png",
    popular: true,
    faqs: [
      {
        question: "Is JPEG the same as JPG?",
        answer: "Yes, JPEG and JPG are the same format. This tool accepts both extensions.",
      },
      {
        question: "Why convert JPEG to PNG?",
        answer:
          "PNG is better for graphics, logos, and images that need transparency or lossless editing.",
      },
      {
        question: "Are my files stored on your server?",
        answer: "No. Files are processed in memory and deleted immediately after download.",
      },
    ],
    relatedSlugs: ["jpg-to-png", "png-to-jpg", "webp-to-png"],
  },
  {
    slug: "png-to-jpeg",
    title: "PNG to JPEG Converter",
    shortTitle: "PNG → JPEG",
    description: "Convert PNG to JPEG online. Smaller file sizes for faster websites and easier sharing.",
    metaDescription: "Convert PNG to JPEG free online. Fast, secure PNG to JPEG converter with batch support.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["png"],
    outputFormat: "jpeg",
    faqs: [
      {
        question: "What's the difference between JPG and JPEG?",
        answer: "There is no difference — JPG and JPEG are the same image format.",
      },
      {
        question: "What quality setting is used?",
        answer: "We use 90% quality by default for a good balance of size and visual quality.",
      },
      {
        question: "Can I convert PNG with transparency?",
        answer: "Yes, but transparent areas will become white in the JPEG output.",
      },
    ],
    relatedSlugs: ["png-to-jpg", "png-to-webp", "compress-jpeg"],
  },
  {
    slug: "jpg-to-webp",
    title: "JPG to WebP Converter",
    shortTitle: "JPG → WebP",
    description:
      "Convert JPG to WebP for smaller file sizes and faster page loads. WebP offers excellent compression for the web.",
    metaDescription: "Free JPG to WebP converter. Convert JPEG to WebP online — smaller files, great quality.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["jpeg", "jpg"],
    outputFormat: "webp",
    popular: true,
    faqs: [
      {
        question: "Why use WebP instead of JPG?",
        answer:
          "WebP typically produces 25–35% smaller files than JPG at similar visual quality, improving website speed.",
      },
      {
        question: "Is WebP supported everywhere?",
        answer: "WebP is supported by all modern browsers including Chrome, Firefox, Safari, and Edge.",
      },
      {
        question: "Does WebP support transparency?",
        answer: "Yes, WebP supports transparency unlike standard JPG.",
      },
    ],
    relatedSlugs: ["webp-to-jpg", "png-to-webp", "compress-webp"],
  },
  {
    slug: "webp-to-jpg",
    title: "WebP to JPG Converter",
    shortTitle: "WebP → JPG",
    description: "Convert WebP images to JPG/JPEG format for universal compatibility.",
    metaDescription: "Free WebP to JPG converter online. Convert WebP to JPEG instantly with no watermark.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["webp"],
    outputFormat: "jpeg",
    popular: true,
    featured: true,
    faqs: [
      {
        question: "Why convert WebP to JPG?",
        answer:
          "Some older software, email clients, and print services don't support WebP. JPG works everywhere.",
      },
      {
        question: "Will I lose quality converting WebP to JPG?",
        answer: "Some minor quality loss may occur due to JPG's lossy compression.",
      },
      {
        question: "Can I batch convert WebP files?",
        answer: "Yes, upload multiple WebP files and download all converted JPGs as a ZIP.",
      },
    ],
    relatedSlugs: ["jpg-to-webp", "webp-to-png", "png-to-jpg"],
  },
  {
    slug: "png-to-webp",
    title: "PNG to WebP Converter",
    shortTitle: "PNG → WebP",
    description: "Convert PNG to WebP for dramatically smaller file sizes while keeping transparency.",
    metaDescription: "Free PNG to WebP converter. Reduce PNG file size for faster websites.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["png"],
    outputFormat: "webp",
    popular: true,
    faqs: [
      {
        question: "Does WebP keep PNG transparency?",
        answer: "Yes, WebP supports alpha transparency just like PNG.",
      },
      {
        question: "How much smaller is WebP vs PNG?",
        answer: "WebP is typically 25–50% smaller than PNG for similar visual quality.",
      },
      {
        question: "Is this tool free?",
        answer: "Yes, 100% free with no limits or watermarks.",
      },
    ],
    relatedSlugs: ["webp-to-png", "png-to-jpg", "compress-webp"],
  },
  {
    slug: "webp-to-png",
    title: "WebP to PNG Converter",
    shortTitle: "WebP → PNG",
    description: "Convert WebP images to PNG for editing in software that doesn't support WebP.",
    metaDescription: "Free WebP to PNG converter online. Instant conversion, privacy-first.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["webp"],
    outputFormat: "png",
    faqs: [
      {
        question: "When should I use PNG over WebP?",
        answer: "Use PNG when you need lossless editing or compatibility with design tools.",
      },
      {
        question: "Will file size increase?",
        answer: "Yes, PNG files are usually larger than WebP.",
      },
      {
        question: "Is transparency preserved?",
        answer: "Yes, PNG preserves WebP transparency.",
      },
    ],
    relatedSlugs: ["png-to-webp", "webp-to-jpg", "png-to-jpg"],
  },
  {
    slug: "heic-to-jpg",
    title: "HEIC to JPG Converter",
    shortTitle: "HEIC → JPG",
    description:
      "Convert iPhone HEIC photos to JPG format. Share Apple photos with any device or platform.",
    metaDescription: "Free HEIC to JPG converter. Convert iPhone photos to JPEG online instantly.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["heic", "heif"],
    outputFormat: "jpeg",
    popular: true,
    featured: true,
    faqs: [
      {
        question: "What is HEIC?",
        answer:
          "HEIC (High Efficiency Image Container) is Apple's default photo format on iPhones, offering better compression than JPG.",
      },
      {
        question: "Why can't I open HEIC on Windows?",
        answer:
          "Windows and many apps don't natively support HEIC. Converting to JPG makes photos universally viewable.",
      },
      {
        question: "Is EXIF data preserved?",
        answer: "Basic image data is converted. Some metadata may not transfer depending on the source file.",
      },
    ],
    relatedSlugs: ["jpg-to-png", "compress-jpg", "avif-to-jpg"],
  },
  {
    slug: "avif-to-jpg",
    title: "AVIF to JPG Converter",
    shortTitle: "AVIF → JPG",
    description: "Convert AVIF images to JPG for broad compatibility across devices and applications.",
    metaDescription: "Free AVIF to JPG converter online. Convert AVIF to JPEG with no watermark.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["avif"],
    outputFormat: "jpeg",
    popular: true,
    faqs: [
      {
        question: "What is AVIF?",
        answer:
          "AVIF is a modern image format offering excellent compression, used by some websites and browsers.",
      },
      {
        question: "Why convert AVIF to JPG?",
        answer: "JPG works in virtually all apps, social media, and email clients.",
      },
      {
        question: "Will quality be good?",
        answer: "Yes, we convert at high quality to preserve as much detail as possible.",
      },
    ],
    relatedSlugs: ["heic-to-jpg", "webp-to-jpg", "jpg-to-webp"],
  },
  {
    slug: "bmp-to-png",
    title: "BMP to PNG Converter",
    shortTitle: "BMP → PNG",
    description: "Convert BMP bitmap images to PNG for smaller file sizes and web compatibility.",
    metaDescription: "Free BMP to PNG converter online. Convert bitmap to PNG instantly.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["bmp"],
    outputFormat: "png",
    faqs: [
      {
        question: "Why convert BMP to PNG?",
        answer: "PNG files are much smaller and widely supported on the web.",
      },
      {
        question: "Is BMP lossless?",
        answer: "Yes, BMP is uncompressed. PNG compresses without quality loss.",
      },
      {
        question: "Can I convert multiple BMP files?",
        answer: "Yes, batch conversion is supported.",
      },
    ],
    relatedSlugs: ["png-to-jpg", "tiff-to-jpg", "gif-to-png"],
  },
  {
    slug: "tiff-to-jpg",
    title: "TIFF to JPG Converter",
    shortTitle: "TIFF → JPG",
    description: "Convert TIFF images to JPG for easier sharing and smaller file sizes.",
    metaDescription: "Free TIFF to JPG converter. Convert TIF/TIFF to JPEG online.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["tiff", "tif"],
    outputFormat: "jpeg",
    faqs: [
      {
        question: "What is TIFF used for?",
        answer: "TIFF is common in printing and professional photography due to high quality and layers.",
      },
      {
        question: "Will I lose quality?",
        answer: "JPG uses lossy compression, so some quality may be lost. For web sharing, this is usually fine.",
      },
      {
        question: "Does this support multi-page TIFF?",
        answer: "Currently only the first page/frame is converted.",
      },
    ],
    relatedSlugs: ["bmp-to-png", "png-to-jpg", "compress-jpg"],
  },
  {
    slug: "gif-to-png",
    title: "GIF to PNG Converter",
    shortTitle: "GIF → PNG",
    description: "Convert GIF images to PNG. Extract a static frame or convert simple GIFs to PNG format.",
    metaDescription: "Free GIF to PNG converter online. Convert animated GIF first frame to PNG.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["gif"],
    outputFormat: "png",
    faqs: [
      {
        question: "Does this convert animated GIFs?",
        answer: "Animated GIFs are converted using the first frame as a static PNG.",
      },
      {
        question: "Why convert GIF to PNG?",
        answer: "PNG offers better color quality and smaller size for static images.",
      },
      {
        question: "Is transparency preserved?",
        answer: "Yes, GIF transparency is preserved in the PNG output.",
      },
    ],
    relatedSlugs: ["png-to-jpg", "webp-to-png", "compress-png"],
  },
  {
    slug: "svg-to-png",
    title: "SVG to PNG Converter",
    shortTitle: "SVG → PNG",
    description: "Rasterize SVG vector graphics to PNG at high resolution for use anywhere.",
    metaDescription: "Free SVG to PNG converter. Convert SVG to PNG online at custom size.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["svg"],
    outputFormat: "png",
    faqs: [
      {
        question: "What resolution is used?",
        answer: "SVG is rendered at 1024px on the longest side by default for crisp output.",
      },
      {
        question: "Can I convert complex SVGs?",
        answer: "Most standard SVGs work. Very complex files with external references may have limitations.",
      },
      {
        question: "Why convert SVG to PNG?",
        answer: "PNG works in apps and platforms that don't support vector SVG files.",
      },
    ],
    relatedSlugs: ["svg-to-jpg", "png-to-webp", "favicon-generator"],
  },
  {
    slug: "svg-to-jpg",
    title: "SVG to JPG Converter",
    shortTitle: "SVG → JPG",
    description: "Convert SVG vector files to JPG raster images for universal compatibility.",
    metaDescription: "Free SVG to JPG converter online. Rasterize SVG to JPEG instantly.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["svg"],
    outputFormat: "jpeg",
    faqs: [
      {
        question: "Will the background be white?",
        answer: "Yes, JPG doesn't support transparency, so the background is white.",
      },
      {
        question: "What size is the output?",
        answer: "SVG is rendered at 1024px on the longest side for good quality.",
      },
      {
        question: "Is this free?",
        answer: "Yes, completely free with no watermarks.",
      },
    ],
    relatedSlugs: ["svg-to-png", "png-to-jpg", "webp-to-jpg"],
  },
  {
    slug: "ico-generator",
    title: "ICO Generator",
    shortTitle: "ICO Generator",
    description: "Generate ICO icon files from any image. Perfect for Windows app icons and favicons.",
    metaDescription: "Free ICO generator online. Create .ico files from PNG or JPG images.",
    category: "conversion",
    operation: "favicon",
    inputFormats: ["png", "jpeg", "jpg", "webp"],
    outputFormat: "png",
    options: { faviconSizes: [16, 32, 48] },
    faqs: [
      {
        question: "What sizes are included in the ICO?",
        answer: "The ICO includes 16×16, 32×32, and 48×48 pixel versions.",
      },
      {
        question: "Can I use any image?",
        answer: "Yes, upload PNG, JPG, or WebP and we'll create a multi-size ICO file.",
      },
      {
        question: "What's the difference from favicon generator?",
        answer: "ICO generator creates Windows .ico files. Favicon generator creates web favicon packages.",
      },
    ],
    relatedSlugs: ["favicon-generator", "png-to-jpg", "resize-image"],
  },
  {
    slug: "favicon-generator",
    title: "Favicon Generator",
    shortTitle: "Favicon Generator",
    description: "Create favicon PNG files in standard sizes (16, 32, 180px) from any image.",
    metaDescription: "Free favicon generator. Create website favicons from your logo or image.",
    category: "conversion",
    operation: "favicon",
    inputFormats: ["png", "jpeg", "jpg", "webp", "svg"],
    outputFormat: "png",
    options: { faviconSizes: [16, 32, 180] },
    popular: true,
    faqs: [
      {
        question: "What sizes are generated?",
        answer: "16×16, 32×32, and 180×180 (Apple touch icon) PNG files in a ZIP download.",
      },
      {
        question: "How do I add favicon to my website?",
        answer:
          "Upload the files to your site root and add link tags in your HTML head section.",
      },
      {
        question: "Can I use a logo?",
        answer: "Yes, square logos work best. We'll resize your image to each favicon size.",
      },
    ],
    relatedSlugs: ["ico-generator", "svg-to-png", "resize-image"],
  },
  {
    slug: "compress-image",
    title: "Compress Image",
    shortTitle: "Compress Image",
    seoTitle: "Easily compress images at optimal quality in seconds.",
    description:
      "Compress images online to reduce file size without noticeable quality loss. Supports JPG, PNG, and WebP.",
    metaDescription:
      "Choose multiple JPG, PNG or GIF images and compress them in seconds for free! Shrink file size with ease in just a few clicks.",
    category: "compression",
    operation: "compress",
    inputFormats: ["jpeg", "jpg", "png", "webp", "gif", "svg"],
    popular: true,
    featured: true,
    options: { quality: 70 },
    faqs: [
      {
        question: "How much can I compress an image?",
        answer: "Typically 40–70% size reduction with minimal visible quality loss at 80% quality.",
      },
      {
        question: "Which formats are supported?",
        answer: "JPG, JPEG, PNG, and WebP compression are supported.",
      },
      {
        question: "Will my images be stored?",
        answer: "No. Images are processed in memory and deleted immediately.",
      },
    ],
    relatedSlugs: ["compress-jpg", "compress-png", "resize-image"],
  },
  {
    slug: "compress-jpg",
    title: "Compress JPG",
    shortTitle: "Compress JPG",
    description: "Reduce JPG/JPEG file size online. Optimize photos for web, email, and faster uploads.",
    metaDescription: "Free JPG compressor. Reduce JPEG file size online without watermark.",
    category: "compression",
    operation: "compress",
    inputFormats: ["jpeg", "jpg"],
    options: { quality: 75 },
    popular: true,
    faqs: [
      {
        question: "What's the best quality setting for web?",
        answer: "75–85% quality is ideal for web — good visual quality with significant size savings.",
      },
      {
        question: "Can I compress multiple JPGs?",
        answer: "Yes, batch compress and download all files as a ZIP.",
      },
      {
        question: "Is compression lossy?",
        answer: "Yes, JPG compression is lossy, but at 75%+ quality the difference is barely visible.",
      },
    ],
    relatedSlugs: ["compress-image", "compress-jpeg", "jpg-to-webp"],
  },
  {
    slug: "compress-png",
    title: "Compress PNG",
    shortTitle: "Compress PNG",
    description: "Compress PNG images online. Reduce PNG file size with optimized compression settings.",
    metaDescription: "Free PNG compressor online. Reduce PNG file size while keeping transparency.",
    category: "compression",
    operation: "compress",
    inputFormats: ["png"],
    options: { quality: 70 },
    faqs: [
      {
        question: "Does PNG compression lose quality?",
        answer: "We use lossless PNG optimization first, then optional quality reduction for smaller sizes.",
      },
      {
        question: "Is transparency preserved?",
        answer: "Yes, PNG transparency is fully preserved.",
      },
      {
        question: "How much smaller will my PNG be?",
        answer: "Results vary — typically 20–60% reduction depending on the original image.",
      },
    ],
    relatedSlugs: ["compress-image", "png-to-webp", "png-to-jpg"],
  },
  {
    slug: "compress-webp",
    title: "Compress WebP",
    shortTitle: "Compress WebP",
    description: "Compress WebP images further for even faster website loading times.",
    metaDescription: "Free WebP compressor. Reduce WebP file size online instantly.",
    category: "compression",
    operation: "compress",
    inputFormats: ["webp"],
    options: { quality: 75 },
    faqs: [
      {
        question: "Why compress WebP further?",
        answer: "Even WebP can be optimized further for maximum page speed gains.",
      },
      {
        question: "What quality is used?",
        answer: "Default is 75% — adjust in the tool settings before processing.",
      },
      {
        question: "Is batch compression supported?",
        answer: "Yes, upload multiple WebP files at once.",
      },
    ],
    relatedSlugs: ["compress-image", "jpg-to-webp", "png-to-webp"],
  },
  {
    slug: "compress-jpeg",
    title: "Compress JPEG",
    shortTitle: "Compress JPEG",
    description: "Reduce JPEG file size online. Perfect for optimizing photos before uploading.",
    metaDescription: "Free JPEG compressor online. Shrink JPEG files without visible quality loss.",
    category: "compression",
    operation: "compress",
    inputFormats: ["jpeg", "jpg"],
    options: { quality: 75 },
    faqs: [
      {
        question: "Is JPEG the same as JPG?",
        answer: "Yes, JPEG and JPG are identical formats.",
      },
      {
        question: "Will EXIF data be removed?",
        answer: "Compression may strip some metadata to reduce file size.",
      },
      {
        question: "Can I use this for email attachments?",
        answer: "Absolutely — compressing JPEGs makes them easier to send via email.",
      },
    ],
    relatedSlugs: ["compress-jpg", "compress-image", "jpg-to-webp"],
  },
  {
    slug: "resize-image",
    title: "Resize Image",
    shortTitle: "Resize Image",
    seoTitle: "Resize multiple images at once!",
    description:
      "Resize images online to custom dimensions. Maintain aspect ratio or set exact width and height.",
    metaDescription:
      "Resize multiple JPG, PNG, SVG or GIF images in seconds easily and for free. Bulk resize images by defining pixels or percentages.",
    category: "resize",
    operation: "resize",
    inputFormats: ["jpeg", "jpg", "png", "webp", "gif", "bmp", "tiff", "tif", "svg"],
    popular: true,
    featured: true,
    faqs: [
      {
        question: "Can I resize without losing quality?",
        answer: "Downscaling maintains good quality. Upscaling may appear softer since no new detail is added.",
      },
      {
        question: "Can I maintain aspect ratio?",
        answer: "Yes, enter width OR height and aspect ratio is preserved automatically.",
      },
      {
        question: "What formats are supported?",
        answer: "JPG, PNG, WebP, GIF, BMP, and TIFF resizing are supported.",
      },
    ],
    relatedSlugs: ["crop-image", "compress-image", "resize-for-instagram"],
  },
  {
    slug: "resize-for-instagram",
    title: "Resize for Instagram",
    shortTitle: "Instagram",
    description: "Resize images to Instagram's recommended 1080×1080 square post size.",
    metaDescription: "Resize images for Instagram posts. Free Instagram image resizer 1080x1080.",
    category: "resize",
    operation: "resize",
    inputFormats: ["jpeg", "jpg", "png", "webp"],
    options: { width: 1080, height: 1080 },
    popular: true,
    faqs: [
      {
        question: "What size does Instagram recommend?",
        answer: "1080×1080 pixels for square posts, which is the most common format.",
      },
      {
        question: "Will my image be cropped?",
        answer: "The image is resized to fit within 1080×1080 while maintaining aspect ratio.",
      },
      {
        question: "Does this work for Stories?",
        answer: "For Stories (1080×1920), use our TikTok resize tool.",
      },
    ],
    relatedSlugs: ["resize-for-facebook", "resize-image", "crop-image"],
  },
  {
    slug: "resize-for-facebook",
    title: "Resize for Facebook",
    shortTitle: "Facebook",
    description: "Resize images to Facebook's recommended 1200×630 link preview size.",
    metaDescription: "Free Facebook image resizer. Resize to 1200x630 for Facebook posts.",
    category: "resize",
    operation: "resize",
    inputFormats: ["jpeg", "jpg", "png", "webp"],
    options: { width: 1200, height: 630 },
    faqs: [
      {
        question: "What size works best for Facebook?",
        answer: "1200×630 pixels is ideal for link previews and shared images.",
      },
      {
        question: "Will quality be good on mobile?",
        answer: "Yes, 1200px width ensures sharp display on all devices.",
      },
      {
        question: "Can I batch resize?",
        answer: "Yes, upload multiple images and download as ZIP.",
      },
    ],
    relatedSlugs: ["resize-for-instagram", "resize-for-linkedin", "resize-image"],
  },
  {
    slug: "resize-for-youtube-thumbnail",
    title: "Resize for YouTube Thumbnail",
    shortTitle: "YouTube",
    description: "Resize images to YouTube's 1280×720 thumbnail dimensions.",
    metaDescription: "Free YouTube thumbnail resizer. Resize to 1280x720 for YouTube.",
    category: "resize",
    operation: "resize",
    inputFormats: ["jpeg", "jpg", "png", "webp"],
    options: { width: 1280, height: 720 },
    popular: true,
    faqs: [
      {
        question: "What size are YouTube thumbnails?",
        answer: "1280×720 pixels (16:9 aspect ratio) is YouTube's recommended size.",
      },
      {
        question: "What file format should I use?",
        answer: "JPG, PNG, or WebP all work. PNG is best if you need text overlays.",
      },
      {
        question: "Is there a file size limit on YouTube?",
        answer: "YouTube accepts thumbnails up to 2MB. Use our compress tool if needed.",
      },
    ],
    relatedSlugs: ["resize-image", "compress-jpg", "crop-image"],
  },
  {
    slug: "resize-for-linkedin",
    title: "Resize for LinkedIn",
    shortTitle: "LinkedIn",
    description: "Resize images to LinkedIn's recommended 1200×627 post size.",
    metaDescription: "Free LinkedIn image resizer. Resize to 1200x627 for LinkedIn posts.",
    category: "resize",
    operation: "resize",
    inputFormats: ["jpeg", "jpg", "png", "webp"],
    options: { width: 1200, height: 627 },
    faqs: [
      {
        question: "What size for LinkedIn posts?",
        answer: "1200×627 pixels is recommended for shared link images and posts.",
      },
      {
        question: "Does this work for LinkedIn banners?",
        answer: "Profile banners use 1584×396 — use custom resize for that size.",
      },
      {
        question: "Is batch resize supported?",
        answer: "Yes, resize multiple images at once.",
      },
    ],
    relatedSlugs: ["resize-for-facebook", "resize-for-x", "resize-image"],
  },
  {
    slug: "resize-for-x",
    title: "Resize for X (Twitter)",
    shortTitle: "X / Twitter",
    description: "Resize images to X (Twitter) recommended 1600×900 in-stream photo size.",
    metaDescription: "Free X Twitter image resizer. Resize to 1600x900 for Twitter posts.",
    category: "resize",
    operation: "resize",
    inputFormats: ["jpeg", "jpg", "png", "webp"],
    options: { width: 1600, height: 900 },
    faqs: [
      {
        question: "What size for X/Twitter images?",
        answer: "1600×900 pixels (16:9) displays best in the X timeline.",
      },
      {
        question: "What about X header images?",
        answer: "Header images are 1500×500 — use custom resize for that.",
      },
      {
        question: "Can I compress after resizing?",
        answer: "Yes, use our compress JPG tool after resizing for faster uploads.",
      },
    ],
    relatedSlugs: ["resize-for-facebook", "resize-for-linkedin", "compress-jpg"],
  },
  {
    slug: "resize-for-tiktok",
    title: "Resize for TikTok",
    shortTitle: "TikTok",
    description: "Resize images to TikTok's 1080×1920 vertical video cover size.",
    metaDescription: "Free TikTok image resizer. Resize to 1080x1920 vertical format.",
    category: "resize",
    operation: "resize",
    inputFormats: ["jpeg", "jpg", "png", "webp"],
    options: { width: 1080, height: 1920 },
    faqs: [
      {
        question: "What size for TikTok covers?",
        answer: "1080×1920 pixels (9:16 vertical) is standard for TikTok.",
      },
      {
        question: "Does this work for Instagram Stories too?",
        answer: "Yes, Instagram Stories also use 1080×1920 vertical format.",
      },
      {
        question: "Will my image be cropped?",
        answer: "Images are resized to fit within the dimensions while preserving aspect ratio.",
      },
    ],
    relatedSlugs: ["resize-for-instagram", "resize-image", "crop-image"],
  },
  {
    slug: "crop-image",
    title: "Crop Image",
    shortTitle: "Crop Image",
    seoTitle: "Crop JPG, PNG or GIF by defining a rectangle in pixels.",
    description: "Crop images online to remove unwanted areas or focus on a specific region.",
    metaDescription:
      "Crop JPG, PNG, or GIFs with ease. Choose pixels to define your rectangle or use our visual editor — free and instant.",
    category: "editing",
    operation: "crop",
    inputFormats: ["jpeg", "jpg", "png", "webp", "gif", "bmp"],
    popular: true,
    featured: true,
    faqs: [
      {
        question: "How do I select the crop area?",
        answer: "Use the interactive crop tool to drag and select the area you want to keep.",
      },
      {
        question: "Can I crop to exact dimensions?",
        answer: "Yes, enter specific width and height for precise cropping.",
      },
      {
        question: "Is the original file saved?",
        answer: "No, we never store your files. Everything is processed in memory.",
      },
    ],
    relatedSlugs: ["resize-image", "rotate-image", "flip-image"],
  },
  {
    slug: "rotate-image",
    title: "Rotate Image",
    shortTitle: "Rotate Image",
    seoTitle: "Rotate multiple JPG, PNG or GIF images at once.",
    description: "Rotate images 90°, 180°, or 270° online. Fix orientation instantly.",
    metaDescription:
      "Rotate many JPG, PNG or GIF images at the same time. Choose 90°, 180°, or 270° — free, fast, and no signup.",
    category: "editing",
    operation: "rotate",
    inputFormats: ["jpeg", "jpg", "png", "webp", "gif", "bmp", "tiff", "tif"],
    popular: true,
    faqs: [
      {
        question: "Can I rotate by custom angles?",
        answer: "Currently 90°, 180°, and 270° rotation are supported for lossless results.",
      },
      {
        question: "Will rotation reduce quality?",
        answer: "90° rotations are lossless for JPG and PNG. No quality is lost.",
      },
      {
        question: "Can I batch rotate?",
        answer: "Yes, rotate multiple images at the same angle in one go.",
      },
    ],
    relatedSlugs: ["flip-image", "crop-image", "resize-image"],
  },
  {
    slug: "flip-image",
    title: "Flip Image",
    shortTitle: "Flip Image",
    description: "Flip images horizontally or vertically online. Mirror photos instantly.",
    metaDescription: "Free online image flipper. Flip JPG, PNG horizontally or vertically.",
    category: "editing",
    operation: "flip",
    inputFormats: ["jpeg", "jpg", "png", "webp", "gif", "bmp"],
    faqs: [
      {
        question: "What's the difference between flip and rotate?",
        answer: "Flip mirrors the image (like a reflection). Rotate turns the image clockwise.",
      },
      {
        question: "Is flipping lossless?",
        answer: "Yes, flipping does not reduce image quality.",
      },
      {
        question: "Can I flip and rotate together?",
        answer: "Process flip first, then use the rotate tool on the result.",
      },
    ],
    relatedSlugs: ["rotate-image", "crop-image", "resize-image"],
  },
  {
    slug: "blur-image",
    title: "Blur Image",
    shortTitle: "Blur Image",
    description: "Apply blur effect to images online. Great for privacy or artistic effects.",
    metaDescription: "Free online image blur tool. Blur faces or backgrounds in photos.",
    category: "editing",
    operation: "blur",
    inputFormats: ["jpeg", "jpg", "png", "webp"],
    options: { blur: 5 },
    faqs: [
      {
        question: "How strong is the blur?",
        answer: "Default blur is moderate. Adjust the blur strength slider before processing.",
      },
      {
        question: "Can I blur only part of an image?",
        answer: "This tool applies blur to the full image. For privacy, process a cropped region or use our crop tool first to isolate the area you need.",
      },
      {
        question: "What formats work?",
        answer: "JPG, PNG, and WebP blur are supported.",
      },
    ],
    relatedSlugs: ["sharpen-image", "crop-image", "adjust-brightness"],
  },
  {
    slug: "sharpen-image",
    title: "Sharpen Image",
    shortTitle: "Sharpen Image",
    description: "Sharpen blurry or soft images online to enhance detail and clarity.",
    metaDescription: "Free online image sharpener. Make blurry photos sharper instantly.",
    category: "editing",
    operation: "sharpen",
    inputFormats: ["jpeg", "jpg", "png", "webp"],
    options: { sharpen: 2 },
    faqs: [
      {
        question: "Will sharpening fix very blurry photos?",
        answer: "Sharpening enhances existing detail but can't recover truly lost information.",
      },
      {
        question: "Can over-sharpening look bad?",
        answer: "Yes, use moderate sharpening. Our default setting provides a natural look.",
      },
      {
        question: "Is this good for web images?",
        answer: "Yes, light sharpening can make web images appear crisper.",
      },
    ],
    relatedSlugs: ["blur-image", "adjust-contrast", "compress-image"],
  },
  {
    slug: "black-and-white",
    title: "Convert to Black & White",
    shortTitle: "Black & White",
    description: "Convert color photos to black and white (grayscale) online for free.",
    metaDescription: "Free black and white converter. Turn color photos to grayscale online.",
    category: "editing",
    operation: "grayscale",
    inputFormats: ["jpeg", "jpg", "png", "webp", "gif", "bmp", "tiff", "tif"],
    faqs: [
      {
        question: "Is black and white the same as grayscale?",
        answer: "Yes, this tool converts your image to grayscale (256 shades of gray).",
      },
      {
        question: "Will file size change?",
        answer: "File size may decrease slightly since color data is removed.",
      },
      {
        question: "Can I convert back to color?",
        answer: "No, grayscale conversion is one-way. Keep your original file.",
      },
    ],
    relatedSlugs: ["adjust-contrast", "adjust-brightness", "compress-jpg"],
  },
  {
    slug: "adjust-brightness",
    title: "Adjust Brightness",
    shortTitle: "Brightness",
    description: "Adjust image brightness online. Lighten dark photos or darken overexposed images.",
    metaDescription: "Free online brightness adjuster. Fix dark or bright photos instantly.",
    category: "editing",
    operation: "brightness",
    inputFormats: ["jpeg", "jpg", "png", "webp"],
    options: { brightness: 1.1 },
    faqs: [
      {
        question: "How much can I adjust brightness?",
        answer: "Use the slider to adjust from darker (-) to brighter (+). Default is a slight boost.",
      },
      {
        question: "Will quality be affected?",
        answer: "Extreme adjustments may introduce noise. Moderate changes look natural.",
      },
      {
        question: "Can I combine with contrast adjustment?",
        answer: "Yes, process brightness first, then use the contrast tool.",
      },
    ],
    relatedSlugs: ["adjust-contrast", "black-and-white", "sharpen-image"],
  },
  {
    slug: "adjust-contrast",
    title: "Adjust Contrast",
    shortTitle: "Contrast",
    description: "Adjust image contrast online to make photos pop or soften harsh tones.",
    metaDescription: "Free online contrast adjuster. Enhance or reduce photo contrast.",
    category: "editing",
    operation: "contrast",
    inputFormats: ["jpeg", "jpg", "png", "webp"],
    options: { contrast: 1.2 },
    faqs: [
      {
        question: "What does contrast do?",
        answer: "Higher contrast makes darks darker and lights lighter. Lower contrast softens the image.",
      },
      {
        question: "What's a good contrast setting?",
        answer: "A slight boost (1.1–1.3) often improves photos without looking unnatural.",
      },
      {
        question: "Does this work on PNG?",
        answer: "Yes, JPG, PNG, and WebP are all supported.",
      },
    ],
    relatedSlugs: ["adjust-brightness", "sharpen-image", "black-and-white"],
  },
  {
    slug: "background-remover",
    title: "Background Remover",
    shortTitle: "Background Remover",
    seoTitle: "Remove image background automatically in seconds.",
    description:
      "Remove image backgrounds automatically. AI-powered background removal for product photos and portraits.",
    metaDescription:
      "Quickly remove image backgrounds with high accuracy. Instantly detect subjects and cut out backgrounds — free online.",
    category: "advanced",
    operation: "removeBackground",
    inputFormats: ["jpeg", "jpg", "png", "webp"],
    outputFormat: "png",
    faqs: [
      {
        question: "How does background removal work?",
        answer:
          "Professional AI detects your subject and removes the background in seconds. Processing runs in your browser — fast, private, and no upload needed.",
      },
      {
        question: "Why does it feel instant?",
        answer:
          "Upload your image right away — no waiting on the page. Click Remove Background and the AI works on your photo directly.",
      },
      {
        question: "Is my image uploaded to a server?",
        answer:
          "No. Everything happens on your device. Your image never leaves your browser.",
      },
    ],
    relatedSlugs: ["png-to-jpg", "crop-image", "resize-image"],
  },
  {
    slug: "image-upscaler",
    title: "Image Upscaler",
    shortTitle: "Image Upscaler",
    seoTitle: "Upscale images and increase resolution online for free.",
    description:
      "Upscale and enhance images using AI. Increase resolution while preserving detail.",
    metaDescription:
      "Enlarge your JPG and PNG images with high resolution. Increase size while maintaining visual quality — free online.",
    category: "advanced",
    operation: "upscale",
    inputFormats: ["jpeg", "jpg", "png", "webp"],
    options: { quality: 92 },
    faqs: [
      {
        question: "How much can I upscale?",
        answer: "Choose 2×, 3×, or 4× upscale. Higher values increase resolution significantly.",
      },
      {
        question: "Will quality be preserved?",
        answer: "We use Lanczos3 resampling plus light sharpening for crisp results.",
      },
      {
        question: "What images work best?",
        answer: "Photos and illustrations upscale better than heavily compressed images.",
      },
    ],
    relatedSlugs: ["sharpen-image", "resize-image", "compress-image"],
  },
  {
    slug: "convert-to-jpg",
    title: "Convert to JPG",
    shortTitle: "Convert to JPG",
    seoTitle: "Convert PNG, GIF, WebP, HEIC and more to JPG in bulk.",
    description:
      "Turn PNG, GIF, TIF, SVG, WEBP, HEIC, or AVIF images to JPG in bulk with ease.",
    metaDescription:
      "Turn PNG, GIF, TIF, PSD, SVG, WEBP, HEIC, or RAW format images to JPG in bulk with ease — free and instant.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["png", "gif", "tiff", "tif", "svg", "webp", "heic", "heif", "avif", "bmp"],
    outputFormat: "jpeg",
    popular: true,
    featured: true,
    faqs: [
      {
        question: "Which formats can I convert to JPG?",
        answer: "PNG, GIF, TIFF, SVG, WebP, HEIC, AVIF, and BMP are all supported.",
      },
      {
        question: "Can I convert multiple images at once?",
        answer: "Yes, upload up to 20 files and download all converted JPGs as a ZIP.",
      },
      {
        question: "Will transparency be preserved?",
        answer: "JPG does not support transparency. Transparent areas become white.",
      },
    ],
    relatedSlugs: ["png-to-jpg", "webp-to-jpg", "heic-to-jpg"],
  },
  {
    slug: "convert-from-jpg",
    title: "Convert from JPG",
    shortTitle: "Convert from JPG",
    seoTitle: "Convert JPG images to PNG and other formats in bulk.",
    description:
      "Turn JPG images to PNG format in bulk. Fast JPEG to PNG conversion with ZIP download.",
    metaDescription:
      "Turn JPG images to PNG and GIF. Convert multiple JPEG files at once — free, fast, and no watermark.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["jpeg", "jpg"],
    outputFormat: "png",
    popular: true,
    featured: true,
    faqs: [
      {
        question: "Can I convert JPG to PNG?",
        answer: "Yes, upload JPG/JPEG files and download PNG versions instantly.",
      },
      {
        question: "Can I create animated GIFs from JPGs?",
        answer: "Bulk JPG to PNG conversion is supported. Multi-image animated GIF export is not available on this tool yet.",
      },
      {
        question: "Is batch conversion supported?",
        answer: "Yes, convert multiple JPG files at once.",
      },
    ],
    relatedSlugs: ["jpg-to-png", "convert-to-jpg", "png-to-jpg"],
  },
  {
    slug: "photo-editor",
    title: "Photo Editor",
    shortTitle: "Photo Editor",
    seoTitle: "Free Online Photo Editor. Edit photo quick and easy.",
    description:
      "Spice up your pictures with text, effects, frames or stickers. Simple editing tools for your image needs.",
    metaDescription:
      "Add text, stickers and filters to your pictures, or frame your photos. Edit your photos online, quick and easy, without registration.",
    category: "editing",
    operation: "photoEdit",
    inputFormats: ["jpeg", "jpg", "png", "webp"],
    options: { brightness: 1, contrast: 1.05, sharpen: 1 },
    faqs: [
      {
        question: "What can the photo editor do?",
        answer: "Adjust brightness, contrast, saturation, and sharpness in one step.",
      },
      {
        question: "Can I batch edit?",
        answer: "Yes, upload multiple photos and apply the same settings to all.",
      },
      {
        question: "Is it free?",
        answer: "Yes, completely free with no watermark.",
      },
    ],
    relatedSlugs: ["adjust-brightness", "adjust-contrast", "crop-image"],
  },
  {
    slug: "watermark-image",
    title: "Watermark Image",
    shortTitle: "Watermark",
    seoTitle: "Add a text or image watermark to your photos in seconds.",
    description:
      "Stamp an image or text over your images in seconds. Choose typography, transparency and position.",
    metaDescription:
      "Stamp an image or text over your images in seconds. Choose the typography, transparency and position — free online.",
    category: "editing",
    operation: "watermark",
    inputFormats: ["jpeg", "jpg", "png", "webp"],
    outputFormat: "png",
    faqs: [
      {
        question: "Can I add custom watermark text?",
        answer: "Yes, enter your text, choose position and opacity, then apply.",
      },
      {
        question: "Can I watermark in bulk?",
        answer: "Yes, batch watermarking is supported.",
      },
      {
        question: "What format is the output?",
        answer: "PNG output preserves quality. Convert to JPG afterward if needed.",
      },
    ],
    relatedSlugs: ["compress-image", "resize-image", "crop-image"],
  },
  {
    slug: "meme-generator",
    title: "Meme Generator",
    shortTitle: "Meme Generator",
    seoTitle: "Create custom memes online — free meme generator.",
    description:
      "Create memes online with ease. Caption meme images or upload pictures to make custom memes.",
    metaDescription:
      "Create your memes online with ease. Caption meme images or upload your pictures to make custom memes — free and instant.",
    category: "advanced",
    operation: "meme",
    inputFormats: ["jpeg", "jpg", "png", "gif", "webp"],
    outputFormat: "png",
    faqs: [
      {
        question: "How do I make a meme?",
        answer: "Upload an image, add top and/or bottom text, then click Generate.",
      },
      {
        question: "Can I upload my own images?",
        answer: "Yes, any JPG, PNG, GIF, or WebP image works.",
      },
      {
        question: "Is it free?",
        answer: "Yes, 100% free with no watermark on memes.",
      },
    ],
    relatedSlugs: ["crop-image", "resize-image", "compress-image"],
  },
  {
    slug: "html-to-image",
    title: "HTML to Image",
    shortTitle: "HTML to IMAGE",
    seoTitle: "Convert HTML webpages to JPG or PNG images online.",
    description:
      "Convert webpages in HTML to JPG or PNG. Paste a URL and convert it to an image with a click.",
    metaDescription:
      "Convert webpages in HTML to JPG or PNG. Copy and paste the URL of the page you want and convert it to IMAGE with a click.",
    category: "conversion",
    operation: "convert",
    inputFormats: ["jpeg", "jpg", "png", "webp", "gif", "svg"],
    outputFormat: "png",
    faqs: [
      {
        question: "How does HTML to image work?",
        answer: "Paste a webpage or direct image URL. We fetch and convert it to PNG or JPG.",
      },
      {
        question: "What formats are supported?",
        answer: "Output as PNG or JPG. Input can be any public image URL or webpage with images.",
      },
      {
        question: "Can I convert local HTML files?",
        answer: "Upload an HTML file or SVG, or paste a public URL.",
      },
    ],
    relatedSlugs: ["png-to-jpg", "svg-to-png", "compress-png"],
  },
  {
    slug: "blur-face",
    title: "Blur Face",
    shortTitle: "Blur Face",
    seoTitle: "Blur faces in photos automatically to protect privacy.",
    description:
      "Automatically blur faces in photos to protect privacy. Perfect for sharing images safely online.",
    metaDescription:
      "Automatically blur faces in your photos to protect privacy. Perfect for sharing images safely online — free and instant.",
    category: "editing",
    operation: "blur",
    inputFormats: ["jpeg", "jpg", "png", "webp"],
    options: { blur: 8 },
    faqs: [
      {
        question: "Does this auto-detect faces?",
        answer: "This tool applies a privacy blur to the full image. Always review the result before sharing publicly.",
      },
      {
        question: "Can I adjust blur strength?",
        answer: "Yes, use the blur strength slider before processing.",
      },
      {
        question: "Is my photo stored?",
        answer: "No, photos are processed in memory and deleted immediately.",
      },
    ],
    relatedSlugs: ["blur-image", "crop-image", "compress-jpg"],
  },
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): ToolConfig[] {
  return tools.filter((t) => t.category === category);
}

export function getPopularTools(): ToolConfig[] {
  return tools.filter((t) => t.popular);
}

export function getFeaturedTools(): ToolConfig[] {
  return tools.filter((t) => t.featured);
}

export function searchTools(query: string): ToolConfig[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return tools.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.shortTitle.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.slug.includes(q)
  );
}

export function getRelatedTools(slug: string): ToolConfig[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tool.relatedSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is ToolConfig => t !== undefined);
}

export const ACCEPTED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/svg+xml",
  "image/heic",
  "image/heif",
  "image/avif",
];

export { MAX_FILE_SIZE, MAX_BATCH_FILES } from "./tools/constants";
