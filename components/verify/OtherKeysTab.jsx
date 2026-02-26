// components/verify/OtherKeysTab.jsx  (Client Component)
"use client";

import { useState } from "react";
import { CheckCircle, Clock, Bell, Zap, Server, Cloud, Shield, BarChart, ArrowRight, Database } from "lucide-react";
import { AVAILABLE_KEYS, UPCOMING_KEYS, UPCOMING_FEATURES, ENTERPRISE } from "./verify";

const FEATURE_ICONS = {
  batch: <Server className="h-5 w-5" />,
  realtime: <Cloud className="h-5 w-5" />,
  security: <Shield className="h-5 w-5" />,
};

const FEATURE_COLORS = {
  blue: "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 [&_p]:text-blue-600 dark:[&_p]:text-blue-400",
  green: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 [&_p]:text-green-600 dark:[&_p]:text-green-400",
  purple: "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 [&_p]:text-purple-600 dark:[&_p]:text-purple-400",
};

export default function OtherKeysTab() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    console.log("subscribe:", email);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">

      {/* ── Available keys ─────────────────────────────────── */}
      <section>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#002C6C] dark:text-foreground">Currently Available</h2>
            <p className="text-sm text-muted-foreground">GS1 keys you can verify right now</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {AVAILABLE_KEYS.map((key) => (
            <div key={key.id}
              className="rounded-2xl border-2 border-green-500/25 bg-card p-6 shadow-sm transition hover:border-green-500/50 hover:shadow-md">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-[#002C6C] dark:text-foreground">{key.name}</span>
                  <p className="mt-0.5 text-sm text-muted-foreground">{key.description}</p>
                </div>
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
                  Live
                </span>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Code format</dt>
                  <dd className="font-mono font-bold text-[#002C6C] dark:text-blue-300">{key.code}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Length</dt>
                  <dd className="font-semibold">{key.length}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Example</dt>
                  <dd className="font-mono text-xs text-foreground/80">{key.example}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* ── Upcoming keys ──────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-dashed border-border bg-gradient-to-br from-card via-card to-accent/20 p-8">
        {/* decorative blobs */}
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F26334]/5 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#002C6C]/5 blur-3xl" />

        <div className="relative">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F26334]/10">
              <Zap className="h-5 w-5 text-[#F26334]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Coming Soon</h2>
              <p className="text-sm text-muted-foreground">Advanced GS1 key verification & platform features</p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Upcoming key types */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <Clock className="h-4 w-4" /> Upcoming Key Types
              </h3>
              <div className="space-y-3">
                {UPCOMING_KEYS.map((key) => (
                  <div key={key.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-card/60 px-4 py-3 backdrop-blur">
                    <div>
                      <span className="font-bold text-foreground">{key.name}</span>
                      <p className="text-xs text-muted-foreground">{key.description}</p>
                    </div>
                    <span className="rounded bg-yellow-500/10 px-2 py-0.5 text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                      Soon
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming platform features */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <BarChart className="h-4 w-4" /> Platform Features
              </h3>
              <div className="space-y-3">
                {UPCOMING_FEATURES.map((feat) => (
                  <div key={feat.id}
                    className={`rounded-xl border bg-gradient-to-r p-4 ${FEATURE_COLORS[feat.color]}`}>
                    <div className="mb-1 flex items-center gap-2 font-semibold">
                      {FEATURE_ICONS[feat.id]}
                      {feat.title}
                    </div>
                    <p className="text-sm">{feat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notify me */}
          <div className="mt-8 rounded-2xl border border-border bg-card/80 p-6 backdrop-blur">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F26334]/10">
                  <Bell className="h-6 w-6 text-[#F26334]" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Get notified when it launches</h4>
                  <p className="text-sm text-muted-foreground">Be the first to access new verification features.</p>
                </div>
              </div>

              {subscribed ? (
                <div className="flex items-center gap-2 font-semibold text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  Subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com" required
                    className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-[#F26334]/50 w-52" />
                  <button type="submit"
                    className="flex h-11 items-center gap-1.5 rounded-lg bg-[#F26334] px-5 text-sm font-semibold text-white transition hover:bg-[#d4522a]">
                    <Bell className="h-4 w-4" /> Notify me
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Enterprise CTA ──────────────────────────────────── */}
      <section className="rounded-2xl bg-[#002C6C] p-8 text-white">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 text-2xl font-bold">{ENTERPRISE.title}</h3>
            <p className="mb-6 text-white/80">{ENTERPRISE.body}</p>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-lg bg-[#F26334] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d4522a]">
                <ArrowRight className="h-4 w-4" />{ENTERPRISE.cta}
              </button>
              <button className="rounded-lg border-2 border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50">
                {ENTERPRISE.ctaSecondary}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Database className="h-5 w-5" />, title: "Batch Querying", desc: "Thousands of keys at once" },
              { icon: <Cloud className="h-5 w-5" />, title: "REST API", desc: "Seamless system integration" },
              { icon: <Shield className="h-5 w-5" />, title: "Security", desc: "Enterprise-grade protection" },
              { icon: <BarChart className="h-5 w-5" />, title: "Analytics", desc: "Comprehensive dashboards" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
                  {item.icon}
                </div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="mt-0.5 text-xs text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}