"use client";

import { useState } from "react";
import { VERIFY_TABS } from "./verify";
import ProductPanel from "./ProductPanel";
import LocationPanel from "./LocationPanel";
import OtherKeysPanel from "./OtherKeysPanel";
import CompanyPanel from "./CompanyPanel";

export default function VerifyTabs() {
  const [activeTab, setActiveTab] = useState("product");

  return (
    <>
      {/* Matches screenshot: light clean area for tabs */}
      <div className="bg-background relative bg-[#f9fafc]/50 pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav
            className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-3 md:grid-cols-4 lg:gap-6"
            aria-label="Verify section navigation"
          >
            {VERIFY_TABS.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    group relative flex flex-col items-center justify-center gap-3
                    rounded-xl px-4 py-8 text-center
                    transition-all duration-300 ease-out
                    select-none outline-none focus-visible:ring-2 focus-visible:ring-[#002C6C]/40
                    ${
                      isActive
                        ? [
                            // Active dark blue with golden icon
                            "bg-[linear-gradient(225deg,transparent_24px,#002C6C_0)]",
                            "drop-shadow-[0_8px_16px_rgba(0,44,108,0.25)]",
                            "scale-[1.02] z-10",
                          ].join(" ")
                        : [
                            // Inactive white card with cut corner
                            "bg-[linear-gradient(225deg,transparent_24px,#ffffff_0)]",
                            "drop-shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
                            "hover:drop-shadow-[0_8px_20px_rgba(0,44,108,0.12)] hover:-translate-y-1",
                            "active:scale-[0.98]",
                          ].join(" ")
                    }
                  `}
                >
                  {/* Icon wrapper */}
                  <div
                    className={`
                      flex h-12 w-12 items-center justify-center transition-colors duration-300
                      ${
                        isActive
                          ? "text-[#eab308]" // golden-yellow icon on dark navy
                          : "text-[#002C6C] group-hover:text-[#0b1c5c]"
                      }
                    `}
                  >
                    <span
                      className={`block bg-current ${
                        tab.id === "product"
                          ? "h-8 w-10"
                          : tab.id === "location" || tab.id === "other"
                            ? "h-9 w-7"
                            : "h-8 w-6"
                      }`}
                      style={{
                        maskImage: `url(${tab.icon})`,
                        WebkitMaskImage: `url(${tab.icon})`,
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                      }}
                    />
                  </div>

                  {/* Label container */}
                  <div className="flex flex-col items-center justify-center gap-1">
                    {/* Label */}
                    <span
                      className={`text-[15px] font-bold tracking-tight transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-[#002C6C] group-hover:text-[#0b1c5c]"
                      }`}
                    >
                      {tab.label}
                    </span>

                    {/* Subtitle / description */}
                    <span
                      className={`text-[13px] leading-snug transition-colors duration-300 ${
                        isActive
                          ? "text-[#e2e8f0]" // lighter text for active states
                          : "text-slate-500 group-hover:text-slate-600"
                      }`}
                    >
                      {tab.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === "product" && <ProductPanel />}
        {activeTab === "location" && <LocationPanel />}
        {activeTab === "other" && <OtherKeysPanel />}
        {activeTab === "company" && <CompanyPanel />}
      </div>
    </>
  );
}
