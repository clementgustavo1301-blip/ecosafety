"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowLeft, ChevronDown } from "lucide-react";
import clsx from "clsx";

import { MobileUnitShowcase } from "./MobileUnitShowcase";
import { ProcessTimeline } from "./ecoclinic/ProcessTimeline";
import { ProblemSolution } from "./ecoclinic/ProblemSolution";
import { FeatureList } from "./ecoclinic/FeatureList";
import { BenefitList } from "./ecoclinic/BenefitList";
import { TargetAudience } from "./ecoclinic/TargetAudience";
import { ActionCTA } from "./ecoclinic/ActionCTA";
import { tabContents, ThemeType } from "@/data/tabContent";

type SectionType = "all" | "ambiental" | "saude" | "incendio";

const sectionsData: Record<Exclude<SectionType, "all">, {
  title: string;
  description: string;
  accent: string;
  bgAccent: string;
  hexColor: string;
  services: { title: string; text: string }[];
}> = {
  ambiental: {
    title: "Consultoria Ambiental",
    description: "Licenciamento, gestão de resíduos e soluções sustentáveis para operações ininterruptas.",
    accent: "text-emerald-600",
    bgAccent: "bg-emerald-600",
    hexColor: "#3B9652",
    services: [
      { title: "Licenciamento", text: "Regularização completa junto aos órgãos competentes." },
      { title: "Gestão de Resíduos", text: "PGRS e destinação correta de ponta a ponta." },
      { title: "Estudos de Impacto", text: "EIA/RIMA e levantamentos técnicos especializados." },
    ],
  },
  saude: {
    title: "Gestão inteligente e presença que cuida de verdade.",
    description: "Muito além do ASO: unimos medicina ocupacional, SST e atuação multidisciplinar para proteger a saúde dos colaboradores e fortalecer o cuidado humano nas organizações.",
    accent: "text-blue-800",
    bgAccent: "bg-blue-800 hover:bg-blue-900 text-white",
    hexColor: "#226DBC",
    services: [
      { title: "PGR & PCMSO", text: "Gerenciamento contínuo de riscos e saúde do trabalhador." },
      { title: "Laudos Técnicos", text: "LTCAT, insalubridade e periculosidade com respaldo legal." },
      { title: "Capacitação NR", text: "Treinamentos práticos e teóricos exigidos por norma." },
    ],
  },
  incendio: {
    title: "Prevenção de Incêndio",
    description: "Engenharia de proteção contra incêndios, do projeto executivo à emissão do AVCB.",
    accent: "text-amber-600",
    bgAccent: "bg-amber-600 hover:bg-amber-700 text-white",
    hexColor: "#EA811F",
    services: [
      { title: "Projetos PPCI", text: "Desenho e aprovação técnica no Corpo de Bombeiros." },
      { title: "Obtenção de AVCB", text: "Vistoria e emissão do auto de conformidade." },
      { title: "Brigadas", text: "Formação de equipes de emergência in loco." },
    ],
  },
};

/* SVG path data for each logo piece */
const svgPaths = {
  azul: {
    main: "M 492.55 560.75 C492.34,560.06 491.90,543.53 491.56,524.00 C491.23,504.48 490.53,469.38 489.99,446.00 C487.09,317.94 486.59,302.81 489.16,288.23 C489.65,285.45 490.25,282.68 490.97,279.16 C495.24,258.18 505.23,234.75 518.16,215.37 C527.83,200.89 547.39,181.25 562.00,171.36 C586.58,154.72 613.58,144.50 642.28,140.95 C654.49,139.44 682.33,140.20 694.01,142.36 C743.26,151.45 785.38,180.13 811.69,222.50 C828.61,249.74 837.39,281.13 837.28,314.00 C837.04,384.27 797.36,443.14 720.00,487.99 C684.41,508.62 643.11,526.12 598.50,539.46 C564.17,549.73 539.61,555.62 513.00,559.96 C498.58,562.31 493.10,562.52 492.55,560.75 ZM 511.62 553.47 C621.66,534.48 726.25,488.36 778.04,436.01 C818.22,395.40 836.71,342.10 828.88,289.50 C819.50,226.53 774.47,173.52 713.93,154.18 C696.65,148.66 687.99,147.54 662.50,147.54 C642.50,147.55 638.12,147.84 628.96,149.78 C605.35,154.79 588.68,161.85 568.00,175.59 C537.49,195.87 514.52,226.33 502.63,262.30 C493.27,290.60 492.73,303.32 496.00,417.50 C496.57,437.30 497.44,475.88 497.95,503.24 C498.45,530.60 499.15,553.43 499.49,553.99 C500.31,555.31 501.13,555.28 511.62,553.47 Z",
    detail: "M 383.89 620.39 C391.39,617.45 396.98,615.64 397.56,616.23 C397.84,616.50 396.01,620.95 393.49,626.12 C387.46,638.49 383.45,652.36 381.96,663.43 C383.26,653.29 386.69,640.81 391.19,631.00 C392.83,627.42 394.37,623.43 394.63,622.12 C394.88,620.81 395.18,619.24 395.29,618.62 C395.62,616.83 391.01,617.78 383.89,620.39 ZM 447.39 555.41 C448.61,554.94 449.02,554.38 448.94,550.99 L 449.30 557.00 L 440.90 556.79 C438.29,556.72 434.43,556.63 430.53,556.53 C439.14,556.56 445.46,556.16 447.39,555.41 ZM 298.65 672.98 C313.48,658.22 331.83,645.07 353.14,634.16 C356.88,632.24 361.08,630.24 365.36,628.28 C353.69,633.77 340.89,640.59 331.50,646.75 C319.05,654.92 308.09,663.68 298.65,672.98 ZM 382.84 681.27 C383.70,683.02 384.95,684.00 386.60,684.00 C384.75,684.00 383.62,683.31 382.84,681.27 Z",
    fill: "rgba(34,109,188,1)",
    hitCenter: { cx: 661, cy: 351, r: 180 },
    depth: 0.8,
  },
  laranja: {
    main: "M 353.50 880.45 C293.38,870.66 250.00,821.73 250.00,763.72 C250.00,744.01 253.66,728.82 262.96,709.94 C280.12,675.10 313.86,644.53 358.41,623.47 C374.00,616.10 400.07,607.04 405.78,607.01 C409.47,606.99 409.60,609.84 406.22,616.42 C399.93,628.65 395.07,640.11 392.97,647.71 C391.78,652.00 390.40,655.93 389.90,656.45 C389.41,656.97 389.00,659.67 389.01,662.45 L 389.01 667.50 L 393.51 659.63 C399.97,648.31 403.80,643.43 413.44,634.17 C426.82,621.33 442.90,612.02 463.58,605.17 C473.94,601.73 486.60,598.91 488.48,599.63 C489.17,599.90 490.03,602.18 490.37,604.70 C491.40,612.20 491.05,759.48 489.98,772.48 C487.11,807.05 470.36,837.07 442.46,857.63 C416.88,876.48 382.81,885.22 353.50,880.45 ZM 392.50 872.33 C416.92,867.78 442.60,852.31 458.67,832.46 C466.49,822.81 474.49,808.43 477.86,798.00 C483.54,780.42 483.32,784.28 483.72,693.09 C483.93,644.96 483.71,608.31 483.20,607.80 C482.69,607.29 478.78,607.95 473.91,609.36 C433.61,621.09 409.28,640.96 393.23,675.25 C389.66,682.86 388.80,684.00 386.60,684.00 C377.13,684.00 380.97,651.81 393.49,626.12 C396.01,620.95 397.84,616.50 397.56,616.23 C396.26,614.92 370.03,625.51 353.14,634.16 C303.99,659.32 270.56,696.41 259.90,737.60 C257.97,745.06 257.60,749.09 257.58,762.50 C257.57,772.32 258.08,780.82 258.90,784.50 C266.42,818.08 286.72,844.75 317.00,860.80 C340.76,873.41 366.03,877.26 392.50,872.33 Z",
    fill: "rgba(234,129,31,1)",
    hitCenter: { cx: 370, cy: 742, r: 140 },
    depth: 1.2,
  },
  verde: {
    main: "M 415.50 563.36 C412.75,563.19 400.38,562.56 388.00,561.96 C354.71,560.34 333.99,556.74 317.20,549.65 C289.66,538.02 271.81,518.85 264.46,493.00 C262.26,485.24 261.91,464.10 263.87,457.00 C270.81,431.88 285.94,413.62 308.93,402.60 C321.08,396.78 332.40,394.68 348.71,395.24 C363.47,395.74 369.86,397.22 382.30,402.99 C411.42,416.48 435.10,449.90 446.89,494.12 C452.73,516.01 457.92,555.89 455.61,561.00 L 454.48 563.50 L 437.49 563.58 C428.14,563.63 418.25,563.52 415.50,563.36 ZM 448.67 546.60 C446.99,519.13 440.15,489.86 430.12,467.17 C412.68,427.72 386.69,405.87 352.42,401.86 C343.39,400.80 341.52,400.89 331.61,402.88 C312.91,406.65 300.69,413.27 288.19,426.43 C275.49,439.80 269.53,455.41 269.65,475.00 C269.70,485.10 270.08,487.56 272.74,495.26 C284.10,528.13 313.76,547.62 360.50,552.93 C369.89,554.00 403.93,555.88 422.00,556.32 C427.77,556.46 436.28,556.67 440.90,556.79 L 449.30 557.00 Z",
    fill: "rgba(59,150,82,1)",
    hitCenter: { cx: 359, cy: 479, r: 100 },
    depth: 1.0,
  },
};

const pieceMap: Record<Exclude<SectionType, "all">, keyof typeof svgPaths> = {
  ambiental: "verde",
  incendio: "laranja",
  saude: "azul",
};

const labelMap: Record<Exclude<SectionType, "all">, string> = {
  ambiental: "Consultoria Ambiental",
  incendio: "Prevenção de Incêndio",
  saude: "Saúde & Engenharia",
};

const sectionKeys: Exclude<SectionType, "all">[] = ["ambiental", "saude", "incendio"];

function LogoPiece({
  pieceKey,
  tab,
  activeTab,
  setActiveTab,
  hoveredPiece,
  setHoveredPiece,
  mouseX,
  mouseY,
}: {
  pieceKey: keyof typeof svgPaths;
  tab: Exclude<SectionType, "all">;
  activeTab: SectionType;
  setActiveTab: (tab: SectionType) => void;
  hoveredPiece: string | null;
  setHoveredPiece: (piece: string | null) => void;
  mouseX: any;
  mouseY: any;
}) {
  const piece = svgPaths[pieceKey];
  const isHovered = hoveredPiece === pieceKey;
  const somethingHovered = hoveredPiece !== null;

  const xOffset = useTransform(mouseX, [-1, 1], [-45 * piece.depth, 45 * piece.depth]);
  const yOffset = useTransform(mouseY, [-1, 1], [-45 * piece.depth, 45 * piece.depth]);

  return (
    <motion.svg
      layoutId={`piece-${pieceKey}`}
      viewBox="0 0 1024 1024"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      initial={false}
      animate={{
        opacity: somethingHovered && !isHovered ? 0.35 : 1,
        scale: isHovered ? 1.03 : 1,
        filter: isHovered ? "drop-shadow(0 6px 16px rgba(0,0,0,0.12))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.03))",
      }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.g
        className="pointer-events-auto cursor-pointer"
        onClick={() => setActiveTab(tab)}
        onMouseEnter={() => setHoveredPiece(pieceKey)}
        onMouseLeave={() => setHoveredPiece(null)}
        style={{
          x: xOffset,
          y: yOffset,
        }}
      >
        <circle
          cx={piece.hitCenter.cx}
          cy={piece.hitCenter.cy}
          r={piece.hitCenter.r}
          fill="transparent"
          pointerEvents="all"
        />
        <path d={piece.main} fill={piece.fill} pointerEvents="all" className="transition-colors duration-300" />
        {"detail" in piece && (
          <path d={(piece as typeof svgPaths.azul).detail} fill={piece.fill} pointerEvents="all" className="transition-colors duration-300" />
        )}
      </motion.g>
    </motion.svg>
  );
}

export function InteractiveHero({
  activeTab,
  setActiveTab,
}: {
  activeTab: SectionType;
  setActiveTab: (tab: SectionType) => void;
}) {
  const isAll = activeTab === "all";
  const [hoveredPiece, setHoveredPiece] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [gyroDebug, setGyroDebug] = useState("Giroscópio Inativo");
  const [needsPermission, setNeedsPermission] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    
    // Check if permission is needed
    if (typeof (DeviceOrientationEvent as any) !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      setNeedsPermission(true);
    }
    
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mouse parallax state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
    const gamma = e.gamma || 0;
    const beta = e.beta || 0;
    
    setGyroDebug(`G: ${gamma.toFixed(1)}° | B: ${beta.toFixed(1)}°`);

    const x = gamma / 30; 
    const betaOffset = beta - 45;
    const y = betaOffset / 30;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const requestGyroPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', handleDeviceOrientation);
          setNeedsPermission(false);
          setGyroDebug("Permissão Concedida");
        } else {
          setGyroDebug("Permissão Negada");
        }
      } catch (err) {
        setGyroDebug(`Erro: ${err}`);
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    if (isAll) {
      if (!isMobile) {
        window.addEventListener("mousemove", handleMouseMove);
      }
      if (typeof window.DeviceOrientationEvent !== 'undefined' && !needsPermission) {
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      }
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (typeof window.DeviceOrientationEvent !== 'undefined') {
        window.removeEventListener("deviceorientation", handleDeviceOrientation);
      }
    };
  }, [isAll, isMobile, mouseX, mouseY, needsPermission]);

  const hoveredTab = hoveredPiece
    ? Object.entries(pieceMap).find(([, v]) => v === hoveredPiece)?.[0] as Exclude<SectionType, "all">
    : null;

  return (
    <section
      id="hero"
      className={clsx(
        "relative min-h-[100dvh] w-full flex flex-col bg-white transition-all duration-500",
        isAll ? "items-center justify-center pt-14 pb-2" : "items-center justify-start pt-20 pb-8 md:pb-12"
      )}
    >
      {/* Subtle texture background */}
      <div className="absolute inset-0 -z-10 bg-zinc-50/40 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full flex flex-col items-center">
        {/* MOBILE DEBUG OVERLAY */}
        {isMobile && isAll && (
          <div 
            className="absolute top-0 right-0 p-2 text-[10px] font-mono bg-black/80 text-green-400 z-50 rounded-bl-lg"
            onClick={needsPermission ? requestGyroPermission : undefined}
          >
            {needsPermission ? "Tocar para Permissão Gyro" : gyroDebug}
          </div>
        )}

        <AnimatePresence mode="wait">
          {isAll ? (
            /* ===== ALL VIEW (HERO INICIAL) ===== */
            <motion.div
              key="view-all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto"
            >
              {/* Central Interactive Logo — smaller on mobile to leave room for text/CTAs */}
              <div
                className="relative w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] max-h-[55vh] sm:max-h-[65vh] md:max-h-[75vh] aspect-square flex justify-center items-center -mb-4 sm:-mb-8 md:-mb-14 lg:-mb-20 transform -translate-y-2 sm:-translate-y-4 md:-translate-y-8"
                onMouseLeave={() => setHoveredPiece(null)}
                onTouchMove={(e) => {
                  if (e.touches.length > 0) {
                    const touch = e.touches[0];
                    const { innerWidth, innerHeight } = window;
                    const x = (touch.clientX / innerWidth - 0.5) * 2;
                    const y = (touch.clientY / innerHeight - 0.5) * 2;
                    mouseX.set(x);
                    mouseY.set(y);
                  }
                }}
              >
                <LogoPiece
                  pieceKey="azul" tab="saude" activeTab={activeTab} setActiveTab={setActiveTab}
                  hoveredPiece={hoveredPiece} setHoveredPiece={setHoveredPiece} mouseX={smoothMouseX} mouseY={smoothMouseY}
                />
                <LogoPiece
                  pieceKey="laranja" tab="incendio" activeTab={activeTab} setActiveTab={setActiveTab}
                  hoveredPiece={hoveredPiece} setHoveredPiece={setHoveredPiece} mouseX={smoothMouseX} mouseY={smoothMouseY}
                />
                <LogoPiece
                  pieceKey="verde" tab="ambiental" activeTab={activeTab} setActiveTab={setActiveTab}
                  hoveredPiece={hoveredPiece} setHoveredPiece={setHoveredPiece} mouseX={smoothMouseX} mouseY={smoothMouseY}
                />
              </div>

              {/* Text Container with dynamic crossfade on hover */}
              <div className="relative w-full max-w-2xl h-[100px] sm:h-[120px] md:h-[140px] flex justify-center text-center px-4">
                <AnimatePresence mode="wait">
                  {hoveredTab && !isMobile ? (
                    <motion.div
                      key={`hover-${hoveredTab}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-x-0 top-0 flex flex-col items-center justify-start cursor-pointer px-4"
                      onClick={() => setActiveTab(hoveredTab)}
                    >
                      <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase mb-1">
                        {labelMap[hoveredTab]}
                      </p>
                      <h2 className={clsx("text-lg sm:text-xl md:text-2xl font-medium tracking-tight mb-2", sectionsData[hoveredTab].accent)}>
                        {sectionsData[hoveredTab].title}
                      </h2>
                      <p className="text-xs sm:text-sm text-zinc-500 max-w-md leading-relaxed font-light mx-auto mb-3 line-clamp-2">
                        {sectionsData[hoveredTab].description}
                      </p>
                      <span className="text-xs font-semibold text-zinc-900 flex items-center gap-1.5 group underline decoration-zinc-300 underline-offset-4">
                        Clique para explorar área
                        <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default-text"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-x-0 top-0 flex flex-col items-center justify-start pointer-events-none px-4"
                    >
                      <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase mb-2">
                        Soluções Integradas
                      </p>
                      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-zinc-900 tracking-[-0.03em] leading-[1.1]">
                        Operações <span className="text-zinc-500 italic font-serif pr-1">seguras</span>,<br />
                        resultados sólidos.
                      </h1>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile: Quick-access section cards (since no hover on touch) */}
              {isMobile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="w-full flex flex-col gap-3 mt-4 px-2"
                >
                  <p className="text-[10px] font-semibold tracking-[0.15em] text-zinc-400 uppercase text-center mb-1">
                    Toque para explorar
                  </p>
                  {sectionKeys.map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={clsx(
                        "flex items-center justify-between w-full min-h-[56px] px-5 py-3.5 rounded-2xl border transition-all duration-200 active:scale-[0.98] text-left",
                        "bg-white border-slate-200 shadow-sm active:shadow-md"
                      )}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className={clsx("text-sm font-semibold", sectionsData[key].accent)}>
                          {labelMap[key]}
                        </span>
                        <span className="text-xs text-zinc-400 font-light line-clamp-1">
                          {sectionsData[key].description}
                        </span>
                      </div>
                      <ArrowRight size={16} className="text-zinc-300 flex-shrink-0 ml-3" />
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Scroll indicator on mobile */}
              {isMobile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 flex flex-col items-center gap-1 text-zinc-300"
                >
                  <span className="text-[9px] uppercase tracking-widest font-medium">Rolar</span>
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* ===== ACTIVE VIEW (PÁGINA DO SERVIÇO SELECIONADO) ===== */
            <motion.div
              key={`view-${activeTab}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl mx-auto flex flex-col pt-2 sm:pt-4 items-center"
            >
              {/* Back Button — large touch target */}
              <button
                onClick={() => setActiveTab("all")}
                className="flex items-center justify-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-xs md:text-sm font-semibold tracking-wider group py-2 mb-3 sm:mb-4 w-fit min-h-[48px] px-4 rounded-xl active:bg-zinc-100"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                VOLTAR AO INÍCIO
              </button>

              {/* Hero Header Area */}
              <div className="relative w-full flex flex-col items-center lg:items-start pt-2 sm:pt-4 pb-8 sm:pb-12">
                {/* Background watermark: large logo piece */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[12rem] sm:w-[18rem] lg:w-[26rem] aspect-square opacity-[0.06] sm:opacity-[0.08] pointer-events-none select-none z-0 translate-x-[20%] sm:translate-x-[15%]">
                  <motion.svg
                    layoutId={`piece-${pieceMap[activeTab as Exclude<SectionType, "all">]}`}
                    viewBox="0 0 1024 1024"
                    className="w-full h-full overflow-visible"
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {(() => {
                      const pieceKey = pieceMap[activeTab as Exclude<SectionType, "all">];
                      const piece = svgPaths[pieceKey];
                      const cx = piece.hitCenter.cx;
                      const cy = piece.hitCenter.cy;
                      const r = piece.hitCenter.r;
                      const targetScale = 360 / r;

                      return (
                        <motion.g
                          initial={{ x: 0, y: 0, scale: 1 }}
                          animate={{
                            x: 512 - cx,
                            y: 512 - cy,
                            scale: targetScale,
                          }}
                          style={{
                            originX: cx / 1024,
                            originY: cy / 1024,
                          }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <path
                            d={piece.main}
                            fill={piece.fill}
                          />
                          {"detail" in piece && (
                            <path
                              d={(piece as typeof svgPaths.azul).detail}
                              fill={piece.fill}
                            />
                          )}
                        </motion.g>
                      );
                    })()}
                  </motion.svg>
                </div>

                {/* Content on top */}
                <div className="flex flex-col items-center lg:items-start gap-0 mb-6 sm:mb-10 w-full relative z-10">
                  {/* Label + Title */}
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-3xl">
                    <p className={clsx("text-[11px] font-semibold tracking-[0.18em] uppercase mb-2 sm:mb-3", sectionsData[activeTab as Exclude<SectionType, "all">].accent)}>
                      {labelMap[activeTab as Exclude<SectionType, "all">]}
                    </p>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-medium tracking-[-0.02em] leading-[1.12] sm:leading-[1.08] text-slate-900 mb-4 sm:mb-5 px-2 sm:px-0">
                      {sectionsData[activeTab as Exclude<SectionType, "all">].title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed font-light mb-6 sm:mb-8 px-2 sm:px-0">
                      {sectionsData[activeTab as Exclude<SectionType, "all">].description}
                    </p>

                    {/* Dual CTA buttons — stacked on mobile with proper touch targets */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center lg:items-start gap-3 sm:gap-4 w-full sm:w-auto px-2 sm:px-0">
                      <a
                        href="https://wa.me/5584998208584"
                        className={clsx(
                          "group inline-flex items-center justify-center gap-2.5 px-7 py-4 sm:py-3.5 text-sm font-semibold rounded-xl sm:rounded-lg transition-all duration-200 active:scale-[0.98] min-h-[52px]",
                          sectionsData[activeTab as Exclude<SectionType, "all">].bgAccent
                        )}
                      >
                        Solicitar proposta
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                      </a>
                      <a
                        href="#contato"
                        className="inline-flex items-center justify-center gap-2.5 px-7 py-4 sm:py-3.5 text-sm font-semibold text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-xl sm:rounded-lg transition-all duration-200 min-h-[52px]"
                      >
                        Falar com especialista
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service list items or full page sections */}
              {activeTab === "saude" || activeTab === "incendio" ? (
                <div className="w-screen shrink-0 mt-6 sm:mt-12">
                  {activeTab === "saude" && <MobileUnitShowcase />}
                  <ProcessTimeline theme={activeTab as ThemeType} data={tabContents[activeTab as Exclude<ThemeType, "ambiental">].howItWorks} />
                  <ProblemSolution theme={activeTab as ThemeType} data={tabContents[activeTab as Exclude<ThemeType, "ambiental">].problemSolution} />
                  <FeatureList theme={activeTab as ThemeType} data={tabContents[activeTab as Exclude<ThemeType, "ambiental">].features} />
                  <BenefitList theme={activeTab as ThemeType} data={tabContents[activeTab as Exclude<ThemeType, "ambiental">].benefits} />
                  <TargetAudience theme={activeTab as ThemeType} data={tabContents[activeTab as Exclude<ThemeType, "ambiental">].target} />
                  <ActionCTA theme={activeTab as ThemeType} data={tabContents[activeTab as Exclude<ThemeType, "ambiental">].cta} />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 border-t border-zinc-200 pt-6 sm:pt-8 w-full text-center px-2 sm:px-0">
                  {sectionsData[activeTab as Exclude<SectionType, "all">].services.map((item, i) => (
                    <div key={item.title} className="flex flex-col items-center py-4 sm:py-0">
                      <span className={clsx("text-[10px] font-mono font-medium mb-2 block tracking-wider", sectionsData[activeTab as Exclude<SectionType, "all">].accent)}>
                        0{i + 1}
                      </span>
                      <h3 className="text-base font-medium text-zinc-900 mb-1.5 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-xs md:text-sm text-zinc-500 leading-relaxed font-light max-w-[280px]">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
