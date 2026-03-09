// components/terms/TermsHero.jsx
import { TERMS_META } from "./terms";
import { FileText, Calendar, ShieldCheck } from "lucide-react";

export default function TermsHero() {
  return (
    <div className="relative w-full min-h-[350px] md:h-[400px] overflow-hidden">
      {/* Background Image - Modern Office/Legal Vibe */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2670&auto=format&fit=crop")',
        }}
        role="img"
        aria-label="Terms and Conditions background"
      />

      {/* Dark Overlay: Slightly heavier than services for readability of legal text */}
      <div className="absolute inset-0 bg-[#002C6C]/85 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#002C6C] via-transparent to-transparent opacity-80" />

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-4 md:px-12 flex flex-col justify-center text-white py-12 max-w-7xl">
        <div className="max-w-4xl">
          
          {/* Top Badges - Glassmorphism style */}
          <div className="mb-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-white/80 backdrop-blur-md">
              <FileText className="h-3.5 w-3.5 text-[#F26334]" /> Legal Document
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] md:text-xs font-medium text-white/70 backdrop-blur-md">
              <Calendar className="h-3.5 w-3.5" /> Updated: {TERMS_META.lastUpdated}
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] md:text-xs font-medium text-white/70 backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5" /> Version: {TERMS_META.version}
            </span>
          </div>

          {/* Title with GS1 Saudi Arabia specific accent */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              {TERMS_META.title}
            </h1>
            
            {/* The "Anchor" line - makes it feel different from Services */}
            <div className="h-1.5 w-24 bg-[#F26334] rounded-full" />

            <p className="text-lg md:text-xl font-light leading-relaxed text-white/80 max-w-2xl pt-2">
              {TERMS_META.subtitle}
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom subtle edge decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}