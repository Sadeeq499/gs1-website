"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

export default function NewsInsights({ data }) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Badge className="bg-blue-50 text-primary hover:bg-blue-100 border-none px-4 py-1 font-bold">
              {data.header.badge}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              {data.header.title}{" "}
              <span className="text-primary">{data.header.highlight}</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
              {data.header.description}
            </p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col h-full bg-white rounded-3xl border border-slate-100 hover:border-blue-200 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,44,92,0.08)]"
            >
              {/* Image Section */}
              <div className="relative h-60 w-full overflow-hidden rounded-t-3xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    className={`${
                      item.tag === "Urgent" || item.tag === "عاجل"
                        ? "bg-red-500"
                        : "bg-primary"
                    } text-white border-none shadow-lg font-bold`}
                  >
                    {item.tag}
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col grow">
                <div className="flex items-center gap-4 text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-primary" />
                    {item.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
