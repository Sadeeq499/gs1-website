"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProductPanel() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    // In a real app, this would perform a fetch or navigation
    console.log("Searching GTIN:", searchQuery);
  };

  const handleExampleClick = () => {
    setSearchQuery("9506000140445");
  };

  return (
    <div className="mx-auto w-full max-w-4xl pt-6 pb-2">
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
          9506000140445
        </button>
      </div>
    </div>
  );
}
