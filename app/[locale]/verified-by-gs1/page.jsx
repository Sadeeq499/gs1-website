import React from "react";
import VerifyHero from "@/components/verify/VerifyHero";
import VerifyTabs from "@/components/verify/VerifyTabs";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "verify" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

function page() {
  return (
    <div>
      <VerifyHero />
      <VerifyTabs />
    </div>
  );
}

export default page;
