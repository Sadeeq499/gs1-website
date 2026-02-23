import { useState, useEffect } from "react";
// style
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

// Translation
import { useTranslation } from "react-i18next";
// Reusable components
import Location from "./components/Location";
import Industries from "./components/Industries.jsx";
import BusinessName from "./components/BusinessName";
import PointOfContact from "./components/PointOfContact";
import { useOutletContext } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanyInfo,
  selectCompanyInfo,
  selectAccountSetup,
} from "../../../../store/websiteSlices/registrationSlice";

// API
import { useGetInfoBasedOnUnifiedNumberMutation } from "../../../../apis/websiteEndpoints/registration/registration";
import { toast } from "react-toastify";

function CompanyInfo() {
  const { t, i18n } = useTranslation("website");
  const isRtl = i18n.dir() === "rtl";

  const dispatch = useDispatch();
  const storedCompanyInfo = useSelector(selectCompanyInfo);
  const accountSetupData = useSelector(selectAccountSetup);

  const isFromKSA = accountSetupData?.isFromKSA;

  const [selectedIndustries, setSelectedIndustries] = useState([]);

  const [formData, setFormData] = useState({
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
  });

  const [isUNNVerified, setIsUNNVerified] = useState(false);

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

      // If unified number was stored, consider it verified
      if (storedCompanyInfo.unifiedNumber) {
        setIsUNNVerified(true);
      }
    }
  }, [storedCompanyInfo]);

  // api
  const [getInfoBasedOnUnifiedNumber, { isLoading: isVerifyingUNN }] =
    useGetInfoBasedOnUnifiedNumberMutation();

  // Navigation context
  const context = useOutletContext();
  const { onNext, onPrevious } = context || {};

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "unifiedNumber") {
      if (isFromKSA) {
        // Enforce numeric only for KSA
        const numericValue = value.replace(/[^0-9]/g, "");
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
      } else {
        // Allow any text for non-KSA
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

  // Handle Next button - dispatch all form data to Redux store
  const handleNext = () => {
    // Dispatch all company info to Redux store at once
    dispatch(setCompanyInfo({ ...formData, selectedIndustries }));
    // Navigate to next step
    if (onNext) {
      onNext();
    }
  };

  const handleVerifyUNN = async () => {
    if (!formData.unifiedNumber) return;

    try {
      // Map business type
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
      }).unwrap();

      if (response?.result?.isSuccess) {
        const { mcData, additionalData } = response;

        // Extract data from response
        const crInfo = mcData?.crInformation || {};
        const crActivities = mcData?.crActivities || {};
        const contactInfo = mcData?.contactInformation || {};

        // Update form with fetched data
        setFormData((prev) => ({
          ...prev,
          // Company Names - user can still edit if needed
          companyNameAr: crInfo.entityFullNameAr || prev.companyNameAr,
          companyNameEn: crInfo.entityFullNameEn || prev.companyNameEn,

          // CR Activity
          crActivity: crActivities.fullActivitiesText || prev.crActivity,

          // Contact Information
          mobile:
            contactInfo.mobileNo || additionalData?.mobileNo || prev.mobile,
          landline: contactInfo.phoneNo || prev.landline,

          // Location Info
          zipCode: additionalData?.postalCode || prev.zipCode,

          // City from headquarters (if available)
          // Note: You may need to map headquarterCityNameEn to your city dropdown values
        }));

        setIsUNNVerified(true);
      } else {
        // Handle unsuccessful response
        console.error("Verification failed:", response?.result?.statusMessage);
        setIsUNNVerified(false);
      }
    } catch (error) {
      console.error("Error verifying UNN:", error);
      toast.error(error?.data?.error || "Error verifying UNN");
      setIsUNNVerified(false);
    }
  };

  const isUNNValid =
    formData.unifiedNumber && formData.unifiedNumber.length >= 10;

  // Form validation - all required fields must be filled
  // Note: City is optional as some regions may not have cities in database
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
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      {/* Step Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 mb-6 md:mb-8">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <FaBuilding className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-secondary">
            {t("registration.companyInfo.title")}
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            {t("registration.companyInfo.subtitle")}
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
            {t("registration.companyInfo.sections.identification")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Unified National Number */}
            <div className="space-y-2">
              <label
                htmlFor="unifiedNumber"
                className="block text-sm font-semibold text-secondary"
              >
                {t("registration.companyInfo.unn.label")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 ${
                    isRtl ? "right-0 pr-4" : "left-0 pl-4"
                  } flex items-center pointer-events-none`}
                >
                  <FiHash className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="unifiedNumber"
                  name="unifiedNumber"
                  value={formData.unifiedNumber}
                  onChange={handleChange}
                  maxLength={isFromKSA ? 10 : undefined}
                  placeholder={
                    isFromKSA
                      ? t("registration.companyInfo.unn.placeholder")
                      : "Enter Registration Number"
                  }
                  className={`w-full py-3 border-2 rounded-lg
                             bg-white text-gray-700 font-medium placeholder-gray-400
                             focus:outline-none focus:ring-2 transition-all duration-200
                             ${
                               isRtl
                                 ? isFromKSA
                                   ? "pr-12 pl-24 text-right"
                                   : "pr-12 pl-4 text-right"
                                 : isFromKSA
                                 ? "pl-12 pr-24 text-left"
                                 : "pl-12 pr-4 text-left"
                             }
                             ${
                               !isFromKSA || isUNNVerified
                                 ? "border-secondary focus:border-secondary focus:ring-secondary/20"
                                 : "border-gray-200 focus:border-primary focus:ring-primary/20"
                             }`}
                />

                {/* Verify Button - Only show if from KSA */}
                {isFromKSA && (
                  <div
                    className={`absolute inset-y-0 ${
                      isRtl ? "left-0 pl-2" : "right-0 pr-2"
                    } flex items-center`}
                  >
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
                        isUNNValid && !isVerifyingUNN && !isUNNVerified
                          ? { scale: 1.02 }
                          : {}
                      }
                      whileTap={
                        isUNNValid && !isVerifyingUNN && !isUNNVerified
                          ? { scale: 0.98 }
                          : {}
                      }
                    >
                      {isVerifyingUNN ? (
                        <FiLoader className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                      ) : isUNNVerified ? (
                        <>
                          <FiCheck className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="hidden xs:inline">
                            {t("registration.companyInfo.unn.verified")}
                          </span>
                          <span className="xs:hidden">
                            {/* Short version for very small screens if needed, or just icons */}
                            {t("registration.companyInfo.unn.verified")}
                          </span>
                        </>
                      ) : (
                        t("registration.companyInfo.unn.verify")
                      )}
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            {/* VAT Registration Number */}
            <div className="space-y-2">
              <label
                htmlFor="vatNumber"
                className="block text-sm font-semibold text-secondary"
              >
                {t("registration.companyInfo.vat.label")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 ${
                    isRtl ? "right-0 pr-4" : "left-0 pl-4"
                  } flex items-center pointer-events-none`}
                >
                  <HiOutlineReceiptTax className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="vatNumber"
                  name="vatNumber"
                  maxLength={15}
                  value={formData.vatNumber}
                  onChange={handleChange}
                  placeholder={t("registration.companyInfo.vat.placeholder")}
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
          </div>
        </div>

        {/* Section: Company Name - Reusable Component */}
        <BusinessName formData={formData} onChange={handleChange} />

        {/* Section: Location */}
        <Location formData={formData} onChange={handleChange} />

        {/* Section: Business Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
            <FiBriefcase className="w-5 h-5 text-primary" />
            {t("registration.companyInfo.sections.businessDetails")}
          </h3>

          {/* CR Activity - Textarea */}
          <div className="space-y-2">
            <label
              htmlFor="crActivity"
              className="block text-sm font-semibold text-secondary"
            >
              {t("registration.companyInfo.crActivity.label")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="crActivity"
              name="crActivity"
              value={formData.crActivity}
              onChange={handleChange}
              placeholder={t("registration.companyInfo.crActivity.placeholder")}
              rows={4}
              className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                         bg-white text-gray-700 font-medium placeholder-gray-400
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all duration-200 resize-none
                         ${isRtl ? "text-right" : "text-left"}`}
            />
          </div>

          {/* Selected Industries - Multi-select Dropdown */}
          <Industries
            selectedIndustries={selectedIndustries}
            onChange={setSelectedIndustries}
          />
        </div>

        {/* Section: Point of Contact - Reusable Component */}
        <PointOfContact formData={formData} onChange={handleChange} />
      </motion.div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex flex-col-reverse md:flex-row gap-3 md:gap-0 justify-between">
        <motion.button
          onClick={() => onPrevious && onPrevious()}
          className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2
                     bg-white border-2 border-secondary text-secondary 
                     hover:bg-secondary hover:text-white transition-all duration-200
                     ${isRtl ? "flex-row-reverse" : ""}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiArrowLeft className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
          {t("registration.companyInfo.buttons.previous")}
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
                     }
                     ${isRtl ? "flex-row-reverse" : ""}`}
          whileHover={isFormValid ? { scale: 1.02 } : {}}
          whileTap={isFormValid ? { scale: 0.98 } : {}}
        >
          {t("registration.companyInfo.buttons.nextStep")}
          <FiArrowRight className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
        </motion.button>
      </div>
    </div>
  );
}

export default CompanyInfo;
