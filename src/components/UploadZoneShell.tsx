import { Upload } from "lucide-react";

/** Instant SSR placeholder — matches the real upload zone while the tool hydrates. */
export function UploadZoneShell() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border-2 border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
        <Upload className="mx-auto mb-4 h-10 w-10 text-zinc-400" />
        <p className="mb-1 text-lg font-medium text-zinc-900 dark:text-white">
          Drag & drop images here
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          or click to browse · Up to 20 files · Max 10MB each
        </p>
      </div>
    </div>
  );
}
