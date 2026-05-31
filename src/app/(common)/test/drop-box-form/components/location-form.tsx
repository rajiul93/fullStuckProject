"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { AddressAutocomplete } from "./address-autocomplete";
import { BuildDatePicker } from "./build-date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { reverseNominatim } from "@/lib/location/nominatim-client";
import {
  FIXED_STATE,
  nominatimResultToFormValues,
  type LocationFormValues,
} from "@/lib/location/nominatim-types";
import { RhfSelect } from "@/components/formComponent/rhf-select";
import { REGION_NAME } from "@/lib/location/california-boundary";

const FOUNDATION_OPTIONS = [
  { label: "Wood Building", value: "wood-building" },
  { label: "Concrete Slab", value: "concrete-slab" },
  { label: "Crawl Space", value: "crawl-space" },
  { label: "Basement", value: "basement" },
  { label: "Pier & Beam", value: "pier-beam" },
  { label: "Brick / Masonry", value: "brick-masonry" },
  { label: "Stone", value: "stone" },
] as const;

const LocationMap = dynamic(
  () =>
    import("./location-map").then((mod) => ({ default: mod.LocationMap })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] w-full items-center justify-center rounded-md border bg-muted/30">
        Loading map...
      </div>
    ),
  }
);

type FormSchema = LocationFormValues & {
  squareFeet: string;
  buildYear: string;
  foundation: string;
};

const defaultValues: FormSchema = {
  address: "",
  unit: "",
  city: "",
  state: FIXED_STATE,
  zipCode: "",
  latitude: 0,
  longitude: 0,
  squareFeet: "",
  buildYear: "",
  foundation: "",
};

export function LocationForm() {
  const form = useForm<FormSchema>({
    defaultValues,
  });

  const [mapCoords, setMapCoords] = useState<{
    lat: number | null;
    lon: number | null;
  }>({ lat: null, lon: null });

  const applyLocationValues = useCallback(
    (values: LocationFormValues) => {
      form.setValue("address", values.address);
      form.setValue("unit", values.unit);
      form.setValue("city", values.city);
      form.setValue("state", FIXED_STATE);
      form.setValue("zipCode", values.zipCode);
      form.setValue("latitude", values.latitude);
      form.setValue("longitude", values.longitude);
      setMapCoords({ lat: values.latitude, lon: values.longitude });
    },
    [form]
  );

  const handleMapClick = useCallback(
    async (lat: number, lon: number) => {
      const result = await reverseNominatim(lat, lon);
      if (!result) return;

      const values = nominatimResultToFormValues(result);
      if (!values) return;

      applyLocationValues(values);
    },
    [applyLocationValues]
  );

  function onSubmit(data: FormSchema) {
    console.log("Form submitted:", data);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Location Autofill Form</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Region: {REGION_NAME} — California only
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={REGION_NAME}
              disabled
              className="bg-white text-black disabled:opacity-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AddressAutocomplete
                      value={field.value}
                      onChange={field.onChange}
                      onSelect={applyLocationValues}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Apt, Suite, Unit #..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="squareFeet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Square Feet</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      placeholder="e.g. 1500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="buildYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Build Year</FormLabel>
                  <FormControl>
                    <BuildDatePicker
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="e.g. 2020-12-22"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <RhfSelect
            control={form.control}
            name="foundation"
            label="Foundation"
            placeholder="Select foundation type..."
            options={[...FOUNDATION_OPTIONS]}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* <div className="space-y-2">
            <Label>Map — click to select location</Label>
            <LocationMap
              latitude={mapCoords.lat}
              longitude={mapCoords.lon}
              onMapClick={handleMapClick}
            />
          </div> */}
        </form>
      </Form>
    </div>
  );
}
