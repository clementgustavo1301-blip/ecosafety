"use client";

import { ShieldCheck, Mail, MapPin, AtSign, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="contato" className="bg-[#0a0f0d] pt-20 pb-8 text-zinc-300">
      <div className="mx-auto px-8 md:px-16 lg:px-24 max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-12 lg:gap-x-16 gap-y-12 mb-20">
          
          {/* Logo and Description Column (spans 2 columns on lg) */}
          <div className="lg:col-span-2 space-y-6 md:pr-8">
            <a href="#" className="flex items-center gap-3 w-fit">
              <img 
                src="/icone-eco.svg" 
                alt="Ecosafety Logo" 
                className="w-8 h-8 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg tracking-tight text-white leading-none mb-0.5">
                  ECOSAFETY
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-semibold leading-none">
                  Soluções Corporativas
                </span>
              </div>
            </a>
            <p className="text-xs md:text-[13px] text-zinc-400 leading-relaxed font-light">
              Consultoria técnica integrada em meio ambiente,<br className="hidden md:block"/>
              SST, medicina ocupacional e engenharia. Mais do<br className="hidden md:block"/>
              que documentos, gestão e previsibilidade.
            </p>
          </div>

          {/* Soluções Column */}
          <div>
            <h3 className="text-[10px] md:text-[11px] text-[#4ade80] font-bold tracking-[0.15em] uppercase mb-6">Soluções</h3>
            <ul className="space-y-4 text-xs md:text-[13px] text-zinc-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Consultoria Ambiental</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Saúde e Segurança</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Medicina Ocupacional</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Topografia & Georref.</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Incêndio e Pânico</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Treinamentos</a></li>
            </ul>
          </div>

          {/* Segmentos Column */}
          <div>
            <h3 className="text-[10px] md:text-[11px] text-[#4ade80] font-bold tracking-[0.15em] uppercase mb-6">Segmentos</h3>
            <ul className="space-y-4 text-xs md:text-[13px] text-zinc-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Petróleo & Gás</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Salinas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GLP</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Construção Civil</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Indústria</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Postos de Combustível</a></li>
            </ul>
          </div>

          {/* Empresa Column */}
          <div>
            <h3 className="text-[10px] md:text-[11px] text-[#4ade80] font-bold tracking-[0.15em] uppercase mb-6">Empresa</h3>
            <ul className="space-y-4 text-xs md:text-[13px] text-zinc-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Produtos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Diferenciais</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Contato Column */}
          <div>
            <h3 className="text-[10px] md:text-[11px] text-[#4ade80] font-bold tracking-[0.15em] uppercase mb-6">Contato</h3>
            <ul className="space-y-4 text-xs md:text-[13px] text-zinc-400 font-light">
              <li>Mossoró · Natal · Fortaleza</li>
              <li><a href="https://wa.me/5584998208584" className="hover:text-white transition-colors">WhatsApp</a></li>
              <li><a href="mailto:diretoria@ecosafetyrn.com" className="hover:text-white transition-colors">diretoria@ecosafetyrn.com</a></li>
              <li><a href="https://instagram.com/ecosafetyrn" className="hover:text-white transition-colors">@ecosafetyrn</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-500">
          <p>© {new Date().getFullYear()} Ecosafety Soluções Corporativas – Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">LGPD</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
