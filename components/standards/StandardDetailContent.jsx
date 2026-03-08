"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  Check,
  ArrowRight,
  Barcode,
  MapPin,
  Package,
  Users,
  FileText,
  ScanLine,
  RectangleHorizontal,
  QrCode,
  Smartphone,
  Radio,
  RefreshCw,
  ArrowLeftRight,
  Activity,
  Layers,
  Globe,
  ShieldCheck,
  Zap,
  Database,
  Heart,
  Target,
  Eye,
  TrendingUp,
  TrendingDown,
  BadgeCheck,
  CheckCircle,
} from "lucide-react";

const iconMap = {
  barcode: Barcode,
  "map-pin": MapPin,
  package: Package,
  users: Users,
  "file-text": FileText,
  "scan-line": ScanLine,
  "rectangle-horizontal": RectangleHorizontal,
  "qr-code": QrCode,
  smartphone: Smartphone,
  radio: Radio,
  "refresh-cw": RefreshCw,
  "arrow-left-right": ArrowLeftRight,
  activity: Activity,
  layers: Layers,
  globe: Globe,
  "shield-check": ShieldCheck,
  zap: Zap,
  database: Database,
  heart: Heart,
  target: Target,
  eye: Eye,
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  "badge-check": BadgeCheck,
  "check-circle": CheckCircle,
};

const DynamicIcon = ({ name, className, ...props }) => {
  const Icon = iconMap[name] || Globe;
  return <Icon className={className} {...props} />;
};

export default function StandardDetailContent({ data }) {
  const { hero, stats, overview, components, process, benefits, industries } = data;

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-900">

      {/* ─────────────────────────────────────────────
          1. COMPACT HERO
      ───────────────────────────────────────────── */}
      <header className="relative bg-[#002C6C] overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Back link */}
          <div className="pt-6">
            <Link
              href="/standards"
              className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-white/80 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              All Standards
            </Link>
          </div>

          {/* Hero content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center py-14 md:py-16">
            {/* Text */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-white/8">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FE5000]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                  {hero.badge}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[0.95]">
                {hero.title}
              </h1>
              <p className="text-lg md:text-xl font-light text-white/50 leading-relaxed max-w-lg">
                {hero.description}
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:flex justify-end">
              <div className="relative w-80 h-80 rounded-2xl overflow-hidden bg-white/4 border border-white/6">
                <Image
                  src={hero.heroImage}
                  alt={hero.title}
                  fill
                  className="object-contain p-6"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────
          2. STATS BAR
      ───────────────────────────────────────────── */}
      <section className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl font-black text-[#002C6C]">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          3. OVERVIEW
      ───────────────────────────────────────────── */}
      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          <div className="space-y-3">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FE5000]">
              {overview.eyebrow}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#002C6C] tracking-tight leading-snug">
              {overview.title}
            </h2>
          </div>
          <div className="space-y-5">
            {overview.paragraphs.map((p, i) => (
              <p key={i} className="text-base text-slate-500 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          4. CORE COMPONENTS / STANDARDS
      ───────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FE5000]">
              Core Standards
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#002C6C] tracking-tight">
              Key Components
            </h2>
          </div>

          <div className="space-y-5">
            {components.map((comp, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:shadow-slate-100 transition-all duration-500"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Left: Acronym */}
                  <div className="md:col-span-1 p-6 md:p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50">
                    <div className="w-12 h-12 rounded-xl bg-[#002C6C]/6 flex items-center justify-center mb-3">
                      <DynamicIcon name={comp.icon} className="w-5 h-5 text-[#002C6C]" />
                    </div>
                    <div className="text-xl font-black text-[#002C6C] tracking-tight">
                      {comp.acronym}
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="md:col-span-4 p-6 md:p-8 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#002C6C] mb-2">
                        {comp.name}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {comp.description}
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-1.5">
                      {comp.useCases.map((uc, j) => (
                        <div key={j} className="flex items-center gap-2.5 text-sm text-slate-500">
                          <Check className="w-3.5 h-3.5 shrink-0 text-[#FE5000]" />
                          <span>{uc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          5. HOW IT WORKS — PROCESS
      ───────────────────────────────────────────── */}
      <section className="py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FE5000]">
              {process.eyebrow}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#002C6C] tracking-tight">
              {process.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {process.steps.map((step, i) => (
              <div key={i} className="relative group">
                {/* Connector line */}
                {i < process.steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] right-0 h-px bg-slate-200 z-0">
                    <ArrowRight className="absolute -right-1.5 -top-1.5 w-3 h-3 text-slate-300" />
                  </div>
                )}
                <div className="relative z-10 text-center space-y-4">
                  <div className="mx-auto w-14 h-14 rounded-full bg-[#002C6C] text-white flex items-center justify-center font-black text-sm shadow-md shadow-[#002C6C]/10">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-[#002C6C]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          6. BENEFITS
      ───────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FE5000]">
              {benefits.eyebrow}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#002C6C] tracking-tight max-w-2xl mx-auto">
              {benefits.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.items.map((b, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-7 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#002C6C]/6 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <DynamicIcon name={b.icon} className="w-5 h-5 text-[#002C6C]" />
                </div>
                <h3 className="text-base font-bold text-[#002C6C] mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          7. INDUSTRY APPLICATIONS
      ───────────────────────────────────────────── */}
      <section className="py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-3 mb-14">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FE5000]">
              {industries.eyebrow}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#002C6C] tracking-tight">
              {industries.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {industries.items.map((ind, i) => (
              <div
                key={i}
                className="group flex gap-5 p-5 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition-all"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-[#002C6C] text-white flex items-center justify-center font-black text-xs">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-bold text-[#002C6C] mb-0.5">
                    {ind.name}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {ind.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
