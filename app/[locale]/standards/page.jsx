import React from "react";
import StandardHero from "../../components/standards/StandardHero";

import StandardsPillars from "../../components/standards/StandardsPillars";

function StandardsPage() {
  return (
    <main>
      <StandardHero />
      <StandardsPillars />
      <div className="container mx-auto px-4 py-12">
        {/* Placeholder for future content */}
        <p className="text-muted-foreground"></p>
      </div>
    </main>
  );
}

export default StandardsPage;
