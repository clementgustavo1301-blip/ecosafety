"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  ShieldCheck, 
  RefreshCcw, 
  TrendingDown, 
  LineChart, 
  Clock, 
  CheckCircle, 
  UserCheck 
} from "lucide-react";

const benefits = [
  { icon: Activity, text: "Menos afastamento por detecção precoce" },
  { icon: ShieldCheck, text: "Defesa técnica consistente em ação trabalhista e perícia" },
  { icon: RefreshCcw, text: "Redução de retrabalho entre saúde, segurança e RH" },
  { icon: TrendingDown, text: "Base sólida para discutir FAP e custo previdenciário" },
  { icon: LineChart, text: "Decisão de investimento em prevenção baseada em dados" },
  { icon: Clock, text: "Auditoria e cliente contratante atendidos sem correria" },
  { icon: CheckCircle, text: "Aptidão real, não aptidão presumida" },
  { icon: UserCheck, text: "Um único responsável técnico por saúde e segurança" }
];

export function EcoclinicBenefits() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto px-8 md:px-16 lg:px-32 max-w-[1440px]">
        
        {/* Header */}
        <div className="max-w-xl mb-14 sm:mb-16">
          <p className="text-[11px] font-semibold text-blue-600 tracking-[0.2em] uppercase mb-3">
            Benefícios
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.12] mb-4">
            O que muda na sua operação e no seu custo.
          </h2>
          <p className="text-base text-slate-500 font-light leading-relaxed">
            Saúde sob controle, dados organizados e uma operação mais eficiente.
          </p>
        </div>

        {/* Editorial 2-column list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 lg:gap-x-20">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="flex items-center gap-4 py-5 border-b border-slate-100"
            >
              <item.icon size={20} className="text-blue-500 shrink-0" />
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
