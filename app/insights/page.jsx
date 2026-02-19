import { INSIGHTS_DATA } from "@/components/insights/insights-data";
import { InsightsHero } from "@/components/insights/InsightsHero";
import { NewsGrid } from "@/components/insights/NewsGrid";
import { NewsSlider } from "@/components/insights/NewsSlider";

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* Existing Hero component remains unchanged, just uses data prop */}
      <InsightsHero data={INSIGHTS_DATA.hero} />
      
      <NewsSlider slides={INSIGHTS_DATA.slider} />
      
      <NewsGrid news={INSIGHTS_DATA.news} />
      
      {/* Real Content Section: Why GS1 SA? */}
      <section className="container mx-auto px-4 py-24 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-primary mb-6">Securing the Saudi Supply Chain</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            As of 2026, over 10,000 Saudi companies rely on GS1 standards to comply with 
            <span className="text-primary font-bold"> ZATCA</span>, 
            <span className="text-primary font-bold"> SFDA</span>, and 
            <span className="text-primary font-bold"> SASO</span> requirements. 
            Our standards aren&apos;t just barcodes—they are the digital language of Vision 2030.
          </p>
        </div>
      </section>
    </main>
  );
}