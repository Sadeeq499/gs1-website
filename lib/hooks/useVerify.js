// lib/hooks/useVerify.js
"use client";

import { useQuery } from "@tanstack/react-query";
import { API } from "@/components/verify/verify"; // API endpoint builders

// ── Product / GTIN ────────────────────────────────────────────
export function useProduct(barcode) {
  return useQuery({
    queryKey: ["product", barcode],
    queryFn: async () => {
      const res = await fetch(API.product(barcode));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    enabled: Boolean(barcode?.trim()),
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 min
  });
}

// ── Location / GLN ────────────────────────────────────────────
export function useLocation(gln) {
  return useQuery({
    queryKey: ["location", gln],
    queryFn: async () => {
      const res = await fetch(API.location(gln));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    enabled: Boolean(gln?.trim()),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
}

// ── Members ───────────────────────────────────────────────────
export function useMembers({ page = 1, pageSize = 10, search = "" } = {}) {
  return useQuery({
    queryKey: ["members", page, pageSize, search],
    queryFn: async () => {
      const res = await fetch(API.members(page, pageSize, search));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    staleTime: 1000 * 60 * 2,
    placeholderData: (prev) => prev, // keep previous data while loading next page
  });
}