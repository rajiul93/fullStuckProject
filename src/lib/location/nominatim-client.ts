import type { NominatimResult } from "./nominatim-types";

export async function searchNominatim(query: string): Promise<NominatimResult[]> {
  if (!query.trim()) return [];

  const params = new URLSearchParams({ q: query });
  const response = await fetch(`/api/nominatim/search?${params.toString()}`);

  if (!response.ok) return [];

  const data: unknown = await response.json();
  return Array.isArray(data) ? (data as NominatimResult[]) : [];
}

export async function reverseNominatim(
  lat: number,
  lon: number
): Promise<NominatimResult | null> {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
  });
  const response = await fetch(`/api/nominatim/reverse?${params.toString()}`);

  if (!response.ok) return null;

  const data: unknown = await response.json();
  if (!data || typeof data !== "object" || !("lat" in data)) return null;

  return data as NominatimResult;
}
