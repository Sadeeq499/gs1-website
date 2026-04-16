"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import * as LucideIcons from "lucide-react";

const ToolDetailContent = ({ data, locale, slug }) => {
  const isRtl = locale === "ar";
  
  // Dynamic Icon Helper
  const renderIcon = (iconName, className) => {
    const IconComponent = LucideIcons[iconName] || LucideIcons.HelpCircle;
    return <IconComponent className={className} />;
  };

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className={`relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br ${data.hero.gradient}`}>
        <div className="absolute inset-0 opacity-20 bg-[url('/assets/patterns/grid-light.svg')] bg-center" />
        <div className="container mx-auto px-4 md:px-12 relative z-10">
          <Link 
            href={`/${locale}/tools`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-gold mb-8 transition-colors group"
          >
            {isRtl ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1" />}
            <span className="text-sm font-medium">{data.backButtonText}</span>
          </Link>
          
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-gold uppercase bg-white/10 rounded-full backdrop-blur-md"
            >
              {data.hero.badge}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {data.hero.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 max-w-2xl font-light leading-relaxed"
            >
              {data.hero.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. Main Description & Feature Grid */}
      <section className="py-24 container mx-auto px-4 md:px-12">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary">{data.mainSection.title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">{data.mainSection.description}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-8">
              {data.features.map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color === 'gold' ? 'bg-gold/10 text-gold' : 'bg-primary/5 text-primary'}`}>
                    {renderIcon(feature.icon.displayName || feature.icon.name, "w-6 h-6")}
                  </div>
                  <h4 className="font-bold text-primary mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Sticky Action/How-to Box */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-slate-900 rounded-[2rem] p-8 md:p-10 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
              <h3 className="text-2xl font-bold mb-8 relative z-10">{data.howToUse.title}</h3>
              <div className="space-y-8 relative z-10">
                {data.howToUse.steps.map((step, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold font-bold group-hover:bg-gold group-hover:text-primary transition-colors">
                        {i + 1}
                      </div>
                      {i !== data.howToUse.steps.length - 1 && <div className="w-px h-full bg-white/10 my-2" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                      <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                href={data.cta.link}
                className={`mt-12 w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold transition-all ${
                  data.cta.style === 'gold' ? 'bg-gold text-primary hover:bg-gold/90' : 'bg-white text-primary hover:bg-white/90'
                }`}
              >
                {data.cta.buttonLabel}
                {data.cta.style === 'external' ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* 4. FAQ Section (Optional based on data) */}
      {data.faq && (
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-12 max-w-4xl">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {data.faq.map((item, i) => (
                <details key={i} className="group bg-white border border-slate-200 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer">
                    <h4 className="font-bold text-lg text-primary">{item.question}</h4>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300">
                      <LucideIcons.ChevronDown className="w-5 h-5" />
                    </span>
                  </summary>
                  <p className="mt-4 text-slate-600 leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ToolDetailContent;