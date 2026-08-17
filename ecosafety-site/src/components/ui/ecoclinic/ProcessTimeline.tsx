"use client";

import { motion } from "framer-motion";
import { ThemeType, TabContent } from "@/data/tabContent";

const themeConfig = {
  saude: { label: "text-blue-600", border: "bg-slate-200", number: "text-slate-200" },
  incendio: { label: "text-amber-600", border: "bg-amber-200/50", number: "text-amber-100" },
  ambiental: { label: "text-emerald-600", border: "bg-emerald-200/50", number: "text-emerald-100" }
};

interface ProcessTimelineProps {
  theme: ThemeType;
  data: TabContent["howItWorks"];
}

export function ProcessTimeline({ theme, data }: ProcessTimelineProps) {
  const config = themeConfig[theme];

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto px-8 md:px-16 lg:px-32 max-w-[1440px]">
        
        {/* Header */}
        <div className="max-w-xl mb-16 sm:mb-20">
          <p className={`text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 ${config.label}`}>
            {data.label}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.12] mb-4">
            {data.title}
          </h2>
          <p className="text-base text-slate-500 font-light leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className={`absolute left-[2.75rem] sm:left-[3.5rem] top-0 bottom-0 w-px ${config.border}`} />

          <div className="space-y-12 sm:space-y-16">
            {data.steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-start gap-6 sm:gap-10"
              >
                {/* Number */}
                <div className="relative z-10 shrink-0 w-[5.5rem] sm:w-[7rem] flex items-center justify-center">
                  <span className={`text-5xl sm:text-7xl font-extralight tracking-tighter select-none ${config.number}`}>
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-2 sm:pt-4 pb-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-500 font-light leading-relaxed max-w-lg">
                    {step.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
