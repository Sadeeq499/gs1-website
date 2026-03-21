"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft } from "lucide-react"; // Added ArrowLeft for RTL
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";

export const PartnerHero = ({ data: hero }) => {
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden bg-primary flex items-center">
      {/* Dynamic Background Gradient - Fixed for RTL */}
      <div className="absolute inset-0 z-0">
        <div 
          className={`absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c] ${
            isRtl ? "rotate-180" : ""
          }`} 
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          /* FIXED: Changed text-left to text-start for automatic RTL alignment */
          className="max-w-7xl text-start text-white space-y-4"
        >
          <Badge
            variant="outline"
            className="px-4 py-1 text-sm border-white/30 text-white bg-white/10 backdrop-blur-sm font-bold"
          >
            {hero.badge}
          </Badge>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {hero.title}{" "}
            <span className="text-secondary">{hero.titleHighlight}</span>{" "}
            {hero.titleSuffix}
          </h1>

          <p className="text-lg text-white/90 max-w-2xl">
            {hero.description}
          </p>

          <div className="pt-4">
            <Button
              size="lg"
              /* FIXED: Ensure text color is explicit and font-weight is strong */
              className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-8 h-12 shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              {/* FIXED: Wrapped text in a span to ensure rendering */}
              <span>{hero.ctaText}</span>
              
              {/* FIXED: Icon flips based on direction */}
              {isRtl ? (
                <ArrowLeft className="h-5 w-5" />
              ) : (
                <ArrowRight className="ml-2 h-5 w-5" />
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};