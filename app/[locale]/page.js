import Hero from "@/components/home/Hero";
import OurServices from "@/components/home/OurServices";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { BarcodeTechnologySection } from "@/components/home/BarcodeTechnologySection";
import { Partners } from "@/components/home/Partners";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Hero />
      <Partners />
      <OurServices />
      <SolutionsSection />
      <BarcodeTechnologySection />
    </div>
  );
}
