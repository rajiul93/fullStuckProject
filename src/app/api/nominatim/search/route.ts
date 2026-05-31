import { NextRequest, NextResponse } from "next/server";
import {
  CALIFORNIA_VIEWBOX,
  FIXED_COUNTRY,
  FIXED_STATE,
} from "@/lib/location/california-boundary";
import {
  filterNominatimResults,
  type NominatimResult,
} from "@/lib/location/nominatim-types";

const NOMINATIM_BASE = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = "demo-app/1.0 (California Residential Inspection)";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json([]);
  }

  const { west, south, east, north } = CALIFORNIA_VIEWBOX;
  const searchQuery = `${query}, ${FIXED_STATE}, ${FIXED_COUNTRY}`;

  const params = new URLSearchParams({
    q: searchQuery,
    format: "json",
    addressdetails: "1",
    limit: "8",
    countrycodes: "us",
    viewbox: `${west},${north},${east},${south}`,
    bounded: "1",
  });

  try {
    const response = await fetch(`${NOMINATIM_BASE}?${params.toString()}`, {
      headers: { "User-Agent": USER_AGENT },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return NextResponse.json([]);
    }

    const results = (await response.json()) as NominatimResult[];
    const filtered = filterNominatimResults(results);

    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json([]);
  }
}
