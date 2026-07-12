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
  const pathname = request.nextUrl.pathname;

  if (BOT_PROBE.some((pattern) => pattern.test(pathname))) {
    return new NextResponse(null, { status: 404 });
  }

  const segment = pathname.split("/").filter(Boolean)[0];
  const locale = segment && isLocale(segment) ? segment : "en";

  const response = NextResponse.next();
  response.headers.set("x-locale", locale);

  // Homepage must never be CDN-cached — stale HTML breaks CSS after redeploys.
  if (pathname === "/") {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
  } else {
    response.headers.set(
      "Cache-Control",
      "public, max-age=0, s-maxage=300, stale-while-revalidate=600"
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
