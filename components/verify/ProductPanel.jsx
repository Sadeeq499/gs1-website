"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, Info, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useProductGs1Verified } from "@/lib/hooks/useVerify";
import { useTranslations, useLocale } from "next-intl";
import IncorrectDataDialog from "./IncorrectDataDialog";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseCountryOfSale(countryOfSaleArr) {
  if (!countryOfSaleArr || countryOfSaleArr.length === 0) return undefined;

  const combined = countryOfSaleArr
    .map((item) => (item?.code ?? "").trim())
    .join("");

  if (
    combined.includes("isoCode") ||
    combined.startsWith("[") ||
    combined.startsWith("{")
  ) {
    try {
      const unescaped = combined.replace(/\\"/g, '"');
      const jsonStart = unescaped.indexOf("[");
      const jsonEnd = unescaped.lastIndexOf("]");
      const jsonStr =
        jsonStart !== -1 && jsonEnd !== -1
          ? unescaped.slice(jsonStart, jsonEnd + 1)
          : unescaped;

      const parsed = JSON.parse(jsonStr);
      const entries = Array.isArray(parsed) ? parsed : [parsed];
      const labels = entries
        .map((entry) => entry.name || entry.isoCode || entry.code)
        .filter(Boolean);

      if (labels.length > 0) return labels.join(", ");
    } catch {
      // JSON parse failed — fall through to plain display
    }
  }

  const plain = countryOfSaleArr
    .map((item) => (item?.code ?? "").trim())
    .filter(Boolean);

  return plain.length > 0 ? plain.join(", ") : undefined;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProductPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const t = useTranslations("verify.panels");
  const tCommon = useTranslations("verify.panels.common");
  const tCert = useTranslations("verify.panels.certifications");
  const locale = useLocale();

  // The single source of truth for what has been searched lives in the URL.
  // ?barcode=<value> drives the data-fetch; the input is purely local UI state.
  const triggeredQuery = searchParams.get("barcode") ?? "";
  const [searchQuery, setSearchQuery] = useState(triggeredQuery);

  const {
    data: productVerifiedData,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useProductGs1Verified(triggeredQuery);

  const productData = productVerifiedData?.data;
  const isMutating = isFetching;

  // ---------------------------------------------------------------------------
  // Keep the input in sync when the URL changes (back/forward, locale switch)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setSearchQuery(triggeredQuery);
  }, [triggeredQuery]);

  // ---------------------------------------------------------------------------
  // URL helper — writes ?barcode=<query> while preserving other params
  // ---------------------------------------------------------------------------
  const pushQuery = (query) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("barcode", query);
    } else {
      params.delete("barcode");
    }
    // replace so we don't pollute browser history on every keystroke/search
    router.replace(`${pathname}?${params.toString()}`);
  };

  // ---------------------------------------------------------------------------
  // Event handlers
  // ---------------------------------------------------------------------------
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery) return;

    if (triggeredQuery === searchQuery) {
      // Same query already in URL → just re-fetch
      refetch();
    } else {
      // Push new barcode to URL → hook re-runs with new triggeredQuery
      pushQuery(searchQuery);
    }
  };

  const handleExampleClick = () => {
    const example = "09506000140445";
    setSearchQuery(example);
    if (triggeredQuery === example) {
      refetch();
    } else {
      pushQuery(example);
    }
  };

  // ---------------------------------------------------------------------------
  // Locale-aware helpers
  // ---------------------------------------------------------------------------
  const getLocalized = (multilingualObj) => {
    if (!multilingualObj) return undefined;
    const preferred = locale === "ar" ? multilingualObj.ar : multilingualObj.en;
    return preferred ?? multilingualObj.en ?? multilingualObj.ar;
  };

  const getCompanyName = (company) => {
    if (!company) return tCommon("unknown");
    if (locale === "ar" && company.nameArabic) return company.nameArabic;
    return company.name || tCommon("unknown");
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="mx-auto w-full max-w-[900px] pt-6 pb-12">
      {/* ── Search Form ── */}
      <form
        onSubmit={handleSearch}
        className="relative flex w-full items-center"
      >
        <div className="absolute left-3.5 flex items-center justify-center text-slate-500 pointer-events-none">
          <Search className="h-5 w-5 stroke-[1.5]" />
        </div>

        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("product.placeholder")}
          className="h-14 w-full pl-12 pr-32 text-lg border-slate-300 rounded-md focus-visible:ring-primary focus-visible:border-primary shadow-sm"
        />

      <Button
  type="submit"
  disabled={isMutating}
  className="absolute right-0 top-0 bottom-0 h-14 rounded-l-none rounded-r-md bg-secondary text-white hover:bg-[#d9532b] px-8 text-base font-medium flex items-center gap-2"
>
  {/* Always render the icon, just hide it when not loading */}
  <Loader2 className={`h-5 w-5 animate-spin ${isMutating ? "visible" : "invisible"}`} />
  {tCommon("search")}
</Button>
      </form>

      {/* Example link */}
      <div className="mt-4 pl-1 text-[15px] text-slate-700">
        {tCommon("exampleSearch")}{" "}
        <button
          type="button"
          onClick={handleExampleClick}
          className="font-medium text-primary hover:text-[#0b1c5c] hover:underline"
        >
          09506000140445
        </button>
      </div>

      {/* ── Results ── */}
      {productData && productData.product && (
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Verified Banner */}
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
            <div className="bg-white/50 p-1 rounded-full mr-2">
              <Info className="h-5 w-5 text-slate-600 shrink-0 stroke-[1.5]" />
            </div>
            <p className="text-slate-800 text-[16px]">
              {tCommon("registeredTo")}{" "}
              <span className="font-bold text-black">
                {getCompanyName(productData.product.company)}.
              </span>
            </p>
          </div>

          {/* ── Tabs ── */}
          <Tabs defaultValue="product" className="w-full">
            <TabsList
              variant="line"
              className="w-full justify-start border-b flex-wrap border-slate-200/80 rounded-none pb-0 h-auto px-0 gap-8 bg-transparent"
            >
              <TabsTrigger
                value="product"
                className="relative flex-none rounded-none bg-transparent pb-3 pt-2 px-1 text-[16px] font-medium text-slate-500 hover:text-[#0b1c5c] data-[state=active]:text-[#0b1c5c] data-[state=active]:shadow-none data-[state=active]:bg-transparent after:hidden border-x-0 border-t-0 border-b-2 border-transparent data-[state=active]:border-b-[#d9532b] transition-none translate-y-px"
              >
                {tCommon("productInfo")}
              </TabsTrigger>
              <TabsTrigger
                value="company"
                className="relative flex-none rounded-none bg-transparent pb-3 pt-2 px-1 text-[16px] font-medium text-slate-500 hover:text-[#0b1c5c] data-[state=active]:text-[#0b1c5c] data-[state=active]:shadow-none data-[state=active]:bg-transparent after:hidden border-x-0 border-t-0 border-b-2 border-transparent data-[state=active]:border-b-[#d9532b] transition-none translate-y-px"
              >
                {tCommon("companyInfo")}
              </TabsTrigger>
            </TabsList>

            {/* ── PRODUCT TAB ── */}
            <TabsContent value="product" className="pt-8">
              <h2 className="text-[#0b1c5c] text-[26px] font-medium mb-8">
                {getLocalized(productData.product.product?.nameMultilingual) ||
                  tCommon("productInfo")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                {/* Product Image */}
                <div className="flex justify-start items-start pt-2">
                  <div className="w-full max-w-[200px] aspect-3/4 relative bg-white flex items-center justify-center">
                    {productData.product.media?.images?.primary ? (
                      <img
                        src={productData.product.media.images.primary}
                        alt="Product Image"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-slate-400">{tCommon("noImage")}</div>
                    )}
                  </div>
                </div>

                {/* Attributes Table */}
                <div className="w-full border-t border-[#0b1c5c]/20">
                  {[
                    {
                      label: t("product.attributes.gtin"),
                      value: productData.product.gtin || productData.barcode,
                      bold: true,
                    },
                    {
                      label: t("product.attributes.brand"),
                      value: getLocalized(
                        productData.product.product?.brandMultilingual
                      ),
                      bold: true,
                    },
                    {
                      label: t("product.attributes.description"),
                      value: getLocalized(
                        productData.product.product?.descriptionMultilingual
                      ),
                      bold: true,
                    },
                    {
                      label: t("product.attributes.image"),
                      value: productData.product.media?.images?.primary,
                      link: true,
                      bold: true,
                    },
                    {
                      label: t("product.attributes.gpc"),
                      value: productData.product.product?.gpcCategory,
                      bold: true,
                    },
                    {
                      label: t("product.attributes.netContent"),
                      value: productData.product.specifications?.netContent
                        ? `${productData.product.specifications.netContent.value} ${productData.product.specifications.netContent.unit}`
                        : undefined,
                      bold: true,
                    },
                    {
                      label: t("product.attributes.countryOfSale"),
                      value: parseCountryOfSale(
                        productData.product.specifications?.countryOfSale
                      ),
                      bold: true,
                    },
                  ]
                    .filter((r) => r.value)
                    .map((row, i) => (
                      <div
                        key={i}
                        className={`flex flex-col sm:flex-row py-3.5 border-b border-[#0b1c5c]/20 ${
                          i % 2 === 1
                            ? "bg-[#f8fafd] px-3 -mx-3"
                            : "px-3 -mx-3"
                        }`}
                      >
                        <div className="w-full sm:w-[240px] shrink-0 text-[#64748b] font-bold text-[13px] uppercase tracking-wide pt-0.5">
                          {row.label}
                        </div>
                        <div
                          className={`w-full text-[#0b1c5c] text-[15px] ${
                            row.bold ? "font-bold" : ""
                          }`}
                        >
                          {row.link ? (
                            <a
                              href={row.value}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#0369a1] hover:underline break-all block mt-1 sm:mt-0"
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
              </div>

              {/* Certifications */}
              {(productData.product.certifications?.is_saso_certified ||
                productData.product.certifications?.is_saudi_made) && (
                <div className="mt-10">
                  <div className="flex items-center gap-3 mb-5">
                    <h3 className="text-[#0b1c5c] text-[18px] font-semibold">
                      {tCert("title")}
                    </h3>
                    <div className="flex-1 h-px bg-[#0b1c5c]/15" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {productData.product.certifications?.is_saso_certified && (
                      <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="shrink-0 w-[56px] h-[56px] flex items-center justify-center">
                          <img
                            src="/logos/saso.png"
                            alt="SASO Certified"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[13px] font-semibold text-[#0b1c5c] leading-tight">
                            {tCert("saso.label")}
                          </span>
                          <span className="text-[12px] text-slate-500 mt-0.5">
                            {tCert("saso.description")}
                          </span>
                          <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#2e7d32] bg-[#e8f5e9] px-2 py-0.5 rounded-full w-fit">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {tCert("verified")}
                          </span>
                        </div>
                      </div>
                    )}
                    {productData.product.certifications?.is_saudi_made && (
                      <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="shrink-0 w-[56px] h-[56px] flex items-center justify-center">
                          <Image
                            src="/logos/saudi-made.png"
                            alt="Saudi Made"
                            width={56}
                            height={56}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[13px] font-semibold text-[#0b1c5c] leading-tight">
                            {tCert("saudiMade.label")}
                          </span>
                          <span className="text-[12px] text-slate-500 mt-0.5">
                            {tCert("saudiMade.description")}
                          </span>
                          <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#2e7d32] bg-[#e8f5e9] px-2 py-0.5 rounded-full w-fit">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {tCert("verified")}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* ── COMPANY TAB ── */}
            <TabsContent value="company" className="pt-8">
              <h2 className="text-[#0b1c5c] text-[26px] font-medium mb-8">
                {tCommon("infoAboutCompanyLicenced")}
              </h2>

              <div className="w-full border-t border-[#0b1c5c]/20">
                {[
                  {
                    label: t("company.attributes.name"),
                    value: getCompanyName(productData.product.company),
                    bold: true,
                  },
                  {
                    label: t("company.attributes.address"),
                    value:
                      productData.product.company?.address?.street ||
                      productData.product.company?.address?.locality ||
                      productData.product.company?.address?.region ||
                      productData.product.company?.address?.countryCode ? (
                        <div className="flex flex-col gap-1 mt-1 sm:mt-0">
                          {productData.product.company.address.formatted ? (
                            <div className="font-bold">
                              {productData.product.company.address.formatted}
                            </div>
                          ) : (
                            <>
                              {productData.product.company.address.street && (
                                <div className="font-bold">
                                  {productData.product.company.address.street}
                                </div>
                              )}
                              {productData.product.company.address
                                .streetLine2 && (
                                <div className="font-bold">
                                  {
                                    productData.product.company.address
                                      .streetLine2
                                  }
                                </div>
                              )}
                              {(productData.product.company.address.locality ||
                                productData.product.company.address.region) && (
                                <div className="font-bold">
                                  {[
                                    productData.product.company.address
                                      .locality,
                                    productData.product.company.address.region,
                                  ]
                                    .filter(Boolean)
                                    .join(", ")}
                                </div>
                              )}
                              {productData.product.company.address
                                .postalCode && (
                                <div className="font-bold">
                                  {
                                    productData.product.company.address
                                      .postalCode
                                  }
                                </div>
                              )}
                              {productData.product.company.address
                                .countryCode && (
                                <div className="font-bold">
                                  {
                                    productData.product.company.address
                                      .countryCode
                                  }
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ) : (
                        tCommon("unknown")
                      ),
                  },
                  {
                    label: t("company.attributes.website"),
                    value:
                      productData.product.company?.website?.trim() ||
                      tCommon("unknown"),
                    link: !!productData.product.company?.website?.trim(),
                    bold: true,
                  },
                  {
                    label: t("company.attributes.licenseKey"),
                    value:
                      productData.product.company?.gcp || tCommon("unknown"),
                    bold: true,
                  },
                  {
                    label: t("company.attributes.licenseType"),
                    value:
                      productData.product.company?.licenseType ||
                      tCommon("unknown"),
                    bold: true,
                  },
                  {
                    label: t("company.attributes.gln"),
                    value:
                      productData.product.company?.gln || tCommon("unknown"),
                    bold: true,
                  },
                  {
                    label: t("company.attributes.mo"),
                    value:
                      productData.product.company?.memberOrganization ||
                      tCommon("unknown"),
                    bold: true,
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`flex flex-col sm:flex-row py-4 border-b border-[#0b1c5c]/20 ${
                      i % 2 === 1 ? "bg-[#f8fafd] px-3 -mx-3" : "px-3 -mx-3"
                    }`}
                  >
                    <div className="w-full sm:w-[320px] shrink-0 text-[#64748b] font-bold text-[13px] uppercase tracking-wide pt-0.5">
                      {row.label}
                    </div>
                    <div
                      className={`w-full text-[#0b1c5c] text-[15px] ${
                        row.bold && row.value !== tCommon("unknown")
                          ? "font-bold"
                          : "min-h-[22px]"
                      }`}
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

          {/* Footer */}
          <div className="mt-12 pt-4">
            <IncorrectDataDialog />
            <p className="text-slate-600 text-[15px] font-medium mt-6">
              {tCommon("providedBy")}{" "}
              {getCompanyName(productData.product.company)}{" "}
              {tCommon("lastUpdated")}{" "}
              {productData.product.company?.dates?.updated ||
              productData.product.metadata?.dateUpdated
                ? new Date(
                    productData.product.company?.dates?.updated ||
                      productData.product.metadata?.dateUpdated
                  ).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : tCommon("unknownDate")}
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
}