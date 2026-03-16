import React from "react";

export default function IndustryDetailHero({ industry }) {
  return (
    <div className="relative w-full pt-20 pb-28 lg:pt-28 lg:pb-36 overflow-hidden bg-primary">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
      </div>

      <div className="relative h-full container mx-auto px-4 md:px-12 flex flex-col justify-center z-10 text-white">
        <div className="max-w-4xl space-y-6 animate-in slide-in-from-bottom-5 duration-700">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {industry.title}
            </h1>
            <p className="text-lg md:text-xl font-light text-white/90 max-w-2xl leading-relaxed">
              {industry.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
