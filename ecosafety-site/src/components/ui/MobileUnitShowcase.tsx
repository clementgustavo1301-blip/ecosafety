"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Truck, MapPin, Stethoscope, Building2 } from "lucide-react";

const TOTAL_FRAMES = 414;

const FRAME_FILES = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  return `ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;
});

const captions = [
  {
    range: [0, 100],
    icon: Truck,
    title: "EcoClinic — Medicina do Trabalho",
    text: "Uma clínica completa sobre rodas, equipada para realizar todos os exames ocupacionais.",
    position: "bottom-left"
  },
  {
    range: [101, 200],
    icon: Stethoscope,
    title: "Atendimento In Company",
    text: "Exames admissionais, periódicos e demissionais — sem deslocar sua equipe.",
    position: "top-right"
  },
  {
    range: [201, 300],
    icon: MapPin,
    title: "Cobertura Nacional",
    text: "Atendimento itinerante que alcança canteiros de obra, fábricas e escritórios.",
    position: "top-left"
  },
  {
    range: [301, 414],
    icon: Building2,
    title: "Sua operação não para",
    text: "Colaboradores atendidos no local de trabalho com total conformidade legal.",
    position: "bottom-right"
  },
];

const positionClasses = {
  "top-left": "top-20 left-6 sm:top-28 sm:left-12 lg:left-24",
  "top-right": "top-20 right-6 sm:top-28 sm:right-12 lg:right-24",
  "bottom-left": "bottom-16 left-6 sm:bottom-24 sm:left-12 lg:left-24",
  "bottom-right": "bottom-16 right-6 sm:bottom-24 sm:right-12 lg:right-24",
};

function getCaptionIndex(frameIndex: number) {
  const idx = captions.findIndex((c) => frameIndex >= c.range[0] && frameIndex <= c.range[1]);
  return idx >= 0 ? idx : captions.length - 1;
}

export function MobileUnitShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const lastDrawnFrame = useRef(-1);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    let mounted = true;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    FRAME_FILES.forEach((file, i) => {
      const img = new Image();
      img.src = `/frames-van/${file}`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES && mounted) setLoaded(true);
      };
      images[i] = img;
    });

    imagesRef.current = images;
    return () => { mounted = false; };
  }, []);

  const drawFrame = useCallback((index: number) => {
    if (index === lastDrawnFrame.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = rect.width / rect.height;

    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (imgRatio > canvasRatio) {
      drawH = rect.height;
      drawW = rect.height * imgRatio;
      drawX = (rect.width - drawW) / 2;
      drawY = 0;
    } else {
      drawW = rect.width;
      drawH = rect.width / imgRatio;
      drawX = 0;
      drawY = (rect.height - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    lastDrawnFrame.current = index;
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.min(Math.round(latest), TOTAL_FRAMES - 1);
    setCurrentFrame(idx);
    currentFrameRef.current = idx;
    if (loaded) drawFrame(idx);
  });

  // Initial load draw
  useEffect(() => {
    if (loaded) drawFrame(0);
  }, [loaded, drawFrame]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      lastDrawnFrame.current = -1;
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  const captionIdx = getCaptionIndex(currentFrame);
  const activeCaption = captions[captionIdx];
  const Icon = activeCaption.icon;

  return (
    <div
      ref={containerRef}
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover" }}
        />

        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={captionIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`absolute z-20 max-w-[90vw] sm:max-w-md md:max-w-lg ${
              positionClasses[activeCaption.position as keyof typeof positionClasses]
            }`}
          >
            <div className="flex flex-col gap-3 sm:gap-4 p-2">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight" style={{ textShadow: "0px 2px 20px rgba(255,255,255,0.8)" }}>
                {activeCaption.title}
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-slate-700 font-medium leading-relaxed max-w-sm sm:max-w-md" style={{ textShadow: "0px 2px 20px rgba(255,255,255,0.8)" }}>
                {activeCaption.text}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
