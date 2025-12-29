"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

export default function Signature() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax for the background quote
  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const xRight = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const quote = "“Most of my best work started as     something I wasn’t qualified to build.”";

  return (
    <section 
      ref={containerRef} 
      className="relative px-6 md:px-16 py-48 bg-white overflow-hidden flex items-center justify-center"
    >
      {/* 1. KINETIC WATERMARK: Drifting text in the background */}
      <div className="absolute inset-0 flex flex-col justify-center gap-8 pointer-events-none opacity-[0.03] select-none uppercase font-black italic">
        <motion.span style={{ x: xLeft }} className="text-[15vw] whitespace-nowrap">
          PUSH BEYOND LIMITS PUSH BEYOND LIMITS
        </motion.span>
        <motion.span style={{ x: xRight }} className="text-[15vw] whitespace-nowrap text-right">
          DIDN'T WAIT , DIDN'T ASK
        </motion.span>
      </div>

      <div className="relative z-10 max-w-5xl text-center">
        {/* 2. THE QUOTE: Animated Letter by Letter */}
        <motion.h2 
          className="font-display text-4xl md:text-6xl leading-[1.1] tracking-tight text-slate-900"
        >
          {quote.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.02,
                ease: [0.2, 0.65, 0.3, 0.9],
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h2>

        {/* 3. THE "CRAZY" DECORATION: A living underline */}
        <div className="mt-12 flex flex-col items-center">
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: "120px", opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 1, ease: "circOut" }}
            className="h-[2px] bg-indigo-600 relative"
          >
            {/* Pulsing end-point */}
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-600 shadow-[0_0_10px_#4f46e5]"
            />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 2 }}
            className="mt-6 font-mono text-xs uppercase tracking-[0.5em] text-slate-400"
          >
            — SHREYAS RAJASHEKAR
          </motion.p>
        </div>
      </div>

      {/* 4. GRAIN OVERLAY: Subtle texture for that "Film" look */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </section>
  );
}