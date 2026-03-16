// components/terms/TermsSidebar.jsx  — Client Component
"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { BookOpen, ChevronRight } from "lucide-react";

export default function TermsSidebar() {
  const t = useTranslations("terms");
  const sections = t.raw("sections");
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const observerRef = useRef(null);

  useEffect(() => {
    const headings = sections.map((s) =>
      document.getElementById(`sec-${s.id}`)
    ).filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // pick the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) {
          setActive(visible[0].target.id.replace("sec-", ""));
        }
      },
      { rootMargin: "-10% 0px -55% 0px", threshold: 0 }
    );

    headings.forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, [sections]);

  const goto = (id) =>
    document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 max-h-[calc(100vh-3rem)] overflow-y-auto rounded-2xl border border-border bg-card shadow-sm">
        {/* header */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#002C6C]/10">
            <BookOpen className="h-3.5 w-3.5 text-[#002C6C]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#002C6C] dark:text-foreground">
            {t("meta.tableOfContents")}
          </span>
        </div>

        <nav className="space-y-0.5 p-2">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => goto(s.id)}
                className={`group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[12px] transition-all duration-150 ${
                  isActive
                    ? "bg-[#002C6C] text-white shadow-sm"
                    : "text-muted-foreground hover:bg-[#f0f4fa] hover:text-[#002C6C] dark:hover:bg-accent"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-extrabold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground group-hover:bg-[#002C6C]/10 group-hover:text-[#002C6C]"
                  }`}
                >
                  {s.number}
                </span>
                <span className="flex-1 leading-snug font-medium">{s.title}</span>
                <ChevronRight
                  className={`h-3 w-3 shrink-0 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <div className="m-2 mt-1 rounded-xl bg-[#F26334]/8 border border-[#F26334]/20 px-3 py-2.5">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            <span className="font-semibold text-[#F26334]">{t("meta.organization")}</span>
            {" — "}{sections.length} {t("meta.sectionsCount")}
          </p>
        </div>
      </div>
    </aside>
  );
}
