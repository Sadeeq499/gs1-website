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
