import Script from "next/script";
import { ADSENSE_CLIENT_ID } from "@/lib/adsense";

/** AdSense verification + auto ads script — required in <head> for Google review. */
export function AdSense() {
  if (!ADSENSE_CLIENT_ID) return null;

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
