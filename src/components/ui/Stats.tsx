"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const stats = [
  { value: 15, suffix: "+", label: "Anos de Experiência" },
  { value: 500, suffix: "+", label: "Clientes Atendidos" },
  { value: 957, suffix: "+", label: "Projetos Entregues" },
  { value: 3, suffix: "", label: "Unidades no Brasil" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = Math.abs(Math.floor(duration / end));

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [value, inView]);

  return (
    <span ref={ref} className="text-2xl sm:text-3xl md:text-3xl font-display font-medium tracking-tight text-ecosafety-700">
      {count}{suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-ecosafety-50 border-y border-ecosafety-100 relative">
      <div className="container mx-auto px-5 sm:px-6">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } },
              }}
              className="flex flex-col items-center justify-center space-y-1.5 sm:space-y-2 py-2 sm:py-0"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-semibold tracking-[0.12em] uppercase mt-0.5 leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
