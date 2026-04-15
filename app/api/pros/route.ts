import { NextRequest, NextResponse } from "next/server";
import {
  getProfessionalsPage,
  countProfessionalsByServiceAndCity,
} from "@/lib/data/professionals";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const service = searchParams.get("service");
  const city = searchParams.get("city");
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);

  if (!service || !city) {
    return NextResponse.json(
      { error: "service and city query params are required" },
      { status: 400 }
    );
  }

  const safeLimit = Math.min(Math.max(1, limit), 50);

  const [pros, total] = await Promise.all([
    getProfessionalsPage(service, city, offset, safeLimit),
    countProfessionalsByServiceAndCity(service, city),
  ]);

  return NextResponse.json({
    pros,
    total,
    hasMore: offset + pros.length < total,
  });
}
