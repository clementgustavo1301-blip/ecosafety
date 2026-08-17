"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-3 sm:py-4 glass" : "py-4 sm:py-6 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group min-h-[48px]">
          <img
            src="/icone-eco.svg"
            alt="Ecosafety Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain group-hover:scale-105 transition-transform"
          />
          <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-ecosafety-900">
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
                "text-sm font-medium transition-colors hover:text-ecosafety-700 min-h-[44px] flex items-center",
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

        {/* Mobile Toggle — 48px minimum touch target */}
        <button
          className="md:hidden flex items-center justify-center w-12 h-12 -mr-2 rounded-xl text-slate-900 active:bg-slate-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileMenuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Full-Screen Overlay Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={closeMenu}
            />
            {/* Menu Panel */}
            <motion.nav
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[85vw] max-w-[320px] bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Close button area */}
              <div className="flex items-center justify-end px-4 pt-4 pb-2">
                <button
                  onClick={closeMenu}
                  className="flex items-center justify-center w-12 h-12 rounded-xl text-slate-500 active:bg-slate-100 transition-colors"
                  aria-label="Fechar menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links — each with 48px+ touch target */}
              <div className="flex-1 flex flex-col px-6 py-4 gap-1">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.2 }}
                    className={clsx(
                      "flex items-center min-h-[52px] px-4 text-base font-medium rounded-xl transition-colors active:bg-ecosafety-50",
                      activeSection === link.href.substring(1)
                        ? "text-ecosafety-700 bg-ecosafety-50/60"
                        : "text-slate-700"
                    )}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* CTA at bottom — thumb zone */}
              <div className="px-6 pb-8 pt-4 border-t border-slate-100">
                <motion.a
                  href="#contato"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center w-full min-h-[52px] px-6 bg-ecosafety-700 text-white rounded-xl font-semibold text-base active:bg-ecosafety-800 transition-colors shadow-lg shadow-ecosafety-700/20"
                  onClick={closeMenu}
                >
                  Falar com especialista
                </motion.a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
