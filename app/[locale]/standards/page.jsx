import React from "react";
import StandardHero from "@/components/standards/StandardHero";

import StandardsPillars from "@/components/standards/StandardsPillars";
import GS1StandardsDetails from "@/components/standards/GS1StandardsDetails";

function StandardsPage() {
  return (
    <main>
      <StandardHero />
      <GS1StandardsDetails />
      <StandardsPillars />
    </main>
  );
}

export default StandardsPage;
