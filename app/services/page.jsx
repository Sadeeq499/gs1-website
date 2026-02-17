import React from "react";
import ServiceHero from "../../components/services/ServiceHero";
import ServicesSection from "../../components/services/ServicesSection";

import ServicesCTA from "../../components/services/ServicesCTA";

function ServicesPage() {
  return (
    <main>
      <ServiceHero />
      <ServicesSection />
      <ServicesCTA />
    </main>
  );
}

export default ServicesPage;
