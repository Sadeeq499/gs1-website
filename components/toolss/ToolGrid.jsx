"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { toolsData } from "./tools";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ToolGrid = () => {
  const t = useTranslations("tools.section");
  
  return (
    <section className="py-24 container mx-auto px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {toolsData.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link 
              href={tool.link}
              target={tool.external ? "_blank" : "_self"}
              className="group relative block h-full p-8 bg-white border border-slate-100 rounded-3xl hover:shadow-[0_20px_50px_rgba(0,44,92,0.1)] transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-12">
                <div className={`p-4 rounded-2xl ${tool.color === 'gold' ? 'bg-gold/10 text-gold' : 'bg-primary/5 text-primary'} group-hover:scale-110 transition-transform duration-500`}>
                   {/* Icon logic here - using lucide-react or custom SVG */}
                </div>
                <ArrowUpRight className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              
              <h3 className="text-2xl font-bold text-primary mb-4">
                {t(`items.${tool.id}.title`)}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {t(`items.${tool.id}.description`)}
              </p>
              
              <span className="text-sm font-semibold uppercase tracking-widest text-primary group-hover:text-gold transition-colors">
                {t("explore_tool")}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default ToolGrid;