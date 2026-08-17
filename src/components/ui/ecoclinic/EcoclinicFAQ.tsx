"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

const faqs = [
  { question: "A Ecoclinic substitui meu médico do trabalho?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. O texto final será preenchido posteriormente pela equipe Ecosafety." },
  { question: "Fazem os exames complementares?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { question: "Como controlam o vencimento dos ASOs?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { question: "Qual a diferença entre a Ecoclinic e uma clínica de medicina do trabalho?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { question: "Meu PCMSO precisa conversar com o PGR?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { question: "Atendem grande volume de colaboradores?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { question: "Integra com a Segurança do Trabalho?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { question: "Apoiam o eSocial?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
];

export function EcoclinicFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    if (openIndex === idx) {
      setOpenIndex(null);
    } else {
      setOpenIndex(idx);
    }
  };

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-600 tracking-[0.2em] uppercase mb-4">
            Perguntas frequentes
          </h2>
          <h3 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight mb-6">
            Ainda em dúvida? Comece por aqui.
          </h3>
          <p className="text-lg text-slate-600 font-light leading-relaxed">
            Se a sua pergunta não estiver aqui, <a href="#contato" className="text-blue-600 font-medium hover:underline">fale com um especialista</a>.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={clsx(
                  "bg-white border rounded-2xl overflow-hidden transition-colors duration-300",
                  isOpen ? "border-blue-200 shadow-sm" : "border-slate-200 hover:border-slate-300"
                )}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base sm:text-lg font-medium text-slate-900 pr-8">
                    {faq.question}
                  </span>
                  <div className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300",
                    isOpen ? "bg-blue-100 rotate-180" : "bg-slate-100"
                  )}>
                    <ChevronDown size={18} className={isOpen ? "text-blue-600" : "text-slate-500"} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-slate-600 font-light leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
