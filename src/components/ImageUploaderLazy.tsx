"use client";

import dynamic from "next/dynamic";

const ImageUploader = dynamic(
  () => import("./ImageUploader").then((m) => m.ImageUploader),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/50">
        <p className="text-sm text-zinc-500">Loading tool…</p>
      </div>
    ),
  }
);

export { ImageUploader };
