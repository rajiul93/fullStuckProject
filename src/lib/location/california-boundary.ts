/** Fixed region — must never be changed or made editable. */
export const REGION_NAME = "California Residential Inspection" as const;

export const FIXED_STATE = "California" as const;
export const FIXED_STATE_CODE = "CA" as const;
export const FIXED_COUNTRY = "United States" as const;

/** California bounding box: west, south, east, north */
export const CALIFORNIA_VIEWBOX = {
  west: -124.48,
  south: 32.53,
  east: -114.13,
  north: 42.01,
} as const;

export function isWithinCaliforniaBoundary(lat: number, lon: number): boolean {
  const { west, south, east, north } = CALIFORNIA_VIEWBOX;
  return lat >= south && lat <= north && lon >= west && lon <= east;
}

export function isCaliforniaState(state?: string): boolean {
  if (!state) return false;
  const normalized = state.trim().toLowerCase();
  return normalized === "california" || normalized === "ca";
}

export function isUnitedStates(country?: string): boolean {
  if (!country) return false;
  const normalized = country.trim().toLowerCase();
  return (
    normalized === "united states" ||
    normalized === "united states of america" ||
    normalized === "usa" ||
    normalized === "us"
  );
}

/** Validates a result belongs to the fixed California Residential Inspection region. */
export function isWithinCaliforniaResidentialInspection(
  lat: number,
  lon: number,
  state?: string,
  country?: string
): boolean {
  return (
    isWithinCaliforniaBoundary(lat, lon) &&
    isCaliforniaState(state) &&
    isUnitedStates(country)
  );
}
