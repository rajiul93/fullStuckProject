import { NextRequest, NextResponse } from "next/server";
import { isWithinCaliforniaResidentialInspection } from "@/lib/location/california-boundary";
import type { NominatimResult } from "@/lib/location/nominatim-types";

const NOMINATIM_REVERSE = "https://nominatim.openstreetmap.org/reverse";
const USER_AGENT = "demo-app/1.0 (California Residential Inspection)";

export async function GET(request: NextRequest) {
  const latParam = request.nextUrl.searchParams.get("lat");
  const lonParam = request.nextUrl.searchParams.get("lon");

  const lat = latParam ? parseFloat(latParam) : NaN;
  const lon = lonParam ? parseFloat(lonParam) : NaN;

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return NextResponse.json(null, { status: 400 });
  }

  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    format: "json",
    addressdetails: "1",
  });

  try {
    const response = await fetch(`${NOMINATIM_REVERSE}?${params.toString()}`, {
      headers: { "User-Agent": USER_AGENT },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return NextResponse.json(null, { status: 404 });
    }

    const result = (await response.json()) as NominatimResult;
    const address = result.address ?? {};

    if (
      !isWithinCaliforniaResidentialInspection(
        lat,
        lon,
        address.state,
        address.country
      )
    ) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}
