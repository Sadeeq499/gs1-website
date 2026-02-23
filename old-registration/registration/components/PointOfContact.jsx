import { FiUser } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

/**
 * Reusable Point of Contact component
 * Used in both CompanyInfo and IndividualFamilyBusinessRegistration
 */
function PointOfContact({ formData, onChange, showLandline = true }) {
  const { t, i18n } = useTranslation("website");
  const isRtl = i18n.dir() === "rtl";

  const handlePhoneChange = (value, country, e, formattedValue, name) => {
    onChange({
      target: {
        name: name,
        value: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
        <FiUser className="w-5 h-5 text-primary" />
        {t("registration.common.pointOfContact.title")}
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
            {t("registration.common.pointOfContact.contactPerson.label")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div
              className={`absolute inset-y-0 ${
                isRtl ? "right-0 pr-4" : "left-0 pl-4"
              } flex items-center pointer-events-none`}
            >
              <FiUser className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={onChange}
              placeholder={t(
                "registration.common.pointOfContact.contactPerson.placeholder"
              )}
              className={`w-full py-3 border-2 border-gray-200 rounded-lg
                         bg-white text-gray-700 font-medium placeholder-gray-400
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all duration-200
                         ${
                           isRtl
                             ? "pr-12 pl-4 text-right"
                             : "pl-12 pr-4 text-left"
                         }`}
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
              {t("registration.common.pointOfContact.landline.label")}
            </label>
            <div className={`w-full ${isRtl ? "rtl-phone-input" : ""}`}>
              <PhoneInput
                country={"sa"}
                value={formData.landline}
                onChange={(val, country, e, formattedValue) =>
                  handlePhoneChange(val, country, e, formattedValue, "landline")
                }
                inputProps={{
                  name: "landline",
                  id: "landline",
                }}
                inputClass={`!w-full !py-6 !border-2 !border-gray-200 !rounded-lg
                           !bg-white !text-gray-700 !font-medium !placeholder-gray-400
                           !focus:outline-none !focus:border-primary !focus:ring-2 !focus:ring-primary/20
                           !transition-all !duration-200 !h-[50px] ${
                             isRtl ? "!pr-12 !pl-4 !text-right" : "!text-left"
                           }`}
                buttonClass={`!border-2 !border-gray-200 !rounded-l-lg !bg-gray-50 !hover:bg-gray-100 !h-[50px]
                            ${isRtl ? "!rounded-r-lg !rounded-l-none" : ""}`}
                dropdownClass={`${isRtl ? "rtl-dropdown" : ""}`}
                containerClass="!w-full"
              />
            </div>
          </div>
        )}

        {/* Mobile Number */}
        <div className="space-y-2">
          <label
            htmlFor="mobile"
            className="block text-sm font-semibold text-secondary"
          >
            {t("registration.common.pointOfContact.mobile.label")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className={`w-full ${isRtl ? "rtl-phone-input" : ""}`}>
            <PhoneInput
              country={"sa"}
              value={formData.mobile}
              onChange={(val, country, e, formattedValue) =>
                handlePhoneChange(val, country, e, formattedValue, "mobile")
              }
              inputProps={{
                name: "mobile",
                id: "mobile",
              }}
              inputClass={`!w-full !py-6 !border-2 !border-gray-200 !rounded-lg
                         !bg-white !text-gray-700 !font-medium !placeholder-gray-400
                         !focus:outline-none !focus:border-primary !focus:ring-2 !focus:ring-primary/20
                         !transition-all !duration-200 !h-[50px] ${
                           isRtl ? "!pr-12 !pl-4 !text-right" : "!text-left"
                         }`}
              buttonClass={`!border-2 !border-gray-200 !rounded-l-lg !bg-gray-50 !hover:bg-gray-100 !h-[50px]
                          ${isRtl ? "!rounded-r-lg !rounded-l-none" : ""}`}
              dropdownClass={`${isRtl ? "rtl-dropdown" : ""}`}
              containerClass="!w-full"
            />
          </div>
        </div>
      </div>

      {/* Custom Styles for RTL Support in Phone Input */}
      {isRtl && (
        <style>{`
          .rtl-phone-input .react-tel-input .flag-dropdown {
            left: auto;
            right: 0;
            border-right: 0;
            border-left: 1px solid #e5e7eb;
            border-radius: 0 0.5rem 0.5rem 0;
          }
           .rtl-phone-input .react-tel-input .selected-flag {
             border-radius: 0 0.5rem 0.5rem 0;
           }
          .rtl-phone-input .react-tel-input .form-control {
            padding-left: 14px;
            padding-right: 58px;
          }
        `}</style>
      )}
    </div>
  );
}

export default PointOfContact;
