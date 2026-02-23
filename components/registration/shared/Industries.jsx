"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { FiChevronDown, FiCheck, FiGrid, FiX, FiSearch } from "react-icons/fi";
import { useGetAllIndustriesQuery } from "@/lib/hooks/useRegistrationApi";

function Industries({ selectedIndustries = [], onChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Fetch industries from API
  const { data: industriesData, isLoading } = useGetAllIndustriesQuery();

  // Filter industries based on search query
  const filteredIndustries = useMemo(() => {
    const industries = industriesData || [];
    if (!searchQuery.trim()) return industries;
    const query = searchQuery.toLowerCase().trim();
    return industries.filter(
      (industry) =>
        industry.name?.toLowerCase().includes(query) ||
        industry.name_ar?.includes(searchQuery.trim())
    );
  }, [industriesData, searchQuery]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle industry selection – stores full object
  const handleIndustryToggle = (industry) => {
    const isSelected = selectedIndustries.some(
      (item) => item.id === industry.id
    );
    const newSelection = isSelected
      ? selectedIndustries.filter((item) => item.id !== industry.id)
      : [...selectedIndustries, industry];

    onChange(newSelection);
  };

  const handleDropdownToggle = () => {
    if (!isLoading) {
      setIsDropdownOpen(!isDropdownOpen);
      if (isDropdownOpen) {
        setSearchQuery("");
      }
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="selectedIndustries"
        className="block text-sm font-semibold text-secondary"
      >
        <span className="flex items-center gap-2">
          <FiGrid className="w-4 h-4 text-primary" />
          Industries <span className="text-red-500">*</span>
        </span>
      </label>

      {/* Multi-select Dropdown with Search */}
      <div className="relative" ref={dropdownRef}>
        <div
          id="selectedIndustries"
          tabIndex={0}
          role="button"
          onClick={handleDropdownToggle}
          className={`w-full min-h-12 px-4 py-2 border-2 rounded-lg cursor-pointer
                     bg-white flex items-center justify-between gap-2
                     transition-all duration-200
                     ${isLoading ? "bg-gray-100 cursor-wait" : ""}
                     ${
                       isDropdownOpen
                         ? "border-primary ring-2 ring-primary/20"
                         : "border-gray-200 hover:border-gray-300"
                     }`}
        >
          <div className="flex-1">
            {isLoading ? (
              <span className="text-gray-400">Loading industries...</span>
            ) : selectedIndustries.length === 0 ? (
              <span className="text-gray-400">Select industries</span>
            ) : (
              <span className="text-gray-700 font-medium">
                {selectedIndustries.length} selected
              </span>
            )}
          </div>
          <FiChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 
                        ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </div>

        {/* Dropdown Menu with Search */}
        {isDropdownOpen && (
          <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
              <div className="relative">
                <FiSearch className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Search industries..."
                  className="w-full py-2 pl-9 pr-4 text-sm border border-gray-200 rounded-md
                             bg-gray-50 text-gray-700 placeholder-gray-400
                             focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
                             transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery("");
                    }}
                    className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Industries List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredIndustries.length === 0 ? (
                <div className="px-4 py-6 text-center text-gray-500">
                  <p className="text-sm">No industries found</p>
                  <p className="text-xs mt-1">Try a different search term</p>
                </div>
              ) : (
                filteredIndustries.map((industry) => {
                  const isSelected = selectedIndustries.some(
                    (item) => item.id === industry.id
                  );

                  return (
                    <div
                      key={industry.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIndustryToggle(industry);
                      }}
                      className={`px-4 py-3 cursor-pointer flex items-center justify-between
                                  transition-colors duration-150
                                  ${
                                    isSelected
                                      ? "bg-primary/10 text-primary"
                                      : "hover:bg-gray-50 text-gray-700"
                                  }`}
                    >
                      <div className="flex-1">
                        <span className="font-medium">{industry.name}</span>
                        {industry.name_ar && (
                          <span className="mx-2 text-sm text-gray-400">
                            ({industry.name_ar})
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <FiCheck className="w-5 h-5 text-primary shrink-0" />
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Selected count footer */}
            {selectedIndustries.length > 0 && (
              <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
                {selectedIndustries.length} selected
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Industries Tags */}
      {selectedIndustries.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedIndustries.map((industry) => (
            <span
              key={industry.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 
                         text-primary rounded-full text-sm font-medium"
            >
              {industry.name}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleIndustryToggle(industry);
                }}
                className="w-4 h-4 rounded-full bg-primary/20 hover:bg-primary/30 
                           flex items-center justify-center transition-colors"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Industries;
