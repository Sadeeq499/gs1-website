import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Add new namespace filenames here — they auto-load and merge under their key.
// e.g. adding "services" will load locales/{locale}/services.json → messages.services.*
const namespaces = [
  "home",
  "industries",
  "services",
  "standards",
  "about",
  "contact",
  "training",
  "events",
  "insights",
  "solutions",
  "verify",
  "terms",
];

async function loadMessages(locale) {
  const [common, ...namespacedModules] = await Promise.all([
    import(`../locales/${locale}/common.json`),
    ...namespaces.map((ns) => import(`../locales/${locale}/${ns}.json`)),
  ]);

  return {
    ...common.default, // spread common keys at root (header, footer, etc.)
    ...Object.fromEntries(
      namespaces.map((ns, i) => [ns, namespacedModules[i].default]),
    ),
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
