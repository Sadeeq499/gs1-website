// ============================================================
//  verify/data.js  –  Single source of truth for the Verify section
// ============================================================

// ── Tab definitions ──────────────────────────────────────────
export const VERIFY_TABS = [
  {
    id: "product",
    href: "/verify/product",
    label: "Verify Product",
    labelAr: "التحقق من منتج",
    icon: "/icons/verify/product.svg",
    searchable: true,
    placeholder: "Enter GTIN (e.g. 6280000000000)",
    description: "Search by GTIN barcode number",
  },
  {
    id: "location",
    href: "/verify/location",
    label: "Verify Location",
    labelAr: "التحقق من الموقع",
    icon: "/icons/verify/location.svg",
    searchable: true,
    placeholder: "Enter GLN (e.g. 6280000000000)",
    description: "Search by Global Location Number",
  },
  {
    id: "other",
    href: "/verify/other",
    label: "Verify other keys",
    labelAr: "مفاتيح أخرى",
    icon: "/icons/verify/other.svg",
    searchable: false,
    placeholder: "",
    description: "Search by other keys",
  },
  {
    id: "company",
    href: "/verify/company",
    label: "Find company",
    labelAr: "البحث عن شركة",
    icon: "/icons/verify/company.svg",
    searchable: true,
    placeholder: "Search by company",
    description: "Search by company",
  },
];

// ── API endpoints ─────────────────────────────────────────────
export const API = {
  product: (barcode) =>
    `https://gs1.org.sa/api/foreignGtin/getGtinProductDetails?barcode=${barcode}`,
  location: (gln) => `https://gs1.org.sa/api/location?gln=${gln}`,
};

// ── Hero copy ─────────────────────────────────────────────────
export const HERO = {
  title: "GS1 Verification Portal",
  subtitle:
    "Verify the authenticity of products, locations, and member organisations registered with GS1 Saudi Arabia.",
  badge: "Trusted by 10,000+ companies",
};

// ── Available GS1 keys (displayed in Other tab) ───────────────
export const AVAILABLE_KEYS = [
  {
    id: "gtin",
    name: "GTIN",
    description: "Global Trade Item Number",
    code: "GTIN-8/12/13/14",
    length: "8, 12, 13 or 14 digits",
    example: "628XXXXXXXXXX",
    status: "available",
    color: "green",
  },
  {
    id: "gln",
    name: "GLN",
    description: "Global Location Number",
    code: "GLN",
    length: "13 digits",
    example: "628XXXXXXXXXX",
    status: "available",
    color: "green",
  },
];

// ── Upcoming GS1 keys ─────────────────────────────────────────
export const UPCOMING_KEYS = [
  {
    id: "sscc",
    name: "SSCC",
    description: "Serial Shipping Container Code",
    code: "SSCC",
    length: "18 digits",
    example: "376123450000000001",
  },
  {
    id: "grai",
    name: "GRAI",
    description: "Global Returnable Asset Identifier",
    code: "GRAI",
    length: "14+ digits",
    example: "080123456789012345",
  },
  {
    id: "giai",
    name: "GIAI",
    description: "Global Individual Asset Identifier",
    code: "GIAI",
    length: "Variable",
    example: "0801234567890123456789",
  },
  {
    id: "gsrn",
    name: "GSRN",
    description: "Global Service Relation Number",
    code: "GSRN",
    length: "18 digits",
    example: "801234567890123456",
  },
  {
    id: "gdti",
    name: "GDTI",
    description: "Global Document Type Identifier",
    code: "GDTI",
    length: "13+ digits",
    example: "952123456789012345",
  },
  {
    id: "cpid",
    name: "CPID",
    description: "Component / Part Identifier",
    code: "CPID",
    length: "Variable",
    example: "80123456789012AB3C",
  },
];

// ── Upcoming platform features ────────────────────────────────
export const UPCOMING_FEATURES = [
  {
    id: "batch",
    title: "Batch Verification API",
    description: "Verify thousands of keys in a single request",
    color: "blue",
  },
  {
    id: "realtime",
    title: "Real-time WebSocket Updates",
    description: "Instant notifications when key status changes",
    color: "green",
  },
  {
    id: "security",
    title: "Enhanced Security",
    description: "Enterprise-grade encryption and access controls",
    color: "purple",
  },
];

// ── Enterprise capabilities copy ─────────────────────────────
export const ENTERPRISE = {
  title: "Need enterprise-scale verification?",
  body: "Process thousands of GS1 keys simultaneously with our REST API, analytics dashboard, and priority SLA.",
  cta: "Contact GS1 Saudi Arabia",
  ctaSecondary: "API Documentation",
};

// ── Members table column labels ───────────────────────────────
export const MEMBERS_COLUMNS = [
  { key: "company", label: "Company" },
  { key: "gln", label: "GLN" },
  { key: "status", label: "Status" },
  { key: "id", label: "ID" },
];

// ── Status badge config ───────────────────────────────────────
export const STATUS_CONFIG = {
  Active: {
    dot: "bg-green-500",
    text: "text-green-600 dark:text-green-400",
    label: "Active",
  },
  active: {
    dot: "bg-green-500",
    text: "text-green-600 dark:text-green-400",
    label: "Active",
  },
  Inactive: {
    dot: "bg-red-500",
    text: "text-red-500 dark:text-red-400",
    label: "Inactive",
  },
  inactive: {
    dot: "bg-yellow-500",
    text: "text-yellow-600 dark:text-yellow-400",
    label: "Inactive",
  },
  default: { dot: "bg-gray-400", text: "text-gray-500", label: "Unknown" },
};
