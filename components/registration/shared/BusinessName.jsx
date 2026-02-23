"use client";

import { FiFileText } from "react-icons/fi";
import { useState } from "react";

/**
 * Reusable Business/Company Name component.
 * Used in both CompanyInfo and IndividualFamilyBusinessRegistration.
 */
function BusinessName({ formData, onChange, title }) {
  const [error, setError] = useState("");

  const displayTitle = title || "Company / Business Name";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
        <FiFileText className="w-5 h-5 text-primary" />
        {displayTitle}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name (English) */}
        <div className="space-y-2">
          <label
            htmlFor="companyNameEn"
            className="block text-sm font-semibold text-secondary"
          >
            Name (English) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyNameEn"
            name="companyNameEn"
            value={formData.companyNameEn}
            onChange={(e) => {
              const val = e.target.value;
              onChange(e);
              if (val && !/^[a-zA-Z0-9\s]+$/.test(val)) {
                setError(
                  "English name should contain only letters and numbers"
                );
              } else {
                setError("");
              }
            }}
            placeholder="Enter business name in English"
            dir="ltr"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                       bg-white text-gray-700 font-medium placeholder-gray-400
                       focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                       transition-all duration-200 text-left"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Name (Arabic) */}
        <div className="space-y-2">
          <label
            htmlFor="companyNameAr"
            className="block text-sm font-semibold text-secondary"
          >
            Name (Arabic) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyNameAr"
            name="companyNameAr"
            value={formData.companyNameAr}
            onChange={onChange}
            placeholder="أدخل اسم الشركة بالعربي"
            dir="rtl"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                       bg-white text-gray-700 font-medium placeholder-gray-400
                       focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                       transition-all duration-200 text-right"
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessName;
