"use client";

import { FiUser } from "react-icons/fi";

/**
 * Reusable Point of Contact component.
 * Used in both CompanyInfo and IndividualFamilyBusinessRegistration.
 */
function PointOfContact({ formData, onChange, showLandline = true }) {
  const handlePhoneChange = (e) => {
    onChange(e);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
        <FiUser className="w-5 h-5 text-primary" />
        Point of Contact
      </h3>
      <div
        className={`grid grid-cols-1 ${
          showLandline ? "md:grid-cols-3" : "md:grid-cols-2"
        } gap-4`}
      >
        {/* Contact Person Name */}
        <div className="space-y-2">
          <label
            htmlFor="contactPerson"
            className="block text-sm font-semibold text-secondary"
          >
            Contact Person <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiUser className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={onChange}
              placeholder="Enter contact person name"
              className="w-full py-3 pl-12 pr-4 border-2 border-gray-200 rounded-lg
                         bg-white text-gray-700 font-medium placeholder-gray-400
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all duration-200 text-left"
            />
          </div>
        </div>

        {/* Company Landline */}
        {showLandline && (
          <div className="space-y-2">
            <label
              htmlFor="landline"
              className="block text-sm font-semibold text-secondary"
            >
              Company Landline
            </label>
            <input
              type="tel"
              id="landline"
              name="landline"
              value={formData.landline}
              onChange={handlePhoneChange}
              placeholder="e.g. +966 11 123 4567"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                         bg-white text-gray-700 font-medium placeholder-gray-400
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all duration-200"
            />
          </div>
        )}

        {/* Mobile Number */}
        <div className="space-y-2">
          <label
            htmlFor="mobile"
            className="block text-sm font-semibold text-secondary"
          >
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handlePhoneChange}
            placeholder="e.g. +966 5X XXX XXXX"
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

export default PointOfContact;
