"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const baseItems = [
  "Exames admissionais, periódicos, de retorno, de mudança de risco e demissionais",
  "Emissão e guarda de ASO",
  "Exames complementares (audiometria, espirometria, laboratoriais, toxicológico)",
  "Elaboração e gestão do PCMSO",
  "Controle de vencimentos e agenda",
  "Atendimento a grandes volumes e frentes de obra"
];

const intelligenceItems = [
  "Protocolo de exames derivado do PGR (coerência PGR ↔ PCMSO)",
  "Relatório analítico anual do PCMSO com leitura de tendência",
  "Painel de indicadores: aptidão, absenteísmo, exposição, restrições",
  "Vigilância de alterações clínicas com alerta preventivo",
  "Suporte técnico em nexo causal, CAT, NTEP e discussão de FAP",
  "Consistência dos eventos S-2210, S-2220 e S-2240 no eSocial",
  "Reunião técnica periódica com RH e liderança"
];

export function EcoclinicFeatures() {
  return (
    <section className="py-20 sm:py-28 bg-slate-50">
      <div className="mx-auto px-8 md:px-16 lg:px-32 max-w-[1440px]">
        
        {/* Header */}
        <div className="max-w-2xl mb-14 sm:mb-16">
          <p className="text-[11px] font-semibold text-blue-600 tracking-[0.2em] uppercase mb-3">
            O que está incluso
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.12] mb-4">
            Medicina ocupacional completa, do exame ao acompanhamento.
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed">
            A base operacional você já conhece. <span className="font-medium text-slate-800">O que muda é o que fazemos com ela.</span>
          </p>
        </div>

        {/* Features Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Base Operacional */}
          <div className="flex flex-col p-8 sm:p-10 rounded-2xl bg-white border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-8 pb-4 border-b border-slate-100">
              Base operacional
            </h3>
            <ul className="space-y-5">
              {baseItems.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-slate-500" />
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
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
                <span className="text-blue-400 text-xs font-bold">+</span>
              </div>
              <h3 className="text-lg font-semibold text-white">
                Camada de inteligência
              </h3>
            </div>
            <ul className="space-y-5">
              {intelligenceItems.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-5 h-5 rounded-md bg-blue-500/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-blue-400" />
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
