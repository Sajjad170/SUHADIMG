"use client";

import dynamic from "next/dynamic";
import { UploadZoneShell } from "./UploadZoneShell";

const ImageUploader = dynamic(
  () => import("./ImageUploader").then((m) => m.ImageUploader),
  {
    ssr: false,
    loading: () => <UploadZoneShell />,
  }
);

export { ImageUploader };
