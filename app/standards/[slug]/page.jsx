import React from "react";
import { notFound } from "next/navigation";
import { standardsPillars } from "@/components/standards/data";
import { ChevronLeft, Check, ArrowUpRight } from "lucide-react";
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
    <div className="bg-white min-h-screen font-sans selection:bg-slate-900 selection:text-white">
      
      {/* Navigation */}
      <nav className="sticky top-28 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/standards" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-[#002C6C] flex items-center gap-2 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Framework
          </Link>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">GS1 Saudi Arabia / {data.title}</div>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="pt-16 pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#FE5000]">
              <span className="w-8 h-px bg-[#FE5000]"></span>
              Standard Pillar {data.slug === "identify" ? "01" : data.slug === "capture" ? "02" : "03"}
            </div>
            <h1 className="text-6xl lg:text-8xl font-bold text-[#002C6C] tracking-tighter leading-[0.9]">
              {data.title}
            </h1>
            <p className="text-2xl text-slate-500 font-light leading-relaxed">
              {data.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Core Technical Content Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Sidebar Overview */}
            <div className="lg:col-span-4 space-y-12">
              <div className="sticky top-32 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">{data.overviewTitle}</h2>
                  <p className="text-lg text-slate-700 leading-relaxed italic border-l-2 border-[#FE5000] pl-6">
                    {data.description}
                  </p>
                </div>
                
                <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-sm font-bold text-[#002C6C] mb-6 uppercase tracking-widest">{data.featuresTitle}</h3>
                  <div className="space-y-6">
                    {data.features.map((f, i) => (
                      <div key={i} className="flex gap-4">
                        <Check className="w-4 h-4 text-[#FE5000] mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-slate-900">{f.title}</p>
                          <p className="text-xs text-slate-500 mt-1">{f.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Modules */}
            <div className="lg:col-span-8 space-y-24">
              {data.modules.map((module, i) => (
                <div key={i} className="group grid md:grid-cols-2 gap-10 items-start">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <Image 
                      src={module.image} 
                      alt={module.title} 
                      fill 
                      className="object-contain group-hover:scale-105 transition-transform duration-700 object-cover"
                    />
                  </div>
                  <div className="space-y-4 pt-4">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Section {i + 1}</div>
                    <h3 className="text-2xl font-bold text-[#002C6C] group-hover:text-[#FE5000] transition-colors flex items-center gap-2">
                      {module.title}
                      {/* <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /> */}
                    </h3>
                    <p className="text-slate-600 leading-relaxed font-light text-base">
                      {module.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Corporate CTA Section */}
      <section className="bg-slate-50 py-32 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-[#002C6C] tracking-tight">{data.ctaTitle}</h2>
            <p className="text-xl text-slate-500 font-light">{data.ctaDescription}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-[#002C6C] text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#FE5000] transition-all shadow-xl shadow-blue-900/10">
              {data.ctaButton}
            </button>
            <button className="border border-slate-300 text-slate-600 px-10 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all">
              Technical Guidelines
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}