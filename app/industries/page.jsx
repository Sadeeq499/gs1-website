import React from "react";
import { IndustryCard } from "@/components/industries/IndustryCard";
import { IndustryHero } from "@/components/industries/IndustryHero";
import { industries } from "@/components/industries/data";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Industries Served | GS1 Saudi Arabia",
  description:
    "Discover how GS1 standards drive efficiency, safety, and visibility across healthcare, retail, logistics, and more.",
};

export default function IndustriesPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Hero Section */}
      <IndustryHero />

      {/* Main Content */}
      <main className="flex-1 bg-white dark:bg-slate-950">
        <div className="container py-8 md:py-16 space-y-12 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Industries Grid */}
          <section>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl text-balance">
                Transforming Business Across Sectors
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                GS1 standards are the common language of business, enabling
                seamless communication and interoperability worldwide.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {industries.map((industry) => (
                <IndustryCard key={industry.title} industry={industry} />
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="relative overflow-hidden rounded-3xl bg-secondary/5 py-16 px-6 lg:px-12 border border-secondary/10">
            <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-6">
                  Why Industries Trust GS1
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our neutral, non-profit platform ensures that data can be
                  shared seamlessly between trading partners, regardless of size
                  or sector.
                </p>
                <ul className="space-y-4">
                  {[
                    "Global Interoperability",
                    "Improved Supply Chain Visibility",
                    "Regulatory Compliance",
                    "Enhanced Consumer Safety",
                    "Counterfeit Prevention",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                      <span className="font-medium text-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 lg:mt-0 relative">
                <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 p-8 rotate-3 shadow-xl backdrop-blur-3xl">
                  <div className="h-full w-full rounded-xl bg-white/50 border border-white/20 p-6 flex flex-col justify-center items-center text-center">
                    <span className="text-6xl font-bold text-primary mb-2">
                      2M+
                    </span>
                    <span className="text-xl font-medium text-muted-foreground">
                      Companies Worldwide
                    </span>

                    <div className="w-full h-px bg-border my-6" />

                    <span className="text-6xl font-bold text-secondary mb-2">
                      150+
                    </span>
                    <span className="text-xl font-medium text-muted-foreground">
                      Countries
                    </span>

                    <div className="w-full h-px bg-border my-6" />

                    <span className="text-6xl font-bold text-primary mb-2">
                      10B+
                    </span>
                    <span className="text-xl font-medium text-muted-foreground">
                      Daily Scans
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}
