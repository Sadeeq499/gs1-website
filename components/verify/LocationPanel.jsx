"use client";

import React, { useState } from "react";
import { Search, Info, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useGlnVerified } from "@/lib/hooks/useVerify";
import IncorrectDataDialog from "./IncorrectDataDialog";

export default function LocationPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedGln, setSubmittedGln] = useState("");

  const {
    data: responseData,
    isFetching,
    isError,
    error,
  } = useGlnVerified(submittedGln);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery) return;
    setSubmittedGln(searchQuery);
  };

  const handleExampleClick = () => {
    setSearchQuery("6286192000149");
    setSubmittedGln("6286192000149");
  };

  // Safely extract from response
  const payload = responseData?.data || responseData;
  const glnData = payload?.gln;
  const companyData = payload?.company;

  return (
    <div className="mx-auto w-full max-w-[900px] pt-6 pb-12">
      <form
        onSubmit={handleSearch}
        className="relative flex w-full items-center"
      >
        {/* Search Icon */}
        <div className="absolute left-3.5 flex items-center justify-center text-slate-500 pointer-events-none">
          <Search className="h-5 w-5 stroke-[1.5]" />
        </div>

        {/* Search Input */}
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter a Global Location Number (GLN)"
          className="h-14 w-full pl-12 pr-32 text-lg border-slate-300 rounded-md focus-visible:ring-primary focus-visible:border-primary shadow-sm"
        />

        {/* Search Button */}
        <Button
          type="submit"
          disabled={isFetching}
          className="absolute right-0 top-0 bottom-0 h-14 rounded-l-none rounded-r-md bg-secondary text-white hover:bg-[#d9532b] px-8 text-base font-medium flex items-center gap-2"
        >
          {isFetching && <Loader2 className="h-5 w-5 animate-spin" />}
          Search
        </Button>
      </form>

      {/* Example link below */}
      <div className="mt-4 pl-1 text-[15px] text-slate-700">
        Example search:{" "}
        <button
          type="button"
          onClick={handleExampleClick}
          className="font-medium text-primary hover:text-[#0b1c5c] hover:underline"
        >
          6286192000149
        </button>
      </div>

      {isError && (
        <div className="mt-12 text-red-500 bg-red-50 p-4 rounded-md border border-red-200">
          <p className="font-medium">Error loading location data.</p>
          <p className="text-sm mt-1">
            {error?.response?.data?.error ||
              error?.message ||
              "An unexpected error occurred"}
          </p>
        </div>
      )}

      {payload && glnData && !isFetching && (
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Banner */}
          <div className="flex bg-[#e8f5e9] border-l-[6px] border-[#2e7d32] p-4 mb-10 items-center">
            <div className="mr-5 shrink-0 flex flex-col pt-1">
              <div className="w-[46px] h-[30px] bg-[#7cb342] rounded-t flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="w-[46px] h-[22px] bg-[#0b1c5c] rounded-b flex items-center justify-center">
                <span className="text-white text-[12px] font-bold tracking-wider">
                  GS1
                </span>
              </div>
            </div>
            <Info className="h-5 w-5 text-slate-600 mr-2 shrink-0 stroke-[1.5]" />
            <p className="text-slate-800 text-[16px]">
              This location number is registered to{" "}
              <span className="font-bold text-black">
                {companyData?.names?.english ||
                  companyData?.names?.arabic ||
                  "the licensed company"}
                .
              </span>
            </p>
          </div>

          <Tabs defaultValue="location" className="w-full">
            <TabsList
              variant="line"
              className="w-full justify-start border-b flex-wrap border-slate-200/80 rounded-none pb-0 h-auto px-0 gap-8 bg-transparent"
            >
              <TabsTrigger
                value="location"
                className="relative flex-none rounded-none bg-transparent pb-3 pt-2 px-1 text-[16px] font-medium text-slate-500 hover:text-[#0b1c5c] data-[state=active]:text-[#0b1c5c] data-[state=active]:shadow-none data-[state=active]:bg-transparent after:hidden border-x-0 border-t-0 border-b-2 border-transparent data-[state=active]:border-b-[#d9532b] transition-none translate-y-px"
              >
                Location information
              </TabsTrigger>
              <TabsTrigger
                value="company"
                className="relative flex-none rounded-none bg-transparent pb-3 pt-2 px-1 text-[16px] font-medium text-slate-500 hover:text-[#0b1c5c] data-[state=active]:text-[#0b1c5c] data-[state=active]:shadow-none data-[state=active]:bg-transparent after:hidden border-x-0 border-t-0 border-b-2 border-transparent data-[state=active]:border-b-[#d9532b] transition-none translate-y-px"
              >
                Company information
              </TabsTrigger>
            </TabsList>

            <TabsContent value="location" className="pt-8">
              <h2 className="text-[#0b1c5c] text-[26px] font-medium mb-8">
                {glnData?.location?.nameEn ||
                  glnData?.location?.nameAr ||
                  "Location Information"}
              </h2>

              <div className="w-full border-t border-[#0b1c5c]/20">
                {[
                  { label: "GLN", value: glnData.glnNumber, bold: true },
                  {
                    label: "Location Name (English)",
                    value: glnData.location?.nameEn,
                  },
                  {
                    label: "Location Name (Arabic)",
                    value: glnData.location?.nameAr,
                  },
                  {
                    label: "Address (English)",
                    value: glnData.location?.addressEn,
                  },
                  {
                    label: "Address (Arabic)",
                    value: glnData.location?.addressAr,
                  },
                  { label: "Postal Code", value: glnData.location?.postalCode },
                  {
                    label: "PO Box",
                    value:
                      glnData.location?.poBox !== "null" &&
                      glnData.location?.poBox !== ""
                        ? glnData.location?.poBox
                        : null,
                  },
                  {
                    label: "Identification Type",
                    value: glnData.identification,
                  },
                  {
                    label: "Physical Location",
                    value: glnData.physicalLocation,
                  },
                  { label: "Status", value: glnData.status, bold: true },
                  {
                    label: "Coordinates",
                    value:
                      glnData.coordinates?.latitude &&
                      glnData.coordinates?.longitude
                        ? `${glnData.coordinates.latitude}, ${glnData.coordinates.longitude}`
                        : null,
                  },
                ]
                  .filter(
                    (row) =>
                      row.value != null &&
                      row.value !== "n/a" &&
                      row.value !== "null",
                  )
                  .map((row, i) => (
                    <div
                      key={i}
                      className={`flex flex-col sm:flex-row py-4 border-b border-[#0b1c5c]/20 ${i % 2 === 1 ? "bg-[#f8fafd] px-3 -mx-3" : "px-3 -mx-3"}`}
                    >
                      <div className="w-full sm:w-[280px] shrink-0 text-[#64748b] font-bold text-[13px] uppercase tracking-wide pt-0.5">
                        {row.label}
                      </div>
                      <div
                        className={`w-full text-[#0b1c5c] text-[15px] ${row.bold ? "font-bold" : ""}`}
                      >
                        <div className="mt-1 sm:mt-0">{row.value}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="company" className="pt-8">
              <h2 className="text-[#0b1c5c] text-[26px] font-medium mb-8">
                Information about the company
              </h2>

              <div className="w-full border-t border-[#0b1c5c]/20">
                {[
                  {
                    label: "Company Name (English)",
                    value: companyData?.names?.english,
                    bold: true,
                  },
                  {
                    label: "Company Name (Arabic)",
                    value: companyData?.names?.arabic,
                    bold: true,
                  },
                  {
                    label: "License Key (GCP)",
                    value: companyData?.membership?.gcpGLNID,
                    bold: true,
                  },
                  {
                    label: "License Type",
                    value: companyData?.membership?.gcpType,
                  },
                  {
                    label: "Membership Category",
                    value: companyData?.membership?.membershipCategory,
                  },
                  {
                    label: "Status",
                    value: companyData?.membership?.status,
                    bold: true,
                  },
                  { label: "Email", value: companyData?.contact?.email },
                  { label: "Mobile", value: companyData?.contact?.mobile },
                  {
                    label: "Website",
                    value: companyData?.contact?.website,
                    link: true,
                  },
                  {
                    label: "CR Number",
                    value: companyData?.registration?.crNumber,
                  },
                  {
                    label: "CR Activity",
                    value: companyData?.registration?.crActivity,
                  },
                  {
                    label: "Address PO Box",
                    value: companyData?.address?.poBox,
                  },
                ]
                  .filter(
                    (row) =>
                      row.value != null &&
                      row.value !== "n/a" &&
                      row.value !== "null" &&
                      row.value !== "",
                  )
                  .map((row, i) => (
                    <div
                      key={i}
                      className={`flex flex-col sm:flex-row py-4 border-b border-[#0b1c5c]/20 ${i % 2 === 1 ? "bg-[#f8fafd] px-3 -mx-3" : "px-3 -mx-3"}`}
                    >
                      <div className="w-full sm:w-[280px] shrink-0 text-[#64748b] font-bold text-[13px] uppercase tracking-wide pt-0.5">
                        {row.label}
                      </div>
                      <div
                        className={`w-full text-[#0b1c5c] text-[15px] ${row.bold ? "font-bold" : ""}`}
                      >
                        {row.link ? (
                          <a
                            href={
                              row.value.startsWith("http")
                                ? row.value
                                : `https://${row.value}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0369a1] hover:underline block mt-1 sm:mt-0"
                          >
                            {row.value}
                          </a>
                        ) : (
                          <div className="mt-1 sm:mt-0">{row.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Footer Info */}
          <div className="mt-12 pt-4">
            <IncorrectDataDialog />
            <p className="text-slate-600 text-[15px] font-medium mt-6">
              This data has been provided by{" "}
              {companyData?.names?.english ||
                companyData?.names?.arabic ||
                "the company"}
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
