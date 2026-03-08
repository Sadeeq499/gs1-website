"use client";

import React, { useState } from "react";
import { Search, Info, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSccVerified } from "@/lib/hooks/useVerify";
import IncorrectDataDialog from "./IncorrectDataDialog";

import { useTranslations, useLocale } from "next-intl";

export default function OtherKeysPanel() {
  const [selectedKeyType, setSelectedKeyType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [submittedType, setSubmittedType] = useState("");
  const t = useTranslations("verify.panels");
  const tCommon = useTranslations("verify.panels.common");
  const locale = useLocale();

  const {
    data: responseData,
    isFetching,
    isError,
    error,
  } = useSccVerified(submittedType === "SSCC" ? submittedQuery : "");

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery || !selectedKeyType) return;
    setSubmittedQuery(searchQuery);
    setSubmittedType(selectedKeyType);
  };

  const handleExampleClick = () => {
    setSelectedKeyType("SSCC");
    setSearchQuery("003000123456789012");
    setSubmittedType("SSCC");
    setSubmittedQuery("003000123456789012");
  };

  // Safely extract from response
  const payload = responseData?.data || responseData;
  const ssccData = payload?.sscc;
  const companyData = payload?.company;

  return (
    <div className="mx-auto w-full max-w-[900px] pt-6 pb-12">
      <form onSubmit={handleSearch} className="w-full">
        {/* Unified Search Bar Container */}
        <div className="relative flex flex-col sm:flex-row w-full items-stretch sm:items-center shadow-sm rounded-md bg-white border border-slate-300 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all duration-200">
          {/* Left: Dropdown Select */}
          <div className="w-full sm:w-[300px] shrink-0 relative z-10 hover:bg-slate-50 transition-colors rounded-t-md sm:rounded-l-md sm:rounded-tr-none border-b sm:border-b-0">
            <Select value={selectedKeyType} onValueChange={setSelectedKeyType}>
              <SelectTrigger className="h-14 w-full px-4 text-[15px] border-0 bg-transparent rounded-t-md sm:rounded-l-md sm:rounded-tr-none focus:ring-0 focus:ring-offset-0 text-slate-800 font-medium shadow-none outline-none">
                <SelectValue placeholder={t("other.selectKeyType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SSCC">
                  SSCC - Serial Shipping Container
                </SelectItem>
                <SelectItem value="GRAI" disabled>
                  GRAI - Global Returnable Asset
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 ml-2">
                    ({t("other.comingSoon")})
                  </span>
                </SelectItem>
                <SelectItem value="GIAI" disabled>
                  GIAI - Global Individual Asset
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 ml-2">
                    ({t("other.comingSoon")})
                  </span>
                </SelectItem>
                <SelectItem value="GSRN" disabled>
                  GSRN - Global Service Relation
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 ml-2">
                    ({t("other.comingSoon")})
                  </span>
                </SelectItem>
                <SelectItem value="GDTI" disabled>
                  GDTI - Global Document Type
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 ml-2">
                    ({t("other.comingSoon")})
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Right: Search Input + Button */}
          <div className="relative flex flex-1 items-center min-w-0 border-t sm:border-t-0 sm:border-l border-slate-200 bg-white rounded-b-md sm:rounded-r-md sm:rounded-bl-none">
            {/* Search Icon */}
            <div className="absolute left-4 flex items-center justify-center text-slate-400 pointer-events-none z-10">
              <Search className="h-5 w-5 stroke-[1.5]" />
            </div>

            {/* Search Input */}
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("other.placeholder")}
              className="h-14 w-full pl-12 pr-[100px] sm:pr-32 text-lg border-0 bg-transparent rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none outline-none placeholder:font-normal"
            />

            {/* Search Button */}
            <Button
              type="submit"
              disabled={isFetching}
              className="absolute right-0 top-0 bottom-0 h-14 rounded-l-none rounded-br-md rounded-tr-none sm:rounded-tr-md sm:rounded-br-md bg-secondary text-white hover:bg-[#d9532b] px-6 sm:px-8 text-base font-medium flex items-center gap-2"
            >
              {isFetching && <Loader2 className="h-5 w-5 animate-spin" />}
              {tCommon("search")}
            </Button>
          </div>
        </div>
      </form>

      {/* Example link below */}
      <div className="mt-4 sm:ml-[316px] pl-1 text-[15px] text-slate-700">
        {tCommon("exampleSearch")}{" "}
        <button
          type="button"
          onClick={handleExampleClick}
          className="font-medium text-primary hover:text-[#0b1c5c] hover:underline transition-colors"
        >
          003000123456789012
        </button>
      </div>

      {isError && (
        <div className="mt-12 text-red-500 bg-red-50 p-4 rounded-md border border-red-200">
          <p className="font-medium">{t("other.errorLoading")}</p>
          <p className="text-sm mt-1">
            {error?.response?.data?.error ||
              error?.response?.data?.message ||
              error?.message ||
              "An unexpected error occurred"}
          </p>
        </div>
      )}

      {payload && ssccData && !isFetching && (
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
              {tCommon("registeredToKey")}{" "}
              <span className="font-bold text-black">
                {companyData?.names?.english ||
                  companyData?.names?.arabic ||
                  companyData?.companyName ||
                  tCommon("unknown")}
                .
              </span>
            </p>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList
              variant="line"
              className="w-full justify-start border-b flex-wrap border-slate-200/80 rounded-none pb-0 h-auto px-0 gap-8 bg-transparent"
            >
              <TabsTrigger
                value="details"
                className="relative flex-none rounded-none bg-transparent pb-3 pt-2 px-1 text-[16px] font-medium text-slate-500 hover:text-[#0b1c5c] data-[state=active]:text-[#0b1c5c] data-[state=active]:shadow-none data-[state=active]:bg-transparent after:hidden border-x-0 border-t-0 border-b-2 border-transparent data-[state=active]:border-b-[#d9532b] transition-none translate-y-px"
              >
                {tCommon("keyInfo")}
              </TabsTrigger>
              <TabsTrigger
                value="company"
                className="relative flex-none rounded-none bg-transparent pb-3 pt-2 px-1 text-[16px] font-medium text-slate-500 hover:text-[#0b1c5c] data-[state=active]:text-[#0b1c5c] data-[state=active]:shadow-none data-[state=active]:bg-transparent after:hidden border-x-0 border-t-0 border-b-2 border-transparent data-[state=active]:border-b-[#d9532b] transition-none translate-y-px"
              >
                {tCommon("companyInfo")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="pt-8">
              <h2 className="text-[#0b1c5c] text-[26px] font-medium mb-8">
                {submittedType || "SSCC"} {t("other.ssccDetails")}
              </h2>

              <div className="w-full border-t border-[#0b1c5c]/20">
                {[
                  {
                    label: t("other.attributes.sscc"),
                    value: ssccData.ssccNumber,
                    bold: true,
                  },
                  { label: t("other.attributes.type"), value: ssccData.type },
                  {
                    label: t("other.attributes.productName"),
                    value: ssccData.product?.productName,
                  },
                  {
                    label: t("other.attributes.hsnSku"),
                    value: ssccData.product?.hsnSku,
                  },
                  {
                    label: t("other.attributes.vendorId"),
                    value: ssccData.vendor?.vendorId,
                  },
                  {
                    label: t("other.attributes.vendorName"),
                    value: ssccData.vendor?.vendorName,
                  },
                  {
                    label: t("other.attributes.quantity"),
                    value: ssccData.quantity?.qty,
                  },
                  {
                    label: t("other.attributes.boxOf"),
                    value: ssccData.quantity?.boxof,
                  },
                  {
                    label: t("other.attributes.carton"),
                    value: ssccData.quantity?.carton,
                  },
                  {
                    label: t("other.attributes.useBy"),
                    value: ssccData.dates?.useBy,
                  },
                  {
                    label: t("other.attributes.expiration"),
                    value: ssccData.dates?.expirationDate,
                  },
                  {
                    label: t("other.attributes.shipDate"),
                    value: ssccData.dates?.shipDate,
                  },
                  {
                    label: t("other.attributes.shipTo"),
                    value: ssccData.logistics?.shipTo,
                  },
                  {
                    label: t("other.attributes.poNumber"),
                    value: ssccData.logistics?.poNumber,
                  },
                  {
                    label: t("other.attributes.vendorItemNo"),
                    value: ssccData.logistics?.vendorItemNo,
                  },
                  {
                    label: t("other.attributes.countryId"),
                    value: ssccData.logistics?.countryId,
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
                        <div className="mt-1 sm:mt-0">{row.value}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="company" className="pt-8">
              <h2 className="text-[#0b1c5c] text-[26px] font-medium mb-8">
                {tCommon("infoAboutCompany")}
              </h2>

              <div className="w-full border-t border-[#0b1c5c]/20">
                {[
                  {
                    label: t("company.attributes.name"),
                    value:
                      (locale === "ar"
                        ? companyData?.names?.arabic
                        : companyData?.names?.english) ||
                      companyData?.companyName ||
                      tCommon("unknown"),
                    bold: true,
                  },
                  {
                    label: t("company.attributes.address"),
                    value:
                      companyData?.address?.city ||
                      companyData?.address?.state ||
                      companyData?.address?.country ? (
                        <div className="flex flex-col gap-1 mt-1 sm:mt-0">
                          {companyData?.address?.district && (
                            <div className="font-bold">
                              {companyData?.address?.district}
                            </div>
                          )}
                          {(companyData?.address?.city ||
                            companyData?.address?.state) && (
                            <div className="font-bold">
                              {[
                                companyData?.address?.city,
                                companyData?.address?.state,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </div>
                          )}
                          {companyData?.address?.country && (
                            <div className="font-bold">
                              {companyData?.address?.country}
                            </div>
                          )}
                          {companyData?.address?.zipCode && (
                            <div className="font-bold">
                              Zip Code: {companyData?.address?.zipCode}
                            </div>
                          )}
                          {companyData?.address?.poBox && (
                            <div className="font-bold">
                              PO Box: {companyData?.address?.poBox}
                            </div>
                          )}
                        </div>
                      ) : (
                        tCommon("unknown")
                      ),
                  },
                  {
                    label: t("company.attributes.website"),
                    value:
                      companyData?.contact?.website?.trim() ||
                      tCommon("unknown"),
                    link: !!companyData?.contact?.website?.trim(),
                    bold: true,
                  },
                  {
                    label: t("company.attributes.licenseKey"),
                    value:
                      companyData?.membership?.gcpGLNID || tCommon("unknown"),
                    bold: true,
                  },
                  {
                    label: t("company.attributes.licenseType"),
                    value:
                      companyData?.membership?.gcpType || tCommon("unknown"),
                    bold: true,
                  },
                  {
                    label: t("company.attributes.gln"),
                    value:
                      companyData?.gln ||
                      companyData?.membership?.gcpGLNID ||
                      tCommon("unknown"), // fallback since standard is often GLN=GCP
                    bold: true,
                  },
                  {
                    label: t("company.attributes.mo"),
                    value:
                      companyData?.memberOrganization || "GS1 Saudi Arabia",
                    bold: true,
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`flex flex-col sm:flex-row py-4 border-b border-[#0b1c5c]/20 ${i % 2 === 1 ? "bg-[#f8fafd] px-3 -mx-3" : "px-3 -mx-3"}`}
                  >
                    <div className="w-full sm:w-[320px] shrink-0 text-[#64748b] font-bold text-[13px] uppercase tracking-wide pt-0.5">
                      {row.label}
                    </div>
                    <div
                      className={`w-full text-[#0b1c5c] text-[15px] ${row.bold && row.value !== tCommon("unknown") ? "font-bold" : "min-h-[22px]"}`}
                    >
                      {row.link && row.value !== tCommon("unknown") ? (
                        <a
                          href={
                            row.value.startsWith("http")
                              ? row.value
                              : `https://${row.value}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#0369a1] hover:underline block mt-1 sm:mt-0 break-all"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <div className="mt-1 sm:mt-0 text-slate-500">
                          {row.value}
                        </div>
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
              {tCommon("providedBy")}{" "}
              {(locale === "ar"
                ? companyData?.names?.arabic
                : companyData?.names?.english) ||
                companyData?.companyName ||
                tCommon("unknown")}
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
