"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck } from "react-icons/fi";

/**
 * Terms & Conditions modal.
 * Simplified version that doesn't depend on react-pdf (which needs extra setup).
 * Shows an iframe for the PDF or a simple text fallback.
 */
const TermsModal = ({ isOpen, onClose, onAccept, pdfUrl = "/terms.pdf" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col pointer-events-auto overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 bg-white">
                <div>
                  <h3 className="text-xl font-bold text-secondary">
                    Terms & Conditions
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Please review the terms and conditions below
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* PDF Viewer Content */}
              <div className="flex-1 overflow-hidden bg-gray-50 p-4 md:p-8">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full min-h-100 rounded-lg border border-gray-200"
                  title="Terms and Conditions"
                />
              </div>

              {/* Footer */}
              <div className="p-4 md:p-6 border-t border-gray-100 bg-white flex flex-col sm:flex-row items-center justify-end gap-3 md:gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (onAccept) onAccept();
                      onClose();
                    }}
                    className="flex-1 sm:flex-none px-8 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                  >
                    <FiCheck className="w-5 h-5" />
                    Accept
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;
