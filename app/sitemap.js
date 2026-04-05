import { BASE_URL } from "@/lib/seo";

const locales = ["en", "ar"];

// Service slugs
const servicesSlugs = [
  "global-trade-item-number",
  "global-location-number",
  "serial-shipping-container-code",
  "saudi-electricity-company",
  "tobacco-traceability",
  "verified-by-gs1",
  "traceability",
  "fixed-assets-management",
  "healthcare-management",
];

// Standards slugs
const standardsSlugs = ["identify", "capture", "share"];

// Industry slugs
const industriesSlugs = [
  "healthcare-pharma",
  "retail-fmcg",
  "logistics-supply-chain",
  "food-safety-agriculture",
  "e-commerce-digital",
  "construction-assets",
  "apparel-fashion",
  "government-public-sector",
  "technical-industries",
  "humanitarian-logistics",
];

// Solution slugs
const solutionsSlugs = [
  "2d-barcodes",
  "digital-link",
  "zatca-compliance",
  "traceability",
];

// Static pages common to all locales
const staticRoutes = [
  "",
  "/contact",
  "/events",
  "/insights",
  "/training",
  "/verified-by-gs1",
  "/services",
  "/standards",
  "/industries",
  "/about/who-we-are",
  "/about/mission-vision",
  "/about/strategy",
  "/about/partners",
];

function buildEntry(path, priority = 0.7, changeFrequency = "weekly") {
  const alternates = {};
  for (const locale of locales) {
    alternates[locale] = `${BASE_URL}/${locale}${path}`;
  }
  return {
    url: `${BASE_URL}/en${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        ...alternates,
        "x-default": `${BASE_URL}/en${path}`,
      },
    },
  };
}

export default function sitemap() {
  const entries = [];

  // Static routes
  for (const route of staticRoutes) {
    const isHome = route === "";
    entries.push(
      buildEntry(route, isHome ? 1.0 : 0.8, isHome ? "daily" : "weekly")
    );
  }

  // Services detail pages
  for (const slug of servicesSlugs) {
    entries.push(buildEntry(`/services/${slug}`, 0.7, "monthly"));
  }

  // Standards detail pages
  for (const slug of standardsSlugs) {
    entries.push(buildEntry(`/standards/${slug}`, 0.7, "monthly"));
  }

  // Industries detail pages
  for (const slug of industriesSlugs) {
    entries.push(buildEntry(`/industries/${slug}`, 0.7, "monthly"));
  }

  // Solutions detail pages
  for (const slug of solutionsSlugs) {
    entries.push(buildEntry(`/solutions/${slug}`, 0.7, "monthly"));
  }

  return entries;
}
