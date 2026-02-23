"use client";

import { useState } from "react";
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
} from "@/lib/hooks/useRegistrationApi";
import {
  useRegistrationStore,
  selectAccountSetup,
  selectMembership,
} from "@/stores/registrationStore";

function Membership({ onNext, onPrevious }) {
  const setMembershipStore = useRegistrationStore((s) => s.setMembership);
  const accountSetup = useRegistrationStore(selectAccountSetup);
  const storedMembership = useRegistrationStore(selectMembership);

  const businessType = accountSetup?.businessType;
  const isNotCompany = businessType !== "company";

  const [formData, setFormData] = useState(() => {
    if (storedMembership) {
      return {
        membershipCategory: storedMembership.membershipCategory?.name || "",
        gtinBarcodePackage: storedMembership.gtinBarcodePackage?.id || "",
        selectedServices: Array.isArray(storedMembership.selectedServices)
          ? storedMembership.selectedServices.map((s) => s.id)
          : [],
      };
    }
    return {
      membershipCategory: "",
      gtinBarcodePackage: "",
      selectedServices: [],
    };
  });

  // API queries
  const { data: membershipCategoriesData, isLoading: isCategoriesLoading } =
    useGetMembershipCategoriesQuery();
  const { data: barcodePackagesData, isLoading: isPackagesLoading } =
    useGetBarcodePackagesQuery();
  const { data: otherServicesData, isLoading: isServicesLoading } =
    useGetOtherServicesQuery();

  const membershipCategories = membershipCategoriesData || [];

  // GLN service IDs for mutual exclusivity
  const GLN_SERVICE_IDS = ["10", "12"];

  const barcodePackages =
    barcodePackagesData
      ?.filter((pkg) => {
        const isCompany = businessType?.toLowerCase() === "company";
        const isTenBarcodes = pkg.total_no_of_barcodes === 10;
        const isOtherProducts = pkg.total_no_of_barcodes <= 1;

        if (isCompany) {
          if (isTenBarcodes) return false;
          return true;
        } else {
          if (isOtherProducts) return false;
          return isTenBarcodes;
        }
      })
      .sort((a, b) => {
        const aIsOther = a.total_no_of_barcodes <= 1;
        const bIsOther = b.total_no_of_barcodes <= 1;
        if (aIsOther && !bIsOther) return 1;
        if (!aIsOther && bIsOther) return -1;
        return a.total_no_of_barcodes - b.total_no_of_barcodes;
      }) || [];

  const formatNumber = (num) => num?.toLocaleString("en-US") || "0";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (serviceValue) => {
    setFormData((prev) => {
      const isCurrentlySelected = prev.selectedServices.includes(serviceValue);

      if (isCurrentlySelected) {
        return {
          ...prev,
          selectedServices: prev.selectedServices.filter((s) => s !== serviceValue),
        };
      }

      const isGlnService = GLN_SERVICE_IDS.includes(serviceValue);

      if (isGlnService) {
        const filteredServices = prev.selectedServices.filter(
          (s) => !GLN_SERVICE_IDS.includes(s)
        );
        return { ...prev, selectedServices: [...filteredServices, serviceValue] };
      }

      return { ...prev, selectedServices: [...prev.selectedServices, serviceValue] };
    });
  };

  const handleNext = () => {
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

    setMembershipStore(fullData);
    onNext?.();
  };

  const selectedPackage = barcodePackagesData?.find(
    (pkg) => pkg.id === formData.gtinBarcodePackage
  );
  const isOtherProductsSelected = selectedPackage?.total_no_of_barcodes <= 1;

  const isFormValid = isNotCompany
    ? formData.gtinBarcodePackage !== ""
    : formData.membershipCategory !== "" &&
      formData.gtinBarcodePackage !== "" &&
      (!isOtherProductsSelected || formData.selectedServices.length > 0);

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 mb-6 md:mb-8">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <FiAward className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-secondary">
            Membership & Packages
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Choose your membership category and barcode package
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
        {/* Membership Category – Hidden for non-company */}
        {!isNotCompany && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
              <FiAward className="w-5 h-5 text-primary" />
              Membership Category
            </h3>
            <div className="space-y-2">
              <label htmlFor="membershipCategory" className="block text-sm font-semibold text-secondary">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="membershipCategory"
                  name="membershipCategory"
                  value={formData.membershipCategory}
                  onChange={handleChange}
                  disabled={isCategoriesLoading}
                  className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg appearance-none 
                             bg-white text-gray-700 font-medium
                             focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                             transition-all duration-200 cursor-pointer
                             disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="" disabled>
                    {isCategoriesLoading ? "Loading..." : "Select a category"}
                  </option>
                  {membershipCategories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <FiChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GTIN Barcode Package */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
            <HiOutlineQrcode className="w-5 h-5 text-primary" />
            GTIN Barcode Package
          </h3>
          <div className="space-y-2">
            <label htmlFor="gtinBarcodePackage" className="block text-sm font-semibold text-secondary">
              Select Package <span className="text-red-500">*</span>
            </label>

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {barcodePackages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, gtinBarcodePackage: pkg.id }))
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
                    {formData.gtinBarcodePackage === pkg.id && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
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
                            ? "Other"
                            : `${formatNumber(pkg.total_no_of_barcodes)} Barcodes`}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {pkg.member_category_description}
                    </p>

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
                          <span className="text-sm text-gray-500">SAR / year</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Additional Services */}
        {!isNotCompany && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
              <FiGrid className="w-5 h-5 text-primary" />
              Additional Services
            </h3>
            <p className="text-sm text-gray-500">
              Select optional services to add to your subscription
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
                            {service.product_name}
                          </span>
                        </div>

                        <div
                          className={`text-xs font-bold ${
                            formData.selectedServices.includes(service.id)
                              ? "text-white/90"
                              : "text-primary"
                          }`}
                        >
                          {formatNumber(service.product_subscription_fee)} SAR
                        </div>
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
          onClick={() => onPrevious?.()}
          className="w-full md:w-auto px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2
                     bg-white border-2 border-secondary text-secondary 
                     hover:bg-secondary hover:text-white transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiArrowLeft className="w-5 h-5" />
          Previous
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
                     }`}
          whileHover={isFormValid ? { scale: 1.02 } : {}}
          whileTap={isFormValid ? { scale: 0.98 } : {}}
        >
          Next Step
          <FiArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}

export default Membership;
