"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  CheckIcon,
  ChevronDownIcon,
  LoaderIcon,
  MapPinIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";

import { type Municipality } from "@/lib/election/election.types";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const RESULTS_PER_PAGE = 20;

// Client-side search helper (pure function)
function filterMunicipalities(
  municipalities: Municipality[],
  searchTerm: string,
): Municipality[] {
  if (!searchTerm || searchTerm.length < 2) {
    return [];
  }

  const searchLower = searchTerm.trim().toLowerCase();
  const isNumericSearch = /^\d+$/.test(searchLower);

  return municipalities.filter((municipality) => {
    if (isNumericSearch) {
      // Search by postal code or INSEE code
      if (municipality.code.includes(searchLower)) {
        return true;
      }
      return municipality.codesPostaux.some((cp) => cp.includes(searchLower));
    }

    // Search by name (substring, case insensitive)
    return municipality.nom.toLowerCase().includes(searchLower);
  });
}

// Global client-side cache for municipalities (persists across component remounts)
let municipalitiesClientCache: Municipality[] | null = null;

// Fetch municipalities from API (with abort support)
async function fetchMunicipalities(
  signal?: AbortSignal,
): Promise<Municipality[]> {
  // Return cached data if available
  if (municipalitiesClientCache !== null) {
    return municipalitiesClientCache;
  }

  const response = await fetch("/api/municipalities", { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch municipalities");
  }

  const data = (await response.json()) as Municipality[];
  municipalitiesClientCache = data;

  return data;
}

type Props = {
  selectedMunicipality: Municipality | null;
  onSelectMunicipality: (municipality: Municipality) => void;
  onClearSelection?: () => void;
};

const MunicipalitySearch = ({
  selectedMunicipality,
  onSelectMunicipality,
  onClearSelection,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [municipalities, setMunicipalities] = useState<Municipality[]>(
    () => municipalitiesClientCache ?? [],
  );
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_PAGE);
  const [isLoadingData, setIsLoadingData] = useState(
    municipalitiesClientCache === null,
  );
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Prefetch municipalities on mount (with AbortController for cleanup)
  useEffect(() => {
    // Skip if already cached (state is already initialized from cache)
    if (municipalitiesClientCache !== null) {
      return;
    }

    const abortController = new AbortController();

    fetchMunicipalities(abortController.signal)
      .then((data) => {
        if (!abortController.signal.aborted) {
          setMunicipalities(data);
          setIsLoadingData(false);
        }
      })
      .catch((error) => {
        // Ignore abort errors
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        console.error("Failed to fetch municipalities:", error);
        if (!abortController.signal.aborted) {
          setIsLoadingData(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, []);

  // Filter municipalities locally (instant results)
  const allSuggestions = useMemo(() => {
    return filterMunicipalities(municipalities, searchTerm);
  }, [municipalities, searchTerm]);

  // Visible suggestions (paginated)
  const visibleSuggestions = allSuggestions.slice(0, visibleCount);
  const hasMore = allSuggestions.length > visibleCount;

  // Handle search input change (no debounce needed, filtering is instant)
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setVisibleCount(RESULTS_PER_PAGE);

    if (value.length < 2) {
      setShowSuggestions(false);
      return;
    }

    setShowSuggestions(true);
  }, []);

  // Load more results
  const handleShowMore = useCallback(() => {
    setVisibleCount((prev) => prev + RESULTS_PER_PAGE);
  }, []);

  // Handle municipality selection
  const handleSelectMunicipality = useCallback(
    (municipality: Municipality) => {
      setSearchTerm(municipality.nom);
      setShowSuggestions(false);
      onSelectMunicipality(municipality);
    },
    [onSelectMunicipality],
  );

  // Handle clear selection
  const handleClear = useCallback(() => {
    setSearchTerm("");
    setVisibleCount(RESULTS_PER_PAGE);
    setShowSuggestions(false);
    onClearSelection?.();
  }, [onClearSelection]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current !== null &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current !== null &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <MapPinIcon className="size-5" />
        <h2 className="text-lg font-semibold">Où habitez-vous ?</h2>
      </div>

      <div className="relative">
        <div className="relative">
          <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Nom de commune ou code postal..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => {
              if (allSuggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            className="pr-10 pl-10"
            disabled={selectedMunicipality !== null}
          />
          {selectedMunicipality !== null ? (
            <button
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
              aria-label="Effacer la sélection"
            >
              <XIcon className="size-4" />
            </button>
          ) : isLoadingData ? (
            <LoaderIcon className="text-muted-foreground absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin" />
          ) : null}
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && visibleSuggestions.length > 0 ? (
          <div
            ref={suggestionsRef}
            className="bg-popover border-border absolute top-full z-50 mt-px w-full overflow-hidden rounded-md border shadow-lg"
          >
            <ul className="bg-background max-h-80 space-y-1 overflow-auto">
              {visibleSuggestions.map((municipality) => (
                <li
                  key={municipality.code}
                  className="cursor-pointer rounded-md p-1 transition-all duration-300 ease-in-out hover:bg-neutral-700"
                >
                  <button
                    className="hover:bg-accent flex w-full items-start gap-2 px-3 py-2 text-left text-sm"
                    onClick={() => handleSelectMunicipality(municipality)}
                  >
                    <MapPinIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium">{municipality.nom}</div>
                      <div className="text-muted-foreground text-xs">
                        {municipality.codesPostaux.slice(0, 2).join(", ")}
                        {municipality.codesPostaux.length > 2
                          ? ` +${municipality.codesPostaux.length - 2}`
                          : ""}{" "}
                        • {municipality.departement.nom}
                      </div>
                    </div>
                  </button>
                </li>
              ))}

              {/* Show more button */}
              {hasMore ? (
                <li className="border-border border-t p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={handleShowMore}
                  >
                    <ChevronDownIcon className="mr-2 size-4" />
                    Afficher plus ({allSuggestions.length - visibleCount}{" "}
                    restants)
                  </Button>
                </li>
              ) : null}
            </ul>
          </div>
        ) : null}

        {/* Selected municipality info */}
        {selectedMunicipality !== null ? (
          <div className="bg-primary/5 border-primary/20 mt-3 flex items-center gap-2 rounded-md border p-3">
            <CheckIcon className="text-primary size-5" />
            <div className="flex-1">
              <div className="font-medium">{selectedMunicipality.nom}</div>
              <div className="text-muted-foreground text-xs">
                {selectedMunicipality.codesPostaux[0]} •{" "}
                {selectedMunicipality.departement.nom} •{" "}
                {selectedMunicipality.region.nom}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <p className="text-muted-foreground text-xs">
        Recherchez votre commune par nom ou code postal.
      </p>
    </div>
  );
};

export default MunicipalitySearch;
