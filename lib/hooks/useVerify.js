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
