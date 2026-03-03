import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";
import { standardsPillars } from "./data"; // Path to your data.js

const PillarCard = ({ pillar, index }) => {
  const isReversed = index % 2 !== 0;

  return (
    <div className="group relative border-b border-slate-100 last:border-0 pb-24 mb-24 last:mb-0 last:pb-0">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Content Side */}
        <div className={`space-y-8 ${isReversed ? "lg:order-2" : ""}`}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Phase {String(index + 1).padStart(2, "0")}
              </span>
              <div className="h-px w-8 bg-slate-200" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FE5000]">
                {pillar.acronym}
              </span>
            </div>
            <h3 className="text-4xl lg:text-5xl font-bold text-[#002C6C] tracking-tight">
              {pillar.title}
            </h3>
          </div>

          <p className="text-lg text-slate-600 leading-relaxed font-light max-w-xl">
            {pillar.description.split('.')[0]}. {pillar.shortDescription}
          </p>

          {/* Quick Features List */}
          <div className="grid grid-cols-2 gap-4">
            {pillar.features.slice(0, 2).map((feature, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-[#002C6C] mb-1">{feature.title}</p>
                <p className="text-[11px] text-slate-500 leading-tight">{feature.detail}</p>
              </div>
            ))}
          </div>

          <Link
            href={`/standards/${pillar.slug}`}
            className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#002C6C] group/link transition-all"
          >
            Explore {pillar.title} Framework
            <div className="p-2 rounded-full border border-slate-200 group-hover/link:bg-[#002C6C] group-hover/link:text-white transition-all">
              <MoveRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Visual Side */}
        <div className={`relative ${isReversed ? "lg:order-1" : ""}`}>
          <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
            <Image
              src={pillar.image || pillar.heroImage}
              alt={pillar.title}
              fill
              className="object-contain object-contain transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
          </div>
          
          {/* Decorative Number background */}
          <span className="absolute -bottom-10 -right-6 text-[12rem] font-bold text-slate-100/50 -z-10 select-none">
             {index + 1}
          </span>
        </div>

      </div>
    </div>
  );
};

const StandardsPillars = () => {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-32 space-y-6">
          <div className="inline-block py-1 px-3 rounded bg-blue-50 text-[#002C6C] text-[10px] font-bold uppercase tracking-[0.2em]">
             Official GS1 Framework
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-[#002C6C] tracking-tight leading-[1.1]">
            The Three Pillars of <span className="text-[#FE5000]">Global Standards</span>
          </h2>
          <p className="text-xl text-slate-500 font-light leading-relaxed">
            Our framework enables businesses across the Kingdom to identify, capture, and share data, 
            ensuring transparency and efficiency from local production to global consumption.
          </p>
        </div>

        {/* Pillars List */}
        <div className="relative">
          {standardsPillars.map((pillar, i) => (
            <PillarCard key={pillar.slug} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Bottom Professional CTA */}
        <div className="mt-20 p-12 rounded-[2rem] bg-primary text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-2xl font-bold mb-2">Ready to implement GS1 Standards?</h4>
            <p className="text-slate-400 font-light">Join the global network of 2 million+ companies.</p>
          </div>
          <Link 
            href="/get-started"
            className="relative z-10 bg-[#FE5000] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Become a Member
          </Link>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FE5000] rounded-full blur-[100px] opacity-10 translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </section>
  );
};

export default StandardsPillars;