// components/verify/VerifyTabs.jsx  (Client Component)
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { VERIFY_TABS } from "./verify";

// Lucide-style SVG icons matching the screenshot's icon style
const TAB_ICONS = {
  product: (
    // Barcode / GTIN icon
    <svg viewBox="0 0 40 28" fill="none" className="h-8 w-10" aria-hidden>
      <rect x="0"  y="0" width="2.5" height="28" rx="1" fill="currentColor"/>
      <rect x="5"  y="0" width="1.5" height="28" rx="1" fill="currentColor"/>
      <rect x="9"  y="0" width="3"   height="28" rx="1" fill="currentColor"/>
      <rect x="15" y="0" width="1.5" height="28" rx="1" fill="currentColor"/>
      <rect x="19" y="0" width="2.5" height="28" rx="1" fill="currentColor"/>
      <rect x="24" y="0" width="1.5" height="28" rx="1" fill="currentColor"/>
      <rect x="28" y="0" width="3"   height="28" rx="1" fill="currentColor"/>
      <rect x="34" y="0" width="1.5" height="28" rx="1" fill="currentColor"/>
      <rect x="37.5" y="0" width="2.5" height="28" rx="1" fill="currentColor"/>
    </svg>
  ),
  location: (
    // Map pin icon
    <svg viewBox="0 0 24 28" fill="none" className="h-9 w-7" aria-hidden>
      <path
        d="M12 0C7.03 0 3 4.03 3 9c0 6.75 9 19 9 19s9-12.25 9-19c0-4.97-4.03-9-9-9z"
        fill="currentColor"
      />
      <circle cx="12" cy="9" r="3.2" fill="white" fillOpacity="0.9"/>
    </svg>
  ),
  other: (
    // Building / keys icon
    <svg viewBox="0 0 24 28" fill="none" className="h-9 w-7" aria-hidden>
      <rect x="3" y="10" width="18" height="18" rx="1" fill="currentColor"/>
      <rect x="7" y="4"  width="10" height="8"  rx="1" fill="currentColor"/>
      <rect x="9"  y="15" width="2.5" height="3.5" rx="0.5" fill="white" fillOpacity="0.9"/>
      <rect x="13" y="15" width="2.5" height="3.5" rx="0.5" fill="white" fillOpacity="0.9"/>
      <rect x="9"  y="21" width="2.5" height="3.5" rx="0.5" fill="white" fillOpacity="0.9"/>
      <rect x="13" y="21" width="2.5" height="3.5" rx="0.5" fill="white" fillOpacity="0.9"/>
    </svg>
  ),
};

export default function VerifyTabs() {
  const pathname = usePathname();

  return (
    // Matches screenshot: white bg, subtle bottom border, no sticky to keep layout clean
    <div className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 
          Card-style tabs — grid that collapses to horizontal scroll on mobile.
          Each card: white bg, rounded corners, icon on top, bold label, muted subtitle.
          Active: #002C6C navy fill, white text, slightly elevated.
          Hover (non-active): very light blue-gray tint, navy text, subtle lift.
        */}
        <nav
          className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-3"
          aria-label="Verify section navigation"
        >
          {VERIFY_TABS.map((tab) => {
            const isActive =
              pathname === tab.href || pathname.startsWith(tab.href + "/");

            return (
              <Link
                key={tab.id}
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={`
                  group relative flex flex-col items-center justify-center gap-2
                  rounded-2xl border px-4 py-5 text-center
                  transition-all duration-200 ease-out
                  select-none outline-none focus-visible:ring-2 focus-visible:ring-[#002C6C]/40

                  ${isActive
                    /* ── Active: navy fill ────────────────────────────── */
                    ? [
                        "border-[#002C6C] bg-[#002C6C]",
                        "shadow-lg shadow-[#002C6C]/25",
                        "scale-[1.02]",
                      ].join(" ")
                    /* ── Inactive: white card with hover ─────────────── */
                    : [
                        "border-border bg-card",
                        // hover: lift + very light navy tint — clearly different from active
                        "hover:border-[#002C6C]/30 hover:bg-[#f0f4fa] hover:shadow-md hover:shadow-[#002C6C]/8 hover:-translate-y-0.5",
                        // active press
                        "active:scale-[0.98] active:shadow-sm",
                      ].join(" ")
                  }
                `}
              >
                {/* Icon wrapper */}
                <div
                  className={`
                    flex h-12 w-12 items-center justify-center transition-colors duration-200
                    ${isActive
                      ? "text-[#cd3c0d]"   // golden-yellow icon on dark navy — matches screenshot
                      : "text-[#002C6C]/70 group-hover:text-[#002C6C]"
                    }
                  `}
                >
                  {TAB_ICONS[tab.id]}
                </div>

                {/* Label */}
                <span
                  className={`text-sm font-bold leading-tight transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-[#002C6C] group-hover:text-[#002C6C]"
                  }`}
                >
                  {tab.label}
                </span>

                {/* Subtitle / description */}
                <span
                  className={`text-xs leading-snug transition-colors duration-200 ${
                    isActive
                      ? "text-white/70"
                      : "text-muted-foreground group-hover:text-[#002C6C]/60"
                  }`}
                >
                  {tab.description}
                </span>

                {/* Active underline accent at bottom of card */}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-1/2 h-1 w-10 -translate-x-1/2 rounded-t-full bg-[#F26334]"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}