"use client";

import dynamic from "next/dynamic";

const LanguageBanner = dynamic(
  () => import("./LanguageBanner").then((m) => m.LanguageBanner),
  { ssr: false }
);

export { LanguageBanner };
