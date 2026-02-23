"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Registration Store (Zustand) - replaces Redux registrationSlice
 *
 * Persists all registration form data to sessionStorage so the user
 * can navigate between steps without losing progress.
 * State is cleared on successful submission or manual reset.
 */

const initialState = {
  // Step 1 – Account Setup
  accountSetup: null,
  // Step 2 – Company Info / Individual-Family Business Info
  companyInfo: null,
  // Step 3 – Document Upload (metadata only; actual File objects stored separately)
  documents: {},
  documentErrors: {},
  // Step 4 – Membership
  membership: null,
  // Current step index for stepper UI
  currentStep: 0,
};

export const useRegistrationStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // ─── Account Setup ───────────────────────────────────────
      setAccountSetup: (data) => set({ accountSetup: data }),

      // ─── Company / Business Info ─────────────────────────────
      setCompanyInfo: (data) => set({ companyInfo: data }),
      clearCompanyInfo: () => set({ companyInfo: null }),

      // ─── Document Upload ─────────────────────────────────────
      // Note: File objects cannot be serialised to JSON. For persistence
      // we store file metadata only; the actual File ref is kept in a
      // non-persisted transient map (see useDocumentFiles hook below).
      addDocumentMeta: (docId, meta) =>
        set((state) => ({
          documents: { ...state.documents, [docId]: meta },
          documentErrors: { ...state.documentErrors, [docId]: null },
        })),
      removeDocumentMeta: (docId) =>
        set((state) => {
          const { [docId]: _, ...rest } = state.documents;
          return { documents: rest };
        }),
      setDocumentError: (docId, error) =>
        set((state) => ({
          documentErrors: { ...state.documentErrors, [docId]: error },
        })),
      clearDocumentError: (docId) =>
        set((state) => ({
          documentErrors: { ...state.documentErrors, [docId]: null },
        })),
      getDocumentCount: () => Object.keys(get().documents).length,

      // ─── Membership ──────────────────────────────────────────
      setMembership: (data) => set({ membership: data }),
      clearMembership: () => set({ membership: null }),

      // ─── Navigation ──────────────────────────────────────────
      setCurrentStep: (step) => set({ currentStep: step }),

      // ─── Full Reset ──────────────────────────────────────────
      resetRegistration: () => set({ ...initialState }),
    }),
    {
      name: "gs1-registration", // sessionStorage key
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? sessionStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      // Only persist serialisable data
      partialize: (state) => ({
        accountSetup: state.accountSetup,
        companyInfo: state.companyInfo,
        membership: state.membership,
        currentStep: state.currentStep,
        // documents meta is small JSON, safe to persist
        documents: state.documents,
      }),
    }
  )
);

// ─── Selectors (for cleaner component access) ──────────────
export const selectAccountSetup = (state) => state.accountSetup;
export const selectCompanyInfo = (state) => state.companyInfo;
export const selectMembership = (state) => state.membership;
export const selectDocuments = (state) => state.documents;
export const selectDocumentErrors = (state) => state.documentErrors;
export const selectCurrentStep = (state) => state.currentStep;
