import { useMemo, useCallback, useState, useEffect } from "react";
import { FiChevronDown, FiMapPin } from "react-icons/fi";
import LocationMap from "./GoogleMap";
import { Country, State, City } from "country-state-city";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectAccountSetup } from "../../../../../store/websiteSlices/registrationSlice";

/* eslint-disable react/prop-types */
function Location({ formData, onChange }) {
  const { t, i18n } = useTranslation("website");
  const isRtl = i18n.dir() === "rtl";

  // Internal state for selected ISO Codes
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [selectedCityName, setSelectedCityName] = useState(""); // City doesn't always have a unique ISO independent of state, and we store name mostly. City.getCityByCode doesn't exist really, it's list based.

  const accountSetup = useSelector(selectAccountSetup);
  const isFromKSA = accountSetup?.isFromKSA;

  // Countries - from library
  const countries = useMemo(() => Country.getAllCountries(), []);

  // Filter states based on selected country Code
  const filteredStates = useMemo(() => {
    if (!selectedCountryCode) return [];
    return State.getStatesOfCountry(selectedCountryCode);
  }, [selectedCountryCode]);

  // Filter cities based on selected state Code
  const filteredCities = useMemo(() => {
    if (!selectedCountryCode || !selectedStateCode) return [];
    return City.getCitiesOfState(selectedCountryCode, selectedStateCode);
  }, [selectedCountryCode, selectedStateCode]);

  // Prefill internal IDs from formData names (when navigating back)
  useEffect(() => {
    if (formData.country && !selectedCountryCode) {
      const matchedCountry = countries.find(
        (c) => c.name.toLowerCase() === formData.country.toLowerCase()
      );
      if (matchedCountry) {
        setSelectedCountryCode(matchedCountry.isoCode);
      }
    }
  }, [countries, formData.country, selectedCountryCode]);

  useEffect(() => {
    if (formData.province && selectedCountryCode && !selectedStateCode) {
      const states = State.getStatesOfCountry(selectedCountryCode);
      const matchedState = states.find(
        (s) => s.name.toLowerCase() === formData.province.toLowerCase()
      );
      if (matchedState) {
        setSelectedStateCode(matchedState.isoCode);
      }
    }
  }, [formData.province, selectedCountryCode, selectedStateCode]);

  useEffect(() => {
    // For city, we just check if it matches one in the list to be consistent, but we store name in formData
    // We don't strictly need a 'selectedCityCode' if we just store name.
    // But if we want to control the select input:
    if (formData.city) {
      // Just ensure it's selected in UI if it exists in the new list
      setSelectedCityName(formData.city);
    }
  }, [formData.city]);

  // Handle KSA Default Selection
  useEffect(() => {
    if (isFromKSA && countries) {
      const saudi = countries.find((c) => c.isoCode === "SA");
      if (saudi) {
        if (selectedCountryCode !== "SA") {
          setSelectedCountryCode("SA");
        }
        if (formData.country !== saudi.name) {
          onChange({ target: { name: "country", value: saudi.name } });
          // Optionally reset state/city if we just switched to KSA and they are invalid
          // But onChange logic isn't here, so we assume user handles re-selection of state/city
        }
      }
    }
  }, [isFromKSA, countries, formData.country, onChange, selectedCountryCode]);

  // Helper function to find country by name (from Google Maps)
  const findCountryByName = useCallback(
    (name) => {
      if (!countries || !name) return null;
      const normalizedName = name.toLowerCase().trim();
      return countries.find(
        (c) => c.name.toLowerCase().trim() === normalizedName
      );
    },
    [countries]
  );

  // Helper function to find state by name and countryCode
  const findStateByName = useCallback((name, countryCode) => {
    if (!name || !countryCode) return null;
    const states = State.getStatesOfCountry(countryCode);
    const normalizedName = name.toLowerCase().trim();
    return states.find((s) => s.name.toLowerCase().trim() === normalizedName);
  }, []);

  // Helper function to find city by name and stateCode
  const findCityByName = useCallback((name, countryCode, stateCode) => {
    if (!name || !countryCode || !stateCode) return null;
    const cities = City.getCitiesOfState(countryCode, stateCode);
    const normalizedName = name.toLowerCase().trim();
    return cities.find((c) => c.name.toLowerCase().trim() === normalizedName);
  }, []);

  // Handle country change
  const handleCountryChange = (e) => {
    const isoCode = e.target.value;
    setSelectedCountryCode(isoCode);
    setSelectedStateCode("");
    setSelectedCityName("");

    const selectedCountry = countries.find((c) => c.isoCode === isoCode);
    const countryName = selectedCountry?.name || "";

    onChange({ target: { name: "country", value: countryName } });
    onChange({ target: { name: "province", value: "" } }); // Reset state
    onChange({ target: { name: "city", value: "" } }); // Reset city
  };

  // Handle state change
  const handleStateChange = (e) => {
    const isoCode = e.target.value;
    setSelectedStateCode(isoCode);
    setSelectedCityName("");

    const states = State.getStatesOfCountry(selectedCountryCode);
    const selectedState = states.find((s) => s.isoCode === isoCode);
    const stateName = selectedState?.name || "";

    onChange({ target: { name: "province", value: stateName } });
    onChange({ target: { name: "city", value: "" } });
  };

  // Handle city change
  const handleCityChange = (e) => {
    const cityName = e.target.value; // Store name directly as cities don't always have unique reliable iso within this lib for select value if not careful, but name is what we save.
    // Actually City objects have names. We can use name as the value for the option.
    setSelectedCityName(cityName);
    onChange({ target: { name: "city", value: cityName } });
  };

  // Handle location selection from Google Maps
  const handleLocationSelect = useCallback(
    (location) => {
      // Update base location fields
      onChange({ target: { name: "address", value: location.address || "" } });
      onChange({ target: { name: "latitude", value: location.latitude.toString() } });
      onChange({ target: { name: "longitude", value: location.longitude.toString()  } });

      // Update zip code if available
      if (location.zipCode) {
        onChange({ target: { name: "zipCode", value: location.zipCode } });
      }

      // Try to match country from map to our dropdown
      const matchedCountry = findCountryByName(location.country);
      if (matchedCountry) {
        setSelectedCountryCode(matchedCountry.isoCode);
        onChange({
          target: { name: "country", value: matchedCountry.name },
        });

        // Try to match state within this country
        const matchedState = findStateByName(
          location.state,
          matchedCountry.isoCode
        );
        if (matchedState) {
          setSelectedStateCode(matchedState.isoCode);
          onChange({ target: { name: "province", value: matchedState.name } });

          // Try to match city within this state
          const matchedCity = findCityByName(
            location.city,
            matchedCountry.isoCode,
            matchedState.isoCode
          );
          if (matchedCity) {
            setSelectedCityName(matchedCity.name);
            onChange({ target: { name: "city", value: matchedCity.name } });
          } else {
            // If strict matching fails, simpler fallback or reset
            // Google maps might return a city name slightly different or not in our list.
            // If we want to allow custom cities we'd need an input, but this is a select.
            // For now reset if not found in list, or maybe just set the value if we allowed free text (we use select here).
            setSelectedCityName("");
            onChange({ target: { name: "city", value: "" } });
          }
        } else {
          setSelectedStateCode("");
          setSelectedCityName("");
          onChange({ target: { name: "province", value: "" } });
          onChange({ target: { name: "city", value: "" } });
        }
      } else {
        setSelectedCountryCode("");
        setSelectedStateCode("");
        setSelectedCityName("");
        onChange({ target: { name: "country", value: "" } });
        onChange({ target: { name: "province", value: "" } });
        onChange({ target: { name: "city", value: "" } });
      }
    },
    [onChange, findCountryByName, findStateByName, findCityByName]
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
        <FiMapPin className="w-5 h-5 text-primary" />
        {t("registration.common.location.title")}
      </h3>

      {/* Office Location Map - First */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-secondary">
          {t("registration.common.location.officeLocation")}{" "}
          <span className="text-gray-400 font-normal">
            ({t("registration.common.location.nationalAddress")})
          </span>{" "}
          <span className="text-red-500">*</span>
        </label>
        <LocationMap
          height="280px"
          showCoordinates={true}
          onLocationSelect={handleLocationSelect}
          initialLocation={
            formData.latitude && formData.longitude
              ? {
                  latitude: parseFloat(formData.latitude),
                  longitude: parseFloat(formData.longitude),
                  address: formData.address,
                  country: formData.country,
                  state: formData.province,
                  city: formData.city,
                  zipCode: formData.zipCode,
                }
              : null
          }
        />
      </div>

      {/* Location Fields Grid - Below Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {/* Country */}
        <div className="space-y-2">
          <label
            htmlFor="country"
            className="block text-sm font-semibold text-secondary"
          >
            {t("registration.common.location.country.label")}{" "}
            <span className="text-red-500">*</span>
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
                         }
                         ${isRtl ? "text-right" : "text-left"}`}
              disabled={isFromKSA}
            >
              <option value="">
                {t("registration.common.location.country.placeholder")}
              </option>
              {countries.map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
            <div
              className={`absolute inset-y-0 ${
                isRtl ? "left-0 pl-4" : "right-0 pr-4"
              } flex items-center pointer-events-none`}
            >
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
            {t("registration.common.location.state.label")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="province"
              name="province"
              value={selectedStateCode}
              onChange={handleStateChange}
              disabled={!selectedCountryCode}
              className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none 
                         bg-white text-gray-700 font-medium
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all duration-200 cursor-pointer disabled:bg-gray-100
                         ${isRtl ? "text-right" : "text-left"}`}
            >
              <option value="">
                {!selectedCountryCode
                  ? t("registration.common.location.state.selectCountryFirst")
                  : t("registration.common.location.state.placeholder")}
              </option>
              {filteredStates.map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
            <div
              className={`absolute inset-y-0 ${
                isRtl ? "left-0 pl-4" : "right-0 pr-4"
              } flex items-center pointer-events-none`}
            >
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
            {t("registration.common.location.city.label")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="city"
              name="city"
              value={selectedCityName}
              onChange={handleCityChange}
              disabled={!selectedStateCode}
              className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none 
                         bg-white text-gray-700 font-medium
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all duration-200 cursor-pointer disabled:bg-gray-100
                         ${isRtl ? "text-right" : "text-left"}`}
            >
              <option value="">
                {!selectedStateCode
                  ? t("registration.common.location.city.selectStateFirst")
                  : t("registration.common.location.city.placeholder")}
              </option>
              {filteredCities.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <div
              className={`absolute inset-y-0 ${
                isRtl ? "left-0 pl-4" : "right-0 pr-4"
              } flex items-center pointer-events-none`}
            >
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
            {t("registration.common.location.zipCode.label")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={onChange}
            placeholder={t("registration.common.location.zipCode.placeholder")}
            className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                       bg-white text-gray-700 font-medium placeholder-gray-400
                       focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                       transition-all duration-200
                       ${isRtl ? "text-right" : "text-left"}`}
          />
        </div>
      </div>
    </div>
  );
}

export default Location;
