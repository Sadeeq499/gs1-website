import { IndustryCard } from "@/components/industries/IndustryCard";
import { industries } from "@/components/industries/data";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function SolutionsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary">
            Industry Solutions
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-5xl">
            Powering Every Industry with Global Standards
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            From healthcare to e-commerce, GS1 Saudi Arabia delivers scalable
            identification, traceability, and data standards that drive
            efficiency, compliance, and consumer trust.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {industries.slice(0, 8).map((industry) => (
            <IndustryCard key={industry.title} industry={industry} />
          ))}
        </div>

        {/* view more button */}
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            className="rounded-full px-5 py-3 font-semibold transition-all duration-300 hover:bg-primary hover:text-white"
            asChild
          >
            <Link href="/industries">
              View all industries
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
