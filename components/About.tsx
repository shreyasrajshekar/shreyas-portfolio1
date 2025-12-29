"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], [-60, 60]), {
    stiffness: 80,
    damping: 20
  });

  const paragraphs = [
    "I care about how things are built, not just what they look like.",
    "I enjoy breaking problems down, building rough versions quickly, learning from failures, and iterating until the solution feels inevitable.",
    "Most of my growth has come from building things before I felt ready."
  ];

  return (
    <section 
      ref={containerRef}
      className="relative px-6 md:px-24 py-32 md:py-48 overflow-hidden bg-white"
    >
      {/* Background Grid - Now even more subtle */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
      >
        <div className="absolute inset-0" style={{ 
          backgroundImage: `linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-indigo-600">
            01 // Philosophical approach
          </span>
          <div className="h-[1px] w-12 bg-indigo-100" />
        </motion.div>

        <div className="space-y-12">
          {paragraphs.map((text, i) => (
            <p
              key={i}
              className={`text-2xl md:text-4xl leading-snug tracking-tight ${
                i === 0 ? "text-slate-900 font-medium" : "text-slate-500"
              }`}
            >
              {text.split(" ").map((word, index) => {
                const isHighlight = ["inevitable.", "built,", "growth"].includes(word.toLowerCase());
                
                return (
                  <motion.span 
                    key={index} 
                    className={`inline-block mr-[0.25em] transition-colors duration-700 ${isHighlight ? "text-indigo-600" : ""}`}
                    initial={{ opacity: 0.2, y: 10, filter: "blur(0px)" }} // Blur removed/minimized
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-15% 0px -15% 0px" }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.02, // Staggered word entrance
                      ease: "easeOut" 
                    }}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </p>
          ))}
        </div>

        {/* Tech Stack - Clean & Snappy */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.03 }
            }
          }}
          className="mt-24 pt-12 border-t border-slate-100"
        >
          <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-8 ">
            Technical Stack
          </p>
          
          <div className="flex flex-wrap gap-x-6 gap-y-4 text-slate-900 font-medium italic max-w-3xl">
            {[
              "TypeScript", "Next.js", "React", "Tailwind", "Framer Motion", 
              "React Native (Expo)", "Node.js", "Supabase", "Gemini API", 
              "OpenAI", "Sensor-based AI", "Python", "Java", "C", 
              "Arduino", "Raspberry Pi", "Figma", "Blender"
            ].map((item) => (
              <motion.span
                key={item}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  show: { opacity: 1, scale: 1 }
                }}
                whileHover={{ 
                  y: -3,
                  color: "#4f46e5",
                }}
                className="text-base md:text-lg cursor-default whitespace-nowrap"
              >
                {item}
                <span className="ml-4 text-slate-200 not-italic font-light">/</span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}