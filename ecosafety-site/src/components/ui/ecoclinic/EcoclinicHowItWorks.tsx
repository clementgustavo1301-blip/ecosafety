"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Mapeamento ocupacional",
    text: "Mapeamos riscos, funções e exigências do PCMSO para estruturar uma linha de cuidado coerente com as exposições reais de cada trabalhador, garantindo maior efetividade."
  },
  {
    number: "02",
    title: "Avaliação clínica",
    text: "Admissional, periódico, retorno ao trabalho, mudança de risco e demissional, com protocolos específicos por função, atividade e segmento de atuação."
  },
  {
    number: "03",
    title: "Vigilância da saúde",
    text: "Acompanhamos a evolução dos parâmetros de saúde ao longo do tempo. Alterações geram alertas precoces, permitindo intervenção antes de afastamentos."
  },
  {
    number: "04",
    title: "Inteligência e decisão",
    text: "Absenteísmo, aptidão e exposição integrados em um painel. A gestão da saúde ocupacional conduzida por evidências, e não apenas percepção."
  }
];

export function EcoclinicHowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto px-8 md:px-16 lg:px-32 max-w-[1440px]">
        
        {/* Header */}
        <div className="max-w-xl mb-16 sm:mb-20">
          <p className="text-[11px] font-semibold text-blue-600 tracking-[0.2em] uppercase mb-3">
            Como funciona
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight leading-[1.12] mb-4">
            Da admissão ao acompanhamento contínuo.
          </h2>
          <p className="text-base text-slate-500 font-light leading-relaxed">
            Uma rotina de saúde ocupacional, com controle de vencimentos e dados sempre prontos.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[2.75rem] sm:left-[3.5rem] top-0 bottom-0 w-px bg-slate-200" />

          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, idx) => (
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
                  <span className="text-5xl sm:text-7xl font-extralight text-slate-200 tracking-tighter select-none">
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
