import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n/config";

/** Common bot probes on new domains — fast 404 without hitting the app. */
const BOT_PROBE = [
  /^\/wp-admin/i,
  /^\/wp-login/i,
  /^\/wp-content/i,
  /^\/wp-includes/i,
  /^\/wordpress/i,
  /^\/xmlrpc\.php/i,
  /^\/\.env/i,
  /^\/phpmyadmin/i,
  /^\/administrator/i,
  /^\/cgi-bin/i,
  /^\/\.git/i,
  /^\/vendor\/phpunit/i,
];

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  // Canonical domain: redirect www → non-www (301)
  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = host.replace(/^www\./, "");
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  const pathname = request.nextUrl.pathname;

  if (BOT_PROBE.some((pattern) => pattern.test(pathname))) {
    return new NextResponse(null, { status: 404 });
  }

  const segment = pathname.split("/").filter(Boolean)[0];
  const locale = segment && isLocale(segment) ? segment : "en";

  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  response.headers.set(
    "Cache-Control",
    "private, no-cache, no-store, must-revalidate, max-age=0"
  );
  response.headers.set("CDN-Cache-Control", "no-store");
  response.headers.set("Surrogate-Control", "no-store");

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
