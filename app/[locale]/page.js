import Hero from "@/components/home/Hero";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { BarcodeTechnologySection } from "@/components/home/BarcodeTechnologySection";
import { Partners } from "@/components/home/Partners";

export default function Home() {
  return (
    <>
      <Hero />
      <SolutionsSection />
      <BarcodeTechnologySection />
      <Partners />
    </>
  );
}
