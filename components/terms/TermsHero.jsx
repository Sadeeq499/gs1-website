// components/terms/TermsHero.jsx
import { useTranslations } from "next-intl";

export default function TermsHero() {
  const t = useTranslations("terms");
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
        aria-label={t("meta.title")}
      />

      {/* Dark Overlay: Slightly heavier than services for readability of legal text */}
      <div className="absolute inset-0 bg-[#002C6C]/85 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#002C6C] via-transparent to-transparent opacity-80" />

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-4 md:px-12 flex flex-col justify-center text-white py-12 max-w-7xl">
        <div className="max-w-4xl">
          
          {/* Top Badges - Glassmorphism style */}

          {/* Title with GS1 Saudi Arabia specific accent */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              {t("meta.title")}
            </h1>
            
            {/* The "Anchor" line - makes it feel different from Services */}
            <div className="h-1.5 w-24 bg-[#F26334] rounded-full" />

            <p className="text-lg md:text-xl font-light leading-relaxed text-white/80 max-w-2xl pt-2">
              {t("meta.subtitle")}
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom subtle edge decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}