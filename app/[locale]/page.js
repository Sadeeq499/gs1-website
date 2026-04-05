import { BASE_URL } from "@/lib/seo";
// import Hero from "@/components/home/Hero";
import OurServices from "@/components/home/OurServices";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { BarcodeTechnologySection } from "@/components/home/BarcodeTechnologySection";
import { Partners } from "@/components/home/Partners";
import Slider from "@/components/home/Slider";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        ar: `${BASE_URL}/ar`,
        "x-default": `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}`,
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      alternateLocale: locale === "ar" ? ["en_SA"] : ["ar_SA"],
    },
  };
}

export default function Home() {
  return (
    <>
      <Slider />
      <Partners />
      <OurServices />
      <SolutionsSection />
      <BarcodeTechnologySection />
    </>
  );
}
