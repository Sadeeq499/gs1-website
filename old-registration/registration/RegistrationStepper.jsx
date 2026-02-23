import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { DocumentUploadProvider } from "../../../../Contexts/websiteContext/DocumentUploadContext";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import { selectAccountSetup } from "../../../../store/websiteSlices/registrationSlice";

function RegistrationStepper() {
  const location = useLocation();
  const navigate = useNavigate();
  const accountSetup = useSelector(selectAccountSetup);
  const { t } = useTranslation("website");

  // Steps configuration for Company registration
  const companySteps = useMemo(
    () => [
      {
        id: 1,
        title: t("registration.steppers.accountSetup"),
        path: "account-setup",
      },
      {
        id: 2,
        title: t("registration.steppers.companyInfo"),
        path: "company-information",
      },
      {
        id: 3,
        title: t("registration.steppers.documentUpload"),
        path: "document-upload",
      },
      {
        id: 4,
        title: t("registration.steppers.membership"),
        path: "membership",
      },
      {
        id: 5,
        title: t("registration.steppers.reviewAndPay"),
        path: "review-and-pay",
      },
    ],
    [t]
  );

  // Steps configuration for Individual/Family Business registration (no document upload)
  const individualSteps = useMemo(
    () => [
      {
        id: 1,
        title: t("registration.steppers.accountSetup"),
        path: "account-setup",
      },
      {
        id: 2,
        title: t("registration.steppers.businessInfo"),
        path: "individual-family-business",
      },
      {
        id: 3,
        title: t("registration.steppers.membership"),
        path: "membership",
      },
      {
        id: 4,
        title: t("registration.steppers.reviewAndPay"),
        path: "review-and-pay",
      },
    ],
    [t]
  );

  // Determine which steps to use based on business type
  // If businessType is "company", use company steps; otherwise use individual steps
  const steps = useMemo(() => {
    if (accountSetup?.businessType === "company") {
      return companySteps;
    }
    // For any non-company type (individual/family business, etc.)
    return individualSteps;
  }, [accountSetup?.businessType, companySteps, individualSteps]);

  // Determine current step from URL
  const currentStep = useMemo(() => {
    const currentPath = location.pathname.split("/").pop();
    const step = steps.find((s) => s.path === currentPath);
    return step ? step.id : 1;
  }, [location.pathname, steps]);

  const activeStepIndex = useMemo(() => {
    return steps.findIndex((s) => s.id === currentStep);
  }, [steps, currentStep]);

  const handleNext = () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      navigate(`/register/${nextStep.path}`);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep);
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1];
      navigate(`/register/${prevStep.path}`);
    }
  };

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) {
      const targetStep = steps.find((s) => s.id === stepId);
      if (targetStep) {
        navigate(`/register/${targetStep.path}`);
      }
    }
  };

  return (
    <DocumentUploadProvider>
      <div className="min-h-screen bg-gray-50 py-4 px-4 md:py-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary">
              {t("registration.title")}
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              {accountSetup?.businessType === "company"
                ? t("registration.subtitleCompany")
                : t("registration.subtitleIndividual")}
            </p>
          </div>

          {/* Mobile Stepper */}
          <div className="md:hidden mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-bold text-secondary">
                  {steps.find((s) => s.id === currentStep)?.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {`Step ${currentStep} of ${steps.length}`}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-md">
                {currentStep}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <motion.div
                className="bg-primary h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${((activeStepIndex + 1) / steps.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Desktop Stepper */}
          <div className="hidden md:block mb-12">
            {/* Grid container for equal columns */}
            <div
              className="grid relative"
              style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
            >
              {/* Progress Line Background - positioned at center of circles */}
              <div
                className="absolute h-1 bg-gray-200 z-0"
                style={{
                  top: "22px",
                  left: `calc(100% / ${steps.length} / 2)`,
                  right: `calc(100% / ${steps.length} / 2)`,
                }}
              />

              {/* Progress Line Active */}
              <motion.div
                className="absolute h-1 bg-primary z-0 origin-left"
                style={{
                  top: "22px",
                  left: `calc(100% / ${steps.length} / 2)`,
                  right: `calc(100% / ${steps.length} / 2)`,
                }}
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: activeStepIndex / (steps.length - 1),
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />

              {/* Steps */}
              {steps.map((step) => {
                const isCompleted = step.id < currentStep;
                const isActive = step.id === currentStep;
                const isClickable = step.id <= currentStep;

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center relative z-10"
                    onClick={() => handleStepClick(step.id)}
                    style={{ cursor: isClickable ? "pointer" : "default" }}
                  >
                    {/* Step Circle */}
                    <motion.div
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        font-semibold text-lg border-4 transition-colors duration-300
                        ${
                          isCompleted
                            ? "bg-primary border-primary text-white"
                            : isActive
                            ? "bg-white border-primary text-primary"
                            : "bg-white border-gray-300 text-gray-400"
                        }
                      `}
                      initial={false}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {isCompleted ? (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                      ) : (
                        step.id
                      )}
                    </motion.div>

                    {/* Step Title */}
                    <motion.span
                      className={`
                        mt-3 text-sm font-medium text-center
                        ${
                          isCompleted || isActive
                            ? "text-secondary"
                            : "text-gray-400"
                        }
                      `}
                      initial={false}
                      animate={{
                        fontWeight: isActive ? 600 : 500,
                      }}
                    >
                      {step.title}
                    </motion.span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 min-h-[400px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Outlet
                  context={{ onNext: handleNext, onPrevious: handlePrevious }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step Indicator Text */}
          <p className="text-center text-gray-500 mt-4">
            {/* {t('registration.stepIndicator', { current: currentStep, total: steps.length })} */}
          </p>
        </div>
      </div>
    </DocumentUploadProvider>
  );
}

export default RegistrationStepper;
