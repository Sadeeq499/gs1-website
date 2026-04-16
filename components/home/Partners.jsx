"use client";

import React from "react";
import { partners as dataPartners } from "./data";
import { useTranslations } from "next-intl";

export function Partners() {
  const t = useTranslations("home");

  return (
    <section className="py-12 my-8 md:py-16 md:my-16 bg-white overflow-hidden">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 80s linear infinite;
        }
        .slider-container:hover .animate-scroll {
          animation-play-state: paused;
        }
        .flip-card {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-front,
        .flip-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 40px -15px rgba(0, 0, 0, 0.1);
        }
        .flip-front {
          background: white;
          border: 1px solid #cbd5e1;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }
        .flip-back {
          background: linear-gradient(135deg, #002c5c 0%, #0052a5 100%);
          color: white;
          transform: rotateY(180deg);
          flex-direction: column;
          text-align: center;
        }
      `}</style>

      <div className="w-full max-w-5xl mx-auto px-4 mb-8 md:mb-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          {t("partners.title")}
        </h2>
      </div>

      <div className="slider-container relative w-full" dir="ltr">
        {/* Gradients */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 lg:w-48 z-10 bg-linear-to-r from-white via-white/80 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 lg:w-48 z-10 bg-linear-to-l from-white via-white/80 to-transparent pointer-events-none" />

        <div className="animate-scroll py-8 hover:pause">
          {[...dataPartners, ...dataPartners].map((partner, index) => (
            <div key={index} className="mx-2 md:mx-4">
              <div className="flip-card h-40 w-40 md:h-48 md:w-48">
                <div className="flip-card-inner">
                  {/* Front: Logo */}
                  <div className="flip-front p-4 md:p-8">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Back: Info + Real Link */}
                  <div className="flip-back p-4 md:p-6">
                    <p className="text-[9px] md:text-[11px] font-bold leading-tight mb-1 md:mb-2 uppercase">
                      {t(`partners.names.${partner.name}`)}
                    </p>
                    <p className="text-[8px] md:text-[9px] text-blue-200 tracking-widest uppercase mb-2 md:mb-4">
                      {t(`partners.categories.${partner.category}`)}
                    </p>

                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 md:px-5 md:py-2 bg-white text-[#002c5c] text-[9px] md:text-[10px] font-bold rounded-full hover:bg-blue-50 transition-colors duration-300 shadow-lg"
                    >
                      {t("partners.viewProfile")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
