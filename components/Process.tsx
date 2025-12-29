"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    title: "Clarify",
    description: "I start by clarifying the problem, not the solution. Understanding 'why' is more important than knowing 'how'.",
    label: "01"
  },
  {
    title: "Prototype",
    description: "I prototype early and expect to be wrong. I let real-world feedback and failure guide the technical direction.",
    label: "02"
  },
  {
    title: "Execute",
    description: "Progress beats perfection. I believe that true clarity only comes through movement and shipping.",
    label: "03"
  }
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax and Spring animations
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const blobRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const blobY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative px-6 md:px-24 py-40 bg-slate-50 overflow-hidden"
    >
      {/* --- CREATIVE BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        {/* 1. The Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `radial-gradient(#4f46e5 0.5px, transparent 0.5px), linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
            backgroundSize: '40px 40px, 80px 80px, 80px 80px',
          }} 
        />

        {/* 2. Animated Logic Blobs (The "Energy") */}
        <motion.div
          style={{ rotate: blobRotate, y: blobY }}
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[120px] mix-blend-multiply"
        />
        <motion.div
          style={{ rotate: -blobRotate, y: -blobY }}
          className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] mix-blend-multiply"
        />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-[0.3em]">
              Methodology.v1
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-8xl font-bold tracking-tight text-slate-900"
          >
            How I Think<span className="text-indigo-600">.</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Central Progress Line */}
          <div className="absolute left-0 top-0 w-[1px] h-full bg-slate-200 md:left-1/2" />
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-0 top-0 w-[2px] h-full bg-indigo-600 md:left-1/2 z-10"
          />

          <div className="space-y-52">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row items-center justify-between gap-12 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full md:w-[44%] z-10 group">
                  <div className="flex items-center gap-4 mb-8">
                     <span className="font-mono text-indigo-600 font-black text-2xl">
                       {step.label}
                     </span>
                     <div className="h-[1px] flex-1 bg-indigo-100 group-hover:bg-indigo-400 transition-colors duration-500" />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 mb-6 tracking-tighter">
                    {step.title}
                  </h3>
                  <p className="text-xl text-slate-500 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                {/* Vertical Connector "Node" */}
                <motion.div 
                  whileInView={{ 
                    scale: [0, 1.5, 1], 
                    backgroundColor: ["#fff", "#4f46e5", "#4f46e5"] 
                  }}
                  className="absolute left-[-5px] md:left-1/2 md:ml-[-5px] top-4 w-[10px] h-[10px] rounded-full border-2 border-white bg-indigo-600 z-20 shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                />
                
                <div className="hidden md:block w-[44%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Subtle Bottom Metadata */}
      <div className="absolute bottom-10 left-10 opacity-30 pointer-events-none">
        <p className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
          [ Movement === Clarity ]
        </p>
      </div>
    </section>
  );
}