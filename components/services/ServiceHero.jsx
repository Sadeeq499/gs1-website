import React from "react";

const ServiceHero = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden font-sans">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop")',
        }}
        role="img"
        aria-label="GS1 Services background"
      />

      {/* Overlay: Gradient from solid primary to transparent/primary */}
      <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/80 to-primary/40" />

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-4 md:px-12 flex flex-col justify-center text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl font-light leading-snug text-white/95">
            Empowering your business with global standards and solutions for
            efficiency, visibility, and growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;
