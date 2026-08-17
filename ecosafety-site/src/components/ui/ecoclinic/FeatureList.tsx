"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ThemeType, TabContent } from "@/data/tabContent";

const themeConfig = {
  saude: { label: "text-blue-600", dot: "text-slate-500", dotBg: "bg-slate-100", plus: "text-blue-400", plusBg: "bg-blue-500/15" },
  incendio: { label: "text-amber-600", dot: "text-slate-500", dotBg: "bg-slate-100", plus: "text-amber-400", plusBg: "bg-amber-500/15" },
  ambiental: { label: "text-emerald-600", dot: "text-slate-500", dotBg: "bg-slate-100", plus: "text-emerald-400", plusBg: "bg-emerald-500/15" }
};

interface FeatureListProps {
  theme: ThemeType;
  data: TabContent["features"];
}

export function FeatureList({ theme, data }: FeatureListProps) {
  const config = themeConfig[theme];

  return (
    <section className="py-20 sm:py-28 bg-slate-50">
      <div className="mx-auto px-8 md:px-16 lg:px-32 max-w-[1440px]">
        
        {/* Header */}
        <div className="max-w-2xl mb-14 sm:mb-16">
          <p className={`text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 ${config.label}`}>
            {data.label}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.12] mb-4">
            {data.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Features Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Base Operacional */}
          <div className="flex flex-col p-8 sm:p-10 rounded-2xl bg-white border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-8 pb-4 border-b border-slate-100">
              {data.baseTitle}
            </h3>
            <ul className="space-y-5">
              {data.baseItems.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-start gap-3.5"
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${config.dotBg}`}>
                    <Check size={12} className={config.dot} />
                  </div>
                  <span className="text-sm sm:text-[15px] text-slate-600 font-light leading-relaxed">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Camada de Inteligência */}
          <div className="flex flex-col p-8 sm:p-10 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-700/50">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.plusBg}`}>
                <span className={`text-xs font-bold ${config.plus}`}>+</span>
              </div>
              <h3 className="text-lg font-semibold text-white">
                {data.intelligenceTitle}
              </h3>
            </div>
            <ul className="space-y-5">
              {data.intelligenceItems.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-start gap-3.5"
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${config.plusBg}`}>
                    <Check size={12} className={config.plus} />
                  </div>
                  <span className="text-sm sm:text-[15px] text-slate-400 font-light leading-relaxed">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
