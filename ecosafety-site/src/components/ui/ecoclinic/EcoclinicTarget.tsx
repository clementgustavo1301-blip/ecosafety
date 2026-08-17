"use client";

import { motion } from "framer-motion";

const targets = [
  "Indústria",
  "Construção civil",
  "Comércio",
  "Serviços",
  "Logística",
  "Agronegócio",
  "Petróleo & Gás",
  "Salinas",
  "GLP",
  "Saúde"
];

export function EcoclinicTarget() {
  return (
    <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-100">
      <div className="mx-auto px-8 md:px-16 lg:px-32 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          <div className="flex-1 max-w-lg">
            <p className="text-[11px] font-semibold text-slate-400 tracking-[0.2em] uppercase mb-3">
              Para quem é indicado
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.12] mb-4">
              Para empresas que querem saúde ocupacional de verdade.
            </h2>
            <p className="text-base text-slate-500 font-light leading-relaxed">
              Empresas de todos os portes com colaboradores contratados que precisam cumprir a medicina ocupacional e querem sair do atendimento pontual para uma gestão preventiva.
            </p>
          </div>

          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {targets.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="flex items-center gap-3 py-4 px-1 border-b border-slate-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
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
