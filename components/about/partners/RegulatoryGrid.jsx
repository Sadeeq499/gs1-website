"use client";
import { motion } from "framer-motion";

const logos = ["/images/SFDA.png", "/images/ZATCA.svg", "/images/SASO.png"];

export const RegulatoryGrid = ({ data: regulatory }) => (
  <section className="py-20 container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {regulatory.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -5 }}
          className="relative group flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-border/40 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500"
        >
          {/* Subtle Background Numbering */}
          <span className="absolute top-4 right-6 text-4xl font-black text-primary/5 select-none">
            0{i + 1}
          </span>

          {/* Logo Container */}
          <div className="h-24 w-full mb-6 flex items-center justify-center">
            <img
              src={logos[i]}
              alt={item.title}
              className="max-h-full max-w-[180px] object-contain group-hover: transition-all duration-500"
            />
          </div>

          {/* Minimal Info */}
          <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
          <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-1 mb-3">
            {item.sub}
          </p>
          {/* <p className="text-muted-foreground text-xs leading-relaxed max-w-[220px]">
            {item.desc}
          </p> */}
          
          {/* Bottom Accent Line */}
          <div className="w-10 h-1 bg-primary/20 rounded-full mt-6 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
        </motion.div>
      ))}
    </div>
  </section>
);