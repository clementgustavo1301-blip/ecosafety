"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { ThemeType, TabContent } from "@/data/tabContent";

const themeConfig = {
  saude: { bg: "bg-slate-900", border: "border-slate-700", text: "text-slate-400", buttonBg: "bg-white", buttonText: "text-slate-900", buttonHover: "hover:bg-slate-100", secButtonText: "text-slate-300", secButtonHover: "hover:border-slate-500 hover:text-white" },
  incendio: { bg: "bg-amber-600", border: "border-amber-500/50", text: "text-amber-100", buttonBg: "bg-amber-900", buttonText: "text-white", buttonHover: "hover:bg-amber-800", secButtonText: "text-amber-100", secButtonHover: "hover:border-white hover:text-white" },
  ambiental: { bg: "bg-emerald-600", border: "border-emerald-500/50", text: "text-emerald-100", buttonBg: "bg-emerald-900", buttonText: "text-white", buttonHover: "hover:bg-emerald-800", secButtonText: "text-emerald-100", secButtonHover: "hover:border-white hover:text-white" }
};

interface ActionCTAProps {
  theme: ThemeType;
  data: TabContent["cta"];
}

export function ActionCTA({ theme, data }: ActionCTAProps) {
  const config = themeConfig[theme];

  return (
    <section className={`py-24 sm:py-32 ${config.bg}`}>
      <div className="mx-auto px-8 md:px-16 lg:px-32 max-w-[1440px]">
        <div className="max-w-3xl mx-auto text-center">
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-medium text-white tracking-[-0.02em] leading-[1.08] mb-6">
            {data.title}
          </h2>
          
          <p className={`text-base sm:text-lg font-light leading-relaxed mb-10 max-w-2xl mx-auto ${config.text}`}>
            {data.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a 
              href="https://wa.me/5584998208584"
              className={`group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-lg transition-all duration-200 active:scale-[0.98] ${config.buttonBg} ${config.buttonText} ${config.buttonHover}`}
            >
              {data.primaryButton}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a 
              href="#contato"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold border rounded-lg transition-all duration-200 ${config.border} ${config.secButtonText} ${config.secButtonHover}`}
            >
              <MessageCircle size={16} />
              {data.secondaryButton}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
