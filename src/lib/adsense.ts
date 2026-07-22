/** Google AdSense publisher client ID for suhadimg.site */
export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "ca-pub-7934138228565947";

export const ADSENSE_PUBLISHER_ID = ADSENSE_CLIENT_ID.replace(/^ca-pub-/, "pub-");
