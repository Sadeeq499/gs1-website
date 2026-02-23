"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";

import Location from "../shared/Location";
import Industries from "../shared/Industries";
import BusinessName from "../shared/BusinessName";
import PointOfContact from "../shared/PointOfContact";

import {
  useRegistrationStore,
  selectCompanyInfo,
} from "@/stores/registrationStore";

function IndividualFamilyBusinessRegistration({ onNext, onPrevious }) {
  const setCompanyInfoStore = useRegistrationStore((s) => s.setCompanyInfo);
  const storedCompanyInfo = useRegistrationStore(selectCompanyInfo);

  const [selectedIndustries, setSelectedIndustries] = useState(() => {
    if (storedCompanyInfo && Array.isArray(storedCompanyInfo.selectedIndustries)) {
      return storedCompanyInfo.selectedIndustries;
    }
    return [];
  });

  const [formData, setFormData] = useState(() => {
    const defaults = {
      licenseRefNo: "",
      licenseName: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCompanyInfoStore({ ...formData, selectedIndustries });
    onNext?.();
  };

  const isFormValid =
    formData.licenseRefNo.trim() !== "" &&
    formData.licenseName.trim() !== "" &&
    formData.vatNumber.trim() !== "" &&
    formData.companyNameEn.trim() !== "" &&
    formData.companyNameAr.trim() !== "" &&
    formData.country.trim() !== "" &&
    formData.province.trim() !== "" &&
    formData.contactPerson.trim() !== "" &&
    formData.mobile.trim() !== "" &&
    selectedIndustries.length > 0;

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <FaUserTie className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-secondary">
            Individual / Family Business
          </h2>
          <p className="text-gray-500">Fill in your business details</p>
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
            {/* License Ref. No */}
            <div className="space-y-2">
              <label htmlFor="licenseRefNo" className="block text-sm font-semibold text-secondary">
                License Ref. No <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="licenseRefNo"
                name="licenseRefNo"
                maxLength={15}
                value={formData.licenseRefNo}
                onChange={handleChange}
                placeholder="Enter license reference number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                           bg-white text-gray-700 font-medium placeholder-gray-400
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                           transition-all duration-200"
              />
            </div>

            {/* License Name */}
            <div className="space-y-2">
              <label htmlFor="licenseName" className="block text-sm font-semibold text-secondary">
                License Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="licenseName"
                name="licenseName"
                value={formData.licenseName}
                onChange={handleChange}
                placeholder="Enter license name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                           bg-white text-gray-700 font-medium placeholder-gray-400
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                           transition-all duration-200"
              />
            </div>

            {/* VAT Number */}
            <div className="space-y-2">
              <label htmlFor="vatNumber" className="block text-sm font-semibold text-secondary">
                VAT Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="vatNumber"
                name="vatNumber"
                maxLength={15}
                value={formData.vatNumber}
                onChange={handleChange}
                placeholder="Enter VAT number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                           bg-white text-gray-700 font-medium placeholder-gray-400
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                           transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Business Name */}
        <BusinessName
          formData={formData}
          onChange={handleChange}
          title="Business Name"
        />

        {/* Location */}
        <Location formData={formData} onChange={handleChange} />

        {/* Industries */}
        <div className="space-y-4">
          <Industries
            selectedIndustries={selectedIndustries}
            onChange={setSelectedIndustries}
          />
        </div>

        {/* Point of Contact */}
        <PointOfContact
          formData={formData}
          onChange={handleChange}
          showLandline={false}
        />
      </motion.div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <motion.button
          onClick={() => onPrevious?.()}
          className="px-8 py-3 rounded-lg font-semibold flex items-center gap-2
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
          className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-2
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

export default IndividualFamilyBusinessRegistration;
