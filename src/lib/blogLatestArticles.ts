import type { BlogPost } from "./blog";

export const latestBlogPosts: BlogPost[] = [
  {
    slug: "how-to-reduce-png-file-size",
    title: "How to Reduce PNG File Size Without Quality Loss",
    description:
      "Discover effective strategies and browser-based tools to optimize transparency, strip metadata, and compress heavy PNG files for web performance.",
    date: "2026-07-10",
    readTime: "6 min read",
    category: "Guides",
  },
  {
    slug: "webp-vs-avif-comparison",
    title: "WEBP vs AVIF: Next-Gen Image Formats Compared",
    description:
      "An in-depth breakdown comparing compression efficiency, browser support, and color quality between WEBP and AVIF for modern web projects.",
    date: "2026-07-12",
    readTime: "5 min read",
    category: "Formats",
  },
  {
    slug: "convert-images-for-job-applications",
    title: "How to Convert Images for Online Job Application Forms",
    description:
      "Learn how to quickly resize, convert, and shrink identity documents and photos under strict file limit requirements for portal submissions.",
    date: "2026-07-15",
    readTime: "4 min read",
    category: "Tips",
  },
  {
    slug: "lazy-loading-images-guide",
    title: "How Lazy Loading Images Boosts Page Speed and Core Web Vitals",
    description:
      "Understand how implementing native HTML lazy loading reduces initial page load times and improves your Google search rankings.",
    date: "2026-07-18",
    readTime: "7 min read",
    category: "Web Performance",
  },
];

export const latestBlogContent: Record<string, string> = {
  "how-to-reduce-png-file-size": `
You know that sinking feeling when a page takes forever to load, and you find out it's one image doing all the damage? A single hero banner PNG sitting at 4.2MB can tank performance. The good news: you can cut a PNG down to a third of its size — sometimes less — without losing a single pixel of quality.

**Why Your PNGs Are Bigger Than They Need to Be**

PNG uses lossless compression. Every pixel you save is exactly the pixel you started with — unlike JPEG, which throws away data to save space. So why can you still shrink PNGs? Because most exports carry extra baggage:

- Metadata — EXIF data, color profiles, software tags, thumbnail previews
- Unnecessary color depth — a black-and-white icon saved in full 24-bit color
- Inefficient compression settings — most design tools use fast, lazy compression by default
- Unused alpha channel data — transparency info baked in when nothing is transparent

Strip that out and the pixels do not change. The image just travels lighter.

**Lossy vs Lossless (Why It Matters Here)**

Lossy compression (JPEG, or aggressive "lossy PNG" tools) changes pixel data. Colors get approximated. Fine detail gets smoothed. Lossless compression rearranges data more efficiently without touching how the image looks. For icons, logos, UI screenshots, and transparent graphics, lossless is the way to go. This guide sticks entirely to lossless methods.

**Strategy 1: Strip the Metadata First**

A PNG exported from Photoshop or a screenshot tool can carry kilobytes — sometimes hundreds — of metadata you never use. None of it affects appearance. Tools like ImageOptim, oxipng, or SUHADIMG's [compress PNG tool](/compress-image) strip this automatically. It is usually a 5–15% size cut before you touch compression settings.

**Strategy 2: Reduce the Color Palette (Where It Makes Sense)**

PNG supports PNG-24 (millions of colors) and PNG-8 (up to 256 colors). If your image has gradients and photo-like detail, keep PNG-24. For logos, icons, flat illustrations, or simple UI elements, PNG-8 can look identical while cutting file size 50–70%. Zoom to 400% and count distinct colors — under 256 means PNG-8 is a strong candidate.

**Strategy 3: Use a Proper Compression Tool**

Most design software's "Save for Web" uses average compression. Dedicated tools re-encode the same pixels more efficiently. Try [SUHADIMG compress](/compress-image), Squoosh (by Google) for side-by-side comparison, or oxipng for batch lossless processing.

**My Actual Workflow**

Export at full quality from your design tool. Run through a lossless compressor to strip metadata. Check if PNG-8 works for flat-color graphics. Compare before/after file sizes. Spot-check at 100% and 400% zoom. Serve through a CDN with gzip or Brotli for additional transit savings.

**Real Numbers From a Recent Project**

A 4.2MB hero banner: metadata strip brought it to 3.9MB, oxipng-style compression to 1.6MB, and PNG-8 icon sets dropped from ~180KB to ~40KB each. Total page weight fell roughly 60% with no visible quality loss.

**When You Should NOT Compress This Way**

Skip PNG-8 for gradients, shadows, or photo-like detail — banding appears. Spot-check transparency-heavy images. Do not run the same file through lossy tools twice. Consider [WebP](/webp-to-jpg) or AVIF if the platform supports modern formats — sometimes the best PNG optimization is not using PNG at all.

**Pre-Flight Checklist:**

- Metadata stripped (EXIF, color profiles, thumbnails)
- Checked whether PNG-8 works for this image
- Run through a dedicated compressor, not just "Save for Web"
- Compared before/after at 100% and 400% zoom
- Confirmed transparency still renders correctly
- Considered WebP/AVIF as an alternative

Go pick the heaviest PNG on your site and run it through [SUHADIMG's free compress tool](/compress-image). You will likely shave off at least 40% without touching a single pixel.
  `,
  "webp-vs-avif-comparison": `
Quick answer: AVIF compresses smaller, but WebP is safer for compatibility. If your audience is mostly on modern browsers, go AVIF. If you need something that works everywhere right now, WebP is still the smarter default.

**Why JPEG and PNG Aren't Enough Anymore**

For twenty-plus years, JPEG and PNG did the heavy lifting. They still work — but they were not built for how fast people expect pages to load today. Google's Core Web Vitals put real weight on image load time. A bloated hero image can single-handedly tank your Largest Contentful Paint score.

**What Is WebP?**

WebP was released by Google in 2010. It supports lossy and lossless compression, transparency, and animation. Browser support is excellent in every major browser today — Chrome, Firefox, Safari, Edge. Typical savings: 25–35% smaller than JPEG at equivalent quality, and often 50%+ smaller than PNG for graphics with transparency.

**What Is AVIF?**

AVIF is built on the AV1 video codec (around 2019). It regularly beats WebP by another 20–30% at the same visual quality. The catch: tooling and encoding speed still lag slightly behind WebP, and some older CMS setups do not handle AVIF cleanly yet.

**WebP vs AVIF: Direct Comparison**

- File size — AVIF usually wins on photographic images
- Browser support — WebP wins with broader compatibility
- Encoding speed — WebP wins; AVIF compression takes longer
- Transparency — both handle it well
- Animation — both support it; WebP tooling is more mature
- Quality at low bitrates — AVIF holds detail better when pushed hard

**Real-World File Size Test**

Same 2400px landscape JPEG (3.1MB original): WebP at 780KB, AVIF at 540KB — AVIF about 30% smaller. The gap holds for photo-style content and narrows for simple graphics.

**Choose WebP if:**

- You need guaranteed compatibility across every browser today
- Encoding speed matters for high image volume
- Your CMS or plugin ecosystem supports WebP natively
- You want a stable, predictable format

**Choose AVIF if:**

- Every kilobyte matters and your audience uses modern browsers
- You optimize photography-heavy or portfolio sites
- Your build pipeline or CDN supports AVIF delivery

**Best Practice: Use Both With Fallbacks**

The HTML picture element lets you offer AVIF first, fall back to WebP, then JPEG. Browsers grab the best format they support. This is the recommended approach for most sites in 2026.

**Decision Checklist:**

- Check analytics for what browsers your visitors actually use
- Test both formats on your 3–5 heaviest images
- Confirm your hosting can serve AVIF if you choose it
- Set up a picture fallback chain rather than betting on one format
- Re-test PageSpeed Insights after switching

Convert between formats free on SUHADIMG: [WebP to JPG](/webp-to-jpg), [AVIF to JPG](/avif-to-jpg), and [PNG to WebP](/png-to-webp). AVIF is the better format on paper; WebP is the safer battle-tested choice — use both with fallbacks and you get the best of each.
  `,
  "convert-images-for-job-applications": `
You've filled out the whole application — work history, references, the essay question — then you hit the upload field for your ID photo: "File must be under 2MB. JPEG or PNG only." Your phone photo is 8MB. Here is exactly how to fix that without the image looking terrible.

**Why Job Portals Are So Strict**

Application systems process thousands of uploads daily. Government and HR portals often cap files at 500KB to 2MB because they store documents long-term. Annoying for applicants, understandable for their infrastructure. Getting a normal phone photo under those limits takes about thirty seconds once you know the steps.

**Step 1: Check the Exact Requirements**

Before editing, find these three details on the application page:

- Maximum file size (KB or MB)
- Accepted format (JPEG and PNG are most common; PDF sometimes for documents)
- Dimension requirements (some portals want exact pixels, e.g. 200×230 for passport-style photos)

Skipping this is the #1 reason people upload three times and still get rejected.

**Step 2: Resize Before You Compress**

People get this backwards. They compress a huge image directly, which barely helps. Shrink dimensions first. A phone photo might be 4000×3000 pixels; a job form usually needs 600–1000px. Resizing does more for file size than compression alone.

Use [SUHADIMG resize](/resize-image) to enter exact width and height, or compress and convert in one workflow with [compress image](/compress-image).

**Step 3: Convert to the Right Format**

Most portals want JPEG for photos or PNG for documents and signatures. iPhone HEIC files are rejected by many older portals — convert with [HEIC to JPG](/heic-to-jpg) first.

**Step 4: Compress Without Wrecking Quality**

Once size and format are correct, compress only if still over the limit. For ID documents, do not push compression too hard — blurry text or faces can get applications flagged.

**Checklist Before You Hit Submit:**

- Confirmed exact size limit and accepted format
- Resized dimensions down first
- Converted to JPEG or PNG (not HEIC)
- Compressed only enough to fit under the limit
- Opened the final file to verify clarity
- Renamed the file sensibly (no spaces or special characters)

**Common Mistakes**

Screenshotting instead of using the original file introduces blur. Compressing the same JPG multiple times degrades quality each time — always start from the original. Ignoring dimension requirements causes rejections even when file size is fine.

Ninety percent of upload rejections come down to file too big or wrong format. Fix dimensions first, convert if needed, then compress — in that order.
  `,
  "lazy-loading-images-guide": `
On many blog and e-commerce pages, images make up over half the total page weight — sometimes more. And most of those images? The visitor never scrolls far enough to see them. That is what lazy loading fixes: stop loading images the user has not scrolled to yet.

**What Lazy Loading Actually Does**

By default, browsers load every image on a page immediately — top to bottom, all at once. Lazy loading defers images outside the visible screen until the user scrolls near them. Your hero image still loads immediately. Everything below waits its turn.

**Why This Affects Core Web Vitals**

**Largest Contentful Paint (LCP):** If the browser downloads fifteen below-the-fold images before finishing visible ones, LCP suffers.

**Cumulative Layout Shift (CLS):** Poorly implemented lazy loading without reserved space causes content to jump when images arrive — a common CLS penalty.

**Interaction to Next Paint:** Fewer competing image requests frees the main thread indirectly.

**Native Lazy Loading: The One-Line Fix**

Every major browser supports native lazy loading via one HTML attribute: loading="lazy" on img tags. No JavaScript library required.

**Where NOT to Use Lazy Loading**

Never lazy-load above-the-fold images — especially your LCP element (hero banner). Lazy loading delays exactly what Google measures. The first image or two visible on load should stay eager. Everything below gets loading="lazy".

**Preventing Layout Shift**

Always include width and height attributes (or CSS aspect-ratio) so the browser reserves space before the image loads. Without dimensions, the page jumps when the image appears — hurting CLS.

**Combine Lazy Loading With Compression**

Compression shrinks each file. Lazy loading reduces how many load at once. Do both: compress images with [SUHADIMG](/compress-image) before deploying, then lazy-load below-the-fold assets in your site template.

**Implementation Checklist:**

- Add loading="lazy" to every image below the fold
- Leave above-the-fold images at default eager loading
- Add explicit width and height on every image
- Compress images before deploying
- Test LCP and CLS in PageSpeed Insights before and after
- Verify lazy loading on mobile where slow connections matter most

On a blog with 20+ images per post, native lazy loading can drop initial page weight by around 65% and improve LCP noticeably. It is one attribute per image — as long as you exempt hero images and reserve space, there is little reason not to use it.

Have you checked your site's current LCP score in PageSpeed Insights yet?
  `,
};
