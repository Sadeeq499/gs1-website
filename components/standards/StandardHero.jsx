import React from "react";

const StandardHero = () => {
  return (
    <div className="relative w-full h-[350px] md:h-[400px] overflow-hidden font-sans">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("/images/sliders/s5.jpg")',
        }}
        role="img"
        aria-label="Standards and services background"
      />

      {/* Overlay: Gradient from solid primary to transparent/primary */}
      <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/50 to-primary/10" />

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-4 md:px-12 flex flex-col justify-center text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            GS1 Standards
          </h1>
          <p className="text-xl md:text-2xl font-light leading-snug text-white/95">
            Identify, capture, and share information automatically and
            accurately with the world's most widely used supply chain standards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StandardHero;
