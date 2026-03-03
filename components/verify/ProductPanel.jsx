"use client";

import React, { useState } from "react";
import { Search, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";

export default function ProductPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    // In a real app, this would perform a fetch or navigation
    setHasSearched(true);
    console.log("Searching GTIN:", searchQuery);
  };

  const handleExampleClick = () => {
    setSearchQuery("09506000140445");
    setHasSearched(true);
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

        {/* Search Button */}
        <Button
          type="submit"
          className="absolute right-0 top-0 bottom-0 h-14 rounded-l-none rounded-r-md bg-secondary text-white hover:bg-[#d9532b] px-8 text-base font-medium"
        >
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

      {hasSearched && (
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
              <span className="font-bold text-black">GS1 Demo Account.</span>
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
                Sticky's Traditional Strawberry Jam Low Sugar 500 Gram
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                {/* Image Placeholder */}
                <div className="flex justify-start items-start pt-2">
                  <div className="w-full max-w-[200px] aspect-3/4 relative bg-white flex items-center justify-center">
                    {/* Fallback mock image */}
                    <img
                      src="https://www.gs1.org/docs/09506000140445_A1C1.jpg"
                      alt="Strawberry Jam"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Attributes Table */}
                <div className="w-full border-t border-[#0b1c5c]/20">
                  {[
                    { label: "GTIN", value: "09506000140445", bold: true },
                    { label: "Brand name", value: "(en) Sticky's", bold: true },
                    {
                      label: "Product description",
                      value:
                        "(en) Sticky's Traditional Strawberry Jam Low Sugar 500 Gram",
                      bold: true,
                    },
                    {
                      label: "Product image URL",
                      value:
                        "(en) https://www.gs1.org/docs/09506000140445_A1C1.jpg",
                      link: true,
                      bold: true,
                    },
                    {
                      label: "Global product category",
                      value: "10000217 Jams/Marmalades (Shelf Stable)",
                      bold: true,
                    },
                    { label: "Net content", value: "500 Gram", bold: true },
                    {
                      label: "Country of sale",
                      value: "Whole world",
                      bold: true,
                    },
                  ].map((row, i) => (
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
                            href={row.value.split(" ")[1]}
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
                    value: "GS1 Demo Account",
                    bold: true,
                  },
                  {
                    label: "Address",
                    value: (
                      <div className="flex flex-col gap-1 mt-1 sm:mt-0">
                        <div className="font-bold">GS1</div>
                        <div className="font-bold">
                          Avenue Louise 326 Blue Tower
                        </div>
                        <div className="font-bold">
                          BRUXELLES, Région de Bruxelles-Capitale
                        </div>
                        <div className="font-bold">B-1050</div>
                        <div className="font-bold">Belgium</div>
                      </div>
                    ),
                  },
                  {
                    label: "Website",
                    value: "https://website.com",
                    link: true,
                    bold: true,
                  },
                  { label: "License Key", value: "95060001404", bold: true },
                  {
                    label: "License Type",
                    value: "GS1 Company Prefix",
                    bold: true,
                  },
                  {
                    label: "Global Location Number (GLN)",
                    value: "9506248700180",
                    bold: true,
                  },
                  {
                    label: "Licensing GS1 Member Organisation",
                    value: "GS1 Global Office",
                    bold: true,
                  },
                ].map((row, i) => (
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
        </div>
      )}
    </div>
  );
}
