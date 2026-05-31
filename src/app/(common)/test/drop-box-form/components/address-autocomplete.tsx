"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { searchNominatim } from "@/lib/location/nominatim-client";
import {
  nominatimResultToFormValues,
  type LocationFormValues,
  type NominatimResult,
} from "@/lib/location/nominatim-types";
import { cn } from "@/lib/utils";

const DEBOUNCE_MS = 400;

type AddressAutocompleteProps = {
  onSelect: (values: LocationFormValues) => void;
  value: string;
  onChange: (value: string) => void;
};

export function AddressAutocomplete({
  onSelect,
  value,
  onChange,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchNominatim(query);
      setSuggestions(results);
      setIsOpen(true);
      setHighlightIndex(-1);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      void fetchSuggestions(value);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, fetchSuggestions]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(result: NominatimResult) {
    const values = nominatimResultToFormValues(result);
    if (!values) return;

    onChange(values.address);
    onSelect(values);
    setSuggestions([]);
    setIsOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (event.key === "Enter" && highlightIndex >= 0) {
      event.preventDefault();
      handleSelect(suggestions[highlightIndex]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  const showEmptyState =
    isOpen && !isLoading && value.trim() && suggestions.length === 0;

  return (
    <div ref={containerRef} className="relative space-y-2">
      <Label htmlFor="address">Address</Label>
      <Input
        id="address"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          if (suggestions.length > 0) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Start typing an address or place name..."
        autoComplete="off"
      />

      {isLoading && (
        <p className="text-xs text-muted-foreground">Searching...</p>
      )}

      {showEmptyState && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white p-3 text-sm text-black shadow-md">
          No results found within California Residential Inspection area.
        </div>
      )}

      {isOpen && suggestions.length > 0 && (
        <ul
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white text-black shadow-md"
          role="listbox"
        >
          {suggestions.map((result, index) => (
            <li
              key={result.place_id}
              role="option"
              aria-selected={index === highlightIndex}
              className={cn(
                "cursor-pointer px-3 py-2 text-sm text-black hover:bg-gray-100",
                index === highlightIndex && "bg-gray-100"
              )}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(result);
              }}
            >
              {result.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
