"use client";

import { motion } from "framer-motion";

const painPoints = [
  "ASOs vencidos",
  "Exames fora do prazo",
  "Falhas no PCMSO",
  "Inconsistências no eSocial",
  "Afastamentos sem acompanhamento",
  "Decisões sem dados preventivos",
  "Passivos trabalhistas",
  "Baixa visão da saúde da equipe"
];

const solutions = [
  {
    title: "Critério técnico",
    text: "O exame certo, para a função certa, pelo motivo certo. Protocolo construído a partir do risco, não do cargo no contracheque."
  },
  {
    title: "Vigilância e nexo",
    text: "Evolução clínica acompanhada no tempo. Suporte técnico na discussão de nexo causal e na defesa documental da empresa."
  },
  {
    title: "Inteligência de gestão",
    text: "Indicadores de aptidão, absenteísmo e exposição. Saúde ocupacional entrando na reunião de resultado, não só na auditoria."
  }
];

export function EcoclinicProblemSolution() {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="mx-auto px-8 md:px-16 lg:px-32 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* O Problema */}
          <div className="flex flex-col">
            <h2 className="text-[11px] font-bold text-red-400 tracking-[0.2em] uppercase mb-3">
              O problema
            </h2>
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight mb-4 text-slate-100">
              Tratada só como papel, a saúde ocupacional vira risco.
            </h3>
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed mb-8 max-w-md">
              Quando a medicina ocupacional é apenas obrigação documental, a empresa perde controle sobre informações decisivas.
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {painPoints.map((point, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-center gap-3 text-slate-300 font-light text-[12px] sm:text-[13px] py-2.5 px-3 border-l-2 border-red-400/40 bg-slate-800/30"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* A Solução */}
          <div className="flex flex-col p-6 sm:p-10 rounded-2xl bg-blue-600 border border-blue-500/30">
            <div className="relative">
              <h2 className="text-[11px] font-bold text-blue-200 tracking-[0.2em] uppercase mb-3">
                A solução
              </h2>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight mb-4 text-white">
                Uma estrutura de inteligência ocupacional.
              </h3>
              <p className="text-sm sm:text-base text-blue-100 font-light leading-relaxed mb-10">
                Coordenação médica, protocolo técnico por risco e leitura de dados, sustentados pela mesma engenharia de segurança que escreve o seu PGR.
              </p>
              
              <div className="space-y-6">
                {solutions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white mb-1.5">{item.title}</h4>
                      <p className="text-[12px] sm:text-[13px] text-blue-100 font-light leading-relaxed">
                        {item.text}
                      </p>
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
