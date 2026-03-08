"use client";
import React from "react";
import Link from "next/link";
import { footerConfig } from "./footerData";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer className="relative w-full">
      {/* 1. Curvy Decorative Top (Blue Color Match) */}
      <div className="relative -mb-1 overflow-hidden">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="h-12 w-full md:h-20"
        >
          <path
            d="M0 80V40C240 0 480 0 720 40C960 80 1200 80 1440 40V80H0Z"
            fill="var(--primary)"
            /* This uses your theme's primary blue */
          />
        </svg>
      </div>

      {/* 2. Main Footer Body */}
      <div className="bg-primary pt-12 pb-8 text-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* Top Section: Brand & Link Clusters */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-6">
              <Link href="/" className="inline-flex items-end gap-2 group">
                <img
                  src={footerConfig.brand.logo}
                  alt="GS1 Saudi Arabia"
                  className="h-14 w-auto brightness-0 invert object-contain"
                />
                <span className="text-xl font-bold mb-1">
                  {t("brand.name")}
                </span>
              </Link>
              <p className="text-primary-foreground/70 leading-relaxed text-sm max-w-sm">
                {t("brand.description")}
              </p>

              {/* Social Links */}
              <div className="flex gap-3 pt-4">
                {footerConfig.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:bg-orange-500 hover:text-white transition-all"
                >
                  <XIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Link Columns Grid */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerConfig.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-6">
                    {t(`sections.${section.title}.title`)}
                  </h3>
                  <ul className="space-y-4">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-primary-foreground/60 hover:text-white text-sm transition-colors flex items-center group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-300 rtl:group-hover:-translate-x-1">
                            {t(`sections.${section.title}.links.${link.label}`)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Contact & Location Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-white/10">
            {footerConfig.contact.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-2xl hover:border-secondary hover:bg-white/10 transition-all group"
              >
                <div className="bg-white/10 p-3 rounded-xl group-hover:bg-orange-500 transition-colors">
                  <item.icon className="h-5 w-5 text-orange-500 group-hover:text-white" />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  {item.label === "Riyadh, Kingdom of Saudi Arabia" ? (
                    t("contact.location")
                  ) : (
                    <span dir="ltr">{item.label}</span>
                  )}
                </span>
              </a>
            ))}
          </div>

          {/* Final Bottom Bar & Legal */}
          <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-primary-foreground/40 text-xs">
                {t("copyright", { year: new Date().getFullYear() })}
              </p>
              <p className="text-[10px] text-primary-foreground/30 uppercase tracking-widest">
                {t("slogan")}
              </p>
            </div>

            {/* Expanded Legal Links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {footerConfig.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[11px] font-medium text-primary-foreground/40 hover:text-orange-500 transition-colors"
                >
                  {t(`legal.${link.label}`)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
