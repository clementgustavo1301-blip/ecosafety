"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { InteractiveHero } from "@/components/ui/InteractiveHero";
import { Solutions } from "@/components/ui/Solutions";
import { Stats } from "@/components/ui/Stats";
import { Footer } from "@/components/ui/Footer";
import { MobileUnitShowcase } from "@/components/ui/MobileUnitShowcase";
import { motion, AnimatePresence } from "framer-motion";

type SectionType = "all" | "ambiental" | "saude" | "incendio";

export default function Home() {
  const [activeTab, setActiveTab] = useState<SectionType>("all");

  return (
    <>
      <Navbar />
      <main className="flex flex-col w-full bg-white">
        <InteractiveHero activeTab={activeTab} setActiveTab={setActiveTab} />

        <AnimatePresence mode="wait">
          {activeTab === "all" && (
            <motion.div
              key="general"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Solutions />
              <Stats />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
