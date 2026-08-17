"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 bg-slate-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-ecosafety-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img 
            src="/logo-contorno.svg" 
            alt="Ecosafety Logo" 
            className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ecosafety-100 text-ecosafety-800 text-sm font-semibold mb-6 border border-ecosafety-200"
        >
          <span className="flex h-2 w-2 rounded-full bg-ecosafety-500"></span>
          Ambiental · SST · Engenharia · Medicina Ocupacional
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 max-w-4xl tracking-tight leading-tight"
        >
          Inteligência integrada para operações{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ecosafety-600 to-ecosafety-400">
            mais seguras
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl"
        >
          Muito além da conformidade. Reunimos especialistas, tecnologia e inteligência em uma única gestão para reduzir passivos, antecipar riscos e aumentar a produtividade.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#contato"
            className="flex items-center gap-2 px-8 py-4 bg-ecosafety-700 text-white rounded-full font-semibold hover:bg-ecosafety-800 transition-all hover:gap-3 shadow-lg hover:shadow-xl active:scale-95"
          >
            Falar com especialista
            <ArrowRight size={20} />
          </a>
          <a
            href="#solucoes"
            className="flex items-center gap-2 px-8 py-4 bg-white text-slate-700 rounded-full font-semibold hover:bg-slate-50 transition-colors border border-slate-200"
          >
            Conhecer as soluções
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 animate-bounce"
        >
          <a href="#solucoes" className="p-2 text-slate-400 hover:text-ecosafety-600 transition-colors">
            <ChevronDown size={32} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
