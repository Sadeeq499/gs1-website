import React from "react";
import { notFound } from "next/navigation";
import { standardsPillars } from "@/components/standards/data";
import { ChevronLeft, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  return standardsPillars.map((p) => ({ slug: p.slug }));
}

export default async function StandardDetailPage({ params }) {
  const { slug } = await params;
  const data = standardsPillars.find((s) => s.slug === slug);

  if (!data) notFound();

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-900">
      
      {/* 1. Simple Header Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/standards" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#002C6C] transition-all">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            Back
          </Link>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
            GS1 KSA Standard {data.slug}
          </span>
        </div>
      </nav>

      {/* 2. Minimalist Hero */}
      <header className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="text-[#FE5000] text-xs font-black uppercase tracking-[0.4em]">
            {data.acronym}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#002C6C] tracking-tight">
            {data.title}
          </h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
            {data.shortDescription}
          </p>
        </div>
      </header>

      {/* 3. The "In-Brief" Section (Ideal for CMS 'Overview' field) */}
      <section className="py-16 max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#002C6C]">{data.overviewTitle}</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {data.description}
            </p>
          </div>
          <div className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#002C6C] mb-6">{data.featuresTitle}</h3>
            <ul className="space-y-4">
              {data.features.map((f, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-[#FE5000] shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800">{f.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Content Modules (Clean Vertical Stack) */}
      <section className="py-20 space-y-32">
        {data.modules.map((module, i) => (
          <div key={i} className={`max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center `}>
            {/* Image container switches side based on index for rhythm */}
            <div className={`relative aspect-video rounded-3xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
              <Image 
                src={module.image} 
                alt={module.title} 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-6">
              <div className="text-[10px] font-bold text-[#FE5000] uppercase tracking-widest">
                Technical Key 0{i + 1}
              </div>
              <h3 className="text-3xl font-bold text-[#002C6C] tracking-tight">
                {module.title}
              </h3>
              <p className="text-lg text-slate-500 font-light leading-relaxed">
                {module.description}
              </p>
              <div className="pt-4">
                {/* <Link href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#002C6C] hover:gap-3 transition-all">
                  Technical Specifications <ArrowRight className="w-4 h-4" />
                </Link> */}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 5. Clean CTA */}
      <footer className="py-24 text-secondary">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{data.ctaTitle}</h2>
            <p className="text-lg font-light">{data.ctaDescription}</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#FE5000] text-white px-12 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all">
              {data.ctaButton}
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}