import {
  FIXED_STATE,
  FIXED_STATE_CODE,
  isWithinCaliforniaResidentialInspection,
} from "./california-boundary";

export type NominatimAddress = {
  house_number?: string;
  road?: string;
  unit?: string;
  apartment?: string;
  city?: string;
  town?: string;
  village?: string;
  locality?: string;
  census?: string;
  hamlet?: string;
  municipality?: string;
  county?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
};

export type NominatimResult = {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address?: NominatimAddress;
};

export type LocationFormValues = {
  address: string;
  unit: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
};

function getCity(address: NominatimAddress): string {
  return (
    address.city ??
    address.town ??
    address.village ??
    address.locality ??
    address.census ??
    address.hamlet ??
    address.municipality ??
    ""
  );
}

function getUnit(address: NominatimAddress): string {
  return address.unit ?? address.apartment ?? "";
}

function getStreetAddress(address: NominatimAddress): string {
  const parts: string[] = [];
  if (address.house_number) parts.push(address.house_number);
  if (address.road) parts.push(address.road);
  return parts.join(" ");
}

export function nominatimResultToFormValues(
  result: NominatimResult
): LocationFormValues | null {
  const lat = parseFloat(result.lat);
  const lon = parseFloat(result.lon);

  if (Number.isNaN(lat) || Number.isNaN(lon)) return null;

  const address = result.address ?? {};
  const state = address.state ?? "";
  const country = address.country ?? "";

  if (!isWithinCaliforniaResidentialInspection(lat, lon, state, country)) {
    return null;
  }

  const street = getStreetAddress(address);

  return {
    address: street || result.display_name.split(",")[0]?.trim() || "",
    unit: getUnit(address),
    city: getCity(address),
    state: FIXED_STATE,
    zipCode: address.postcode ?? "",
    latitude: lat,
    longitude: lon,
  };
}

export function filterNominatimResults(
  results: NominatimResult[]
): NominatimResult[] {
  return results.filter((result) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    if (Number.isNaN(lat) || Number.isNaN(lon)) return false;

    const address = result.address ?? {};
    return isWithinCaliforniaResidentialInspection(
      lat,
      lon,
      address.state,
      address.country
    );
  });
}

export { FIXED_STATE, FIXED_STATE_CODE };
