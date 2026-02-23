"use client";

import { useMemo, useState, useEffect } from "react";
import { FiChevronDown, FiMapPin } from "react-icons/fi";
import { useRegistrationStore, selectAccountSetup } from "@/stores/registrationStore";

/**
 * Location component – country / state / city pickers + zip code.
 *
 * Uses `country-state-city` library for dropdown data.
 * Google Maps integration is optional; we provide a simpler coordinate-based
 * fallback that doesn't require a paid API key.
 */

// Dynamic import to avoid SSR issues with country-state-city
let Country, State, City;
if (typeof window !== "undefined") {
  const csc = require("country-state-city");
  Country = csc.Country;
  State = csc.State;
  City = csc.City;
}

function Location({ formData, onChange }) {
  const accountSetup = useRegistrationStore(selectAccountSetup);
  const isFromKSA = accountSetup?.isFromKSA;

  // Countries
  const countries = useMemo(() => Country?.getAllCountries() || [], []);

  // Lazy initializers — derive internal codes from formData on first render
  const [selectedCountryCode, setSelectedCountryCode] = useState(() => {
    if (isFromKSA) return "SA";
    if (formData.country) {
      const allCountries = Country?.getAllCountries() || [];
      const matched = allCountries.find(
        (c) => c.name.toLowerCase() === formData.country.toLowerCase()
      );
      return matched?.isoCode || "";
    }
    return "";
  });

  const [selectedStateCode, setSelectedStateCode] = useState(() => {
    if (formData.province && selectedCountryCode) {
      const states = State?.getStatesOfCountry(selectedCountryCode) || [];
      const matched = states.find(
        (s) => s.name.toLowerCase() === formData.province.toLowerCase()
      );
      return matched?.isoCode || "";
    }
    return "";
  });

  const [selectedCityName, setSelectedCityName] = useState(() => formData.city || "");

  // States based on selected country
  const filteredStates = useMemo(() => {
    if (!selectedCountryCode || !State) return [];
    return State.getStatesOfCountry(selectedCountryCode);
  }, [selectedCountryCode]);

  // Cities based on selected state
  const filteredCities = useMemo(() => {
    if (!selectedCountryCode || !selectedStateCode || !City) return [];
    return City.getCitiesOfState(selectedCountryCode, selectedStateCode);
  }, [selectedCountryCode, selectedStateCode]);

  // Handle KSA Default Selection — sync parent formData if needed
  useEffect(() => {
    if (isFromKSA && countries.length > 0) {
      const saudi = countries.find((c) => c.isoCode === "SA");
      if (saudi && formData.country !== saudi.name) {
        onChange({ target: { name: "country", value: saudi.name } });
      }
    }
  }, [isFromKSA, countries, formData.country, onChange]);

  // Handle country change
  const handleCountryChange = (e) => {
    const isoCode = e.target.value;
    setSelectedCountryCode(isoCode);
    setSelectedStateCode("");
    setSelectedCityName("");

    const selectedCountry = countries.find((c) => c.isoCode === isoCode);
    const countryName = selectedCountry?.name || "";

    onChange({ target: { name: "country", value: countryName } });
    onChange({ target: { name: "province", value: "" } });
    onChange({ target: { name: "city", value: "" } });
  };

  // Handle state change
  const handleStateChange = (e) => {
    const isoCode = e.target.value;
    setSelectedStateCode(isoCode);
    setSelectedCityName("");

    const states = State?.getStatesOfCountry(selectedCountryCode) || [];
    const selectedState = states.find((s) => s.isoCode === isoCode);
    const stateName = selectedState?.name || "";

    onChange({ target: { name: "province", value: stateName } });
    onChange({ target: { name: "city", value: "" } });
  };

  // Handle city change
  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCityName(cityName);
    onChange({ target: { name: "city", value: cityName } });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
        <FiMapPin className="w-5 h-5 text-primary" />
        Location
      </h3>

      {/* Address Text */}
      <div className="space-y-2">
        <label
          htmlFor="address"
          className="block text-sm font-semibold text-secondary"
        >
          Office Address / National Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address || ""}
          onChange={onChange}
          placeholder="Enter full address"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                     bg-white text-gray-700 font-medium placeholder-gray-400
                     focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                     transition-all duration-200"
        />
      </div>

      {/* Location Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Country */}
        <div className="space-y-2">
          <label
            htmlFor="country"
            className="block text-sm font-semibold text-secondary"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="country"
              name="country"
              value={selectedCountryCode}
              onChange={handleCountryChange}
              className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none 
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all duration-200 cursor-pointer 
                         ${
                           isFromKSA
                             ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                             : "bg-white text-gray-700"
                         }`}
              disabled={isFromKSA}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <FiChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* State/Province */}
        <div className="space-y-2">
          <label
            htmlFor="province"
            className="block text-sm font-semibold text-secondary"
          >
            State / Province <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="province"
              name="province"
              value={selectedStateCode}
              onChange={handleStateChange}
              disabled={!selectedCountryCode}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none 
                         bg-white text-gray-700 font-medium
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all duration-200 cursor-pointer disabled:bg-gray-100"
            >
              <option value="">
                {!selectedCountryCode
                  ? "Select country first"
                  : "Select State"}
              </option>
              {filteredStates.map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <FiChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* City */}
        <div className="space-y-2">
          <label
            htmlFor="city"
            className="block text-sm font-semibold text-secondary"
          >
            City
          </label>
          <div className="relative">
            <select
              id="city"
              name="city"
              value={selectedCityName}
              onChange={handleCityChange}
              disabled={!selectedStateCode}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none 
                         bg-white text-gray-700 font-medium
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all duration-200 cursor-pointer disabled:bg-gray-100"
            >
              <option value="">
                {!selectedStateCode ? "Select state first" : "Select City"}
              </option>
              {filteredCities.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <FiChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Zip Code */}
        <div className="space-y-2">
          <label
            htmlFor="zipCode"
            className="block text-sm font-semibold text-secondary"
          >
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={onChange}
            placeholder="e.g. 12345"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                       bg-white text-gray-700 font-medium placeholder-gray-400
                       focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                       transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
}

export default Location;
