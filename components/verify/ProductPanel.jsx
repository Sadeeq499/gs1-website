"use client";

import React, { useState } from "react";
import { Search, Info, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useProductGs1Verified } from "@/lib/hooks/useVerify";

import IncorrectDataDialog from "./IncorrectDataDialog";

export default function ProductPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [productData, setProductData] = useState(null);

  const {
    mutateAsync: productGs1Verified,
    isPending,
    isLoading,
  } = useProductGs1Verified();
  const isMutating = isPending || isLoading;

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery) return;
    try {
      const res = await productGs1Verified(searchQuery);
      if (res?.success && res?.data) {
        setProductData(res.data);
      } else {
        setProductData(null);
      }
    } catch (error) {
      console.error(error);
      setProductData(null);
    }
  };

  const handleExampleClick = async () => {
    setSearchQuery("09506000140445");
    try {
      const res = await productGs1Verified("09506000140445");
      if (res?.success && res?.data) {
        setProductData(res.data);
      } else {
        setProductData(null);
      }
    } catch (error) {
      console.error(error);
      setProductData(null);
    }
  };

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
          placeholder="Enter GTIN (e.g. 6280000000000)"
          className="h-14 w-full pl-12 pr-32 text-lg border-slate-300 rounded-md focus-visible:ring-primary focus-visible:border-primary shadow-sm"
        />

        <Button
          type="submit"
          disabled={isMutating}
          className="absolute right-0 top-0 bottom-0 h-14 rounded-l-none rounded-r-md bg-secondary text-white hover:bg-[#d9532b] px-8 text-base font-medium flex items-center gap-2"
        >
          {isMutating && <Loader2 className="h-5 w-5 animate-spin" />}
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
          09506000140445
        </button>
      </div>

      {productData && productData.product && (
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
              This number is registered to{" "}
              <span className="font-bold text-black">
                {productData.product.company?.name || "N/A"}.
              </span>
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="product" className="w-full">
            <TabsList
              variant="line"
              className="w-full justify-start border-b flex-wrap border-slate-200/80 rounded-none pb-0 h-auto px-0 gap-8 bg-transparent"
            >
              <TabsTrigger
                value="product"
                className="relative flex-none rounded-none bg-transparent pb-3 pt-2 px-1 text-[16px] font-medium text-slate-500 hover:text-[#0b1c5c] data-[state=active]:text-[#0b1c5c] data-[state=active]:shadow-none data-[state=active]:bg-transparent after:hidden border-x-0 border-t-0 border-b-2 border-transparent data-[state=active]:border-b-[#d9532b] transition-none translate-y-px"
              >
                Product information
              </TabsTrigger>
              <TabsTrigger
                value="company"
                className="relative flex-none rounded-none bg-transparent pb-3 pt-2 px-1 text-[16px] font-medium text-slate-500 hover:text-[#0b1c5c] data-[state=active]:text-[#0b1c5c] data-[state=active]:shadow-none data-[state=active]:bg-transparent after:hidden border-x-0 border-t-0 border-b-2 border-transparent data-[state=active]:border-b-[#d9532b] transition-none translate-y-px"
              >
                Company information
              </TabsTrigger>
            </TabsList>

            <TabsContent value="product" className="pt-8">
              <h2 className="text-[#0b1c5c] text-[26px] font-medium mb-8">
                {productData.product.product?.description ||
                  "Product Information"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                {/* Image Placeholder */}
                <div className="flex justify-start items-start pt-2">
                  <div className="w-full max-w-[200px] aspect-3/4 relative bg-white flex items-center justify-center">
                    {productData.product.media?.images?.primary ? (
                      <img
                        src={productData.product.media.images.primary}
                        alt="Product Image"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-slate-400">No Image Available</div>
                    )}
                  </div>
                </div>

                {/* Attributes Table */}
                <div className="w-full border-t border-[#0b1c5c]/20">
                  {[
                    {
                      label: "GTIN",
                      value: productData.product.gtin || productData.barcode,
                      bold: true,
                    },
                    {
                      label: "Brand name",
                      value: productData.product.product?.brand,
                      bold: true,
                    },
                    {
                      label: "Product description",
                      value: productData.product.product?.description,
                      bold: true,
                    },
                    {
                      label: "Product image URL",
                      value: productData.product.media?.images?.primary,
                      link: true,
                      bold: true,
                    },
                    {
                      label: "Global product category",
                      value: productData.product.product?.gpcCategory,
                      bold: true,
                    },
                    {
                      label: "Net content",
                      value: productData.product.specifications?.netContent
                        ? `${productData.product.specifications.netContent.value} ${productData.product.specifications.netContent.unit}`
                        : undefined,
                      bold: true,
                    },
                    {
                      label: "Country of sale",
                      value: productData.product.specifications?.countryOfSale
                        ?.map((c) => c.code)
                        .join(", "),
                      bold: true,
                    },
                  ]
                    .filter((r) => r.value)
                    .map((row, i) => (
                      <div
                        key={i}
                        className={`flex flex-col sm:flex-row py-3.5 border-b border-[#0b1c5c]/20 ${i % 2 === 1 ? "bg-[#f8fafd] px-3 -mx-3" : "px-3 -mx-3"}`}
                      >
                        <div className="w-full sm:w-[240px] shrink-0 text-[#64748b] font-bold text-[13px] uppercase tracking-wide pt-0.5">
                          {row.label}
                        </div>
                        <div
                          className={`w-full text-[#0b1c5c] text-[15px] ${row.bold ? "font-bold" : ""}`}
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
            </TabsContent>

            <TabsContent value="company" className="pt-8">
              <h2 className="text-[#0b1c5c] text-[26px] font-medium mb-8">
                Information about the company that licenced this GTIN
              </h2>

              <div className="w-full border-t border-[#0b1c5c]/20">
                {[
                  {
                    label: "Company Name",
                    value: productData.product.company?.name,
                    bold: true,
                  },
                  productData.product.company?.address?.street ||
                  productData.product.company?.address?.locality ||
                  productData.product.company?.address?.region ||
                  productData.product.company?.address?.countryCode
                    ? {
                        label: "Address",
                        value: (
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
                                {(productData.product.company.address
                                  .locality ||
                                  productData.product.company.address
                                    .region) && (
                                  <div className="font-bold">
                                    {[
                                      productData.product.company.address
                                        .locality,
                                      productData.product.company.address
                                        .region,
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
                        ),
                      }
                    : null,
                  {
                    label: "Website",
                    value: productData.product.company?.website?.trim()
                      ? productData.product.company.website
                      : undefined,
                    link: true,
                    bold: true,
                  },
                  {
                    label: "License Key",
                    value: productData.product.company?.gcp,
                    bold: true,
                  },
                  {
                    label: "License Type",
                    value: productData.product.company?.licenseType,
                    bold: true,
                  },
                  {
                    label: "Global Location Number (GLN)",
                    value: productData.product.company?.gln,
                    bold: true,
                  },
                  {
                    label: "Licensing GS1 Member Organisation",
                    value: productData.product.company?.memberOrganization,
                    bold: true,
                  },
                ]
                  .filter((r) => r && r.value)
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
                            href={row.value}
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
            <p className="text-slate-600 text-[15px] font-medium">
              This data has been provided by{" "}
              {productData.product.company?.name || "the company"} and was last
              updated on{" "}
              {productData.product.company?.dates?.updated ||
              productData.product.metadata?.dateUpdated
                ? new Date(
                    productData.product.company?.dates?.updated ||
                      productData.product.metadata?.dateUpdated,
                  ).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "unknown date"}
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
