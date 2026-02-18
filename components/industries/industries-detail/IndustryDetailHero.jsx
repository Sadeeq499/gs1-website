import React from "react";

export default function IndustryDetailHero({ industry }) {
  return (
    <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={industry.heroImage || industry.image}
          alt={industry.title}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-transparent" />
      </div>

      <div className="relative h-full container mx-auto px-4 md:px-6 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight text-balance">
              {industry.title}
            </h1>
          </div>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl text-pretty">
            {industry.description}
          </p>
        </div>
      </div>
    </div>
  );
}
