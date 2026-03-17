// import Hero from "@/components/home/Hero";
import OurServices from "@/components/home/OurServices";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { BarcodeTechnologySection } from "@/components/home/BarcodeTechnologySection";
import { Partners } from "@/components/home/Partners";
import Slider from "@/components/home/Slider";

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
