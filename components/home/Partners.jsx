"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";
import { partners as dataPartners } from "./data";
import { useTranslations } from "next-intl";

export function Partners() {
  const t = useTranslations("home");
  const sliderRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const dragX = useMotionValue(0);

  const animationRef = useRef(null);
  const lastTimestampRef = useRef(0);
  const SCROLL_SPEED = 120; // pixels per second

  const allPartners = [...dataPartners, ...dataPartners];

  useEffect(() => {
    if (sliderRef.current) {
      setWidth(sliderRef.current.scrollWidth / 2);
    }
  }, []);

  const startInfiniteScroll = useCallback(() => {
    if (!width || isDragging || isHoveringCard) return;

    let startTime = null;

    const step = (now) => {
      if (!width || isDragging || isHoveringCard) {
        animationRef.current = null;
        return;
      }

      if (startTime === null) {
        startTime = now;
        lastTimestampRef.current = now;
        animationRef.current = requestAnimationFrame(step);
        return;
      }

      const delta = Math.min(100, now - lastTimestampRef.current);
      if (delta > 0) {
        const move = (SCROLL_SPEED * delta) / 1000;
        let newX = dragX.get() - move;

        if (newX <= -width) {
          newX += width;
        }
        dragX.set(newX);
        lastTimestampRef.current = now;
      }

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
  }, [width, isDragging, isHoveringCard, dragX]);

  useEffect(() => {
    if (width === 0 || isDragging || isHoveringCard) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    startInfiniteScroll();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [width, isDragging, isHoveringCard, startInfiniteScroll]);

  const handleDragStart = () => {
    setIsDragging(true);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleCardHoverStart = () => setIsHoveringCard(true);
  const handleCardHoverEnd = () => setIsHoveringCard(false);

  const [imgErrors, setImgErrors] = useState({});

  return (
    <section className="py-12 my-8 md:py-16 md:my-16 bg-white overflow-hidden">
      <style jsx>{`
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
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="w-full max-w-5xl mx-auto px-4 mb-8 md:mb-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          {t("partners.title")}
        </h2>
      </div>

      <div className="slider-container relative w-full" dir="ltr">
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 lg:w-48 z-10 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 lg:w-48 z-10 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />

        <motion.div
          ref={sliderRef}
          className="flex cursor-grab active:cursor-grabbing no-scrollbar"
          style={{ x: dragX }}
          drag="x"
          dragConstraints={{ left: -width, right: 0 }}
          dragElastic={0.1}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {allPartners.map((partner, index) => {
            const hasError = imgErrors[index];

            return (
              <div
                key={index}
                className="mx-2 md:mx-4"
                onMouseEnter={handleCardHoverStart}
                onMouseLeave={handleCardHoverEnd}
              >
                <div className="flip-card h-40 w-40 md:h-48 md:w-48">
                  <div className="flip-card-inner">
                    <div className="flip-front p-4 md:p-8">
                      {!hasError ? (
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <div className="text-xs text-center text-gray-500 font-bold">
                          {partner.name}
                        </div>
                      )}
                    </div>
                    <div className="flip-back p-4 md:p-6">
                      <p className="text-[9px] md:text-[11px] font-bold leading-tight mb-1 md:mb-2 uppercase">
                        {t(`partners.names.${partner.name}`, { fallback: partner.name })}
                      </p>
                      <p className="text-[8px] md:text-[9px] text-blue-200 tracking-widest uppercase mb-2 md:mb-4">
                        {t(`partners.categories.${partner.category}`, { fallback: partner.category })}
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
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}