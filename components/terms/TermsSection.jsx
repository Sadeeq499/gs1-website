// components/terms/TermsSection.jsx  — Server Component

// ─── helpers ────────────────────────────────────────────────
function multiline(text) {
  if (!text) return null;
  return text.split("\n\n").map((para, i) => (
    <p key={i} className={`text-[13.5px] leading-relaxed text-foreground/80 ${i > 0 ? "mt-3" : ""}`}>
      {para}
    </p>
  ));
}

// ─── Definition row (section 1) ─────────────────────────────
function DefRow({ item, index }) {
  const shaded = index % 2 === 0;
  return (
    <div
      className={`group relative rounded-xl border transition-colors duration-150 ${
        shaded
          ? "border-border/50 bg-muted/30 hover:border-[#002C6C]/20 hover:bg-[#f0f4fa]/70"
          : "border-transparent hover:border-border hover:bg-muted/20"
      }`}
    >
      {/* left accent bar */}
      <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-[#F26334] opacity-0 transition-opacity duration-150 group-hover:opacity-100" />

      <div className="flex gap-3.5 px-4 py-3.5">
        {/* clause number */}
        <span className="mt-[3px] flex h-[22px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#002C6C]/8 text-[10px] font-bold tracking-wide text-[#002C6C]/60 dark:bg-white/10 dark:text-white/40">
          {item.id}
        </span>

        <div className="min-w-0 flex-1">
          <span className="text-[13px] font-bold text-[#002C6C] dark:text-foreground">
            &ldquo;{item.term}&rdquo;&nbsp;
          </span>
          <span className="text-[13px] leading-relaxed text-foreground/75">
            {item.definition}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-clause row ──────────────────────────────────────────
function SubClause({ item }) {
  return (
    <div className="flex gap-3 rounded-lg border border-border/50 bg-muted/20 px-4 py-3">
      <span className="mt-[2px] flex h-5 w-11 shrink-0 items-center justify-center rounded bg-[#002C6C]/8 text-[10px] font-bold text-[#002C6C]/60">
        {item.id}
      </span>
      <div className="min-w-0 flex-1">
        {item.title && (
          <p className="mb-1 text-[12.5px] font-bold text-[#002C6C] dark:text-foreground">{item.title}</p>
        )}
        <p className="text-[13px] leading-relaxed text-foreground/75">{item.text}</p>
      </div>
    </div>
  );
}

// ─── Clause block ────────────────────────────────────────────
function ClauseBlock({ clause }) {
  const highlighted = clause.highlight;
  return (
    <div
      className={`rounded-xl border px-5 py-4 transition-colors ${
        highlighted
          ? "border-amber-300/60 bg-amber-50/60 dark:border-amber-700/30 dark:bg-amber-950/20"
          : "border-border/60 bg-card hover:border-[#002C6C]/20"
      }`}
    >
      <div className="flex gap-3.5">
        {/* clause number pill */}
        <span
          className={`mt-[2px] flex h-6 shrink-0 items-center justify-center rounded-full px-2.5 text-[10px] font-extrabold tracking-wide ${
            highlighted
              ? "bg-amber-400/20 text-amber-700 dark:text-amber-300"
              : "bg-[#002C6C]/8 text-[#002C6C]/60 dark:bg-white/10 dark:text-white/40"
          }`}
        >
          {clause.id}
        </span>

        <div className="min-w-0 flex-1 space-y-2">
          {clause.title && (
            <p className="text-[13px] font-bold text-[#002C6C] dark:text-foreground">
              {clause.title}
            </p>
          )}
          {multiline(clause.text)}
          {/* sub-clauses */}
          {clause.sub && clause.sub.length > 0 && (
            <div className="mt-3 space-y-2 pl-1">
              {clause.sub.map((s) => (
                <SubClause key={s.id} item={s} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────
export default function TermsSection({ section }) {
  return (
    <section id={`sec-${section.id}`} className="scroll-mt-6" aria-labelledby={`h-${section.id}`}>
      {/* Section header */}
      <div className="mb-5 flex items-start gap-3.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#002C6C] text-[13px] font-extrabold text-white shadow-sm">
          {section.number}
        </div>
        <div>
          <h2
            id={`h-${section.id}`}
            className="text-[17px] font-extrabold tracking-tight text-[#002C6C] dark:text-foreground sm:text-xl"
          >
            {section.title}
          </h2>
          {section.lead && (
            <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{section.lead}</p>
          )}
        </div>
      </div>

      {/* Definitions list */}
      {section.type === "definitions" && section.items && (
        <div className="space-y-1.5 pl-12">
          {section.items.map((item, idx) => (
            <DefRow key={item.id} item={item} index={idx} />
          ))}
        </div>
      )}

      {/* Clauses */}
      {section.type === "clauses" && section.clauses && (
        <div className="space-y-3 pl-12">
          {section.clauses.map((c) => (
            <ClauseBlock key={c.id} clause={c} />
          ))}
        </div>
      )}

      {/* Plain paragraphs */}
      {section.type === "paragraphs" && section.paragraphs && (
        <div className="space-y-3 pl-12">
          {section.paragraphs.map((p, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/60 bg-card px-5 py-4 text-[13.5px] leading-relaxed text-foreground/80"
            >
              {p}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
