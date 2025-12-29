"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";


import { useRef, useEffect } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const rotateX = useTransform(smoothY, [-1, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const lines = [
    { 
      text: "I build software by", 
      style: "font-light text-slate-900" 
    },
    { 
      text: "thinking deeply,", 
      style: "font-serif italic text-indigo-600" // Fixed: Applied color here
    },
    { 
      text: "then executing fast.", 
      style: "font-black tracking-tighter text-slate-900" 
    },
  ];

  return (
    
    <section
      ref={containerRef}
      className="relative min-h-[110vh] flex items-center px-6 md:px-24 bg-white overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{
          y: textY,
          opacity: textOpacity,
          rotateX: isReduced ? 0 : rotateX,
          rotateY: isReduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
          translateZ: 0,
        } as any}
        className="relative z-10 max-w-6xl w-full origin-center"
      >
        <div className="flex flex-col space-y-2">
          {lines.map((line, i) => (
            <div key={i} className="overflow-visible">
              <motion.h1
                initial={{ opacity: 0, filter: "blur(15px)", y: 30 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.15,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className={`${line.style} text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.95]`}
              >
                {line.text}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-12 flex flex-col md:flex-row md:items-end gap-96"
        >
          <p className="text-xl md:text-2xl text-slate-500 max-w-md leading-relaxed">
            Developer focused on <span className="text-slate-900 font-medium underline decoration-indigo-200 underline-offset-4">experimentation</span> and systems.
          </p>
          
          {/* Creative CTA with a "Magnetic" hover effect logic built-in via CSS */}
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 bg-slate-900 text-white rounded-full font-medium text-sm uppercase tracking-widest hover:bg-indigo-600 transition-colors duration-300 shadow-xl shadow-slate-200"
          >
            Explore Work
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Decorative Blur - Slightly more "active" looking */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-gradient-to-tr from-indigo-50 to-blue-50 rounded-full blur-[140px] -z-10 opacity-60" />
    </section>
  );
}