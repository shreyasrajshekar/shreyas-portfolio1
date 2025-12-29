"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const reduce = useReducedMotion();

  // Smooth out the mouse movement with springs
  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);

  const mx = useSpring(xValue, { stiffness: 150, damping: 20 });
  const my = useSpring(yValue, { stiffness: 150, damping: 20 });

  // 3D Tilt values
  const rotateX = useTransform(my, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-7, 7]);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width - 0.5;
    const y = (e.clientY - bounds.top) / bounds.height - 0.5;
    xValue.set(x);
    yValue.set(y);
  }

  function onLeave() {
    xValue.set(0);
    yValue.set(0);
  }

  return (
    <motion.article
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : onLeave}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }as any}
      className="group relative w-[320px] md:w-[400px] bg-white/80 backdrop-blur-sm border border-slate-200 p-8 transition-colors hover:border-indigo-500/50 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      {/* 1. Animated Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-200 group-hover:border-indigo-500 transition-colors duration-500" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-200 group-hover:border-indigo-500 transition-colors duration-500" />

      {/* 2. Content with 3D Translation */}
      <div style={{ transform: "translateZ(30px)" }}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900">
            {project.title}
          </h3>
          <motion.div 
            whileHover={{ scale: 1.2, rotate: 45 }}
            className="text-slate-300 group-hover:text-indigo-500 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.64645 11.3536L11.3536 3.64645M11.3536 3.64645H5.5M11.3536 3.64645V9.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-8 h-12 overflow-hidden line-clamp-2">
          {project.problem}
        </p>

        {/* 3. Interactive Tech Tags */}
        <div className="flex gap-2 flex-wrap">
          {project.tech.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0.8 }}
              whileHover={{ 
                opacity: 1, 
                backgroundColor: "#eef2ff", 
                color: "#4f46e5",
                y: -2 
              }}
              className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-50 text-slate-500 border border-slate-100 transition-colors"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>

      {/* 4. Subtle Background "Glow" on Hover */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-indigo-50/0 to-indigo-50/0 group-hover:from-indigo-50/50 group-hover:to-white transition-all duration-500" />
    </motion.article>
  );
}