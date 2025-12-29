"use client";

import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/data/projects";

import ProjectCard from "./ProjectCard";

export default function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Smooth out the horizontal movement
  const xRaw = useTransform(scrollYProgress, [0, 1], ["1%", "-70%"]);
  const x = useSpring(xRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section ref={targetRef} id="projects" className="relative h-[400vh] bg-[#f8f9fa]">
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Background Large Text (Light Mode Style) */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.4], [0.06, 0]),
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.8]) 
          }as any}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span className="text-[22vw] font-black text-slate-900 tracking-tighter">
            WORKS
          </span>
        </motion.div>

        <div className="relative z-10 w-full">
          {/* Header Area */}
          <div className="flex flex-col px-6 md:px-16 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-12 h-[1px] bg-indigo-600" />
              <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 uppercase">
                Case Studies
              </span>
            </motion.div>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-slate-900 tracking-tight">
              Selected Work
            </h2>
          </div>

          {/* Horizontal Track */}
          <motion.div style={{ x }} className="flex gap-5 px-6 md:px-16">
            {projects.map((p, i) => (
              <div key={p.title} className="group relative">
                {/* Minimalist Index */}
                <div className="flex items-baseline gap-2 mb-4 font-mono">
                  <span className="text-indigo-600 font-bold">0{i + 1}</span>
                  <span className="text-slate-300 text-xs uppercase tracking-widest">/ Project</span>
                </div>
                
                {/* Project Card Container */}
                <div className="w-[320px] md:w-[500px] shrink-0">
                  <motion.div 
                    whileHover={{ y: -12 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ProjectCard project={p} />
                  </motion.div>
                </div>
              </div>
            ))}
            
            {/* End of Gallery Callout */}
            <div className="w-[400px] flex flex-col justify-center items-start px-20 border-l border-slate-200 ml-10">
              <p className="text-slate-400 font-mono text-sm mb-2">// Next Chapter</p>
              <h3 className="text-3xl font-bold text-slate-900 mb-6 italic">Have an idea?</h3>
              <motion.a 
                href="#contact" 
                whileHover={{ x: 10 }}
                className="text-indigo-600 font-bold flex items-center gap-2 group"
              >
                Let's collaborate 
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Progress Bar (Architectural Style) */}
        <div className="absolute bottom-12 left-6 md:left-16 right-6 md:right-16 flex items-center gap-4">
          <span className="font-mono text-[10px] text-slate-400">0%</span>
          <div className="relative h-[1px] flex-1 bg-slate-200">
            <motion.div 
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }as any}
              className="absolute top-0 left-0 h-full bg-indigo-600 w-full"
            />
          </div>
          <span className="font-mono text-[10px] text-slate-400">100%</span>
        </div>
      </div>
    </section>
  );
}