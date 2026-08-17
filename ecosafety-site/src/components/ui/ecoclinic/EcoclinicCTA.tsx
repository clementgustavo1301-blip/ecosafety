"use client";

import { ArrowRight, MessageCircle } from "lucide-react";

export function EcoclinicCTA() {
  return (
    <section className="py-24 sm:py-32 bg-slate-900">
      <div className="mx-auto px-8 md:px-16 lg:px-32 max-w-[1440px]">
        <div className="max-w-3xl mx-auto text-center">
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-medium text-white tracking-[-0.02em] leading-[1.08] mb-6">
            Sua empresa não precisa tratar saúde só como obrigação.
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Solicite uma proposta da Ecoclinic e transforme a medicina do trabalho em gestão eficiente, segura e humana.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a 
              href="https://wa.me/5584998208584"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-all duration-200 active:scale-[0.98]"
            >
              Solicitar proposta
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a 
              href="#contato"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white rounded-lg transition-all duration-200"
            >
              <MessageCircle size={16} />
              Falar com especialista
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
