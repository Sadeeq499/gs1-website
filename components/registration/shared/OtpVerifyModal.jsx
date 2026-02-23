"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiLoader } from "react-icons/fi";
import { useVerifyOtpCodeMutation } from "@/lib/hooks/useRegistrationApi";

const OtpVerifyModal = ({ isOpen, onClose, onSuccess, email }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const { mutateAsync: verifyOtpCode, isPending: isLoading } =
    useVerifyOtpCodeMutation();

  // Reset OTP and focus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);
    }
  }, [isOpen]);

  // Wrap onClose to reset OTP state on close
  const handleClose = () => {
    setOtp(["", "", "", ""]);
    onClose();
  };

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{4}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs.current[3]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) return;

    const token = localStorage.getItem("email_otp_token");

    if (!token) {
      alert("Session expired. Please request a new OTP.");
      handleClose();
      return;
    }

    try {
      await verifyOtpCode({ otp: otpString, token });
      onSuccess();
      handleClose();
    } catch (error) {
      console.error(error);
      alert(error?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative z-10"
          >
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <FiX size={24} />
            </button>

            <div className="text-center mb-8 mt-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Verify Your Email
              </h3>
              <p className="text-gray-500 text-sm px-4">
                We&apos;ve sent a verification code to <br />
                <span className="font-semibold text-gray-800">{email}</span>
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-8" dir="ltr">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-14 h-14 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold 
                             focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none
                             transition-all duration-200 text-gray-800 bg-gray-50 focus:bg-white"
                />
              ))}
            </div>

            <div className="space-y-4">
              <button
                onClick={handleVerify}
                disabled={otp.some((d) => !d) || isLoading}
                className={`w-full py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2
                            transition-all duration-200 shadow-lg shadow-primary/20
                            ${
                              otp.some((d) => !d) || isLoading
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                                : "bg-primary text-white hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5"
                            }`}
              >
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin" /> Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </button>

              <div className="text-center">
                <button
                  className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OtpVerifyModal;
