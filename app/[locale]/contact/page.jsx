import { BASE_URL } from "@/lib/seo";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";
import ContactFormImage from "@/components/contact/ContactFormImage";
import { CONTACT_DATA } from "@/components/contact/contact-data";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        en: `${BASE_URL}/en/contact`,
        ar: `${BASE_URL}/ar/contact`,
        "x-default": `${BASE_URL}/en/contact`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}/contact`,
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      alternateLocale: locale === "ar" ? ["en_SA"] : ["ar_SA"],
    },
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  const localizedData = {
    ...CONTACT_DATA,
    hero: {
      ...CONTACT_DATA.hero,
      badge: t("hero.badge"),
      title: t("hero.title"),
      titleHighlight: t("hero.titleHighlight"),
      titleSuffix: t("hero.titleSuffix"),
      description: t("hero.description"),
    },
    info: {
      ...CONTACT_DATA.info,
      companyName: t("info.companyName"),
      locationName: t("info.locationName"),
      city: t("info.city"),
      country: t("info.country"),
      address: t("info.address"),
      workingHours: t("info.workingHours"),
    },
    form: {
      ...CONTACT_DATA.form,
      badge: t("form.badge"),
      heading: t("form.heading"),
      subheading: t("form.subheading"),
      successMessage: t("form.successMessage"),
      privacyText: t("form.privacyText"),
      privacyLinkText: t("form.privacyLinkText"),
      labels: {
        fullName: t("form.labels.fullName"),
        email: t("form.labels.email"),
        phone: t("form.labels.phone"),
        subject: t("form.labels.subject"),
        message: t("form.labels.message"),
        submit: t("form.labels.submit"),
        sending: t("form.labels.sending"),
      },
      placeholders: {
        fullName: t("form.placeholders.fullName"),
        email: t("form.placeholders.email"),
        phone: t("form.placeholders.phone"),
        subject: t("form.placeholders.subject"),
        message: t("form.placeholders.message"),
      },
    },
    map: {
      ...CONTACT_DATA.map,
      buttons: {
        directions: t("map.buttons.directions"),
        openMaps: t("map.buttons.openMaps"),
      },
    },
  };

  return (
    <main className="bg-background min-h-screen">
      <ContactHero data={localizedData.hero} />
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ContactFormImage data={localizedData.info} />
          <ContactForm data={localizedData.form} />
        </div>
      </section>
      <ContactMap data={localizedData.map} info={localizedData.info} />
    </main>
  );
}
