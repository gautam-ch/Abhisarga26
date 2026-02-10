"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

export default function ProductSection({
  type,
  badge,
  title,
}) {
  const [view, setView] = useState("front");
  const dragX = useMotionValue(0);

  // Setup images based on type or global main images
  // (Assuming /tshirt_front.png and /tshirt_back.png are the main ones)
  const productImages = {
    front: "/tshirt_front.png",
    back: "/tshirt_back.png"
  };

  const handleDragEnd = (_, info) => {
    const threshold = 20; // Lower threshold for faster switching
    if (Math.abs(info.offset.x) > threshold) {
      setView(prev => prev === "front" ? "back" : "front");
    }
  };

  return (
    <section className="relative flex flex-col items-center">
      {/* Corner accents for the whole section */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-red-600/50" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-red-600/50" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-red-600/50" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-red-600/50" />

      {/* HEADER */}
      <div className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-block mb-4 px-4 py-1.5 text-[0.7rem] font-bold tracking-[0.3em] uppercase bg-red-600/20 text-red-500 border border-red-600/30 st-glow"
        >
          {badge}
        </motion.span>
        <h2 className="st-title text-4xl md:text-5xl st-glow leading-tight">{title}</h2>
      </div>

      {/* INTERACTIVE T-SHIRT VIEW */}
      <div className="relative w-full max-w-[500px] flex flex-col items-center group cursor-grab active:cursor-grabbing pb-32">

        {/* View Switches & Hint */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 w-full">
          <div className="flex gap-4">
            <button
              onClick={() => setView("front")}
              className={`px-4 py-1 text-[10px] uppercase tracking-[0.2em] transition-all border ${view === 'front' ? 'bg-red-600 border-red-600 text-black font-bold' : 'bg-black/40 border-white/20 text-white/60 hover:border-red-500/50'}`}
            >
              Front
            </button>
            <button
              onClick={() => setView("back")}
              className={`px-4 py-1 text-[10px] uppercase tracking-[0.2em] transition-all border ${view === 'back' ? 'bg-red-600 border-red-600 text-black font-bold' : 'bg-black/40 border-white/20 text-white/60 hover:border-red-500/50'}`}
            >
              Rear
            </button>
          </div>

          {/* Moved Hint Text */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-[9px] uppercase tracking-[0.3em] text-red-500 font-bold st-glow whitespace-nowrap">
              Swipe to see other side
            </span>
          </div>
        </div>

        <div className="relative w-full aspect-square flex items-center justify-center p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              style={{ x: dragX }}
              initial={{ opacity: 0, scale: 0.9, rotateY: view === 'front' ? -90 : 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: view === 'front' ? 90 : -90 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 25 }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="relative flex flex-col items-center">
                {/* Main Image */}
                <img
                  src={productImages[view]}
                  alt={`${title} ${view} view`}
                  draggable="false"
                  className="max-w-full max-h-[400px] object-contain drop-shadow-[0_20px_50px_rgba(255,37,70,0.4)] select-none relative z-10"
                />

                {/* Reflection Effect */}
                <div
                  className="absolute top-[82%] left-0 w-full h-[80%] opacity-80 select-none pointer-events-none transform scale-y-[-1] transition-all duration-700"
                  style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, transparent 120%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, transparent 120%)'
                  }}
                >
                  <img
                    src={productImages[view]}
                    alt=""
                    draggable="false"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Floor Shadow/Glow */}
                <div className="absolute top-[82%] left-1/2 -translate-x-1/2 w-3/4 h-5 bg-red-600/30 blur-2xl rounded-full" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
