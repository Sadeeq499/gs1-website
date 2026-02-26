// app/terms/page.jsx  — Server Component
// ⚡ This file contains ONLY component calls. All content is in data/terms.js.

import TermsHero      from "@/components/terms/TermsHero";
import TermsSidebar   from "@/components/terms/TermsSidebar";
import TermsMobileNav from "@/components/terms/TermsMobileNav";
import TermsBody      from "@/components/terms/TermsBody";
import TermsFooter    from "@/components/terms/TermsFooter";

export const metadata = {
  title: "Terms & Conditions | GS1 Saudi Arabia",
  description:
    "Terms and Conditions for all members of the Product Numbering and Administrative Services Company – GS1 Saudi Arabia.",
};

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
