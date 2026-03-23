// "use client";
// import { useState, useEffect, useCallback, useRef } from "react";
// import Image from "next/image";
// import { Link } from "@/i18n/routing";
// import { slides as dataSlides } from "./data";
// import { ArrowRight } from "lucide-react";
// import { useTranslations, useLocale } from "next-intl";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { motion, AnimatePresence } from "framer-motion";

// const SLIDE_DURATION = 9000;

// const contentVariants = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.12, delayChildren: 0.3 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 28 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// export default function Hero() {
//   const t = useTranslations("home");
//   const locale = useLocale();
//   const isRTL = locale === "ar";
//   const translatedSlides = t.raw("hero.slides");

//   const slides = dataSlides.map((slide, index) => ({
//     ...slide,
//     ...translatedSlides[index],
//   }));

//   const [current, setCurrent] = useState(0);
//   const timerRef = useRef(null);

//   const goTo = useCallback(
//     (index) => {
//       setCurrent(((index % slides.length) + slides.length) % slides.length);
//     },
//     [slides.length],
//   );

//   const goNext = useCallback(() => goTo(current + 1), [current, goTo]);

//   const resetTimer = useCallback(() => {
//     if (timerRef.current) clearInterval(timerRef.current);
//     timerRef.current = setInterval(goNext, SLIDE_DURATION);
//   }, [goNext]);

//   useEffect(() => {
//     resetTimer();
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [resetTimer]);

//   const handleDot = (i) => {
//     goTo(i);
//     resetTimer();
//   };

//   return (
//     <section className="relative max-w-full mx-auto h-[320px] lg:max-h-[96vh] overflow-hidden bg-[#002C6C]">
//       {/* ════════════════════════════════════════
//           MOBILE  ( < md )
//           Full-width background image with
//           a directional gradient overlay so
//           text stays readable.
//          ════════════════════════════════════════ */}
//       <div className="md:hidden absolute inset-0">
//         <AnimatePresence mode="sync">
//           <motion.div
//             key={`mob-img-${current}`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.9, ease: "easeInOut" }}
//             className="absolute inset-0"
//           >
//             <div className="absolute inset-0">
//               <Image
//                 src={slides[current].image}
//                 alt={slides[current].title}
//                 fill
//                 className="object-cover"
//                 priority
//                 sizes="100vw"
//                 unoptimized
//               />
//             </div>

//             {/* Directional gradient overlay */}
//             <div
//               className={cn(
//                 "absolute inset-0",
//                 isRTL
//                   ? "bg-linear-to-l from-[#002C6C]/95 via-[#002C6C]/75 to-[#002C6C]/30"
//                   : "bg-linear-to-r from-[#002C6C]/95 via-[#002C6C]/75 to-[#002C6C]/30",
//               )}
//             />
//             {/* Bottom vignette */}
//             <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-[#001a42]/60 to-transparent" />
//           </motion.div>
//         </AnimatePresence>

//         {/* Mobile content */}
//         <div className="absolute inset-0 flex items-center">
//           <div
//             className={cn(
//               "px-6 w-full max-w-sm",
//               isRTL && "ml-auto mr-4 text-right",
//             )}
//           >
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={`mob-content-${current}`}
//                 variants={contentVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit={{ opacity: 0, transition: { duration: 0.25 } }}
//                 className="space-y-4"
//               >
//                 {/* Heading */}
//                 <motion.h1
//                   variants={itemVariants}
//                   className="text-2xl font-extrabold leading-tight text-white drop-shadow-md"
//                 >
//                   {slides[current].title}
//                   {slides[current].highlight && (
//                     <span className="text-[#F26334]">
//                       {slides[current].highlight}
//                     </span>
//                   )}
//                 </motion.h1>

//                 {/* Description */}
//                 <motion.p
//                   variants={itemVariants}
//                   className="text-sm text-white/75 leading-relaxed line-clamp-3"
//                 >
//                   {slides[current].description}
//                 </motion.p>

//                 {/* CTA Buttons */}
//                 <motion.div
//                   variants={itemVariants}
//                   className={cn(
//                     "flex flex-wrap gap-2 pt-1",
//                     isRTL && "justify-end",
//                   )}
//                 >
//                   <Button
//                     size="sm"
//                     className="bg-[#F26334] hover:bg-[#d9522a] text-white font-semibold rounded-full px-5 h-9 shadow-lg shadow-[#F26334]/30 transition-all duration-200 hover:-translate-y-0.5"
//                     asChild
//                   >
//                     <a
//                       href={process.env.NEXT_PUBLIC_MEMBER_REGISTER}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {slides[current].primaryCta}
//                       <ArrowRight className="ml-1.5 h-3.5 w-3.5 rtl:ml-0 rtl:mr-1.5 rtl:-scale-x-100" />
//                     </a>
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     className="bg-transparent border-white/50 text-white hover:bg-white hover:text-[#002C6C] font-semibold rounded-full px-5 h-9 transition-all duration-200 hover:-translate-y-0.5"
//                     asChild
//                   >
//                     <Link href="/services">{slides[current].secondaryCta}</Link>
//                   </Button>
//                 </motion.div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>

//       {/* ════════════════════════════════════════
//           DESKTOP  ( md+ )
//           Split layout parallel chevron
//          ════════════════════════════════════════ */}
//       <div className="hidden md:block absolute inset-0 overflow-hidden bg-muted">
//         {/* Base Image Panel on the right (or left in RTL) */}
//         <AnimatePresence mode="sync">
//           <motion.div
//             key={`desk-img-${current}`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.0, ease: "easeInOut" }}
//             className={cn(
//               "absolute inset-y-0 z-0",
//               isRTL
//                 ? "left-0 w-[55%] lg:w-[60%]"
//                 : "right-0 w-[55%] lg:w-[60%]",
//             )}
//           >
//             <div className="absolute inset-0 bg-[#002C6C]/10 z-10 mix-blend-multiply pointer-events-none" />
//             <Image
//               src={slides[current].image}
//               alt={slides[current].title}
//               fill
//               className="object-cover object-center"
//               priority
//               sizes="60vw"
//               unoptimized
//             />
//           </motion.div>
//         </AnimatePresence>

//         {/* Outer Lighter Primary Chevron Layer */}
//         <div
//           className="absolute top-0 bottom-0 z-10 bg-[#002C6C]/75 backdrop-blur-sm transition-all duration-800 ease-in-out"
//           style={{
//             width: "55%",
//             ...(isRTL
//               ? {
//                   right: 0,
//                   clipPath: "polygon(100% 0, 0 0, 90px 50%, 0 100%, 100% 100%)",
//                 }
//               : {
//                   left: 0,
//                   clipPath:
//                     "polygon(0 0, 100% 0, calc(100% - 90px) 50%, 100% 100%, 0 100%)",
//                 }),
//           }}
//         />

//         {/* Inner Solid Blue Content Layer */}
//         <div
//           className={cn(
//             "absolute top-0 bottom-0 z-20 bg-[#002C6C] flex items-center transition-all duration-800 ease-in-out",
//             isRTL ? "pr-8 lg:pr-16 pl-[110px]" : "pl-8 lg:pl-16 pr-[110px]",
//           )}
//           style={{
//             width: "calc(55% - 40px)",
//             ...(isRTL
//               ? {
//                   right: 0,
//                   clipPath: "polygon(100% 0, 0 0, 90px 50%, 0 100%, 100% 100%)",
//                 }
//               : {
//                   left: 0,
//                   clipPath:
//                     "polygon(0 0, 100% 0, calc(100% - 90px) 50%, 100% 100%, 0 100%)",
//                 }),
//           }}
//         >
//           <div
//             className={cn(
//               "w-full max-w-xl lg:max-w-2xl",
//               isRTL && "text-right",
//             )}
//           >
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={`desk-content-${current}`}
//                 variants={contentVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit={{ opacity: 0, transition: { duration: 0.25 } }}
//                 className="space-y-3 lg:space-y-4"
//               >
//                 {/* Heading */}
//                 <motion.h1
//                   variants={itemVariants}
//                   className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight leading-tight text-white drop-shadow-sm"
//                 >
//                   {slides[current].title}
//                   {slides[current].highlight && (
//                     <span className="text-white/90 block mt-1 lg:mt-2">
//                       {slides[current].highlight}
//                     </span>
//                   )}
//                 </motion.h1>

//                 {/* Description */}
//                 <motion.p
//                   variants={itemVariants}
//                   className="text-sm md:text-base lg:text-[1.05rem] text-white/80 leading-relaxed line-clamp-3 max-w-2xl"
//                 >
//                   {slides[current].description}
//                 </motion.p>

//                 {/* CTA Buttons */}
//                 <motion.div
//                   variants={itemVariants}
//                   className={cn(
//                     "flex flex-wrap gap-3 pt-1",
//                     isRTL && "justify-end",
//                   )}
//                 >
//                   <Button
//                     size="default"
//                     className="bg-[#F26334] hover:bg-[#d9522a] text-white font-semibold rounded-full px-7 h-10 shadow-lg shadow-[#F26334]/30 transition-all duration-200 hover:-translate-y-0.5"
//                     asChild
//                   >
//                     <a
//                       href={process.env.NEXT_PUBLIC_MEMBER_REGISTER}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {slides[current].primaryCta}
//                       <ArrowRight className="ml-2 h-4 w-4 rtl:ml-0 rtl:mr-2 rtl:-scale-x-100" />
//                     </a>
//                   </Button>

//                   <Button
//                     size="default"
//                     variant="outline"
//                     className="bg-transparent border-white/50 text-white hover:bg-white hover:text-[#002C6C] font-semibold rounded-full px-7 h-10 transition-all duration-200 hover:-translate-y-0.5"
//                     asChild
//                   >
//                     <Link href="/services">{slides[current].secondaryCta}</Link>
//                   </Button>
//                 </motion.div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>

//       {/* ── Dot / pill slide indicators ── */}
//       <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
//         {slides.map((_, index) => (
//           <motion.button
//             key={index}
//             onClick={() => handleDot(index)}
//             aria-label={`Go to slide ${index + 1}`}
//             animate={{
//               width: index === current ? 32 : 10,
//               backgroundColor:
//                 index === current
//                   ? "rgba(242,99,52,1)"
//                   : "rgba(255,255,255,0.4)",
//             }}
//             whileHover={{
//               backgroundColor:
//                 index === current
//                   ? "rgba(242,99,52,1)"
//                   : "rgba(255,255,255,0.75)",
//             }}
//             transition={{ duration: 0.35, ease: "easeInOut" }}
//             className="h-2.5 rounded-full focus:outline-none cursor-pointer"
//           />
//         ))}
//       </div>

//       {/* ── Progress bar ── */}
//       <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
//         <motion.div
//           key={current}
//           className="h-full bg-[#F26334]/80"
//           initial={{ width: "0%" }}
//           animate={{ width: "100%" }}
//           transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
//         />
//       </div>
//     </section>
//   );
// }
