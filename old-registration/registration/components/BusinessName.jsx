import { FiFileText } from "react-icons/fi";
import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Reusable Business/Company Name component
 * Used in both CompanyInfo and IndividualFamilyBusinessRegistration
 */
function BusinessName({ formData, onChange, title }) {
  const { t, i18n } = useTranslation("website");
  const isRtl = i18n.dir() === "rtl";
  const [error, setError] = useState("");

  // Use provided title or fallback to translation
  const displayTitle = title || t("registration.common.businessName.title");

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
            {t("registration.common.businessName.nameEn.label")}{" "}
            <span className="text-red-500">*</span>
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
            placeholder={t(
              "registration.common.businessName.nameEn.placeholder"
            )}
            dir="ltr"
            className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                       bg-white text-gray-700 font-medium placeholder-gray-400
                       focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                       transition-all duration-200 text-left`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Name (Arabic) */}
        <div className="space-y-2">
          <label
            htmlFor="companyNameAr"
            className="block text-sm font-semibold text-secondary"
          >
            {t("registration.common.businessName.nameAr.label")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyNameAr"
            name="companyNameAr"
            value={formData.companyNameAr}
            onChange={onChange}
            placeholder={t(
              "registration.common.businessName.nameAr.placeholder"
            )}
            dir="rtl"
            className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                       bg-white text-gray-700 font-medium placeholder-gray-400
                       focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                       transition-all duration-200 text-right`}
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessName;
