import { getTranslations } from "next-intl/server";
import TermsHero      from "@/components/terms/TermsHero";
import TermsSidebar   from "@/components/terms/TermsSidebar";
import TermsMobileNav from "@/components/terms/TermsMobileNav";
import TermsBody      from "@/components/terms/TermsBody";
import TermsFooter    from "@/components/terms/TermsFooter";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

  return {
    title: `${t("meta.title")} | GS1 Saudi Arabia`,
    description: t("meta.subtitle"),
  };
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <TermsHero />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

          {/* Desktop: sticky TOC sidebar */}
          <TermsSidebar />

          {/* Content column */}
          <main className="min-w-0">
            {/* Mobile: collapsible TOC */}
            <TermsMobileNav />

            {/* All 23 sections */}
            <TermsBody />

            {/* Acceptance + contact */}
            <TermsFooter />
          </main>

        </div>
      </div>
    </div>
  );
}
