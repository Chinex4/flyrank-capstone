import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    application: process.env.NEXT_PUBLIC_APP_NAME || "StudyFlow",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
}
