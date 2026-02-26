// components/verify/ui.jsx  – shared presentational atoms (Client-safe, no hooks)
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { STATUS_CONFIG } from "./verify";

// ── Status dot + label ────────────────────────────────────────
export function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.default;
  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold ${cfg.text}`}>
      <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ── Label / Value row ─────────────────────────────────────────
export function InfoRow({ label, value }) {
  return (
    <div>
      <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-semibold text-foreground break-words">
        {value || "—"}
      </p>
    </div>
  );
}

// ── Card wrapper ──────────────────────────────────────────────
export function SectionCard({ title, icon, children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 shadow-sm ${className}`}
    >
      {title && (
        <div className="mb-5 flex items-center gap-3">
          {icon && (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-lg">
              {icon}
            </div>
          )}
          <h3 className="text-lg font-bold text-[#002C6C] dark:text-foreground">
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
}

// ── Empty / placeholder state ─────────────────────────────────
export function EmptyState({ icon, title, description, example }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in duration-300">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-border bg-card text-5xl shadow-sm">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
      <p className="mb-4 max-w-sm text-muted-foreground">{description}</p>
      {example && (
        <code className="rounded-full border border-border bg-muted px-4 py-1.5 text-xs text-muted-foreground">
          {example}
        </code>
      )}
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────
export function ErrorState({ message, onRetry }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30">
      <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
      <h3 className="mb-2 text-lg font-semibold text-red-700 dark:text-red-400">
        Something went wrong
      </h3>
      <p className="mb-5 text-sm text-red-600 dark:text-red-400/80">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-red-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// ── Loading spinner ───────────────────────────────────────────
export function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="relative h-16 w-16">
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-[#002C6C]/20 border-t-[#002C6C]" />
        <span className="absolute inset-2 animate-spin rounded-full border-4 border-[#F26334]/20 border-t-[#F26334] [animation-direction:reverse]" />
      </div>
      <p className="text-sm text-muted-foreground">Fetching data…</p>
    </div>
  );
}

// ── Verified / not-found banner ───────────────────────────────
export function VerifiedBanner({ gtin, isActive, isExpired, daysRemaining }) {
  const ok = isActive && !isExpired;
  return (
    <div
      className={`flex items-center justify-between rounded-2xl p-5 text-white ${
        ok
          ? "bg-gradient-to-r from-green-500 to-emerald-600"
          : "bg-gradient-to-r from-red-500 to-orange-600"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
          {ok ? (
            <CheckCircle className="h-6 w-6" />
          ) : (
            <XCircle className="h-6 w-6" />
          )}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
            Verified by GS1 Saudi Arabia
          </p>
          <p className="font-mono text-lg font-bold">{gtin}</p>
        </div>
      </div>
      <div
        className={`rounded-full px-4 py-1.5 text-sm font-bold ${
          isExpired
            ? "bg-red-700/70"
            : ok
            ? "bg-white/20"
            : "bg-yellow-500/80"
        }`}
      >
        {isExpired ? "Expired" : ok ? `${daysRemaining}d left` : "Inactive"}
      </div>
    </div>
  );
}