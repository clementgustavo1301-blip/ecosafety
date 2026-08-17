"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export function EcoclinicHero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-slate-50">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500 opacity-10 blur-[120px]"></div>
        <div className="absolute left-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-emerald-500 opacity-10 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1440px] relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        
        {/* Text Content */}
        <motion.div 
          className="flex-1 text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-6 border border-blue-200/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Ecoclinic
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Medicina do trabalho com <span className="text-blue-600">gestão inteligente</span>, tecnologia e presença que cuida de verdade.
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed font-light">
            Muito além do ASO: unimos medicina ocupacional, SST e atuação multidisciplinar para proteger a saúde dos colaboradores e fortalecer o cuidado humano nas organizações.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a 
              href="#contato"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Solicitar proposta
              <ArrowRight size={18} />
            </a>
            <a 
              href="#contato"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-full transition-all shadow-sm"
            >
              <MessageCircle size={18} className="text-blue-600" />
              Falar com especialista
            </a>
          </div>
        </motion.div>

        {/* Visual Element (Right) */}
        <motion.div 
          className="flex-1 w-full relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative aspect-square sm:aspect-video md:aspect-square w-full max-w-[600px] mx-auto overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl">
            {/* Abstraction of a clinic/health dashboard */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
               <div className="relative w-3/4 h-3/4">
                 {/* Decorative elements representing health metrics & data */}
                 <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col gap-2 animate-pulse-slow">
                   <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                     <div className="w-4 h-4 text-blue-600 bg-blue-600 rounded-full opacity-50" />
                   </div>
                   <div className="w-16 h-2 bg-slate-200 rounded-full mt-2" />
                   <div className="w-24 h-2 bg-slate-100 rounded-full" />
                 </div>
                 
                 <div className="absolute bottom-10 right-0 w-48 h-32 bg-white rounded-2xl shadow-lg border border-slate-100 p-4 flex items-end gap-2">
                   {[40, 70, 45, 90, 65, 80].map((h, i) => (
                     <div key={i} className="flex-1 bg-emerald-100 rounded-t-sm" style={{ height: `${h}%` }}>
                       <div className="w-full h-full bg-emerald-500 rounded-t-sm opacity-50 transition-all duration-1000" />
                     </div>
                   ))}
                 </div>
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/80 backdrop-blur-md rounded-full shadow-2xl border border-white/50 flex flex-col items-center justify-center z-10">
                   <span className="text-4xl mb-1">❤️</span>
                   <span className="text-sm font-semibold text-slate-800">Saúde Integral</span>
                 </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
