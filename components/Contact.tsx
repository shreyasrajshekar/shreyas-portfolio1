"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Github, Twitter, ArrowUpRight, Instagram, Linkedin } from "lucide-react";
import { useRef, useState } from "react";

// Magnetic Wrapper Component
const MagneticLink = ({ href, children, label, setHoveredLabel }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const dx = useSpring(x, springConfig);
  const dy = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    x.set((clientX - center.x) * 0.4); // 40% magnetic pull
    y.set((clientY - center.y) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHoveredLabel("");
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: dx, y: dy }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredLabel(label)}
      onMouseLeave={handleMouseLeave}
      className="relative p-6 rounded-full border border-slate-200 bg-white shadow-sm hover:border-indigo-500 hover:text-indigo-600 transition-colors duration-300 group"
    >
      <div className="relative z-10">{children}</div>
      <motion.div 
        layoutId="glow"
        className="absolute inset-0 rounded-full bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity" 
      />
    </motion.a>
  );
};

export default function Contact() {
  const [hoveredLabel, setHoveredLabel] = useState("");

  return (
    <section id="contact" className="relative px-6 md:px-16 py-40 overflow-hidden bg-white">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.05] select-none text-[20vw] font-black whitespace-nowrap">
        SAY HELLO
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Let’s talk<span className="text-indigo-600">.</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            Whether you have a question or just want to discuss a build, my inbox is always open.
          </p>
        </motion.div>

        {/* Magnetic Icons */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <MagneticLink 
            href="mailto:rajshekarshreyas26@gmail.com" 
            label="rajshekarshreyas26@gmail.com" 
            setHoveredLabel={setHoveredLabel}
          >
            <Mail size={32} />
          </MagneticLink>

          <MagneticLink 
            href="https://github.com/shreyasrajshekar" 
            label="/shreyasrajshekar" 
            setHoveredLabel={setHoveredLabel}
          >
            <Github size={32} />
          </MagneticLink>

          <MagneticLink 
            href="https://www.instagram.com/shreyas.r_26/" 
            label="shreyas.r_26" 
            setHoveredLabel={setHoveredLabel}
          >
            <Instagram size={32} />
          </MagneticLink>
          <MagneticLink 
            href="https://www.linkedin.com/in/shreyas-rajashekar-me/" 
            label="shreyas-rajashekar-me" 
            setHoveredLabel={setHoveredLabel}
          >
            <Linkedin size={32} />
          </MagneticLink>
        </div>

        {/* Dynamic Hover Label Reveal */}
        <div className="h-10 text-center">
          <motion.div
            key={hoveredLabel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-2 text-indigo-600 font-mono font-medium tracking-wider"
          >
            {hoveredLabel && (
              <>
                {hoveredLabel} <ArrowUpRight size={16} />
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}