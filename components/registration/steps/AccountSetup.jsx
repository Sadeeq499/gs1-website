"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiChevronDown,
  FiAlertCircle,
  FiLoader,
  FiCheck,
  FiArrowRight,
  FiEdit,
} from "react-icons/fi";
import { useVerifyEmailMutation } from "@/lib/hooks/useRegistrationApi";
import OtpVerifyModal from "../shared/OtpVerifyModal";
import {
  useRegistrationStore,
  selectAccountSetup,
} from "@/stores/registrationStore";

function AccountSetup({ onNext }) {
  // Zustand actions & selectors
  const setAccountSetup = useRegistrationStore((s) => s.setAccountSetup);
  const clearCompanyInfo = useRegistrationStore((s) => s.clearCompanyInfo);
  const clearMembership = useRegistrationStore((s) => s.clearMembership);
  const savedData = useRegistrationStore(selectAccountSetup);

  const [formData, setFormData] = useState(() => {
    if (savedData) {
      return {
        businessType: savedData.businessType || "",
        email: savedData.email || "",
        isFromKSA: savedData.isFromKSA || false,
      };
    }
    return {
      businessType: "",
      email: "",
      isFromKSA: false,
    };
  });

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [emailVerified, setEmailVerified] = useState(() => !!(savedData?.email));

  const { mutateAsync: verifyEmail, isPending: isLoading } =
    useVerifyEmailMutation();

  // Business types
  const businessTypes = useMemo(
    () => [
      { value: "", label: "Select Business Type" },
      { value: "company", label: "Company / Organization" },
      {
        value: "individual/family business",
        label: "Individual / Family Business",
      },
    ],
    []
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "email") {
      setEmailVerified(false);
    }
    if (name === "businessType") {
      clearCompanyInfo();
      clearMembership();
    }
  };

  const handleVerifyEmail = async () => {
    if (!formData.email) return;

    try {
      const res = await verifyEmail({ email: formData.email });

      if (res?.token) {
        localStorage.setItem("email_otp_token", res.token);
        setShowOtpModal(true);
      }
    } catch (error) {
      console.error(error);
      alert(error?.data?.error || "Failed to send verification email.");
    }
  };

  const handleOtpSuccess = () => {
    setEmailVerified(true);
    setShowOtpModal(false);
  };

  const handleNextStep = () => {
    clearCompanyInfo();
    clearMembership();

    setAccountSetup({
      email: formData.email,
      businessType: formData.businessType,
      isFromKSA: formData.isFromKSA,
    });

    onNext?.();
  };

  const isEmailValid =
    formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const canProceed = emailVerified && formData.businessType;

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <FiUser className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-secondary">Account Setup</h2>
          <p className="text-gray-500">
            Let&apos;s start with the basics of your account
          </p>
        </div>
      </div>

      {/* Form Content */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Business Type Dropdown */}
        <div className="space-y-2">
          <label
            htmlFor="businessType"
            className="block text-sm font-semibold text-secondary"
          >
            Business Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none 
                         bg-white text-gray-700 font-medium
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all duration-200 cursor-pointer"
            >
              {businessTypes.map((type) => (
                <option
                  key={type.value}
                  value={type.value}
                  disabled={type.value === ""}
                >
                  {type.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <FiChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Is from KSA Checkbox */}
        {formData.businessType === "company" && (
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="isFromKSA"
                name="isFromKSA"
                checked={formData.isFromKSA}
                onChange={handleChange}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-300 transition-all checked:border-primary checked:bg-primary hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <FiCheck className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity w-3.5 h-3.5" />
            </div>
            <label
              htmlFor="isFromKSA"
              className="text-sm font-semibold text-secondary cursor-pointer select-none"
            >
              Are you from Kingdom of Saudi Arabia?
            </label>
          </div>
        )}

        {/* Email Address Input */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-secondary"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiMail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={`w-full py-3 pl-12 pr-4 border-2 rounded-lg
                         bg-white text-gray-700 font-medium placeholder-gray-400
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all duration-200
                         ${
                           emailVerified
                             ? "border-secondary focus:border-secondary"
                             : "border-gray-200"
                         }`}
              readOnly={emailVerified}
            />
            {emailVerified && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
                <FiCheck className="w-5 h-5 text-green-500" />
                <button
                  type="button"
                  onClick={() => setEmailVerified(false)}
                  className="p-1 text-gray-400 hover:text-primary transition-colors"
                  title="Change email"
                >
                  <FiEdit className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          {formData.email && !isEmailValid && (
            <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
              <FiAlertCircle className="w-4 h-4" />
              Please enter a valid email address
            </p>
          )}
        </div>

        {/* Verify Email Button */}
        {!emailVerified && (
          <motion.button
            onClick={handleVerifyEmail}
            disabled={!isEmailValid || isLoading}
            className={`w-full py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2
                        transition-all duration-200
                        ${
                          isEmailValid && !isLoading
                            ? "bg-primary text-white hover:opacity-90 hover:shadow-lg"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
            whileHover={isEmailValid && !isLoading ? { scale: 1.01 } : {}}
            whileTap={isEmailValid && !isLoading ? { scale: 0.99 } : {}}
          >
            {isLoading ? (
              <>
                <FiLoader className="w-5 h-5 animate-spin" />
                Sending Verification...
              </>
            ) : (
              <>
                <FiMail className="w-5 h-5" />
                Verify Email
              </>
            )}
          </motion.button>
        )}
      </motion.div>

      {/* Next Step Button */}
      <div className="mt-8 flex justify-end">
        <motion.button
          onClick={handleNextStep}
          disabled={!canProceed}
          className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-2
                    transition-all duration-200
                    ${
                      canProceed
                        ? "bg-primary text-white hover:opacity-90 hover:shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
          whileHover={canProceed ? { scale: 1.02 } : {}}
          whileTap={canProceed ? { scale: 0.98 } : {}}
        >
          Next Step
          <FiArrowRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* OTP Modal */}
      <OtpVerifyModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onSuccess={handleOtpSuccess}
        email={formData.email}
      />
    </div>
  );
}

export default AccountSetup;
