import { NextResponse } from "next/server";

/** Lightweight health check for uptime monitors and hosting dashboards. */
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      site: "suhadimg.site",
      service: "SUHADIMG",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
