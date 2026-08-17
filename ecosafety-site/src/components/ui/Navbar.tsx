"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck } from "lucide-react";
import clsx from "clsx";

const links = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#segmentos", label: "Segmentos" },
  { href: "#produtos", label: "Produtos" },
  { href: "#sobre", label: "Sobre" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll Spy Logic
      const sections = links.map((link) => link.href.substring(1));
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-4 glass" : "py-6 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src="/icone-eco.svg" 
            alt="Ecosafety Logo" 
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
          />
          <span className="font-display font-bold text-xl tracking-tight text-ecosafety-900">
            ECOSAFETY
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm font-medium transition-colors hover:text-ecosafety-700",
                activeSection === link.href.substring(1)
                  ? "text-ecosafety-700"
                  : "text-slate-600"
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="px-5 py-2.5 bg-ecosafety-700 text-white rounded-full text-sm font-semibold hover:bg-ecosafety-800 transition-colors shadow-md hover:shadow-lg active:scale-95"
          >
            Falar com especialista
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-900 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl py-4 px-6 flex flex-col gap-4"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-slate-700 py-2 border-b border-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              className="mt-2 text-center w-full px-5 py-3 bg-ecosafety-700 text-white rounded-lg font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Falar com especialista
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
