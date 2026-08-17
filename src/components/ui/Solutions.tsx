"use client";

import { motion } from "framer-motion";
import { Leaf, HardHat, HeartPulse, Map, ShieldAlert, FolderOpen, FileCheck, Stethoscope } from "lucide-react";

const solutions = [
  {
    title: "Consultoria Ambiental",
    desc: "Diagnóstico, condicionantes e regularização junto aos órgãos ambientais.",
    icon: <Leaf className="w-5 h-5 text-ecosafety-600" />,
  },
  {
    title: "Saúde e Segurança",
    desc: "Do PGR e PCMSO à gestão completa dos riscos ocupacionais.",
    icon: <ShieldAlert className="w-5 h-5 text-ecosafety-600" />,
  },
  {
    title: "Medicina Ocupacional",
    desc: "ASOs, exames e gestão integrada à sua gestão de pessoas.",
    icon: <Stethoscope className="w-5 h-5 text-ecosafety-600" />,
  },
  {
    title: "Engenharia & Arq.",
    desc: "Projetos, laudos e aprovação junto aos órgãos competentes.",
    icon: <HardHat className="w-5 h-5 text-ecosafety-600" />,
  },
  {
    title: "Incêndio e Pânico",
    desc: "Projeto, AVCB/CLCB e regularização no Corpo de Bombeiros.",
    icon: <HeartPulse className="w-5 h-5 text-ecosafety-600" />,
  },
  {
    title: "Topografia & Georref.",
    desc: "Levantamentos, georreferenciamento e certificação no INCRA.",
    icon: <Map className="w-5 h-5 text-ecosafety-600" />,
  },
  {
    title: "Treinamentos Normativos",
    desc: "Capacitações em NRs, do teórico ao prático, com comprovação.",
    icon: <FileCheck className="w-5 h-5 text-ecosafety-600" />,
  },
  {
    title: "Gestão Documental",
    desc: "Documentos, vencimentos e a ponte contínua com os órgãos.",
    icon: <FolderOpen className="w-5 h-5 text-ecosafety-600" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Solutions() {
  return (
    <section id="solucoes" className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 -z-10 w-64 sm:w-96 h-64 sm:h-96 bg-ecosafety-100 rounded-full blur-[100px] sm:blur-[120px] opacity-60"></div>

      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20 flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-ecosafety-600 font-medium mb-3 uppercase tracking-[0.15em] text-[11px]"
          >
            A Solução Ecosafety
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-slate-900 leading-[1.15] tracking-tight px-2"
          >
            Serviços soltos viram risco.<br className="hidden sm:block" /> Integração vira gestão.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm md:text-base text-slate-500 font-light max-w-lg leading-relaxed px-2"
          >
            Em vez de contratar frentes isoladas, sua empresa passa a ter uma estrutura técnica única, falando a mesma língua.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {solutions.map((sol, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white border border-slate-100/60 p-4 sm:p-5 md:p-6 lg:p-7 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-slate-200/40 hover:border-ecosafety-100/80 transition-all duration-300 group flex flex-col items-center text-center active:scale-[0.98]"
            >
              <div className="mb-3 sm:mb-4 md:mb-5 p-2.5 sm:p-3 bg-slate-50/80 rounded-xl inline-flex items-center justify-center group-hover:bg-ecosafety-50 transition-colors duration-300">
                {sol.icon}
              </div>
              <h3 className="text-[13px] sm:text-sm md:text-base font-medium text-slate-900 mb-1.5 tracking-tight leading-tight">{sol.title}</h3>
              <p className="text-[11px] sm:text-xs md:text-[13px] text-slate-500 font-light leading-relaxed">{sol.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
