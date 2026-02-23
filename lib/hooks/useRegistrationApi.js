"use client";

/**
 * TanStack Query hooks for the Registration flow.
 *
 * Replaces all RTK Query hooks (useVerifyEmailMutation, useGetMembershipCategoriesQuery, etc.)
 * with standard TanStack Query `useQuery` / `useMutation` equivalents.
 */

import { useQuery, useMutation } from "@tanstack/react-query";
import { registrationApi } from "@/lib/api/registrationApi";

// ─── Query Keys (for cache invalidation & deduplication) ───

export const registrationKeys = {
  all: ["registration"],
  industries: () => [...registrationKeys.all, "industries"],
  membershipCategories: () => [
    ...registrationKeys.all,
    "membership-categories",
  ],
  barcodePackages: () => [...registrationKeys.all, "barcode-packages"],
  otherServices: () => [...registrationKeys.all, "other-services"],
  countries: () => [...registrationKeys.all, "countries"],
  cities: () => [...registrationKeys.all, "cities"],
  states: () => [...registrationKeys.all, "states"],
  locationByZip: (zipCode, countryCode) => [
    ...registrationKeys.all,
    "location",
    zipCode,
    countryCode,
  ],
};

// ─── Queries ────────────────────────────────────────────────

/** Fetch all industries list */
export function useGetAllIndustriesQuery(options = {}) {
  return useQuery({
    queryKey: registrationKeys.industries(),
    queryFn: registrationApi.getAllIndustries,
    staleTime: 1000 * 60 * 30, // 30 min – fairly static data
    ...options,
  });
}

/** Fetch membership categories */
export function useGetMembershipCategoriesQuery(options = {}) {
  return useQuery({
    queryKey: registrationKeys.membershipCategories(),
    queryFn: registrationApi.getMembershipCategories,
    staleTime: 1000 * 60 * 30,
    ...options,
  });
}

/** Fetch barcode packages */
export function useGetBarcodePackagesQuery(options = {}) {
  return useQuery({
    queryKey: registrationKeys.barcodePackages(),
    queryFn: registrationApi.getBarcodePackages,
    staleTime: 1000 * 60 * 30,
    ...options,
  });
}

/** Fetch other (additional) services */
export function useGetOtherServicesQuery(options = {}) {
  return useQuery({
    queryKey: registrationKeys.otherServices(),
    queryFn: registrationApi.getOtherServices,
    staleTime: 1000 * 60 * 30,
    ...options,
  });
}

// ─── Mutations ──────────────────────────────────────────────

/** Send email verification OTP */
export function useVerifyEmailMutation(options = {}) {
  return useMutation({
    mutationFn: registrationApi.verifyEmail,
    ...options,
  });
}

/** Verify OTP code */
export function useVerifyOtpCodeMutation(options = {}) {
  return useMutation({
    mutationFn: registrationApi.verifyOtpCode,
    ...options,
  });
}

/** Verify unified national number */
export function useGetInfoBasedOnUnifiedNumberMutation(options = {}) {
  return useMutation({
    mutationFn: registrationApi.getInfoBasedOnUnifiedNumber,
    ...options,
  });
}

/** Final registration submission */
export function useRegisterMutation(options = {}) {
  return useMutation({
    mutationFn: ({ payload, isFormData }) =>
      registrationApi.register(payload, isFormData),
    ...options,
  });
}

// ─── Additional Queries ─────────────────────────────────────

/** Fetch all countries */
export function useGetAllCountriesQuery(options = {}) {
  return useQuery({
    queryKey: registrationKeys.countries(),
    queryFn: registrationApi.getAllCountries,
    staleTime: 1000 * 60 * 30,
    ...options,
  });
}

/** Fetch all cities */
export function useGetAllCitiesQuery(options = {}) {
  return useQuery({
    queryKey: registrationKeys.cities(),
    queryFn: registrationApi.getAllCities,
    staleTime: 1000 * 60 * 30,
    ...options,
  });
}

/** Fetch all states */
export function useGetAllStatesQuery(options = {}) {
  return useQuery({
    queryKey: registrationKeys.states(),
    queryFn: registrationApi.getAllStates,
    staleTime: 1000 * 60 * 30,
    ...options,
  });
}

/** Lazy location lookup by zip code (enabled manually) */
export function useLazyGetLocationBasedOnZipCodeQuery(
  { zipCode, countryCode } = {},
  options = {}
) {
  return useQuery({
    queryKey: registrationKeys.locationByZip(zipCode, countryCode),
    queryFn: () =>
      registrationApi.getLocationBasedOnZipCode({ zipCode, countryCode }),
    enabled: false, // lazy — call refetch() to trigger
    ...options,
  });
}

// ─── Additional Mutations ───────────────────────────────────

/** Update initial password */
export function useUpdateInitialPasswordMutation(options = {}) {
  return useMutation({
    mutationFn: registrationApi.updateInitialPassword,
    ...options,
  });
}
