"use client";

import { motion } from "framer-motion";
import { ThemeType, TabContent } from "@/data/tabContent";

const themeConfig = {
  saude: { dot: "bg-blue-500" },
  incendio: { dot: "bg-amber-500" },
  ambiental: { dot: "bg-emerald-500" }
};

interface TargetAudienceProps {
  theme: ThemeType;
  data: TabContent["target"];
}

export function TargetAudience({ theme, data }: TargetAudienceProps) {
  const config = themeConfig[theme];

  return (
    <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-100">
      <div className="mx-auto px-8 md:px-16 lg:px-32 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          <div className="flex-1 max-w-lg">
            <p className="text-[11px] font-semibold text-slate-400 tracking-[0.2em] uppercase mb-3">
              {data.label}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.12] mb-4">
              {data.title}
            </h2>
            <p className="text-base text-slate-500 font-light leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {data.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="flex items-center gap-3 py-4 px-1 border-b border-slate-200"
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
                  <span className="text-sm sm:text-[15px] font-medium text-slate-700">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
