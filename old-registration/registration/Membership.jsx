import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiAward,
  FiChevronDown,
  FiCheck,
  FiPackage,
  FiGrid,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import { HiOutlineQrcode } from "react-icons/hi";
import {
  useGetMembershipCategoriesQuery,
  useGetBarcodePackagesQuery,
  useGetOtherServicesQuery,
} from "../../../../apis/websiteEndpoints/registration/registration";

import { useSelector, useDispatch } from "react-redux";
import {
  selectAccountSetup,
  setMembership,
  selectMembership,
} from "../../../../store/websiteSlices/registrationSlice";

// Translation
import { useTranslation } from "react-i18next";

function Membership() {
  const { t, i18n } = useTranslation("website");
  const isRtl = i18n.dir() === "rtl";

  const [formData, setFormData] = useState({
    membershipCategory: "",
    gtinBarcodePackage: "",
    selectedServices: [],
  });

  const dispatch = useDispatch();
  const accountSetup = useSelector(selectAccountSetup);

  const businessType = accountSetup?.businessType;
  // Check if business type is NOT company (for Individual/Family Business, etc.)
  const isNotCompany = businessType !== "company";
  const storedMembership = useSelector(selectMembership);

  useEffect(() => {
    if (storedMembership) {
      setFormData({
        membershipCategory: storedMembership.membershipCategory?.name || "",
        gtinBarcodePackage: storedMembership.gtinBarcodePackage?.id || "",
        selectedServices: Array.isArray(storedMembership.selectedServices)
          ? storedMembership.selectedServices.map((s) => s.id)
          : [],
      });
    }
  }, [storedMembership]);
  // Get navigation handlers from outlet context
  const { onNext, onPrevious } = useOutletContext();

  // APIs
  const { data: membershipCategoriesData, isLoading: isCategoriesLoading } =
    useGetMembershipCategoriesQuery();
  const { data: barcodePackagesData, isLoading: isPackagesLoading } =
    useGetBarcodePackagesQuery();
  const { data: otherServicesData, isLoading: isServicesLoading } =
    useGetOtherServicesQuery();

  // Transform API data for easy access
  const membershipCategories = membershipCategoriesData || [];

  // GLN service IDs for mutual exclusivity check
  const GLN_SERVICE_IDS = ["10", "12"]; // GLN (30 Locations) and GLN (60 Locations)

  const barcodePackages =
    barcodePackagesData
      ?.filter((pkg) => {
        const isCompany = businessType?.toLowerCase() === "company";
        const isTenBarcodes = pkg.total_no_of_barcodes === 10;
        const isOtherProducts = pkg.total_no_of_barcodes <= 1; // "Registration for Other Products" has 1 barcode

        if (isCompany) {
          // If company, show all packages EXCEPT the 10 barcodes package
          // Also include "Other Products" option for companies
          if (isTenBarcodes) return false;
          return true; // Show regular packages AND "Other Products" for company
        } else {
          // If NOT company (e.g. Individual/Freelance), show ONLY the 10 barcodes package
          // Exclude "Other Products" for non-company
          if (isOtherProducts) return false;
          return isTenBarcodes;
        }
      })
      // Sort to put "Other Products" (1 barcode) at the end
      .sort((a, b) => {
        const aIsOther = a.total_no_of_barcodes <= 1;
        const bIsOther = b.total_no_of_barcodes <= 1;
        if (aIsOther && !bIsOther) return 1; // a goes to end
        if (!aIsOther && bIsOther) return -1; // b goes to end
        return a.total_no_of_barcodes - b.total_no_of_barcodes; // Otherwise sort by barcode count
      }) || [];

  // Format number with commas
  const formatNumber = (num) => {
    return num?.toLocaleString("en-US") || "0";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (serviceValue) => {
    setFormData((prev) => {
      const isCurrentlySelected = prev.selectedServices.includes(serviceValue);

      if (isCurrentlySelected) {
        // Simply remove if already selected
        return {
          ...prev,
          selectedServices: prev.selectedServices.filter(
            (s) => s !== serviceValue
          ),
        };
      }

      // Check if this is a GLN service being selected
      const isGlnService = GLN_SERVICE_IDS.includes(serviceValue);

      if (isGlnService) {
        // Remove any other GLN service before adding this one (mutual exclusivity)
        const filteredServices = prev.selectedServices.filter(
          (s) => !GLN_SERVICE_IDS.includes(s)
        );
        return {
          ...prev,
          selectedServices: [...filteredServices, serviceValue],
        };
      }

      // For non-GLN services, just add normally
      return {
        ...prev,
        selectedServices: [...prev.selectedServices, serviceValue],
      };
    });
  };

  const handleNext = () => {
    // Find full objects based on selected values
    const selectedCategoryObject = membershipCategories.find(
      (cat) => cat.name === formData.membershipCategory
    );

    const selectedPackageObject = barcodePackagesData?.find(
      (pkg) => pkg.id === formData.gtinBarcodePackage
    );

    const selectedServicesObjects = otherServicesData?.filter((service) =>
      formData.selectedServices.includes(service.id)
    );

    const fullData = {
      ...formData,
      membershipCategory: selectedCategoryObject,
      gtinBarcodePackage: selectedPackageObject,
      selectedServices: selectedServicesObjects || [],
    };

    dispatch(setMembership(fullData));
    onNext?.();
  };

  // Check if selected GTIN package is "Other Products" (1 barcode)
  const selectedPackage = barcodePackagesData?.find(
    (pkg) => pkg.id === formData.gtinBarcodePackage
  );
  const isOtherProductsSelected = selectedPackage?.total_no_of_barcodes <= 1;

  // Form validation - required fields must be filled
  // For company: membershipCategory and gtinBarcodePackage are required
  //   - If "Other Products" is selected, at least one service must be selected
  // For non-company: only gtinBarcodePackage is required (membershipCategory is hidden)
  const isFormValid = isNotCompany
    ? formData.gtinBarcodePackage !== ""
    : formData.membershipCategory !== "" &&
      formData.gtinBarcodePackage !== "" &&
      (!isOtherProductsSelected || formData.selectedServices.length > 0);

  return (
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      {/* Step Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 mb-6 md:mb-8">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <FiAward className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-secondary">
            {t("registration.membership.title")}
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            {t("registration.membership.subtitle")}
          </p>
        </div>
      </div>

      {/* Form Content */}
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Section: Membership Category */}
        {/* Section: Membership Category - Hidden for Non-Company */}
        {!isNotCompany && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
              <FiAward className="w-5 h-5 text-primary" />
              {t("registration.membership.sections.membershipCategory")}
            </h3>
            <div className="space-y-2">
              <label
                htmlFor="membershipCategory"
                className="block text-sm font-semibold text-secondary"
              >
                {t("registration.membership.category.label")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="membershipCategory"
                  name="membershipCategory"
                  value={formData.membershipCategory}
                  onChange={handleChange}
                  disabled={isCategoriesLoading}
                  className={`w-full py-3 border-2 border-gray-200 rounded-lg appearance-none 
                             bg-white text-gray-700 font-medium
                             focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                             transition-all duration-200 cursor-pointer
                             disabled:bg-gray-100 disabled:cursor-not-allowed
                             ${isRtl ? "pr-4 pl-10" : "px-4"}`}
                >
                  <option value="" disabled>
                    {isCategoriesLoading
                      ? t("registration.membership.category.loading")
                      : t("registration.membership.category.placeholder")}
                  </option>
                  {membershipCategories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {isRtl
                        ? category.name_ar || category.name
                        : category.name}
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
          </div>
        )}

        {/* Section: GTIN Barcode Package */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
            <HiOutlineQrcode className="w-5 h-5 text-primary" />
            {t("registration.membership.sections.barcodes")}
          </h3>
          <div className="space-y-2">
            <label
              htmlFor="gtinBarcodePackage"
              className="block text-sm font-semibold text-secondary"
            >
              {t("registration.membership.packages.label")}{" "}
              <span className="text-red-500">*</span>
            </label>

            {/* Loading State */}
            {isPackagesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl border-2 border-gray-200 bg-gray-50 animate-pulse"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200" />
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Barcode Package Cards */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {barcodePackages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        gtinBarcodePackage: pkg.id,
                      }))
                    }
                    className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
                               ${
                                 formData.gtinBarcodePackage === pkg.id
                                   ? "border-primary bg-primary/5 shadow-lg"
                                   : "border-gray-200 bg-white hover:border-primary/50 hover:shadow-md"
                               }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Selected indicator */}
                    {formData.gtinBarcodePackage === pkg.id && (
                      <div
                        className={`absolute top-3 ${
                          isRtl ? "left-3" : "right-3"
                        } w-6 h-6 rounded-full bg-primary flex items-center justify-center`}
                      >
                        <FiCheck className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center
                                     ${
                                       formData.gtinBarcodePackage === pkg.id
                                         ? "bg-primary text-white"
                                         : "bg-gray-100 text-gray-500"
                                     }`}
                      >
                        <FiPackage className="w-6 h-6" />
                      </div>
                      <div>
                        <p
                          className={`text-lg font-bold ${
                            formData.gtinBarcodePackage === pkg.id
                              ? "text-primary"
                              : "text-secondary"
                          }`}
                        >
                          {pkg.total_no_of_barcodes <= 1
                            ? t(
                                "registration.membership.packages.other",
                                "Other"
                              )
                            : `${formatNumber(pkg.total_no_of_barcodes)} ${t(
                                "registration.membership.packages.barcodes"
                              )}`}
                        </p>
                      </div>
                    </div>

                    {/* Package Description */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {/* Try to use localized description if key exists in future, else fallback */}
                      {pkg.member_category_description}
                    </p>

                    {/* Price - Only show if fee > 0 */}
                    {pkg.gtin_yearly_subscription_fee > 0 && (
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex items-baseline gap-1">
                          <span
                            className={`text-xl font-bold ${
                              formData.gtinBarcodePackage === pkg.id
                                ? "text-primary"
                                : "text-secondary"
                            }`}
                          >
                            {formatNumber(pkg.gtin_yearly_subscription_fee)}
                          </span>
                          <span className="text-sm text-gray-500">
                            {t("registration.membership.packages.perYear")}
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section: Additional Services */}
        {!isNotCompany && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
              <FiGrid className="w-5 h-5 text-primary" />
              {t("registration.membership.sections.additionalServices")}
            </h3>
            <p className="text-sm text-gray-500">
              {t("registration.membership.services.subtitle")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {isServicesLoading
                ? [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-20 bg-gray-50 rounded-xl border-2 border-gray-100 animate-pulse"
                    />
                  ))
                : otherServicesData?.map((service) => (
                    <motion.button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceToggle(service.id)}
                      className={`group relative p-4 rounded-xl text-sm font-medium border-2 transition-all duration-200 text-left h-full
                                ${
                                  formData.selectedServices.includes(service.id)
                                    ? "bg-primary border-primary text-white shadow-md"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary hover:shadow-sm"
                                }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col h-full justify-between gap-2">
                        <div className="flex items-start gap-2">
                          {formData.selectedServices.includes(service.id) && (
                            <FiCheck className="w-4 h-4 mt-0.5 shrink-0" />
                          )}
                          <span className="font-semibold leading-tight">
                            {isRtl
                              ? service.name_ar || service.product_name
                              : service.product_name || service.name_ar}
                          </span>
                        </div>

                        <div
                          className={`text-xs font-bold ${
                            formData.selectedServices.includes(service.id)
                              ? "text-white/90"
                              : "text-primary"
                          }`}
                        >
                          {formatNumber(service.product_subscription_fee)}{" "}
                          {t("registration.membership.services.currency")}
                        </div>
                      </div>

                      {/* Tooltip - Show opposite language or description */}
                      <div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-secondary text-white text-xs rounded-lg
                                    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200
                                    whitespace-nowrap z-10 pointer-events-none shadow-lg"
                      >
                        {isRtl ? service.product_name : service.name_ar}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-secondary" />
                      </div>
                    </motion.button>
                  ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex flex-col-reverse md:flex-row gap-3 md:gap-0 justify-between border-t border-gray-200 pt-6">
        <motion.button
          type="button"
          onClick={onPrevious}
          className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2
                     bg-white border-2 border-secondary text-secondary 
                     hover:bg-secondary hover:text-white transition-all duration-200
                     ${isRtl ? "flex-row-reverse" : ""}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiArrowLeft className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
          {t("registration.membership.buttons.previous")}
        </motion.button>
        <motion.button
          type="button"
          onClick={handleNext}
          disabled={!isFormValid}
          className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2
                     transition-all duration-200
                     ${
                       isFormValid
                         ? "bg-primary text-white hover:opacity-90 hover:shadow-lg"
                         : "bg-gray-200 text-gray-400 cursor-not-allowed"
                     }
                     ${isRtl ? "flex-row-reverse" : ""}`}
          whileHover={isFormValid ? { scale: 1.02 } : {}}
          whileTap={isFormValid ? { scale: 0.98 } : {}}
        >
          {t("registration.membership.buttons.next")}
          <FiArrowRight className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
        </motion.button>
      </div>
    </div>
  );
}

export default Membership;
