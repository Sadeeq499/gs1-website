"use client";

import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/config/axiosInstance";

/**
 * Hook to submit the Contact Us form.
 *
 * Usage:
 *   const { mutate, isPending, isSuccess, isError } = useContactUs();
 *   mutate({ name, email, company, phoneNumber, message });
 */
export function useContactUs() {
  return useMutation({
    mutationFn: async ({ name, email, company, phoneNumber, message }) => {
      const { data } = await axiosInstance.post("/v2/website/contactUs", {
        name,
        email,
        company,
        phoneNumber,
        message,
      });
      return data;
    },
  });
}