import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiHome, FiLogIn, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegistrationSuccess = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("website");
  const isRtl = i18n.dir() === "rtl";

  return (
    <div
      className="min-h-[85vh] flex items-center justify-center p-6 bg-gray-50/50"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-xl w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden relative"
      >
        {/* Subtle Background Pattern */}
        <div
          className={`absolute top-0 ${
            isRtl ? "left-0" : "right-0"
          } p-8 opacity-5`}
        >
          <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>

        <div className="p-10 md:p-14">
          <div className="text-center">
            {/* Elegant Success Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-8 ring-8 ring-green-50/50">
              <FiCheckCircle className="w-10 h-10 text-green-600" />
            </div>

            {/* Professional Heading */}
            <h1 className="text-3xl font-semibold text-secondary mb-4 tracking-tight">
              {t("registration.success.title")}
            </h1>

            {/* Refined Content Message */}
            <div className="space-y-4 text-gray-500 mb-10 leading-relaxed font-body">
              <p>{t("registration.success.message")}</p>

              <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-4 mt-6 inline-flex items-center gap-3 text-left w-full max-w-sm mx-auto">
                <div className="bg-white p-2 text-primary rounded-md shadow-sm">
                  <FiMail className="w-5 h-5" />
                </div>
                <div className={`flex-1 ${isRtl ? "text-right" : "text-left"}`}>
                  <p className="text-sm font-semibold text-secondary">
                    {t("registration.success.emailCheck.title")}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t("registration.success.emailCheck.message")}
                  </p>
                </div>
              </div>
            </div>

            {/* Clean Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 border-t border-gray-100 mt-2">
              <button
                onClick={() => navigate("/")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-colors duration-200"
              >
                <FiHome className="w-4 h-4" />
                {t("registration.success.buttons.home")}
              </button>

              <button
                onClick={() => navigate("/signin")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-2.5 rounded-lg bg-secondary text-white font-medium shadow-md shadow-secondary/20 hover:bg-secondary/90 hover:shadow-lg transition-all duration-200"
              >
                <FiLogIn className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                {t("registration.success.buttons.login")}
              </button>
            </div>

            <p className="mt-8 text-xs text-gray-400">
              {t("registration.success.support.text")}{" "}
              <button
              onClick={() => navigate("/contact-us")}
              className="text-primary cursor-pointer hover:underline">
                {t("registration.success.support.link")}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationSuccess;
