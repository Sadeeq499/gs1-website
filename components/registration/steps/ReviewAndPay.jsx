"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiFileText,
  FiCreditCard,
  FiAlertCircle,
  FiArrowLeft,
} from "react-icons/fi";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { BsBank2 } from "react-icons/bs";
import { useRegistrationStore, selectMembership } from "@/stores/registrationStore";
import PayButton from "../shared/PayButton";
import TermsModal from "../shared/TermsModal";

function ReviewAndPay({ onPrevious, documentFiles }) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const membership = useRegistrationStore(selectMembership);

  // Calculate totals
  const isMedical = membership?.membershipCategory?.name === "medical";
  const subscriptionItems = [];

  if (membership?.gtinBarcodePackage) {
    const pkg = membership.gtinBarcodePackage;
    const price = isMedical
      ? pkg.med_yearly_subscription_fee || 0
      : pkg.gtin_yearly_subscription_fee || 0;

    subscriptionItems.push({
      id: pkg.id,
      product: pkg.member_category_description,
      description: pkg.member_category_description,
      yearlyFee: price,
      price: price,
    });

    if (pkg.member_registration_fee > 0) {
      subscriptionItems.push({
        id: "reg_fee",
        product: "Registration Fee",
        description: "One-time registration fee",
        yearlyFee: 0,
        price: pkg.member_registration_fee,
      });
    }
  }

  if (Array.isArray(membership?.selectedServices)) {
    membership.selectedServices.forEach((service) => {
      const price = isMedical
        ? service.med_subscription_fee || 0
        : service.product_subscription_fee || 0;

      subscriptionItems.push({
        id: service.id,
        product: service.product_name,
        description: service.product_name,
        yearlyFee: price,
        price: price,
      });
    });
  }

  const totalAmount = subscriptionItems.reduce((sum, item) => sum + item.price, 0);
  const vatAmount = totalAmount * 0.15;
  const totalWithVat = totalAmount + vatAmount;

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 mb-6 md:mb-8">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <HiOutlineClipboardCheck className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-secondary">
            Review & Pay
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Review your subscription and complete payment
          </p>
        </div>
      </div>

      {/* Subscription Summary Table */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
          <FiFileText className="w-5 h-5 text-primary" />
          Subscription Summary
        </h3>

        <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden md:block bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-secondary">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-right">Yearly Fee</div>
              <div className="col-span-3 text-right">Price</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {subscriptionItems.map((item) => (
              <div key={item.id} className="px-4 md:px-6 py-4">
                {/* Desktop */}
                <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6">
                    <p className="font-medium text-secondary">{item.product}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="col-span-3 text-right text-gray-600">
                    {item.yearlyFee > 0 ? `${item.yearlyFee.toLocaleString()} SAR` : "-"}
                  </div>
                  <div className="col-span-3 text-right font-medium text-secondary">
                    {item.price.toLocaleString()} SAR
                  </div>
                </div>
                {/* Mobile */}
                <div className="md:hidden flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-secondary text-sm">{item.product}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                    <div className="font-bold text-secondary text-sm">
                      {item.price.toLocaleString()} SAR
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="bg-gray-50 border-t-2 border-gray-200">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center md:grid md:grid-cols-12 md:gap-4">
                <div className="md:col-span-9 md:text-right text-sm md:text-base font-medium text-secondary">
                  VAT (15%)
                </div>
                <div className="md:col-span-3 md:text-right text-base md:text-lg font-bold text-secondary">
                  {vatAmount.toLocaleString()} SAR
                </div>
              </div>
            </div>
            <div className="px-4 md:px-6 py-4">
              <div className="flex justify-between items-center md:grid md:grid-cols-12 md:gap-4">
                <div className="md:col-span-9 md:text-right text-base md:text-lg font-semibold text-secondary">
                  Total
                </div>
                <div className="md:col-span-3 md:text-right text-lg md:text-xl font-bold text-primary">
                  {totalWithVat.toLocaleString()} SAR
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Terms & Conditions */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
          <FiFileText className="w-5 h-5 text-primary" />
          Terms & Conditions
        </h3>

        <div
          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
            acceptedTerms
              ? "border-green-400 bg-green-50"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => {
                  if (e.target.checked) {
                    setIsTermsModalOpen(true);
                  } else {
                    setAcceptedTerms(false);
                  }
                }}
                className="sr-only"
              />
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  acceptedTerms
                    ? "bg-green-500 border-green-500"
                    : "bg-white border-gray-300 hover:border-primary"
                }`}
              >
                {acceptedTerms && <FiCheck className="w-4 h-4 text-white" />}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs md:text-sm text-secondary">
                I have read and agree to the{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsTermsModalOpen(true);
                  }}
                  className="text-primary font-semibold hover:underline bg-transparent border-0 p-0 inline"
                >
                  Terms & Conditions
                </button>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className="text-primary font-semibold hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </label>
        </div>
      </motion.div>

      {/* Terms Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        onAccept={() => setAcceptedTerms(true)}
        pdfUrl="/terms.pdf"
      />

      {/* Payment Method */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
          <FiCreditCard className="w-5 h-5 text-primary" />
          Payment Method
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {/* Bank Transfer */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedPaymentMethod("bank_transfer")}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              selectedPaymentMethod === "bank_transfer"
                ? "border-primary bg-primary/5"
                : "border-gray-200 bg-white hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 ${
                  selectedPaymentMethod === "bank_transfer"
                    ? "bg-primary/20"
                    : "bg-gray-100"
                }`}
              >
                <BsBank2
                  className={`w-6 h-6 ${
                    selectedPaymentMethod === "bank_transfer"
                      ? "text-primary"
                      : "text-gray-400"
                  }`}
                />
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${
                  selectedPaymentMethod === "bank_transfer" ? "text-primary" : "text-secondary"
                }`}>
                  Bank Transfer
                </p>
                <p className="text-sm text-gray-500">
                  Pay via bank transfer to our account
                </p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPaymentMethod === "bank_transfer"
                    ? "border-primary bg-primary"
                    : "border-gray-300"
                }`}
              >
                {selectedPaymentMethod === "bank_transfer" && (
                  <FiCheck className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
          </motion.div>

          {/* Credit Card (Coming Soon) */}
          <div className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <FiCreditCard className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-400">Credit Card</p>
                <p className="text-sm text-gray-400">Pay online with credit/debit card</p>
              </div>
              <span className="px-2 py-1 bg-gray-200 text-gray-500 text-xs font-medium rounded">
                Coming Soon
              </span>
            </div>
          </div>
        </div>

        {/* Bank Transfer Details */}
        {selectedPaymentMethod === "bank_transfer" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-4 bg-blue-50 rounded-xl border border-blue-100"
          >
            <p className="text-sm font-semibold text-blue-800 mb-3">
              Bank Transfer Details
            </p>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex justify-between">
                <span>Bank Name</span>
                <span className="font-medium">Al Rajhi Bank</span>
              </div>
              <div className="flex justify-between">
                <span>Account Name</span>
                <span className="font-medium">GS1 Saudi Arabia</span>
              </div>
              <div className="flex justify-between">
                <span>IBAN</span>
                <span className="font-medium font-mono">SA0380000000608010167519</span>
              </div>
              <div className="flex justify-between">
                <span>Reference</span>
                <span className="font-medium text-primary">Your Email Address</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Validation Warnings */}
      {(!acceptedTerms || !selectedPaymentMethod) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200"
        >
          <FiAlertCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <div className="text-sm text-amber-700">
            <p className="font-medium">Before you can submit:</p>
            <ul className="list-disc list-inside mt-1 space-y-1 pl-2">
              {!acceptedTerms && <li>Accept the Terms & Conditions</li>}
              {!selectedPaymentMethod && <li>Select a payment method</li>}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-gray-200 flex flex-col-reverse md:flex-row items-center justify-between gap-4 w-full">
        <motion.button
          type="button"
          onClick={() => onPrevious?.()}
          className="w-full md:w-auto px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2
                     bg-white border-2 border-secondary text-secondary 
                     hover:bg-secondary hover:text-white transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiArrowLeft className="w-5 h-5" />
          Previous
        </motion.button>

        <div className="w-full md:flex-1 md:flex md:justify-end">
          <PayButton
            acceptedTerms={acceptedTerms}
            selectedPaymentMethod={selectedPaymentMethod}
            documentFiles={documentFiles}
          />
        </div>
      </div>
    </div>
  );
}

export default ReviewAndPay;
