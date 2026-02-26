// components/terms/TermsMobileNav.jsx  — Client Component
"use client";

import { useState } from "react";
import { TERMS_SECTIONS } from "./terms";
import { List, ChevronDown } from "lucide-react";

export default function TermsMobileNav() {
  const [open, setOpen] = useState(false);

  const goto = (id) => {
    document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <div className="mb-6 lg:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-[#f0f4fa]"
      >
        <span className="flex items-center gap-2">
          <List className="h-4 w-4 text-[#002C6C]" />
          Table of Contents
          <span className="ml-1 rounded-full bg-[#002C6C]/10 px-2 py-0.5 text-[10px] font-bold text-[#002C6C]">
            {TERMS_SECTIONS.length}
          </span>
        </span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-1 max-h-72 overflow-y-auto rounded-xl border border-border bg-card shadow-lg">
          {TERMS_SECTIONS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => goto(s.id)}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-[#f0f4fa] hover:text-[#002C6C] ${
                idx !== 0 ? "border-t border-border/60" : ""
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#002C6C]/10 text-[10px] font-extrabold text-[#002C6C]">
                {s.number}
              </span>
              <span className="font-medium text-foreground leading-snug">{s.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
