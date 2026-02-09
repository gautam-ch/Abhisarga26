"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

export default function ProductSection({
  type,
  badge,
  title,
  accent, // keeping for compatibility but will override with theme red
}) {
  const [view, setView] = useState("front"); // 'front' or 'back'
  const dragX = useMotionValue(0);

  // Replace 3D with images
  const productImages = {
    front: "/tshirt_front.png",
    back: "/tshirt_back.png"
  };

  const handleDragEnd = (_, info) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      setView("front");
    } else if (info.offset.x < -threshold) {
      setView("back");
    }
  };

  const TShirtView = () => (
    <div className="relative h-[450px] md:h-[600px] flex flex-col items-center justify-center cursor-grab active:cursor-grabbing group/view pt-8">
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            style={{ x: dragX }}
            initial={{ opacity: 0, scale: 0.9, rotateY: view === 'front' ? -90 : 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: view === 'front' ? 90 : -90 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
            className="w-full h-full flex items-center justify-center"
          >
            <div className="relative flex flex-col items-center">
              {/* Main Image */}
              <img
                src={productImages[view]}
                alt={`${title} ${view} view`}
                draggable="false"
                className="max-w-full max-h-[300px] md:max-h-[400px] object-contain drop-shadow-[0_20px_50px_rgba(255,37,70,0.3)] select-none relative z-10"
              />

              {/* Reflection Effect */}
              <div
                className="absolute top-[82%] left-0 w-full h-full opacity-80 select-none pointer-events-none transform scale-y-[-1] transition-all duration-700"
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
              <div className="absolute top-[82%] left-1/2 -translate-x-1/2 w-3/4 h-4 bg-red-600/20 blur-xl rounded-full" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Swipe Indicator */}
      <div className="absolute top-4 flex items-center gap-2 opacity-0 group-hover/view:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-bold st-glow">
          Grab to see the other side
        </span>
      </div>

      {/* View Switches - Moved to Top */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
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
    </div>
  );

  return (
    <section className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center p-8 md:p-12 bg-black/60 backdrop-blur-md border border-red-500/20 st-card-glow hover:border-red-500/40 transition-all duration-500">

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-red-600/50" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-red-600/50" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-red-600/50" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-red-600/50" />

        {/* IMAGE VIEW (Left side for Men, Right side for Women logic kept) */}
        {type === "mens" && <TShirtView />}

        {/* DETAILS */}
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-block mb-6 px-4 py-1.5 text-[0.7rem] font-bold tracking-[0.3em] uppercase bg-red-600/20 text-red-500 border border-red-600/30 st-glow"
          >
            {badge}
          </motion.span>

          <h2 className="st-title text-4xl md:text-5xl mb-6 st-glow leading-tight">{title}</h2>
          <p className="text-white/70 mb-8 leading-relaxed font-light text-lg">
            Premium cotton blend with <span className="text-red-500">glow-in-the-dark</span> specialty prints.
            Designed for those who dare to cross into the other side.
          </p>
        </div>

        {/* IMAGE VIEW (FOR WOMEN) */}
        {type === "womens" && <TShirtView />}
      </div>
    </section>
  );
}
