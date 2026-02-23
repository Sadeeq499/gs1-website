import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import { FiX, FiDownload, FiCheck } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF worker
// Using the mjs worker as found in node_modules
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const TermsModal = ({ isOpen, onClose, onAccept, pdfUrl = "/terms.pdf" }) => {
  const { t, i18n } = useTranslation("website");
  const isRtl = i18n.dir() === "rtl";
  const [numPages, setNumPages] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width for responsive PDF resizing
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Calculate page width based on container
  // Mobile: full width minus padding, Desktop: manageable width
  const pageWidth = windowWidth < 768 ? windowWidth - 64 : 600;

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
              dir={isRtl ? "rtl" : "ltr"}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 bg-white">
                <div>
                  <h3 className="text-xl font-bold text-secondary">
                    {t(
                      "registration.reviewAndPay.terms.title",
                      "Terms & Conditions"
                    )}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {t(
                      "registration.reviewAndPay.terms.subtitle",
                      "Please review the terms and conditions below"
                    )}
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
              <div className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8 flex flex-col items-center">
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="flex items-center justify-center h-40">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  }
                  error={
                    <div className="text-red-500 text-center p-4">
                      {t(
                        "registration.reviewAndPay.terms.error",
                        "Failed to load PDF document."
                      )}
                    </div>
                  }
                  className="flex flex-col gap-6"
                >
                  {numPages &&
                    Array.from(new Array(numPages), (el, index) => (
                      <div
                        key={`page_${index + 1}`}
                        className="shadow-lg rounded-lg overflow-hidden"
                      >
                        <Page
                          pageNumber={index + 1}
                          width={pageWidth}
                          renderTextLayer={true}
                          renderAnnotationLayer={true}
                          className="bg-white"
                        />
                      </div>
                    ))}
                </Document>
              </div>

              {/* Footer */}
              <div className="p-4 md:p-6 border-t border-gray-100 bg-white flex flex-col sm:flex-row items-center justify-end gap-3 md:gap-4">
                {/* <div className="w-full sm:w-auto flex justify-center sm:justify-start gap-3 order-2 sm:order-1">
                  <a
                    href={pdfUrl}
                    download="GS1_Saudi_Arabia_Terms_Conditions.pdf"
                    className="flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors text-sm px-2"
                  >
                    <FiDownload className="w-4 h-4" />
                    {t(
                      "registration.reviewAndPay.terms.downloadPdf",
                      "Download PDF"
                    )}
                  </a>
                </div> */}

                <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
                  <button
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    {t("registration.common.cancel", "Cancel")}
                  </button>
                  <button
                    onClick={() => {
                      if (onAccept) onAccept();
                      onClose();
                    }}
                    className="flex-1 sm:flex-none px-8 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                  >
                    <FiCheck className="w-5 h-5" />
                    {t("registration.common.accept", "Accept")}
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
