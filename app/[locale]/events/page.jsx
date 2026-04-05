import { BASE_URL } from "@/lib/seo";
import { EventsHero } from "@/components/events/EventsHero";
import { EventsGrid } from "@/components/events/EventsGrid";
import { NewsletterSection } from "@/components/events/NewsletterSection";
import { EVENTS_DATA } from "@/components/events/events-data";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "events.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/events`,
      languages: {
        en: `${BASE_URL}/en/events`,
        ar: `${BASE_URL}/ar/events`,
        "x-default": `${BASE_URL}/en/events`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}/events`,
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      alternateLocale: locale === "ar" ? ["en_SA"] : ["ar_SA"],
    },
  };
}

export default async function EventsPage() {
  const t = await getTranslations("events");

  const localizedData = {
    ...EVENTS_DATA,
    hero: {
      ...EVENTS_DATA.hero,
      badge: t("hero.badge"),
      title: t("hero.title"),
      titleHighlight: t("hero.titleHighlight"),
      titleSuffix: t("hero.titleSuffix"),
      description: t("hero.description"),
      stats: EVENTS_DATA.hero.stats.map((stat, i) => ({
        ...stat,
        label: t(`hero.stats.${i}.label`),
        value: t(`hero.stats.${i}.value`),
      })),
    },
    filters: [
      t("filters.all"),
      t("filters.workshops"),
      t("filters.webinars"),
      t("filters.conferences"),
      t("filters.training"),
    ],
    register: t("register"),
    emptyState: {
      ...EVENTS_DATA.emptyState,
      title: t("emptyState.title"),
      description: t("emptyState.description"),
      clearBtn: t("emptyState.clearBtn"),
    },
    upcoming: EVENTS_DATA.upcoming.map((event, i) => ({
      ...event,
      category: t(`upcoming.${i}.category`),
      title: t(`upcoming.${i}.title`),
      date: t(`upcoming.${i}.date`),
      time: t(`upcoming.${i}.time`),
      location: t(`upcoming.${i}.location`),
      desc: t(`upcoming.${i}.desc`),
    })),
    newsletter: {
      ...EVENTS_DATA.newsletter,
      title: t("newsletter.title"),
      desc: t("newsletter.desc"),
      placeholder: t("newsletter.placeholder"),
      button: t("newsletter.button"),
    },
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <EventsHero data={localizedData.hero} />
      <EventsGrid data={localizedData} />
      {/* <NewsletterSection data={localizedData.newsletter} /> */}
    </div>
  );
}
