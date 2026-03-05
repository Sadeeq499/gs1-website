"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OtherKeysPanel() {
  const [selectedKeyType, setSelectedKeyType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery || !selectedKeyType) return;
    // Handle the search action here next
    console.log("Searching for", selectedKeyType, "with value", searchQuery);
  };

  const handleExampleClick = () => {
    setSelectedKeyType("SSCC");
    setSearchQuery("003000123456789012");
  };

  return (
    <div className="mx-auto w-full max-w-[900px] pt-6 pb-12">
      <form onSubmit={handleSearch} className="w-full">
        {/* Unified Search Bar Container */}
        <div className="relative flex flex-col sm:flex-row w-full items-stretch sm:items-center shadow-sm rounded-md bg-white border border-slate-300 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all duration-200">
          {/* Left: Dropdown Select */}
          <div className="w-full sm:w-[300px] shrink-0 relative z-10 hover:bg-slate-50 transition-colors rounded-t-md sm:rounded-l-md sm:rounded-tr-none">
            <Select value={selectedKeyType} onValueChange={setSelectedKeyType}>
              <SelectTrigger className="h-14 w-full px-4 text-[15px] border-0 bg-transparent rounded-t-md sm:rounded-l-md sm:rounded-tr-none focus:ring-0 focus:ring-offset-0 text-slate-800 font-medium shadow-none outline-none">
                <SelectValue placeholder="Select a GS1 key type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SSCC">
                  SSCC - Serial Shipping Container
                </SelectItem>
                <SelectItem value="GRAI" disabled>
                  GRAI - Global Returnable Asset
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 ml-2">
                    (Coming soon)
                  </span>
                </SelectItem>
                <SelectItem value="GIAI" disabled>
                  GIAI - Global Individual Asset
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 ml-2">
                    (Coming soon)
                  </span>
                </SelectItem>
                <SelectItem value="GSRN" disabled>
                  GSRN - Global Service Relation
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 ml-2">
                    (Coming soon)
                  </span>
                </SelectItem>
                <SelectItem value="GDTI" disabled>
                  GDTI - Global Document Type
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 ml-2">
                    (Coming soon)
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Right: Search Input + Button */}
          <div className="relative flex flex-1 items-center min-w-0 border-t sm:border-t-0 sm:border-l border-slate-300 bg-white rounded-b-md sm:rounded-r-md sm:rounded-bl-none">
            {/* Search Icon */}
            <div className="absolute left-4 flex items-center justify-center text-slate-400 pointer-events-none z-10">
              <Search className="h-5 w-5 stroke-[1.5]" />
            </div>

            {/* Search Input */}
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter a GS1 Key"
              className="h-14 w-full pl-12 pr-[100px] sm:pr-32 text-lg border-0 bg-transparent rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none outline-none placeholder:font-normal"
            />

            {/* Search Button */}
            <Button
              type="submit"
              className="absolute right-0 top-0 bottom-0 h-14 rounded-l-none rounded-br-md rounded-tr-none sm:rounded-tr-md sm:rounded-br-md bg-secondary text-white hover:bg-[#d9532b] px-6 sm:px-8 text-base font-medium flex items-center gap-2"
            >
              Search
            </Button>
          </div>
        </div>
      </form>

      {/* Example link below */}
      <div className="mt-4 sm:ml-[316px] pl-1 text-[15px] text-slate-700">
        Example search:{" "}
        <button
          type="button"
          onClick={handleExampleClick}
          className="font-medium text-primary hover:text-[#0b1c5c] hover:underline transition-colors"
        >
          003000123456789012
        </button>
      </div>
    </div>
  );
}
