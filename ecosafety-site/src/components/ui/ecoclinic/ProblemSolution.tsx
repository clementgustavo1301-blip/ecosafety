"use client";

import { motion } from "framer-motion";
import { ThemeType, TabContent } from "@/data/tabContent";

const themeConfig = {
  saude: { bg: "bg-blue-600", border: "border-blue-500/30", label: "text-blue-200", dot: "bg-red-400" },
  incendio: { bg: "bg-amber-600", border: "border-amber-500/30", label: "text-amber-200", dot: "bg-red-400" },
  ambiental: { bg: "bg-emerald-600", border: "border-emerald-500/30", label: "text-emerald-200", dot: "bg-red-400" }
};

interface ProblemSolutionProps {
  theme: ThemeType;
  data: TabContent["problemSolution"];
}

export function ProblemSolution({ theme, data }: ProblemSolutionProps) {
  const config = themeConfig[theme];

  return (
    <section className="py-20 sm:py-28 bg-slate-900 border-t border-slate-800">
      <div className="mx-auto px-8 md:px-16 lg:px-32 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* O Problema */}
          <div className="flex flex-col">
            <h2 className="text-[11px] font-semibold text-slate-400 tracking-[0.2em] uppercase mb-3">
              {data.problemTitle}
            </h2>
            <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight leading-[1.12] mb-6">
              Apenas cumprir tabela <br className="hidden sm:block" />custa mais caro.
            </h3>
            <p className="text-base text-slate-400 font-light leading-relaxed max-w-md mb-10">
              {data.problemDesc}
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {data.painPoints.map((point, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-center gap-3 text-slate-300 font-light text-[12px] sm:text-[13px] py-2.5 px-3 border-l-2 border-red-400/40 bg-slate-800/30"
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* A Solução */}
          <div className={`flex flex-col p-6 sm:p-10 rounded-2xl border ${config.bg} ${config.border}`}>
            <div className="relative">
              <h2 className={`text-[11px] font-bold tracking-[0.2em] uppercase mb-3 ${config.label}`}>
                {data.solutionTitle}
              </h2>
              <p className="text-lg sm:text-xl font-medium text-white leading-snug mb-10">
                {data.solutionDesc}
              </p>

              <div className="space-y-6">
                {data.solutions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white mb-1.5">{item.title}</h4>
                      <p className="text-sm text-white/80 font-light leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
