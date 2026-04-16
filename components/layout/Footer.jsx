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
          {/* Top Section: Brand + Nav Sections */}
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

              {/* Contact Info */}
              <div className="space-y-3 pt-2">
                {footerConfig.contact.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-white transition-colors group w-fit"
                  >
                    <item.icon className="h-4 w-4 text-orange-500" />
                    <span>{t (`contact.${item.label}`)}</span>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-3 pt-4">
                <a
                  href="https://x.com/GS1Saudi?s=20"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GS1 Saudi on X"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
                >
                  <XIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Nav Sections Grid */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerConfig.sections.map((section) => (
                <div key={section.title}>
                  <Link href={section.href}>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-orange-500 mb-5 hover:text-orange-400 transition-colors">
                      {t(`sections.${section.title}.title`)}
                    </h3>
                  </Link>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-primary-foreground/60 hover:text-white text-sm transition-colors block group"
                        >
                          <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300 inline-block">
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

          {/* Final Bottom Bar & Legal */}
          <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-primary-foreground/40 text-xs">
                {t("copyright", { year: new Date().getFullYear() })}
              </p>
              <p className="text-[10px] text-primary-foreground/30 uppercase tracking-widest">
                {t("slogan")}
              </p>
            </div>

            <a
              href="https://member.gs1.org.sa/terms.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium text-primary-foreground/40 hover:text-orange-500 transition-colors border border-white/10 rounded-full px-4 py-2"
            >
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
