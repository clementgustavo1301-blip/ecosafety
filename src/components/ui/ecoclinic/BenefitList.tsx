"use client";

import { motion } from "framer-motion";
import { ThemeType, TabContent } from "@/data/tabContent";

const themeConfig = {
  saude: { label: "text-blue-600", icon: "text-blue-500" },
  incendio: { label: "text-amber-600", icon: "text-amber-500" },
  ambiental: { label: "text-emerald-600", icon: "text-emerald-500" }
};

interface BenefitListProps {
  theme: ThemeType;
  data: TabContent["benefits"];
}

export function BenefitList({ theme, data }: BenefitListProps) {
  const config = themeConfig[theme];

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto px-8 md:px-16 lg:px-32 max-w-[1440px]">
        
        {/* Header */}
        <div className="max-w-xl mb-14 sm:mb-16">
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

        {/* Editorial 2-column list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 lg:gap-x-20">
          {data.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="flex items-center gap-4 py-5 border-b border-slate-100"
            >
              <item.icon size={20} className={`shrink-0 ${config.icon}`} />
              <span className="text-sm sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
