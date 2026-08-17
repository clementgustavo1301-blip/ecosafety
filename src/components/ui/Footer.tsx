"use client";

export function Footer() {
  return (
    <footer id="contato" className="bg-[#0a0f0d] pt-14 sm:pt-16 md:pt-20 pb-6 sm:pb-8 text-zinc-300">
      <div className="mx-auto px-5 sm:px-8 md:px-16 lg:px-24 max-w-[1440px]">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-8 sm:gap-y-10 md:gap-y-12 mb-12 sm:mb-16 md:mb-20">

          {/* Logo and Description Column (spans 2 columns on lg) */}
          <div className="col-span-2 space-y-5 sm:space-y-6 md:pr-8">
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 w-fit min-h-[48px]">
              <img
                src="/icone-eco.svg"
                alt="Ecosafety Logo"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white leading-none mb-0.5">
                  ECOSAFETY
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-semibold leading-none">
                  Soluções Corporativas
                </span>
              </div>
            </a>
            <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-light max-w-sm">
              Consultoria técnica integrada em meio ambiente, SST, medicina ocupacional e engenharia. Mais do que documentos, gestão e previsibilidade.
            </p>
          </div>

          {/* Soluções Column */}
          <div>
            <h3 className="text-[10px] sm:text-[11px] text-[#4ade80] font-bold tracking-[0.15em] uppercase mb-4 sm:mb-6">Soluções</h3>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-[13px] text-zinc-400 font-light">
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Consultoria Ambiental</a></li>
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Saúde e Segurança</a></li>
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Medicina Ocupacional</a></li>
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Topografia & Georref.</a></li>
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Incêndio e Pânico</a></li>
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Treinamentos</a></li>
            </ul>
          </div>

          {/* Segmentos Column */}
          <div>
            <h3 className="text-[10px] sm:text-[11px] text-[#4ade80] font-bold tracking-[0.15em] uppercase mb-4 sm:mb-6">Segmentos</h3>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-[13px] text-zinc-400 font-light">
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Petróleo & Gás</a></li>
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Salinas</a></li>
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">GLP</a></li>
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Construção Civil</a></li>
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Indústria</a></li>
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Postos de Combustível</a></li>
            </ul>
          </div>

          {/* Empresa Column */}
          <div>
            <h3 className="text-[10px] sm:text-[11px] text-[#4ade80] font-bold tracking-[0.15em] uppercase mb-4 sm:mb-6">Empresa</h3>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-[13px] text-zinc-400 font-light">
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Sobre</a></li>
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Produtos</a></li>
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Diferenciais</a></li>
              <li><a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Contato</a></li>
            </ul>
          </div>

          {/* Contato Column */}
          <div>
            <h3 className="text-[10px] sm:text-[11px] text-[#4ade80] font-bold tracking-[0.15em] uppercase mb-4 sm:mb-6">Contato</h3>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-[13px] text-zinc-400 font-light">
              <li className="min-h-[44px] inline-flex items-center">Mossoró · Natal · Fortaleza</li>
              <li><a href="https://wa.me/5584998208584" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">WhatsApp</a></li>
              <li><a href="mailto:diretoria@ecosafetyrn.com" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center break-all">diretoria@ecosafetyrn.com</a></li>
              <li><a href="https://instagram.com/ecosafetyrn" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">@ecosafetyrn</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-5 sm:pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] text-zinc-500">
          <p className="text-center sm:text-left">© {new Date().getFullYear()} Ecosafety Soluções Corporativas – Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">Privacidade</a>
            <span className="flex items-center">·</span>
            <a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] inline-flex items-center">LGPD</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
