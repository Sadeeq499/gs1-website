"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiLoader,
  FiHash,
  FiBriefcase,
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import { HiOutlineIdentification, HiOutlineReceiptTax } from "react-icons/hi";

import Location from "../shared/Location";
import Industries from "../shared/Industries";
import BusinessName from "../shared/BusinessName";
import PointOfContact from "../shared/PointOfContact";

import {
  useRegistrationStore,
  selectCompanyInfo,
  selectAccountSetup,
} from "@/stores/registrationStore";
import { useGetInfoBasedOnUnifiedNumberMutation } from "@/lib/hooks/useRegistrationApi";

function CompanyInfo({ onNext, onPrevious }) {
  const setCompanyInfoStore = useRegistrationStore((s) => s.setCompanyInfo);
  const storedCompanyInfo = useRegistrationStore(selectCompanyInfo);
  const accountSetupData = useRegistrationStore(selectAccountSetup);

  const isFromKSA = accountSetupData?.isFromKSA;

  const [selectedIndustries, setSelectedIndustries] = useState(() => {
    if (storedCompanyInfo && Array.isArray(storedCompanyInfo.selectedIndustries)) {
      return storedCompanyInfo.selectedIndustries;
    }
    return [];
  });

  const [formData, setFormData] = useState(() => {
    const defaults = {
      unifiedNumber: "",
      vatNumber: "",
      companyNameEn: "",
      companyNameAr: "",
      country: "",
      province: "",
      city: "",
      zipCode: "",
      address: "",
      latitude: null,
      longitude: null,
      crActivity: "",
      contactPerson: "",
      landline: "",
      mobile: "",
    };
    if (storedCompanyInfo) {
      const { selectedIndustries: _storedIndustries, ...rest } = storedCompanyInfo;
      return { ...defaults, ...rest };
    }
    return defaults;
  });

  const [isUNNVerified, setIsUNNVerified] = useState(
    () => !!(storedCompanyInfo?.unifiedNumber)
  );

  const { mutateAsync: getInfoBasedOnUnifiedNumber, isPending: isVerifyingUNN } =
    useGetInfoBasedOnUnifiedNumberMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "unifiedNumber") {
      if (isFromKSA) {
        const numericValue = value.replace(/[^0-9]/g, "");
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === "vatNumber") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "unifiedNumber") {
      setIsUNNVerified(false);
    }
  };

  const handleNext = () => {
    setCompanyInfoStore({ ...formData, selectedIndustries });
    onNext?.();
  };

  const handleVerifyUNN = async () => {
    if (!formData.unifiedNumber) return;

    try {
      const businessTypeMap = {
        company: "organization",
        "individual/family business": "individual/family business",
      };

      const mappedBusinessType =
        businessTypeMap[accountSetupData?.businessType] ||
        accountSetupData?.businessType;

      const response = await getInfoBasedOnUnifiedNumber({
        unifiedNumber: formData.unifiedNumber,
        businessType: mappedBusinessType,
      });

      if (response?.result?.isSuccess) {
        const { mcData, additionalData } = response;
        const crInfo = mcData?.crInformation || {};
        const crActivities = mcData?.crActivities || {};
        const contactInfo = mcData?.contactInformation || {};

        setFormData((prev) => ({
          ...prev,
          companyNameAr: crInfo.entityFullNameAr || prev.companyNameAr,
          companyNameEn: crInfo.entityFullNameEn || prev.companyNameEn,
          crActivity: crActivities.fullActivitiesText || prev.crActivity,
          mobile: contactInfo.mobileNo || additionalData?.mobileNo || prev.mobile,
          landline: contactInfo.phoneNo || prev.landline,
          zipCode: additionalData?.postalCode || prev.zipCode,
        }));

        setIsUNNVerified(true);
      } else {
        console.error("Verification failed:", response?.result?.statusMessage);
        setIsUNNVerified(false);
      }
    } catch (error) {
      console.error("Error verifying UNN:", error);
      alert(error?.data?.error || "Error verifying UNN");
      setIsUNNVerified(false);
    }
  };

  const isUNNValid = formData.unifiedNumber && formData.unifiedNumber.length >= 10;

  const isFormValid =
    (!isFromKSA || isUNNVerified) &&
    formData.vatNumber.trim() !== "" &&
    formData.companyNameEn.trim() !== "" &&
    formData.companyNameAr.trim() !== "" &&
    formData.country.trim() !== "" &&
    formData.province.trim() !== "" &&
    formData.crActivity.trim() !== "" &&
    formData.contactPerson.trim() !== "" &&
    formData.mobile.trim() !== "" &&
    selectedIndustries.length > 0;

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 mb-6 md:mb-8">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <FaBuilding className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-secondary">
            Company Information
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Fill in your organization details
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
        {/* Section: Identification */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
            <HiOutlineIdentification className="w-5 h-5 text-primary" />
            Identification
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Unified National Number */}
            <div className="space-y-2">
              <label htmlFor="unifiedNumber" className="block text-sm font-semibold text-secondary">
                {isFromKSA ? "Unified National Number" : "Registration Number"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiHash className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="unifiedNumber"
                  name="unifiedNumber"
                  value={formData.unifiedNumber}
                  onChange={handleChange}
                  maxLength={isFromKSA ? 10 : undefined}
                  placeholder={isFromKSA ? "Enter 10-digit UNN" : "Enter Registration Number"}
                  className={`w-full py-3 border-2 rounded-lg
                             bg-white text-gray-700 font-medium placeholder-gray-400
                             focus:outline-none focus:ring-2 transition-all duration-200
                             ${isFromKSA ? "pl-12 pr-24" : "pl-12 pr-4"}
                             ${
                               !isFromKSA || isUNNVerified
                                 ? "border-secondary focus:border-secondary focus:ring-secondary/20"
                                 : "border-gray-200 focus:border-primary focus:ring-primary/20"
                             }`}
                />

                {/* Verify Button – Only for KSA */}
                {isFromKSA && (
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                    <motion.button
                      type="button"
                      onClick={handleVerifyUNN}
                      disabled={!isUNNValid || isVerifyingUNN || isUNNVerified}
                      className={`px-3 md:px-4 py-1.5 rounded-md text-xs md:text-sm font-semibold flex items-center gap-1.5
                                 transition-all duration-200
                                 ${
                                   isUNNVerified
                                     ? "bg-secondary text-white cursor-default"
                                     : isUNNValid && !isVerifyingUNN
                                     ? "bg-primary text-white hover:opacity-90"
                                     : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                 }`}
                      whileHover={
                        isUNNValid && !isVerifyingUNN && !isUNNVerified ? { scale: 1.02 } : {}
                      }
                      whileTap={
                        isUNNValid && !isVerifyingUNN && !isUNNVerified ? { scale: 0.98 } : {}
                      }
                    >
                      {isVerifyingUNN ? (
                        <FiLoader className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                      ) : isUNNVerified ? (
                        <>
                          <FiCheck className="w-3 h-3 md:w-4 md:h-4" />
                          <span>Verified</span>
                        </>
                      ) : (
                        "Verify"
                      )}
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            {/* VAT Registration Number */}
            <div className="space-y-2">
              <label htmlFor="vatNumber" className="block text-sm font-semibold text-secondary">
                VAT Registration No. <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiOutlineReceiptTax className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="vatNumber"
                  name="vatNumber"
                  maxLength={15}
                  value={formData.vatNumber}
                  onChange={handleChange}
                  placeholder="Enter VAT number"
                  className="w-full py-3 pl-12 pr-4 border-2 border-gray-200 rounded-lg
                             bg-white text-gray-700 font-medium placeholder-gray-400
                             focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                             transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Company Name */}
        <BusinessName formData={formData} onChange={handleChange} />

        {/* Location */}
        <Location formData={formData} onChange={handleChange} />

        {/* Business Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
            <FiBriefcase className="w-5 h-5 text-primary" />
            Business Details
          </h3>

          <div className="space-y-2">
            <label htmlFor="crActivity" className="block text-sm font-semibold text-secondary">
              CR Activity <span className="text-red-500">*</span>
            </label>
            <textarea
              id="crActivity"
              name="crActivity"
              value={formData.crActivity}
              onChange={handleChange}
              placeholder="Describe your business activity"
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                         bg-white text-gray-700 font-medium placeholder-gray-400
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all duration-200 resize-none"
            />
          </div>

          <Industries
            selectedIndustries={selectedIndustries}
            onChange={setSelectedIndustries}
          />
        </div>

        {/* Point of Contact */}
        <PointOfContact formData={formData} onChange={handleChange} />
      </motion.div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex flex-col-reverse md:flex-row gap-3 md:gap-0 justify-between">
        <motion.button
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

export default CompanyInfo;
