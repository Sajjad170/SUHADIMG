/** Company & social profiles for SUHADIMG (by Suhad Tech Solutions). */
export const COMPANY = {
  name: "Suhad Tech Solutions",
  url: "https://suhadtechsolutions.site/",
  email: "support@suhadtechsolutions.site",
  phone: "+92 304 6999827",
} as const;

/** Canonical production domain — always use https://suhadimg.site */
export const SITE_DOMAIN = "https://suhadimg.site";

export type SocialIcon =
  | "facebook"
  | "linkedin"
  | "instagram"
  | "x"
  | "youtube"
  | "website";

export const SOCIAL_LINKS: ReadonlyArray<{
  label: string;
  href: string;
  icon: SocialIcon;
}> = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100091422315150",
    icon: "facebook",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/suhad-tech-solutions",
    icon: "linkedin",
  },
  {
    label: "X",
    href: "https://x.com/SUHAD_TECH_SOL",
    icon: "x",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@suhad-tech-solutions",
    icon: "youtube",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/suhad_tech_solutions/",
    icon: "instagram",
  },
  {
    label: "Company Website",
    href: COMPANY.url,
    icon: "website",
  },
];

export const SEO_KEYWORDS = {
  main: [
    "image converter",
    "image to png",
    "image to jpg",
    "image compressor",
    "image resizer",
    "image cropper",
    "image converter online",
    "free image converter",
    "convert image online",
    "SUHADIMG",
  ],
  longTail: [
    "convert png to jpg online free",
    "convert jpg to png without losing quality",
    "resize image for passport",
    "compress image to 100kb",
    "convert webp to png",
    "image size reducer",
    "batch image converter",
    "free online image tools",
  ],
} as const;
