"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "@/config/axiosInstance";

// ── Product / GTIN ────────────────────────────────────────────
export function useProductGs1Verified() {
  return useMutation({
    mutationFn: async (barcode) => {
      const { data } = await axiosInstance.post(
        "/v2/foreignGtin/product-details",
        {
          barcode,
        },
      );
      return data;
    },
  });
}

export function useGlnVerified(gln) {
  return useQuery({
    queryKey: ["gln-verified", gln],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/v2/website/gln-details?gln=${gln}`,
      );
      return data;
    },
    enabled: !!gln,
  });
}

// ── SSCC ───────────────────────────────────────────────────────
export function useSccVerified(sscc) {
  return useQuery({
    queryKey: ["sscc-verified", sscc],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/v2/website/sscc-details?sscc=${sscc}`,
      );
      return data;
    },
    enabled: !!sscc,
  });
}

// ── Company ───────────────────────────────────────────────────────
export function useCompanyVerified({ companyName, page = 1, limit = 10 } = {}) {
  return useQuery({
    queryKey: ["company-verified", companyName, page, limit],
    queryFn: async () => {
      const params = { page, limit };
      if (companyName) params.companyName = companyName;

      const { data } = await axiosInstance.get(
        `/v2/users/company-information`,
        { params },
      );
      return data;
    },
  });
}
