// components/verify/LocationTab.jsx  (Client Component)
"use client";

import { useState } from "react";
import { useLocation } from "@/lib/hooks/useVerify";
import { VERIFY_TABS } from "./verify";
import SearchBar from "@/components/verify/SearchBar";
import { SectionCard, InfoRow, StatusBadge, Spinner, ErrorState, EmptyState, VerifiedBanner } from "@/components/verify/ui";
import { XCircle, MapPin, Building, Globe } from "lucide-react";

const TAB = VERIFY_TABS.find((t) => t.id === "location");

function LocationResult({ data }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
      <VerifiedBanner
        gtin={data.gln || data.GLN}
        isActive={data.status === "Active"}
        isExpired={false}
        daysRemaining={null}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Location Details" icon="📍">
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Location Name" value={data.locationName || data.name} />
            <InfoRow label="GLN" value={data.gln || data.GLN} />
            <InfoRow label="Location Type" value={data.locationType} />
            <div>
              <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</p>
              <StatusBadge status={data.status} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Address" icon="🏢">
          <div className="space-y-3">
            <div className="flex gap-3 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#F26334]" />
              <div>
                <InfoRow label="Street" value={data.streetAddress || data.address} />
              </div>
            </div>
            <div className="flex gap-3 text-sm">
              <Building className="mt-0.5 h-4 w-4 shrink-0 text-[#F26334]" />
              <div className="grid grid-cols-2 gap-4 flex-1">
                <InfoRow label="City" value={data.city} />
                <InfoRow label="Country" value={data.countryName || data.country} />
              </div>
            </div>
            {data.website && (
              <div className="flex gap-3 text-sm">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-[#F26334]" />
                <a href={data.website} target="_blank" rel="noopener noreferrer"
                  className="text-[#002C6C] hover:text-[#F26334] dark:text-blue-400 transition-colors truncate">
                  {data.website}
                </a>
              </div>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export default function LocationTab() {
  const [query, setQuery] = useState("");
  const { data, isFetching, error, refetch } = useLocation(query);

  const locationData = data?.data;
  const hasData = Boolean(locationData);
  const notFound = query && !isFetching && !error && data && !hasData;

  return (
    <div>
      <SearchBar placeholder={TAB.placeholder} onSearch={setQuery} isLoading={isFetching} />
      {isFetching && <Spinner />}
      {error && !isFetching && <ErrorState message={error.message} onRetry={refetch} />}
      {notFound && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <XCircle className="mb-4 h-16 w-16 text-muted-foreground/40" />
          <h3 className="mb-1 text-xl font-semibold">Location Not Found</h3>
          <p className="text-muted-foreground">No location registered for GLN <code className="font-mono">{query}</code></p>
        </div>
      )}
      {hasData && !isFetching && <LocationResult data={locationData} />}
      {!query && !isFetching && (
        <EmptyState icon={TAB.icon} title={TAB.label} description={TAB.description} example={TAB.placeholder} />
      )}
    </div>
  );
}