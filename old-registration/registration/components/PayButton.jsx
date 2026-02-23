import React from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  selectAccountSetup,
  selectCompanyInfo,
  selectMembership,
  resetRegistration,
} from "../../../../../store/websiteSlices/registrationSlice";
import { useDocumentUpload } from "../../../../../Contexts/websiteContext/DocumentUploadContext";
import { useRegisterMutation } from "../../../../../apis/websiteEndpoints/registration/registration";
import { useTranslation } from "react-i18next";

const formatIndustryTypes = (industries) => {
  if (!Array.isArray(industries)) return [];
  return industries.map((ind) => ({
    id: ind.id,
    name: ind.name,
  }));
};

const buildCartObject = (membership, isMedical) => {
  const cartItems = [];
  const pkg = membership?.gtinBarcodePackage;

  // 1. GTIN Package
  if (pkg) {
    const yearlyFee = isMedical
      ? pkg.med_yearly_subscription_fee || 0
      : pkg.gtin_yearly_subscription_fee || 0;

    const registrationFee = isMedical
      ? pkg.med_registration_fee || 0
      : pkg.member_registration_fee || 0;

    cartItems.push({
      productID: pkg.id,
      productName: pkg.member_category_description,
      registration_fee: String(registrationFee),
      yearly_fee: String(yearlyFee),
      price: String(registrationFee + yearlyFee),
      product_type: "gtin",
      quotation: pkg.quotation || "no",
      isSingleBarcode: pkg.total_no_of_barcodes <= 10,
      barcodeQuantity: pkg.total_no_of_barcodes,
    });
  }

  // 2. Additional Services
  membership?.selectedServices?.forEach((service) => {
    const fee = isMedical
      ? service.med_subscription_fee || 0
      : service.product_subscription_fee || 0;

    cartItems.push({
      productID: service.id,
      productName: service.product_name,
      registration_fee: "0",
      yearly_fee: String(fee),
      price: String(fee),
      product_type: "other",
      quotation: "no",
      isSingleBarcode: false,
      barcodeQuantity: service.total_no_of_barcodes || 1,
    });
  });

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price || 0),
    0
  );

  return {
    // transaction_id: `txn_${Date.now()}`,
    cart_items: cartItems,
    total: total,
    request_type: "new",
    payment_type: "bank",
    // receipt: "",
    // receipt_path: "",
    // admin_id: null,
    // assign_to: null,
    // discount: 0,
  };
};

const buildCompanyPayload = (
  accountSetup,
  companyInfo,
  membership,
  documents
) => {
  const formData = new FormData();
  const isMedical =
    membership?.membershipCategory?.name?.toLowerCase() === "medical";

  // Append files (if available)
  if (documents?.crDocument) {
    formData.append("cr_document", documents.crDocument);
  }
  if (documents?.taxCertificate) {
    formData.append("tax_certificate", documents.taxCertificate);
  }
  if (documents?.ibanCertificate) {
    formData.append("iban_certificate", documents.ibanCertificate);
  }
  if (documents?.nationalAddress) {
    formData.append("national_address", documents.nationalAddress);
  }

  // Append text fields
  formData.append("email", accountSetup?.email || "");
  formData.append("business_type", "organization");
  formData.append("company_name_eng", companyInfo?.companyNameEn || "");
  formData.append("company_name_arabic", companyInfo?.companyNameAr || "");
  formData.append("cr_number", companyInfo?.unifiedNumber || "");
  formData.append("cr_activity", companyInfo?.crActivity || "");
  formData.append("contactPerson", companyInfo?.contactPerson || "");
  formData.append("companyLandLine", companyInfo?.landline || "");
  formData.append("mobile", companyInfo?.mobile || "");
  formData.append("country", companyInfo?.country || "");
  formData.append("state", companyInfo?.province || "");
  formData.append("city", companyInfo?.city || "");
  formData.append("zip_code", companyInfo?.zipCode || "");
  formData.append("gps_location", companyInfo?.address || "");
  formData.append("longitude", companyInfo?.longitude || "");
  formData.append("latitude", companyInfo?.latitude || "");
  const tinNumber = companyInfo?.tinNumber || companyInfo?.vatNumber || "";
  formData.append("tin_number", tinNumber); // Added tin_number checking both possible keys
  formData.append(
    "membership_category",
    membership?.membershipCategory?.name || ""
  );
  formData.append("user_source", "gs1");

  // Append JSON fields as stringified values
  formData.append(
    "industryTypes",
    JSON.stringify(formatIndustryTypes(companyInfo?.selectedIndustries))
  );
  formData.append(
    "cart",
    JSON.stringify(buildCartObject(membership, isMedical))
  );

  return formData;
};

const buildIndividualPayload = (accountSetup, companyInfo, membership) => {
  const isMedical =
    membership?.membershipCategory?.name?.toLowerCase() === "medical";

  return {
    cr_number: companyInfo?.licenseRefNo || "", // Mapped from licenseRefNo
    cr_activity: companyInfo?.licenseName || "", // Mapped from licenseName
    email: accountSetup?.email || "",
    contactPerson: companyInfo?.contactPerson || "",
    company_name_eng: companyInfo?.companyNameEn || "",
    company_name_arabic: companyInfo?.companyNameAr || "",
    companyLandLine: companyInfo?.landline || "",
    business_type: "individual/family business",
    mobile: companyInfo?.mobile || "",
    zip_code: companyInfo?.zipCode || "",
    industryTypes: formatIndustryTypes(companyInfo?.selectedIndustries),
    country: companyInfo?.country || "",
    state: companyInfo?.province || "",
    city: companyInfo?.city || "",
    gps_location: companyInfo?.address || "",
    longitude: companyInfo?.longitude || "",
    latitude: companyInfo?.latitude || "",
    tin_number: companyInfo?.tinNumber || companyInfo?.vatNumber || "",
    membership_category: "non_med_category", // Fixed value as per requirement
    cart: buildCartObject(membership, isMedical),
  };
};

// ============================================
// COMPONENT
// ============================================

const PayButton = ({ acceptedTerms, selectedPaymentMethod }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("website");

  const [register, { isLoading }] = useRegisterMutation();

  // Redux selectors
  const accountSetup = useSelector(selectAccountSetup);
  const companyInfo = useSelector(selectCompanyInfo);
  const membership = useSelector(selectMembership);

  // Document upload context (for company registration)
  // Using try-catch in case this component is used outside the provider
  let documents = {};
  let documentContext = null;
  try {
    documentContext = useDocumentUpload();
    documents = documentContext?.getAllDocuments?.() || {};
  } catch (e) {
    // Context not available (individual/family business flow)
    documents = {};
    documentContext = null;
  }

  const isCompany = accountSetup?.businessType === "company";

  const handleSubmit = async () => {
    if (!acceptedTerms || !selectedPaymentMethod || isLoading) return;

    let payload;

    if (isCompany) {
      // Company: Build FormData with files
      payload = buildCompanyPayload(
        accountSetup,
        companyInfo,
        membership,
        documents
      );
    } else {
      // Individual/Family Business: Build JSON
      payload = buildIndividualPayload(accountSetup, companyInfo, membership);
    }

    try {
      const response = await register(payload).unwrap();
      console.log("Registration successful:", response);

      // Reset registration state on success
      dispatch(resetRegistration());

      // Clear persisted documents (if any)
      if (documentContext?.clearAllDocuments) {
        documentContext.clearAllDocuments();
      }

      // Show success toast
      toast.success(t("registration.reviewAndPay.buttons.success"));

      // Navigate to success page
      navigate("/registration-success");
    } catch (err) {
      console.error("Registration failed:", err);

      // Show error toast
      const errorMessage =
        err?.data?.error || t("registration.reviewAndPay.buttons.error");
      toast.error(errorMessage);
    }
  };

  const disabled = !acceptedTerms || !selectedPaymentMethod || isLoading;

  return (
    <button
      onClick={handleSubmit}
      disabled={disabled}
      className={`w-full md:w-auto px-4 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3
                 transition-all duration-200 shadow-lg
                 ${
                   !disabled
                     ? "bg-secondary text-white hover:opacity-90 hover:shadow-xl"
                     : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                 }`}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin w-5 h-5 md:w-6 md:h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="whitespace-nowrap">
            {t("registration.reviewAndPay.buttons.submitting")}
          </span>
        </>
      ) : (
        <>
          <FiCheck className="w-5 h-5 md:w-6 md:h-6" />
          <span className="whitespace-normal md:whitespace-nowrap text-center">
            {t("registration.reviewAndPay.buttons.payNow")}
          </span>
        </>
      )}
    </button>
  );
};

export default PayButton;
