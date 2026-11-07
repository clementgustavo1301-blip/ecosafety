"use client";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  type MotionValue,
} from "framer-motion";
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
type ActiveSection = Exclude<SectionType, "all">;

interface DeviceOrientationEventWithPermission extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

const sectionsData: Record<
  ActiveSection,
  {
    title: string;
    description: string;
    accent: string;
    bgAccent: string;
    hexColor: string;
    services: { title: string; text: string }[];
  }
> = {
  ambiental: {
    title: "Consultoria Ambiental",
    description:
      "Licenciamento, gestão de resíduos e soluções sustentáveis para operações ininterruptas.",
    accent: "text-emerald-600",
    bgAccent: "bg-emerald-600 hover:bg-emerald-700 text-white",
    hexColor: "#3B9652",
    services: [
      {
        title: "Licenciamento",
        text: "Regularização completa junto aos órgãos competentes.",
      },
      {
        title: "Gestão de Resíduos",
        text: "PGRS e destinação correta de ponta a ponta.",
      },
      {
        title: "Estudos de Impacto",
        text: "EIA/RIMA e levantamentos técnicos especializados.",
      },
    ],
  },
  saude: {
    title: "Gestão inteligente e presença que cuida de verdade.",
    description:
      "Muito além do ASO: unimos medicina ocupacional, SST e atuação multidisciplinar para proteger a saúde dos colaboradores e fortalecer o cuidado humano nas organizações.",
    accent: "text-blue-800",
    bgAccent: "bg-blue-800 hover:bg-blue-900 text-white",
    hexColor: "#226DBC",
    services: [
      {
        title: "PGR & PCMSO",
        text: "Gerenciamento contínuo de riscos e saúde do trabalhador.",
      },
      {
        title: "Laudos Técnicos",
        text: "LTCAT, insalubridade e periculosidade com respaldo legal.",
      },
      {
        title: "Capacitação NR",
        text: "Treinamentos práticos e teóricos exigidos por norma.",
      },
    ],
  },
  incendio: {
    title: "Prevenção de Incêndio",
    description:
      "Engenharia de proteção contra incêndios, do projeto executivo à emissão do AVCB.",
    accent: "text-amber-600",
    bgAccent: "bg-amber-600 hover:bg-amber-700 text-white",
    hexColor: "#EA811F",
    services: [
      {
        title: "Projetos PPCI",
        text: "Desenho e aprovação técnica no Corpo de Bombeiros.",
      },
      {
        title: "Obtenção de AVCB",
        text: "Vistoria e emissão do auto de conformidade.",
      },
      {
        title: "Brigadas",
        text: "Formação de equipes de emergência in loco.",
      },
    ],
  },
};

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smoothstep = (t: number) => t * t * (3 - 2 * t);
const segment = (p: number, a: number, b: number) =>
  smoothstep(clamp((p - a) / (b - a)));

const POWER3_IN_OUT = [0.77, 0, 0.175, 1] as const;
const OPEN_DURATION = 0.95;
const CLOSE_DURATION = 0.82;

/*
 * SVG path data for each petal in a 1024x1024 coordinate space.
 * `pole` is the mathematically computed Pole of Inaccessibility (largest inscribed circle)
 * inside `solid`, guaranteeing 100% viewport coverage on both mobile and desktop.
 */
const svgPaths = {
  azul: {
    main: "M 492.55 560.75 C492.34,560.06 491.90,543.53 491.56,524.00 C491.23,504.48 490.53,469.38 489.99,446.00 C487.09,317.94 486.59,302.81 489.16,288.23 C489.65,285.45 490.25,282.68 490.97,279.16 C495.24,258.18 505.23,234.75 518.16,215.37 C527.83,200.89 547.39,181.25 562.00,171.36 C586.58,154.72 613.58,144.50 642.28,140.95 C654.49,139.44 682.33,140.20 694.01,142.36 C743.26,151.45 785.38,180.13 811.69,222.50 C828.61,249.74 837.39,281.13 837.28,314.00 C837.04,384.27 797.36,443.14 720.00,487.99 C684.41,508.62 643.11,526.12 598.50,539.46 C564.17,549.73 539.61,555.62 513.00,559.96 C498.58,562.31 493.10,562.52 492.55,560.75 ZM 511.62 553.47 C621.66,534.48 726.25,488.36 778.04,436.01 C818.22,395.40 836.71,342.10 828.88,289.50 C819.50,226.53 774.47,173.52 713.93,154.18 C696.65,148.66 687.99,147.54 662.50,147.54 C642.50,147.55 638.12,147.84 628.96,149.78 C605.35,154.79 588.68,161.85 568.00,175.59 C537.49,195.87 514.52,226.33 502.63,262.30 C493.27,290.60 492.73,303.32 496.00,417.50 C496.57,437.30 497.44,475.88 497.95,503.24 C498.45,530.60 499.15,553.43 499.49,553.99 C500.31,555.31 501.13,555.28 511.62,553.47 Z",
    solid:
      "M 492.55 560.75 C492.34,560.06 491.90,543.53 491.56,524.00 C491.23,504.48 490.53,469.38 489.99,446.00 C487.09,317.94 486.59,302.81 489.16,288.23 C489.65,285.45 490.25,282.68 490.97,279.16 C495.24,258.18 505.23,234.75 518.16,215.37 C527.83,200.89 547.39,181.25 562.00,171.36 C586.58,154.72 613.58,144.50 642.28,140.95 C654.49,139.44 682.33,140.20 694.01,142.36 C743.26,151.45 785.38,180.13 811.69,222.50 C828.61,249.74 837.39,281.13 837.28,314.00 C837.04,384.27 797.36,443.14 720.00,487.99 C684.41,508.62 643.11,526.12 598.50,539.46 C564.17,549.73 539.61,555.62 513.00,559.96 C498.58,562.31 493.10,562.52 492.55,560.75 Z",
    fill: "#226DBC",
    pole: { cx: 662.39, cy: 315.9, r: 170 },
    watermarkViewBox: "442 130 442 442",
    depth: 0.8,
  },
  laranja: {
    main: "M 353.50 880.45 C293.38,870.66 250.00,821.73 250.00,763.72 C250.00,744.01 253.66,728.82 262.96,709.94 C280.12,675.10 313.86,644.53 358.41,623.47 C374.00,616.10 400.07,607.04 405.78,607.01 C409.47,606.99 409.60,609.84 406.22,616.42 C399.93,628.65 395.07,640.11 392.97,647.71 C391.78,652.00 390.40,655.93 389.90,656.45 C389.41,656.97 389.00,659.67 389.01,662.45 L 389.01 667.50 L 393.51 659.63 C399.97,648.31 403.80,643.43 413.44,634.17 C426.82,621.33 442.90,612.02 463.58,605.17 C473.94,601.73 486.60,598.91 488.48,599.63 C489.17,599.90 490.03,602.18 490.37,604.70 C491.40,612.20 491.05,759.48 489.98,772.48 C487.11,807.05 470.36,837.07 442.46,857.63 C416.88,876.48 382.81,885.22 353.50,880.45 ZM 392.50 872.33 C416.92,867.78 442.60,852.31 458.67,832.46 C466.49,822.81 474.49,808.43 477.86,798.00 C483.54,780.42 483.32,784.28 483.72,693.09 C483.93,644.96 483.71,608.31 483.20,607.80 C482.69,607.29 478.78,607.95 473.91,609.36 C433.61,621.09 409.28,640.96 393.23,675.25 C389.66,682.86 388.80,684.00 386.60,684.00 C377.13,684.00 380.97,651.81 393.49,626.12 C396.01,620.95 397.84,616.50 397.56,616.23 C396.26,614.92 370.03,625.51 353.14,634.16 C303.99,659.32 270.56,696.41 259.90,737.60 C257.97,745.06 257.60,749.09 257.58,762.50 C257.57,772.32 258.08,780.82 258.90,784.50 C266.42,818.08 286.72,844.75 317.00,860.80 C340.76,873.41 366.03,877.26 392.50,872.33 Z",
    solid:
      "M 353.50 880.45 C293.38,870.66 250.00,821.73 250.00,763.72 C250.00,744.01 253.66,728.82 262.96,709.94 C280.12,675.10 313.86,644.53 358.41,623.47 C374.00,616.10 400.07,607.04 405.78,607.01 C409.47,606.99 409.60,609.84 406.22,616.42 C399.93,628.65 395.07,640.11 392.97,647.71 C391.78,652.00 390.40,655.93 389.90,656.45 C389.41,656.97 389.00,659.67 389.01,662.45 L 389.01 667.50 L 393.51 659.63 C399.97,648.31 403.80,643.43 413.44,634.17 C426.82,621.33 442.90,612.02 463.58,605.17 C473.94,601.73 486.60,598.91 488.48,599.63 C489.17,599.90 490.03,602.18 490.37,604.70 C491.40,612.20 491.05,759.48 489.98,772.48 C487.11,807.05 470.36,837.07 442.46,857.63 C416.88,876.48 382.81,885.22 353.50,880.45 Z",
    fill: "#EA811F",
    pole: { cx: 368.48, cy: 773.55, r: 105 },
    watermarkViewBox: "220 590 300 300",
    depth: 1.2,
  },
  verde: {
    main: "M 415.50 563.36 C412.75,563.19 400.38,562.56 388.00,561.96 C354.71,560.34 333.99,556.74 317.20,549.65 C289.66,538.02 271.81,518.85 264.46,493.00 C262.26,485.24 261.91,464.10 263.87,457.00 C270.81,431.88 285.94,413.62 308.93,402.60 C321.08,396.78 332.40,394.68 348.71,395.24 C363.47,395.74 369.86,397.22 382.30,402.99 C411.42,416.48 435.10,449.90 446.89,494.12 C452.73,516.01 457.92,555.89 455.61,561.00 L 454.48 563.50 L 437.49 563.58 C428.14,563.63 418.25,563.52 415.50,563.36 ZM 448.67 546.60 C446.99,519.13 440.15,489.86 430.12,467.17 C412.68,427.72 386.69,405.87 352.42,401.86 C343.39,400.80 341.52,400.89 331.61,402.88 C312.91,406.65 300.69,413.27 288.19,426.43 C275.49,439.80 269.53,455.41 269.65,475.00 C269.70,485.10 270.08,487.56 272.74,495.26 C284.10,528.13 313.76,547.62 360.50,552.93 C369.89,554.00 403.93,555.88 422.00,556.32 C427.77,556.46 436.28,556.67 440.90,556.79 L 449.30,557.00 Z",
    solid:
      "M 415.50 563.36 C412.75,563.19 400.38,562.56 388.00,561.96 C354.71,560.34 333.99,556.74 317.20,549.65 C289.66,538.02 271.81,518.85 264.46,493.00 C262.26,485.24 261.91,464.10 263.87,457.00 C270.81,431.88 285.94,413.62 308.93,402.60 C321.08,396.78 332.40,394.68 348.71,395.24 C363.47,395.74 369.86,397.22 382.30,402.99 C411.42,416.48 435.10,449.90 446.89,494.12 C452.73,516.01 457.92,555.89 455.61,561.00 L 454.48 563.50 L 437.49 563.58 C428.14,563.63 418.25,563.52 415.50,563.36 Z",
    fill: "#3B9652",
    pole: { cx: 346.47, cy: 475.16, r: 78 },
    watermarkViewBox: "254 374 210 210",
    depth: 1.0,
  },
};

type PieceKey = keyof typeof svgPaths;

const pieceMap: Record<ActiveSection, PieceKey> = {
  ambiental: "verde",
  incendio: "laranja",
  saude: "azul",
};

const labelMap: Record<ActiveSection, string> = {
  ambiental: "Consultoria Ambiental",
  incendio: "Prevenção de Incêndio",
  saude: "Saúde & Engenharia",
};

const sectionKeys: ActiveSection[] = ["ambiental", "saude", "incendio"];

type PortalStage = "opening" | "closing-cover" | "closing";

type PortalState = {
  item: PieceKey;
  tab: ActiveSection;
  stage: PortalStage;
  screenX: number;
  screenY: number;
  baseScale: number;
  F: number;
};

type CachedPaths = Record<PieceKey, { solid: Path2D; main: Path2D }>;

function LogoPiece({
  pieceKey,
  tab,
  hoveredPiece,
  setHoveredPiece,
  onSelect,
  activePortalPiece,
  isMobile,
  mouseX,
  mouseY,
}: {
  pieceKey: PieceKey;
  tab: ActiveSection;
  hoveredPiece: PieceKey | null;
  setHoveredPiece: (piece: PieceKey | null) => void;
  onSelect: (tab: ActiveSection) => void;
  activePortalPiece: PieceKey | null;
  isMobile: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const piece = svgPaths[pieceKey];
  const isHovered = hoveredPiece === pieceKey;
  const somethingHovered = hoveredPiece !== null;
  const isPortalActive = activePortalPiece !== null;
  const isHiddenByPortal = activePortalPiece === pieceKey;

  const xOffset = useTransform(
    mouseX,
    [-1, 1],
    [-45 * piece.depth, 45 * piece.depth]
  );
  const yOffset = useTransform(
    mouseY,
    [-1, 1],
    [-45 * piece.depth, 45 * piece.depth]
  );

  const dimOpacity =
    isPortalActive || isMobile ? 1 : somethingHovered && !isHovered ? 0.35 : 1;

  return (
    <g
      opacity={isHiddenByPortal ? 0 : 1}
      style={{ pointerEvents: isHiddenByPortal ? "none" : "auto" }}
    >
      <motion.g
        role="button"
        tabIndex={isHiddenByPortal ? -1 : 0}
        aria-label={`Explorar ${labelMap[tab]}`}
        className="cursor-pointer outline-none"
        onClick={() => onSelect(tab)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(tab);
          }
        }}
        onMouseEnter={() => {
          if (!isMobile) setHoveredPiece(pieceKey);
        }}
        onMouseLeave={() => {
          if (!isMobile) setHoveredPiece(null);
        }}
        onFocus={() => setHoveredPiece(pieceKey)}
        onBlur={() => setHoveredPiece(null)}
        style={{
          x: xOffset,
          y: yOffset,
        }}
      >
        <g
          className="transition-opacity duration-300"
          style={{
            opacity: dimOpacity,
            filter:
              isHovered && !isPortalActive && !isMobile
                ? "drop-shadow(0 6px 16px rgba(0,0,0,0.12))"
                : "drop-shadow(0 2px 4px rgba(0,0,0,0.03))",
          }}
        >
          {/* Full petal touch & click target with generous invisible stroke halo */}
          <path
            d={piece.solid}
            fill="rgba(0,0,0,0.001)"
            stroke="rgba(0,0,0,0.001)"
            strokeWidth={28}
            strokeLinejoin="round"
          />
          <path d={piece.main} fill={piece.fill} />
        </g>
      </motion.g>
    </g>
  );
}

const subscribeMobile = (callback: () => void) => {
  const mql = window.matchMedia("(max-width: 767px)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};
const getMobileSnapshot = () => window.matchMedia("(max-width: 767px)").matches;
const getServerMobileSnapshot = () => false;

export function InteractiveHero({
  activeTab,
  setActiveTab,
}: {
  activeTab: SectionType;
  setActiveTab: (tab: SectionType) => void;
}) {
  const isAll = activeTab === "all";
  const [hoveredPiece, setHoveredPieceState] = useState<PieceKey | null>(null);
  const hoveredPieceRef = useRef<PieceKey | null>(null);
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerMobileSnapshot
  );

  const logoContainerRef = useRef<HTMLDivElement>(null);
  const portalCanvasRef = useRef<HTMLCanvasElement>(null);
  const pathCacheRef = useRef<CachedPaths | null>(null);
  const animControlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const busyRef = useRef(false);

  const [portalState, setPortalState] = useState<PortalState | null>(null);
  const [isClosingContent, setIsClosingContent] = useState(false);

  const setHoveredPiece = useCallback((piece: PieceKey | null) => {
    hoveredPieceRef.current = piece;
    setHoveredPieceState(piece);
  }, []);

  // Mouse & gyroscope parallax state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 50, stiffness: 60, mass: 1.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const getPathCache = useCallback((): CachedPaths => {
    if (!pathCacheRef.current) {
      pathCacheRef.current = {
        azul: {
          solid: new Path2D(svgPaths.azul.solid),
          main: new Path2D(svgPaths.azul.main),
        },
        laranja: {
          solid: new Path2D(svgPaths.laranja.solid),
          main: new Path2D(svgPaths.laranja.main),
        },
        verde: {
          solid: new Path2D(svgPaths.verde.solid),
          main: new Path2D(svgPaths.verde.main),
        },
      };
    }
    return pathCacheRef.current;
  }, []);

  const prepareCanvas = useCallback(() => {
    const canvas = portalCanvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const vw = rect.width || window.innerWidth;
    const vh = rect.height || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.max(1, Math.round(vw * dpr));
    const targetH = Math.max(1, Math.round(vh * dpr));

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, vw, vh };
  }, []);

  const clearPortalCanvas = useCallback(() => {
    const prepared = prepareCanvas();
    if (!prepared) return;
    prepared.ctx.clearRect(0, 0, prepared.vw, prepared.vh);
  }, [prepareCanvas]);

  const drawCoverCanvas = useCallback(() => {
    const prepared = prepareCanvas();
    if (!prepared) return;
    prepared.ctx.fillStyle = "#ffffff";
    prepared.ctx.fillRect(0, 0, prepared.vw, prepared.vh);
  }, [prepareCanvas]);

  const drawPortalCanvas = useCallback(
    (state: PortalState, p: number) => {
      const prepared = prepareCanvas();
      if (!prepared) return;

      const { ctx, vw, vh } = prepared;
      const piece = svgPaths[state.item];
      const paths = getPathCache()[state.item];
      const scale = state.baseScale * Math.pow(state.F, p);

      ctx.clearRect(0, 0, vw, vh);
      ctx.save();
      ctx.translate(state.screenX, state.screenY);
      ctx.scale(scale, scale);
      ctx.translate(-piece.pole.cx, -piece.pole.cy);

      ctx.globalAlpha = 1;
      ctx.fillStyle = "#ffffff";
      ctx.fill(paths.solid);

      const contourAlpha = 1 - segment(p, 0.15, 0.88);
      if (contourAlpha > 0.001) {
        ctx.globalAlpha = contourAlpha;
        ctx.fillStyle = piece.fill;
        ctx.fill(paths.main);
      }

      ctx.restore();
    },
    [getPathCache, prepareCanvas]
  );

  useEffect(() => {
    return () => {
      animControlsRef.current?.stop();
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma || 0;
      const beta = e.beta || 0;
      mouseX.set(clamp(gamma / 30, -1, 1));
      mouseY.set(clamp((beta - 45) / 30, -1, 1));
    };

    const requiresPermission =
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (
        DeviceOrientationEvent as unknown as DeviceOrientationEventWithPermission
      ).requestPermission === "function";

    if (isAll) {
      if (!isMobile) {
        window.addEventListener("mousemove", handleMouseMove);
      }
      if (
        typeof window.DeviceOrientationEvent !== "undefined" &&
        !requiresPermission
      ) {
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      }
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (typeof window.DeviceOrientationEvent !== "undefined") {
        window.removeEventListener("deviceorientation", handleDeviceOrientation);
      }
    };
  }, [isAll, isMobile, mouseX, mouseY]);

  const computePortalGeometry = useCallback(
    (pieceKey: PieceKey, includeParallax: boolean) => {
      const piece = svgPaths[pieceKey];
      const rect = logoContainerRef.current?.getBoundingClientRect();
      const canvasRect = portalCanvasRef.current?.getBoundingClientRect();
      const vw = canvasRect?.width || window.innerWidth;
      const vh = canvasRect?.height || window.innerHeight;

      const renderedSize = rect
        ? Math.min(rect.width, rect.height)
        : Math.min(vw * 0.65, 420);
      const scaleLogo = renderedSize / 1024;
      const canvasLeft = canvasRect?.left ?? 0;
      const canvasTop = canvasRect?.top ?? 0;
      const svgCenterX = rect
        ? rect.left - canvasLeft + rect.width / 2
        : vw / 2;
      const svgCenterY = rect
        ? rect.top - canvasTop + rect.height / 2
        : vh * 0.34;

      const parallaxX = includeParallax
        ? smoothMouseX.get() * 45 * piece.depth
        : 0;
      const parallaxY = includeParallax
        ? smoothMouseY.get() * 45 * piece.depth
        : 0;

      const baseScale = scaleLogo;
      let screenX = svgCenterX + (piece.pole.cx + parallaxX - 512) * baseScale;
      let screenY = svgCenterY + (piece.pole.cy + parallaxY - 512) * baseScale;

      // If user scrolled the logo completely out of view on a small screen before tapping a card, keep portal origin visible
      if (
        includeParallax &&
        (!rect || rect.bottom < 20 || rect.top > vh - 20)
      ) {
        screenX = vw / 2 + (piece.pole.cx - 512) * baseScale;
        screenY = Math.min(Math.max(vh * 0.32, 120), vh - 120);
      }

      const maxDist = Math.max(
        Math.hypot(screenX, screenY),
        Math.hypot(vw - screenX, screenY),
        Math.hypot(screenX, vh - screenY),
        Math.hypot(vw - screenX, vh - screenY)
      );
      const rScreen = Math.max(piece.pole.r * baseScale, 1);
      const F = (maxDist / rScreen) * 1.18;

      return { screenX, screenY, baseScale, F };
    },
    [smoothMouseX, smoothMouseY]
  );

  // Paint initial canvas state synchronously before browser paint to avoid any single-frame blink
  useLayoutEffect(() => {
    if (!portalState) return;

    if (portalState.stage === "closing-cover") {
      drawCoverCanvas();
    } else if (portalState.stage === "opening") {
      drawPortalCanvas(portalState, 0);
    } else if (portalState.stage === "closing") {
      drawPortalCanvas(portalState, 1);
    }
  }, [drawCoverCanvas, drawPortalCanvas, portalState]);

  const openPortal = useCallback(
    (tab: ActiveSection) => {
      if (busyRef.current) return;
      busyRef.current = true;

      const pieceKey = pieceMap[tab];
      const geom = computePortalGeometry(pieceKey, true);

      const nextState: PortalState = {
        item: pieceKey,
        tab,
        stage: "opening",
        ...geom,
      };

      setIsClosingContent(false);
      setPortalState(nextState);

      animControlsRef.current?.stop();
      animControlsRef.current = animate(0, 1, {
        duration: OPEN_DURATION,
        ease: POWER3_IN_OUT,
        onUpdate: (latest) => {
          drawPortalCanvas(nextState, latest);
        },
        onComplete: () => {
          drawPortalCanvas(nextState, 1);
          setHoveredPiece(null);
          mouseX.set(0);
          mouseY.set(0);
          smoothMouseX.jump(0);
          smoothMouseY.jump(0);
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          setActiveTab(tab);

          requestAnimationFrame(() => {
            clearPortalCanvas();
            setPortalState(null);
            busyRef.current = false;
          });
        },
      });
    },
    [
      clearPortalCanvas,
      computePortalGeometry,
      drawPortalCanvas,
      mouseX,
      mouseY,
      setActiveTab,
      setHoveredPiece,
      smoothMouseX,
      smoothMouseY,
    ]
  );

  const closePortal = useCallback(() => {
    if (busyRef.current || activeTab === "all") return;
    busyRef.current = true;

    const currentTab = activeTab;
    const pieceKey = pieceMap[currentTab];

    setIsClosingContent(true);

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setIsClosingContent(false);
      setHoveredPiece(null);
      mouseX.set(0);
      mouseY.set(0);
      smoothMouseX.jump(0);
      smoothMouseY.jump(0);

      setPortalState({
        item: pieceKey,
        tab: currentTab,
        stage: "closing-cover",
        screenX: 0,
        screenY: 0,
        baseScale: 1,
        F: 1,
      });

      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setActiveTab("all");
    }, 180);
  }, [activeTab, mouseX, mouseY, setActiveTab, setHoveredPiece, smoothMouseX, smoothMouseY]);

  const portalStage = portalState?.stage;
  const portalItem = portalState?.item;
  const portalTab = portalState?.tab;

  // Once view-all is mounted underneath closing-cover, measure resting coordinates and contract smoothly
  useEffect(() => {
    if (!isAll || portalStage !== "closing-cover" || !portalItem || !portalTab) {
      return;
    }

    let cancelled = false;
    let raf2 = 0;

    const raf1 = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      raf2 = requestAnimationFrame(() => {
        if (cancelled) return;

        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        const geom = computePortalGeometry(portalItem, false);
        const closingState: PortalState = {
          item: portalItem,
          tab: portalTab,
          stage: "closing",
          ...geom,
        };

        drawPortalCanvas(closingState, 1);
        setPortalState(closingState);

        animControlsRef.current?.stop();
        animControlsRef.current = animate(1, 0, {
          duration: CLOSE_DURATION,
          ease: POWER3_IN_OUT,
          onUpdate: (latest) => {
            drawPortalCanvas(closingState, latest);
          },
          onComplete: () => {
            clearPortalCanvas();
            setPortalState(null);
            busyRef.current = false;
          },
        });
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [
    clearPortalCanvas,
    computePortalGeometry,
    drawPortalCanvas,
    isAll,
    portalItem,
    portalStage,
    portalTab,
  ]);

  // Keyboard Escape listener to return to initial Hero
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeTab !== "all") {
        closePortal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, closePortal]);

  const hoveredTab = hoveredPiece
    ? (Object.entries(pieceMap).find(
        ([, v]) => v === hoveredPiece
      )?.[0] as ActiveSection)
    : null;

  return (
    <section
      id="hero"
      className={clsx(
        "relative min-h-[100dvh] w-full flex flex-col bg-white transition-colors duration-300",
        isAll
          ? "items-center justify-center pt-16 pb-4"
          : "items-center justify-start pt-20 pb-8 md:pb-12"
      )}
    >
      {/* Subtle texture background */}
      <div className="absolute inset-0 -z-10 bg-zinc-50/40 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full flex flex-col items-center">
        {isAll ? (
          /* ===== ALL VIEW (HERO INICIAL) ===== */
          <motion.div
            key="view-all"
            initial={portalState ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto"
          >
            {/* Central Interactive Logo — unified SVG so touch hit-testing works natively on iOS & Android */}
            <div
              ref={logoContainerRef}
              className="relative w-[min(64vw,32dvh)] sm:w-[min(72vw,54dvh)] md:w-[min(66vw,62dvh)] max-w-[660px] aspect-square flex justify-center items-center -mb-2 sm:-mb-6 md:-mb-10"
              onMouseLeave={() => {
                if (!isMobile) {
                  setHoveredPiece(null);
                  mouseX.set(0);
                  mouseY.set(0);
                }
              }}
            >
              <svg
                viewBox="0 0 1024 1024"
                className="w-full h-full select-none touch-manipulation overflow-visible"
              >
                <LogoPiece
                  pieceKey="azul"
                  tab="saude"
                  hoveredPiece={hoveredPiece}
                  setHoveredPiece={setHoveredPiece}
                  onSelect={openPortal}
                  activePortalPiece={portalState?.item ?? null}
                  isMobile={isMobile}
                  mouseX={smoothMouseX}
                  mouseY={smoothMouseY}
                />
                <LogoPiece
                  pieceKey="laranja"
                  tab="incendio"
                  hoveredPiece={hoveredPiece}
                  setHoveredPiece={setHoveredPiece}
                  onSelect={openPortal}
                  activePortalPiece={portalState?.item ?? null}
                  isMobile={isMobile}
                  mouseX={smoothMouseX}
                  mouseY={smoothMouseY}
                />
                <LogoPiece
                  pieceKey="verde"
                  tab="ambiental"
                  hoveredPiece={hoveredPiece}
                  setHoveredPiece={setHoveredPiece}
                  onSelect={openPortal}
                  activePortalPiece={portalState?.item ?? null}
                  isMobile={isMobile}
                  mouseX={smoothMouseX}
                  mouseY={smoothMouseY}
                />
              </svg>
            </div>

            {/* Text Container with dynamic crossfade on desktop hover */}
            <div className="relative w-full max-w-2xl h-auto sm:h-[124px] md:h-[140px] flex justify-center text-center px-4 mb-1 sm:mb-0">
              <AnimatePresence mode="wait">
                {hoveredTab && !isMobile ? (
                  <motion.div
                    key={`hover-${hoveredTab}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="sm:absolute sm:inset-x-0 sm:top-0 flex flex-col items-center justify-start cursor-pointer px-4"
                    onClick={() => openPortal(hoveredTab)}
                  >
                    <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase mb-1">
                      {labelMap[hoveredTab]}
                    </p>
                    <h2
                      className={clsx(
                        "text-lg sm:text-xl md:text-2xl font-medium tracking-tight mb-2",
                        sectionsData[hoveredTab].accent
                      )}
                    >
                      {sectionsData[hoveredTab].title}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 max-w-md leading-relaxed font-light mx-auto mb-3 line-clamp-2">
                      {sectionsData[hoveredTab].description}
                    </p>
                    <span className="text-xs font-semibold text-zinc-900 flex items-center gap-1.5 group underline decoration-zinc-300 underline-offset-4">
                      Clique para explorar área
                      <ArrowRight
                        size={13}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default-text"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="sm:absolute sm:inset-x-0 sm:top-0 flex flex-col items-center justify-start pointer-events-none px-4"
                  >
                    <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase mb-1.5 sm:mb-2">
                      Soluções Integradas
                    </p>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-zinc-900 tracking-[-0.03em] leading-[1.12] pb-1">
                      Operações{" "}
                      <span className="text-zinc-500 italic font-serif pr-1">
                        seguras
                      </span>
                      ,<br />
                      resultados sólidos.
                    </h1>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile: Quick-access section cards */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.35 }}
                className="w-full flex flex-col gap-2.5 mt-2 px-2"
              >
                <p className="text-[10px] font-semibold tracking-[0.15em] text-zinc-400 uppercase text-center mb-0.5">
                  Toque em uma pétala ou escolha abaixo
                </p>
                {sectionKeys.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => openPortal(key)}
                    className={clsx(
                      "flex items-center justify-between w-full min-h-[52px] px-4 py-3 rounded-2xl border transition-all duration-200 active:scale-[0.98] text-left touch-manipulation",
                      "bg-white border-slate-200 shadow-sm active:shadow-md"
                    )}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span
                        className={clsx(
                          "text-sm font-semibold",
                          sectionsData[key].accent
                        )}
                      >
                        {labelMap[key]}
                      </span>
                      <span className="text-xs text-zinc-400 font-light line-clamp-1">
                        {sectionsData[key].description}
                      </span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-zinc-300 flex-shrink-0 ml-3"
                    />
                  </button>
                ))}
              </motion.div>
            )}

            {/* Scroll indicator on mobile */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex flex-col items-center gap-1 text-zinc-300"
              >
                <span className="text-[9px] uppercase tracking-widest font-medium">
                  Rolar
                </span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
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
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: isClosingContent ? 0 : 1,
              y: isClosingContent ? 8 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl mx-auto flex flex-col pt-2 sm:pt-4 items-center"
          >
            {/* Back Button */}
            <button
              type="button"
              onClick={closePortal}
              className="flex items-center justify-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-xs md:text-sm font-semibold tracking-wider group py-2 mb-3 sm:mb-4 w-fit min-h-[48px] px-4 rounded-xl active:bg-zinc-100 touch-manipulation"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              VOLTAR AO INÍCIO
            </button>

            {/* Hero Header Area */}
            <div className="relative w-full flex flex-col items-center lg:items-start pt-2 sm:pt-4 pb-8 sm:pb-12">
              {/* Background watermark */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[12rem] sm:w-[18rem] lg:w-[24rem] aspect-square opacity-[0.06] sm:opacity-[0.08] pointer-events-none select-none z-0 translate-x-[15%] sm:translate-x-[10%]">
                {(() => {
                  const pieceKey = pieceMap[activeTab];
                  const piece = svgPaths[pieceKey];
                  return (
                    <svg
                      viewBox={piece.watermarkViewBox}
                      className="w-full h-full"
                      aria-hidden="true"
                    >
                      <path d={piece.main} fill={piece.fill} />
                    </svg>
                  );
                })()}
              </div>

              {/* Content on top */}
              <div className="flex flex-col items-center lg:items-start gap-0 mb-6 sm:mb-10 w-full relative z-10">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-3xl">
                  <p
                    className={clsx(
                      "text-[11px] font-semibold tracking-[0.18em] uppercase mb-2 sm:mb-3",
                      sectionsData[activeTab].accent
                    )}
                  >
                    {labelMap[activeTab]}
                  </p>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-medium tracking-[-0.02em] leading-[1.12] sm:leading-[1.08] text-slate-900 mb-4 sm:mb-5 px-2 sm:px-0">
                    {sectionsData[activeTab].title}
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed font-light mb-6 sm:mb-8 px-2 sm:px-0">
                    {sectionsData[activeTab].description}
                  </p>

                  {/* Dual CTA buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center lg:items-start gap-3 sm:gap-4 w-full sm:w-auto px-2 sm:px-0">
                    <a
                      href="https://wa.me/5584998208584"
                      className={clsx(
                        "group inline-flex items-center justify-center gap-2.5 px-7 py-4 sm:py-3.5 text-sm font-semibold rounded-xl sm:rounded-lg transition-all duration-200 active:scale-[0.98] min-h-[52px]",
                        sectionsData[activeTab].bgAccent
                      )}
                    >
                      Solicitar proposta
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
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
                <ProcessTimeline
                  theme={activeTab as ThemeType}
                  data={tabContents[activeTab].howItWorks}
                />
                <ProblemSolution
                  theme={activeTab as ThemeType}
                  data={tabContents[activeTab].problemSolution}
                />
                <FeatureList
                  theme={activeTab as ThemeType}
                  data={tabContents[activeTab].features}
                />
                <BenefitList
                  theme={activeTab as ThemeType}
                  data={tabContents[activeTab].benefits}
                />
                <TargetAudience
                  theme={activeTab as ThemeType}
                  data={tabContents[activeTab].target}
                />
                <ActionCTA
                  theme={activeTab as ThemeType}
                  data={tabContents[activeTab].cta}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 border-t border-zinc-200 pt-6 sm:pt-8 w-full text-center px-2 sm:px-0">
                {sectionsData[activeTab].services.map((item, i) => (
                  <div
                    key={item.title}
                    className="flex flex-col items-center py-4 sm:py-0"
                  >
                    <span
                      className={clsx(
                        "text-[10px] font-mono font-medium mb-2 block tracking-wider",
                        sectionsData[activeTab].accent
                      )}
                    >
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
      </div>

      {/* ===== HARDWARE-ACCELERATED 2D CANVAS PORTAL OVERLAY (60/120FPS ON MOBILE & DESKTOP) ===== */}
      <canvas
        ref={portalCanvasRef}
        className={clsx(
          "fixed inset-0 w-full h-full pointer-events-none z-40",
          !portalState && "invisible"
        )}
        aria-hidden="true"
      />
    </section>
  );
}
