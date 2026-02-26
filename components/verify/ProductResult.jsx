// components/verify/ProductResult.jsx  (Client Component)
"use client";

import { Globe, MapPin, Calendar, Phone, Printer, Share2, Download } from "lucide-react";
import {
  SectionCard,
  InfoRow,
  StatusBadge,
  VerifiedBanner,
} from "@/components/verify/ui";

function getDaysRemaining(dateStr) {
  try {
    return Math.ceil((new Date(dateStr) - new Date()) / 86400000);
  } catch {
    return 0;
  }
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

export default function ProductResult({ data }) {
  const daysRemaining = getDaysRemaining(data.LicenseExpiry);
  const isExpired = daysRemaining < 0;
  const isActive = data.status === "Active";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
      {/* Verification banner */}
      <VerifiedBanner
        gtin={data.gtin}
        isActive={isActive}
        isExpired={isExpired}
        daysRemaining={daysRemaining}
      />

      {/* Two-column grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Product info */}
        <SectionCard title="Product Information" icon="📦">
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Product Name" value={data.productName} />
            <InfoRow label="Brand Name" value={data.brandName?.value} />
            <InfoRow
              label="Description"
              value={data.productDescription?.value}
            />
            <InfoRow label="GPC Category" value={data.gpcCategoryCode} />
            <InfoRow label="Unit Code" value={data.unitCode} />
            <InfoRow label="Unit Value" value={data.unitValue} />
          </div>
        </SectionCard>

        {/* Company info */}
        <SectionCard title="Company Information" icon="🏢">
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Company Name" value={data.companyName} />
            <InfoRow label="GCP / GLN ID" value={data.gcpGLNID} />
            <div>
              <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Status
              </p>
              <StatusBadge status={data.status} />
            </div>
            <InfoRow label="Licence Type" value={data.licenceType} />
            <InfoRow label="Country of Sale" value={data.countryOfSaleName} />
            <InfoRow label="Address" value={data.formattedAddress} />
          </div>
        </SectionCard>
      </div>

      {/* Contact + Timeline */}
      <SectionCard>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-[#002C6C] dark:text-foreground">
              <Phone className="h-4 w-4 text-[#F26334]" />
              Contact
            </h4>
            <div className="space-y-3">
              {data.contactWebsite && (
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <a
                    href={
                      data.contactWebsite.startsWith("http")
                        ? data.contactWebsite
                        : `https://${data.contactWebsite}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-[#002C6C] hover:text-[#F26334] dark:text-blue-400 transition-colors"
                  >
                    {data.contactWebsite}
                  </a>
                </div>
              )}
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-foreground">
                  {data.formattedAddress || "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-[#002C6C] dark:text-foreground">
              <Calendar className="h-4 w-4 text-[#F26334]" />
              Key Dates
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Registered</span>
                <span className="font-semibold">
                  {formatDate(data.companyRegistrationDate)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Licence Expires</span>
                <span
                  className={`font-semibold ${
                    isExpired ? "text-red-500" : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {formatDate(data.LicenseExpiry)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Action toolbar */}
      <div className="flex flex-wrap gap-3 justify-center pt-2">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-lg bg-[#002C6C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003f99]"
        >
          <Printer className="h-4 w-4" /> Print
        </button>
        <button
          onClick={() =>
            navigator.share?.({
              title: data.productName,
              text: `GS1 Verified: ${data.gtin}`,
              url: window.location.href,
            })
          }
          className="flex items-center gap-2 rounded-lg bg-[#F26334] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d4522a]"
        >
          <Share2 className="h-4 w-4" /> Share
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent">
          <Download className="h-4 w-4" /> Export
        </button>
      </div>
    </div>
  );
}