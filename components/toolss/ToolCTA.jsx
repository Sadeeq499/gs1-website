"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HeadphonesContact, ArrowRight } from "lucide-react";
import Link from "next/link";

const ToolCTA = () => {
  const t = useTranslations("tools.cta");

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] bg-primary px-8 py-12 md:px-16 md:py-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-[80px]" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {t("title")}
            </h2>
            <p className="text-lg text-white/70 font-light">
              {t("description")}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-gold hover:bg-gold/90 text-primary font-bold rounded-xl transition-all duration-300 shadow-lg shadow-gold/20"
            >
              {t("button")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolCTA;