"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiUploadCloud,
  FiFile,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiFileText,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useRegistrationStore } from "@/stores/registrationStore";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FORMATS = ["image/jpeg", "image/png", "application/pdf"];
const ACCEPTED_EXTENSIONS = ".jpg, .jpeg, .png, .pdf";

/**
 * Document Upload step.
 *
 * File objects cannot be persisted in Zustand/sessionStorage,
 * so we keep them in a local ref map and only store metadata in the store.
 * The actual File refs are passed up via onFilesChange callback so
 * the PayButton can access them at submission time.
 */
function DocumentUpload({ onNext, onPrevious, documentFiles, setDocumentFiles }) {
  const addDocumentMeta = useRegistrationStore((s) => s.addDocumentMeta);
  const removeDocumentMeta = useRegistrationStore((s) => s.removeDocumentMeta);
  const storedDocuments = useRegistrationStore((s) => s.documents);
  const storedErrors = useRegistrationStore((s) => s.documentErrors);
  const setDocumentError = useRegistrationStore((s) => s.setDocumentError);
  const clearDocumentError = useRegistrationStore((s) => s.clearDocumentError);

  const documentTypes = [
    {
      id: "crDocument",
      title: "Commercial Registration (CR)",
      description: "Upload a clear copy of your CR document",
      required: true,
    },
    {
      id: "taxCertificate",
      title: "Tax Certificate",
      description: "Upload your VAT/Tax registration certificate",
      required: true,
    },
    {
      id: "ibanCertificate",
      title: "IBAN Certificate",
      description: "Upload your bank IBAN certificate",
      required: true,
    },
    {
      id: "nationalAddress",
      title: "National Address",
      description: "Upload your national address document",
      required: true,
    },
  ];

  const [dragOver, setDragOver] = useState({});
  const fileInputRefs = useRef({});

  const validateFile = (file) => {
    if (!file) return { valid: false, error: "No file selected" };
    if (!ACCEPTED_FORMATS.includes(file.type))
      return { valid: false, error: "Invalid format. Use JPG, PNG, or PDF." };
    if (file.size > MAX_FILE_SIZE)
      return { valid: false, error: "File size exceeds 2MB limit." };
    return { valid: true, error: null };
  };

  const handleFileSelect = (docId, file) => {
    const validation = validateFile(file);
    if (validation.valid) {
      // Store file ref for submission
      setDocumentFiles((prev) => ({ ...prev, [docId]: file }));
      // Store metadata in Zustand
      addDocumentMeta(docId, { name: file.name, size: file.size, type: file.type });
    } else {
      setDocumentError(docId, validation.error);
    }
  };

  const handleInputChange = (docId, e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(docId, file);
  };

  const handleDrop = (docId, e) => {
    e.preventDefault();
    setDragOver((prev) => ({ ...prev, [docId]: false }));
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(docId, file);
  };

  const handleDragOver = (docId, e) => {
    e.preventDefault();
    setDragOver((prev) => ({ ...prev, [docId]: true }));
  };

  const handleDragLeave = (docId) => {
    setDragOver((prev) => ({ ...prev, [docId]: false }));
  };

  const handleRemoveFile = (docId) => {
    setDocumentFiles((prev) => {
      const { [docId]: _, ...rest } = prev;
      return rest;
    });
    removeDocumentMeta(docId);
    clearDocumentError(docId);
    if (fileInputRefs.current[docId]) {
      fileInputRefs.current[docId].value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (type) => {
    if (type === "application/pdf") {
      return <FiFileText className="w-8 h-8 text-red-500" />;
    }
    return <FiFile className="w-8 h-8 text-primary" />;
  };

  const uploadedCount = Object.keys(documentFiles).length;
  const allDocumentsUploaded = uploadedCount === documentTypes.length;

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 mb-6 md:mb-8">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <FiUploadCloud className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-secondary">
            Document Upload
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Upload the required documents for verification
          </p>
        </div>
      </div>

      {/* Document Upload Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {documentTypes.map((doc, index) => {
          const uploadedFile = storedDocuments[doc.id];
          const error = storedErrors?.[doc.id];
          const isDragOver = dragOver[doc.id];

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-secondary">
                {doc.title}{" "}
                {doc.required && <span className="text-red-500">*</span>}
              </label>
              <p className="text-xs text-gray-500 mb-2">{doc.description}</p>

              <div
                onDrop={(e) => handleDrop(doc.id, e)}
                onDragOver={(e) => handleDragOver(doc.id, e)}
                onDragLeave={() => handleDragLeave(doc.id)}
                className={`
                  relative border-2 border-dashed rounded-xl p-6 transition-all duration-200
                  ${
                    uploadedFile
                      ? "border-green-400 bg-green-50"
                      : error
                      ? "border-red-300 bg-red-50"
                      : isDragOver
                      ? "border-primary bg-primary/5"
                      : "border-gray-300 bg-gray-50 hover:border-primary hover:bg-primary/5"
                  }
                `}
              >
                <input
                  ref={(el) => (fileInputRefs.current[doc.id] = el)}
                  type="file"
                  accept={ACCEPTED_EXTENSIONS}
                  onChange={(e) => handleInputChange(doc.id, e)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                {uploadedFile ? (
                  <div className="flex items-center gap-4">
                    <div className="shrink-0">
                      {getFileIcon(uploadedFile.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-secondary truncate">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(uploadedFile.size)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <FiCheck className="w-4 h-4 text-white" />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile(doc.id);
                        }}
                        className="relative z-20 w-8 h-8 rounded-full bg-gray-200 hover:bg-red-100 
                                   flex items-center justify-center transition-colors"
                      >
                        <FiX className="w-4 h-4 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center
                                  ${isDragOver ? "bg-primary/20" : "bg-gray-200"}`}
                    >
                      <FiUploadCloud
                        className={`w-6 h-6 ${isDragOver ? "text-primary" : "text-gray-400"}`}
                      />
                    </div>
                    <p className="text-sm font-medium text-secondary">
                      {isDragOver ? "Drop file here" : "Click or drag file to upload"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      JPG, PNG, or PDF (max 2MB)
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 flex items-center gap-1"
                >
                  <FiAlertCircle className="w-4 h-4" />
                  {error}
                </motion.p>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Info Note */}
      <motion.div
        className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <HiOutlineDocumentText className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
        <div className="text-sm text-blue-700">
          <p className="font-medium mb-1">Document Requirements</p>
          <ul className="list-disc list-inside space-y-1 text-blue-600 pl-4">
            <li>Documents must be clearly readable</li>
            <li>Documents must be valid and not expired</li>
            <li>Accepted formats: JPG, PNG, PDF (max 2MB each)</li>
          </ul>
        </div>
      </motion.div>

      {/* Upload Progress Summary */}
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-secondary">Documents Uploaded:</span>
          <span
            className={`text-sm font-bold ${
              allDocumentsUploaded ? "text-green-600" : "text-primary"
            }`}
          >
            {uploadedCount} / {documentTypes.length}
          </span>
        </div>
        {allDocumentsUploaded && (
          <div className="flex items-center gap-2 text-green-600">
            <FiCheck className="w-5 h-5" />
            <span className="text-sm font-medium">All uploaded!</span>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex flex-col-reverse md:flex-row gap-3 md:gap-0 justify-between">
        <motion.button
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

        <motion.button
          onClick={() => onNext?.()}
          disabled={!allDocumentsUploaded}
          className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2
                     transition-all duration-200
                     ${
                       allDocumentsUploaded
                         ? "bg-primary text-white hover:opacity-90 hover:shadow-lg"
                         : "bg-gray-200 text-gray-400 cursor-not-allowed"
                     }`}
          whileHover={allDocumentsUploaded ? { scale: 1.02 } : {}}
          whileTap={allDocumentsUploaded ? { scale: 0.98 } : {}}
        >
          Next Step
          <FiArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}

export default DocumentUpload;
