// components/verify/VerifyHero.jsx
import { HERO } from "./verify";

export default function VerifyHero() {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden font-sans">
      {/* Background Image - Modern Corporate/Tech Look */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop")',
        }}
        role="img"
        aria-label="GS1 Verification background"
      />

      {/* Overlay: Gradient from solid brand blue to transparent */}
      {/* Note: I've used #002C6C (GS1 Blue) to match your previous theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#002C6C] via-[#002C6C]/80 to-transparent" />

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-4 md:px-12 flex flex-col justify-center text-white">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F26334] animate-pulse" />
            {HERO.badge}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
            {HERO.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl font-light leading-snug text-white/90 max-w-2xl">
            {HERO.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}