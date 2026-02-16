import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Linkedin,
  Youtube,
} from "lucide-react";

const footerLinks = [
  {
    title: "About GS1",
    links: [
      { label: "Who we are", href: "#" },
      { label: "Our mission", href: "#" },
      { label: "Leadership team", href: "#" },
      { label: "Membership", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Standards & Services",
    links: [
      { label: "GTINs & barcodes", href: "#" },
      { label: "QR codes powered by GS1", href: "#" },
      { label: "2D barcode migration", href: "#" },
      { label: "Data quality services", href: "#" },
      { label: "Consulting", href: "#" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Healthcare", href: "#" },
      { label: "Retail & FMCG", href: "#" },
      { label: "Logistics & transport", href: "#" },
      { label: "Food safety", href: "#" },
      { label: "Construction", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", href: "#" },
      { label: "Knowledge hub", href: "#" },
      { label: "Training & events", href: "#" },
      { label: "Getting started", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
];

const legalLinks = [
  { label: "Terms & conditions", href: "#" },
  { label: "Privacy policy", href: "#" },
  { label: "Cookie policy", href: "#" },
];

function XIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const Footer = () => {
  return (
    <footer className="relative">
      {/* Decorative wave top */}
      <div className="relative -mb-1 overflow-hidden">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="h-16 w-full md:h-20"
        >
          <path
            d="M0 80V40C240 0 480 0 720 40C960 80 1200 80 1440 40V80H0Z"
            fill="hsl(214 100% 21%)"
          />
        </svg>
      </div>

      {/* Main footer */}
      <div className="bg-primary pt-12">
        <div className="mx-auto max-w-7xl px-4">
          {/* Footer columns */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="mb-6 flex items-end gap-2">
                <img
                  src="/logo.png"
                  alt="GS1 Saudi Arabia"
                  className="h-16 w-auto brightness-0 invert object-contain object-left"
                />
                <span className="text-xl font-bold text-white mb-2">
                  Saudi Arabia
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
                The global language of business. Empowering Saudi enterprises
                with world-class standards for supply chain excellence.
              </p>

              {/* Contact info */}
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="tel:+966112345678"
                  className="flex items-center gap-2.5 text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  +966 11 234 5678
                </a>
                <a
                  href="mailto:info@gs1sa.org"
                  className="flex items-center gap-2.5 text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  info@gs1sa.org
                </a>
                <div className="flex items-start gap-2.5 text-sm text-primary-foreground/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>Riyadh, Kingdom of Saudi Arabia</span>
                </div>
              </div>
            </div>

            {/* Link columns */}
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h4 className="text-sm font-bold uppercase tracking-wider text-primary-foreground">
                  {column.title}
                </h4>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-primary-foreground/60 transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mt-12 border-t border-white/10" />

          {/* Bottom bar */}
          <div className="flex flex-col items-center gap-6 py-6 md:flex-row md:justify-between">
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-primary-foreground/60 transition-all hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-primary-foreground/60 transition-all hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="X (formerly Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-primary-foreground/60 transition-all hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <XIcon className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {legalLinks.map((link, i) => (
                <span key={link.label} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    className="text-xs text-primary-foreground/50 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                  {i < legalLinks.length - 1 && (
                    <span
                      className="text-primary-foreground/20"
                      aria-hidden="true"
                    >
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-center text-xs text-primary-foreground/40 md:text-right">
              {"GS1 is a registered trademark of GS1 AISBL. \u00A9 "}
              {new Date().getFullYear()}
              {" GS1 Saudi Arabia. All rights reserved."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
