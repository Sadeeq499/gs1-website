"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRegistrationStore, selectAccountSetup, selectCurrentStep } from "@/stores/registrationStore";

import AccountSetup from "./steps/AccountSetup";
import CompanyInfo from "./steps/CompanyInfo";
import IndividualFamilyBusiness from "./steps/IndividualFamilyBusiness";
import DocumentUpload from "./steps/DocumentUpload";
import Membership from "./steps/Membership";
import ReviewAndPay from "./steps/ReviewAndPay";

const companySteps = [
  { id: 1, title: "Account Setup", component: "accountSetup" },
  { id: 2, title: "Company Information", component: "companyInfo" },
  { id: 3, title: "Document Upload", component: "documentUpload" },
  { id: 4, title: "Membership", component: "membership" },
  { id: 5, title: "Review & Pay", component: "reviewAndPay" },
];

const individualSteps = [
  { id: 1, title: "Account Setup", component: "accountSetup" },
  { id: 2, title: "Business Information", component: "individualFamilyBusiness" },
  { id: 3, title: "Membership", component: "membership" },
  { id: 4, title: "Review & Pay", component: "reviewAndPay" },
];

function RegistrationStepper() {
  const accountSetup = useRegistrationStore(selectAccountSetup);
  const currentStep = useRegistrationStore(selectCurrentStep);
  const setCurrentStep = useRegistrationStore((s) => s.setCurrentStep);

  // Document files cannot be persisted — keep in component state
  const [documentFiles, setDocumentFiles] = useState({});

  // Direction for slide animation
  const [direction, setDirection] = useState(1);

  const steps = useMemo(() => {
    return accountSetup?.businessType === "company" ? companySteps : individualSteps;
  }, [accountSetup?.businessType]);

  const activeStepIndex = useMemo(() => {
    return steps.findIndex((s) => s.id === currentStep);
  }, [steps, currentStep]);

  const safeIndex = activeStepIndex === -1 ? 0 : activeStepIndex;

  const handleNext = useCallback(() => {
    if (safeIndex < steps.length - 1) {
      setDirection(1);
      setCurrentStep(steps[safeIndex + 1].id);
    }
  }, [safeIndex, steps, setCurrentStep]);

  const handlePrevious = useCallback(() => {
    if (safeIndex > 0) {
      setDirection(-1);
      setCurrentStep(steps[safeIndex - 1].id);
    }
  }, [safeIndex, steps, setCurrentStep]);

  const handleStepClick = useCallback(
    (stepId) => {
      if (stepId < currentStep) {
        setDirection(stepId < currentStep ? -1 : 1);
        setCurrentStep(stepId);
      }
    },
    [currentStep, setCurrentStep]
  );

  const renderStep = () => {
    const step = steps[safeIndex];
    if (!step) return null;

    switch (step.component) {
      case "accountSetup":
        return <AccountSetup onNext={handleNext} />;
      case "companyInfo":
        return <CompanyInfo onNext={handleNext} onPrevious={handlePrevious} />;
      case "individualFamilyBusiness":
        return <IndividualFamilyBusiness onNext={handleNext} onPrevious={handlePrevious} />;
      case "documentUpload":
        return (
          <DocumentUpload
            onNext={handleNext}
            onPrevious={handlePrevious}
            documentFiles={documentFiles}
            setDocumentFiles={setDocumentFiles}
          />
        );
      case "membership":
        return <Membership onNext={handleNext} onPrevious={handlePrevious} />;
      case "reviewAndPay":
        return <ReviewAndPay onPrevious={handlePrevious} documentFiles={documentFiles} />;
      default:
        return null;
    }
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 md:py-8">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-secondary">
            Registration
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            {accountSetup?.businessType === "company"
              ? "Register your company with GS1 Saudi Arabia"
              : "Register your business with GS1 Saudi Arabia"}
          </p>
        </div>

        {/* ── Mobile Stepper ── */}
        <div className="md:hidden mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-secondary">
                {steps[safeIndex]?.title}
              </h2>
              <p className="text-sm text-gray-500">
                Step {safeIndex + 1} of {steps.length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-md">
              {safeIndex + 1}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <motion.div
              className="bg-primary h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((safeIndex + 1) / steps.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* ── Desktop Stepper ── */}
        <div className="hidden md:block mb-12">
          <div
            className="grid relative"
            style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
          >
            {/* Background Line */}
            <div
              className="absolute h-1 bg-gray-200 z-0"
              style={{
                top: "22px",
                left: `calc(100% / ${steps.length} / 2)`,
                right: `calc(100% / ${steps.length} / 2)`,
              }}
            />

            {/* Active Line */}
            <motion.div
              className="absolute h-1 bg-primary z-0 origin-left"
              style={{
                top: "22px",
                left: `calc(100% / ${steps.length} / 2)`,
                right: `calc(100% / ${steps.length} / 2)`,
              }}
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: safeIndex / (steps.length - 1),
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            {/* Step Circles */}
            {steps.map((step, idx) => {
              const isCompleted = idx < safeIndex;
              const isActive = idx === safeIndex;
              const isClickable = idx < safeIndex;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center relative z-10"
                  onClick={() => handleStepClick(step.id)}
                  style={{ cursor: isClickable ? "pointer" : "default" }}
                >
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
                    animate={{ scale: isActive ? 1.1 : 1 }}
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

                  <motion.span
                    className={`
                      mt-3 text-sm font-medium text-center
                      ${isCompleted || isActive ? "text-secondary" : "text-gray-400"}
                    `}
                    initial={false}
                    animate={{ fontWeight: isActive ? 600 : 500 }}
                  >
                    {step.title}
                  </motion.span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Step Content ── */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 min-h-100 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default RegistrationStepper;
