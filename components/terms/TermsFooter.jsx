// components/terms/TermsFooter.jsx  — Server Component
import { TERMS_FOOTER, TERMS_META } from "./terms";
import { ShieldCheck, Mail, ArrowUpRight } from "lucide-react";

export default function TermsFooter() {
  return (
    <footer className="mt-14 space-y-5">
      {/* divider with shield */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
          <ShieldCheck className="h-4 w-4 text-[#002C6C]" />
        </div>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* acceptance notice */}
      <div className="rounded-2xl border border-[#002C6C]/15 bg-gradient-to-br from-[#002C6C]/5 to-transparent p-6">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#002C6C] text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="text-[13.5px] leading-relaxed text-foreground/75">
            {TERMS_FOOTER.note}
          </p>
        </div>
      </div>

      {/* contact CTA */}
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-6 sm:flex-row sm:justify-between">
        <div>
          <p className="font-semibold text-foreground text-sm">{TERMS_FOOTER.contact.label}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Sunday – Thursday &nbsp;·&nbsp; 8 AM – 5 PM AST
          </p>
        </div>
        <a
          href={TERMS_FOOTER.contact.href}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#F26334] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#d4522a] hover:shadow-md"
        >
          <Mail className="h-4 w-4" />
          {TERMS_FOOTER.contact.action}
          <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
        </a>
      </div>

      {/* copyright */}
      <p className="pb-6 text-center text-[11px] text-muted-foreground/50">
        © {new Date().getFullYear()} {TERMS_META.organization} · Saudi Bar Coding Center.
        All rights reserved.
      </p>
    </footer>
  );
}
