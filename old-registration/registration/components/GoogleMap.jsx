import { useState, useEffect, useCallback } from "react";
import {
  GoogleMap as GoogleMapComponent,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { FiMapPin, FiSearch, FiGlobe, FiMap } from "react-icons/fi";
import {
  HiOutlineLocationMarker,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";
import { useTranslation } from "react-i18next";

// Default location (Riyadh, Saudi Arabia)
const DEFAULT_CENTER = { lat: 24.7136, lng: 46.6753 };

// Map container styles
const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
};

// Map options
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

// Helper function to extract address component
const getAddressComponent = (components, type) => {
  const component = components?.find((c) => c.types.includes(type));
  return component?.long_name || "";
};

function LocationMap({
  onLocationSelect,
  initialLocation = null,
  height = "250px",
  showCoordinates = true,
}) {
  const { t, i18n } = useTranslation("website");
  const isRtl = i18n.dir() === "rtl";

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [searchBox, setSearchBox] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);

  // Initialize with initial location or default
  useEffect(() => {
    if (initialLocation) {
      setMapCenter({
        lat: initialLocation.latitude,
        lng: initialLocation.longitude,
      });
      setSelectedLocation(initialLocation);
    }
  }, [initialLocation]);

  // Handle search box load
  const handleSearchBoxLoad = useCallback((ref) => {
    setSearchBox(ref);
  }, []);

  // Handle places changed from search
  const handlePlacesChanged = useCallback(() => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const addressComponents = place.address_components;

        // Extract address details
        const newLocation = {
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          address: place.formatted_address,
          country: getAddressComponent(addressComponents, "country"),
          state: getAddressComponent(
            addressComponents,
            "administrative_area_level_1"
          ),
          city:
            getAddressComponent(addressComponents, "locality") ||
            getAddressComponent(
              addressComponents,
              "administrative_area_level_2"
            ),
          district:
            getAddressComponent(addressComponents, "sublocality_level_1") ||
            getAddressComponent(addressComponents, "sublocality"),
          zipCode: getAddressComponent(addressComponents, "postal_code"),
          street: getAddressComponent(addressComponents, "route"),
          streetNumber: getAddressComponent(addressComponents, "street_number"),
        };

        setSelectedLocation(newLocation);
        setMapCenter({ lat: newLocation.latitude, lng: newLocation.longitude });

        if (onLocationSelect) {
          onLocationSelect(newLocation);
        }
      }
    }
  }, [searchBox, onLocationSelect]);

  return (
    <div className="space-y-3" dir={isRtl ? "rtl" : "ltr"}>
      {/* Map Container */}
      <div
        className="relative rounded-lg overflow-hidden border-2 border-gray-200"
        style={{ height }}
      >
        <GoogleMapComponent
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={14}
          options={mapOptions}
        >
          {/* Search Box */}
          <StandaloneSearchBox
            onLoad={handleSearchBoxLoad}
            onPlacesChanged={handlePlacesChanged}
          >
            <div className="absolute top-3 left-3 right-3 max-w-md mx-auto">
              <div className="relative">
                <FiSearch
                  className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${
                    isRtl ? "right-3" : "left-3"
                  }`}
                />
                <input
                  type="text"
                  placeholder={t("registration.common.map.searchPlaceholder")}
                  className={`w-full py-2.5 bg-white border-0 rounded-lg shadow-lg
                           text-gray-700 text-sm font-medium placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-primary/50
                           ${
                             isRtl
                               ? "pr-10 pl-4 text-right"
                               : "pl-10 pr-4 text-left"
                           }`}
                />
              </div>
            </div>
          </StandaloneSearchBox>

          {/* Marker for selected location */}
          {selectedLocation && (
            <Marker
              position={{
                lat: selectedLocation.latitude,
                lng: selectedLocation.longitude,
              }}
            />
          )}
        </GoogleMapComponent>
      </div>

      {/* Selected Location Info */}
      {selectedLocation && showCoordinates && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
          {/* Full Address */}
          <div className="flex items-start gap-2">
            <FiMapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                {t("registration.common.map.fullAddress")}
              </p>
              <p className="text-sm font-medium text-secondary">
                {selectedLocation.address}
              </p>
            </div>
          </div>

          {/* Location Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-gray-200">
            {/* Country */}
            {selectedLocation.country && (
              <div className="flex items-start gap-2">
                <FiGlobe className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">
                    {t("registration.common.location.country.label")}
                  </p>
                  <p className="text-sm font-medium text-secondary">
                    {selectedLocation.country}
                  </p>
                </div>
              </div>
            )}

            {/* State/Province */}
            {selectedLocation.state && (
              <div className="flex items-start gap-2">
                <FiMap className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">
                    {t("registration.common.location.state.label")}
                  </p>
                  <p className="text-sm font-medium text-secondary">
                    {selectedLocation.state}
                  </p>
                </div>
              </div>
            )}

            {/* City */}
            {selectedLocation.city && (
              <div className="flex items-start gap-2">
                <HiOutlineOfficeBuilding className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">
                    {t("registration.common.location.city.label")}
                  </p>
                  <p className="text-sm font-medium text-secondary">
                    {selectedLocation.city}
                  </p>
                </div>
              </div>
            )}

            {/* Zip Code */}
            {selectedLocation.zipCode && (
              <div className="flex items-start gap-2">
                <HiOutlineLocationMarker className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">
                    {t("registration.common.location.zipCode.label")}
                  </p>
                  <p className="text-sm font-medium text-secondary">
                    {selectedLocation.zipCode}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Coordinates */}
          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              {t("registration.common.map.coordinates")}:{" "}
              {selectedLocation.latitude?.toFixed(6)},{" "}
              {selectedLocation.longitude?.toFixed(6)}
            </p>
          </div>
        </div>
      )}

      {/* Helper Text */}
      {!selectedLocation && (
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <FiSearch className="w-4 h-4" />
          {t("registration.common.map.helperText")}
        </p>
      )}
    </div>
  );
}

export default LocationMap;
