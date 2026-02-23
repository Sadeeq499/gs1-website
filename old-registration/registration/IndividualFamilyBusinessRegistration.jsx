import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";

// Reusable components
import Location from "./components/Location";
import Industries from "./components/Industries.jsx";
import BusinessName from "./components/BusinessName";
import PointOfContact from "./components/PointOfContact";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanyInfo,
  selectCompanyInfo,
} from "../../../../store/websiteSlices/registrationSlice";

function IndividualFamilyBusinessRegistration() {
  const { t, i18n } = useTranslation("website");
  const isRtl = i18n.dir() === "rtl";
  const dispatch = useDispatch();
  const storedCompanyInfo = useSelector(selectCompanyInfo);

  const [selectedIndustries, setSelectedIndustries] = useState([]);

  const [formData, setFormData] = useState({
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
  });

  // Prefill form data from Redux store if available (for when user navigates back)
  useEffect(() => {
    if (storedCompanyInfo) {
      const { selectedIndustries: storedIndustries, ...rest } =
        storedCompanyInfo;

      setFormData((prev) => ({
        ...prev,
        ...rest,
      }));

      if (Array.isArray(storedIndustries)) {
        setSelectedIndustries(storedIndustries);
      }
    }
  }, [storedCompanyInfo]);

  // Navigation context
  const context = useOutletContext();
  const { onNext, onPrevious } = context || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Next button - dispatch all form data to Redux store
  const handleNext = () => {
    // Dispatch all company info to Redux store at once
    dispatch(setCompanyInfo({ ...formData, selectedIndustries }));
    // Navigate to next step
    if (onNext) {
      onNext();
    }
  };

  // Form validation - all required fields must be filled
  // Note: City is optional as some regions may not have cities in database
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
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      {/* Step Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <FaUserTie className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-secondary">
            {t("registration.individualFamily.title")}
          </h2>
          <p className="text-gray-500">
            {t("registration.individualFamily.subtitle")}
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
            {t("registration.individualFamily.sections.identification")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* License Ref. No */}
            <div className="space-y-2">
              <label
                htmlFor="licenseRefNo"
                className="block text-sm font-semibold text-secondary"
              >
                {t("registration.individualFamily.fields.licenseRefNo.label")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="licenseRefNo"
                name="licenseRefNo"
                maxLength={15}
                value={formData.licenseRefNo}
                onChange={handleChange}
                placeholder={t(
                  "registration.individualFamily.fields.licenseRefNo.placeholder"
                )}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                           bg-white text-gray-700 font-medium placeholder-gray-400
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                           transition-all duration-200"
              />
            </div>

            {/* License Name */}
            <div className="space-y-2">
              <label
                htmlFor="licenseName"
                className="block text-sm font-semibold text-secondary"
              >
                {t("registration.individualFamily.fields.licenseName.label")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="licenseName"
                name="licenseName"
                value={formData.licenseName}
                onChange={handleChange}
                placeholder={t(
                  "registration.individualFamily.fields.licenseName.placeholder"
                )}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                           bg-white text-gray-700 font-medium placeholder-gray-400
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                           transition-all duration-200"
              />
            </div>

            {/* VAT Number */}
            <div className="space-y-2">
              <label
                htmlFor="vatNumber"
                className="block text-sm font-semibold text-secondary"
              >
                {t("registration.individualFamily.fields.vatNumber.label")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="vatNumber"
                name="vatNumber"
                maxLength={15}
                value={formData.vatNumber}
                onChange={handleChange}
                placeholder={t(
                  "registration.individualFamily.fields.vatNumber.placeholder"
                )}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                           bg-white text-gray-700 font-medium placeholder-gray-400
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                           transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Section: Business Name - Reusable Component */}
        <BusinessName
          formData={formData}
          onChange={handleChange}
          title={t("registration.individualFamily.sections.businessName")}
        />

        {/* Section: Location - Reusable Component */}
        <Location formData={formData} onChange={handleChange} />

        {/* Section: Industries - Reusable Component */}
        <div className="space-y-4">
          <Industries
            selectedIndustries={selectedIndustries}
            onChange={setSelectedIndustries}
          />
        </div>

        {/* Section: Point of Contact - Reusable Component */}
        <PointOfContact
          formData={formData}
          onChange={handleChange}
          showLandline={false}
        />
      </motion.div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <motion.button
          onClick={() => onPrevious && onPrevious()}
          className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-2
                     bg-white border-2 border-secondary text-secondary 
                     hover:bg-secondary hover:text-white transition-all duration-200
                     ${isRtl ? "flex-row-reverse" : ""}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiArrowLeft className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
          {t("registration.individualFamily.buttons.previous")}
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
                     }
                     ${isRtl ? "flex-row-reverse" : ""}`}
          whileHover={isFormValid ? { scale: 1.02 } : {}}
          whileTap={isFormValid ? { scale: 0.98 } : {}}
        >
          {t("registration.individualFamily.buttons.next")}
          <FiArrowRight className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
        </motion.button>
      </div>
    </div>
  );
}

export default IndividualFamilyBusinessRegistration;
