# Suhad Image Converter

Free online image converter built with Next.js, TypeScript, Tailwind CSS, and Sharp.

## Features

- 40+ image tools (convert, compress, resize, edit)
- Batch processing with ZIP download
- Drag & drop upload with preview
- Dark mode
- Privacy-first (no file storage)
- SEO-optimized tool pages with FAQs

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Image Processing:** Sharp
- **Hosting:** Vercel (recommended)

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Project Structure

```
src/
├── app/
│   ├── [slug]/          # Dynamic tool pages
│   ├── api/process/     # Image processing API
│   ├── blog/            # Blog pages
│   └── ...              # Static pages
├── components/          # React components
└── lib/
    ├── tools.ts         # Tool definitions & registry
    ├── imageProcessing.ts
    └── seo.ts
```

## Deployment

Deploy to [Vercel](https://vercel.com) for optimal Next.js performance. Sharp works natively on Vercel's Node.js runtime.

## License

Private project.
