/**
 * Registration API — TanStack Query (replaces RTK Query).
 *
 * Each RTK Query endpoint is mapped to either a `useQuery` or `useMutation`
 * hook. Native fetch is used as the HTTP client for consistent error handling.
 *
 * Replace `API_BASE_URL` with your actual backend URL (or use an env var).
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3091/api";

// ─── Generic fetch helper ───────────────────────────────────

async function apiFetch(endpoint, options = {}) {
  const { body, method = "GET", isFormData = false, params } = options;

  const headers = {};
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const config = {
    method,
    headers,
    ...(body ? { body: isFormData ? body : JSON.stringify(body) } : {}),
  };

  // Build URL with optional query params
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value);
      }
    });
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, config);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(
      errorData?.error || errorData?.message || "API Error"
    );
    error.data = errorData;
    error.status = res.status;
    throw error;
  }

  return res.json();
}

// ─── API Functions ──────────────────────────────────────────

export const registrationApi = {
  // Final registration submit
  register: (payload, isFormData = false) =>
    apiFetch("/v2/users", {
      method: "POST",
      body: payload,
      isFormData,
    }),

  // Email verification — send OTP
  verifyEmail: (data) =>
    apiFetch("/users/sendEmailVerificationOtp", { method: "POST", body: data }),

  // OTP code verification
  verifyOtpCode: (data) =>
    apiFetch("/users/verifyEmailVerificationOtp", {
      method: "POST",
      body: data,
    }),

  // Verify unified national number (KSA companies)
  getInfoBasedOnUnifiedNumber: ({ unifiedNumber, businessType }) =>
    apiFetch("/membership/GetMemberShipInfo/", {
      params: { number: unifiedNumber, business_type: businessType },
    }),

  // Address lookups
  getAllCountries: () => apiFetch("/address/getAllCountries"),
  getAllCities: () => apiFetch("/address/getAllCities"),
  getAllStates: () => apiFetch("/address/getAllStates"),

  // Get all industries
  getAllIndustries: () => apiFetch("/productTypes"),

  // Membership categories
  getMembershipCategories: () => apiFetch("/productCategories"),

  // Barcode packages
  getBarcodePackages: () => apiFetch("/gtinProducts"),

  // Other services
  getOtherServices: () => apiFetch("/otherProducts"),

  // Location lookup by zip code
  getLocationBasedOnZipCode: ({ zipCode, countryCode }) =>
    apiFetch("/zipcode/location/", {
      params: { zipcode: zipCode, countryCode },
    }),

  // Update initial password
  updateInitialPassword: (data) =>
    apiFetch("/users/updatePassword", { method: "PUT", body: data }),
};
