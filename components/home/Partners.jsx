"use client";

import React from "react";
import { partners } from "./data";


export function Partners() {
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
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
        .flip-front, .flip-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 40px -15px rgba(0,0,0,0.1);
        }
        .flip-front {
          background: white;
          border: 1px solid #f1f5f9;
          padding: 35px;
        }
        .flip-back {
          background: linear-gradient(135deg, #002c5c 0%, #0052a5 100%);
          color: white;
          transform: rotateY(180deg);
          flex-direction: column;
          padding: 24px;
          text-align: center;
        }
      `}</style>

      <div className="w-full max-w-5xl mx-auto px-4 mb-16 text-center">
        <h2 className="text-3xl font-bold text-primary">Our Strategic Partners</h2>
      </div>

      <div className="slider-container relative w-full">
        {/* Gradients */}
        <div className="absolute inset-y-0 left-0 w-48 z-10 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-48 z-10 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />

        <div className="animate-scroll py-10">
          {duplicatedPartners.map((partner, index) => (
            <div key={index} className="mx-2 md:mx-4">
              <div className="flip-card h-40 w-40 md:h-48 md:w-48">
                <div className="flip-card-inner">
                  
                  {/* Front: Logo */}
                  <div className="flip-front">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Back: Info + Real Link */}
                  <div className="flip-back">
                    <p className="text-[11px] font-bold leading-tight mb-2 uppercase">
                      {partner.name}
                    </p>
                    <p className="text-[9px] text-blue-200 tracking-widest uppercase mb-4">
                      {partner.category}
                    </p>
                    
                    <a 
                      href={partner.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-5 py-2 bg-white text-[#002c5c] text-[10px] font-bold rounded-full hover:bg-blue-50 transition-colors duration-300 shadow-lg"
                    >
                      VIEW PROFILE
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