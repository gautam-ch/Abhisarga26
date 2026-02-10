"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageModal({ open, onClose, product }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoplayRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setActive(0);
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") setActive((s) => (s + 1) % product.images.length);
      if (e.key === "ArrowLeft") setActive((s) => (s - 1 + product.images.length) % product.images.length);
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, product.images.length, onClose]);

  // Autoplay: advance every 3s when modal is open and not paused
  useEffect(() => {
    if (!open) return;
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (!paused) {
      autoplayRef.current = setInterval(() => {
        setActive((s) => (s + 1) % product.images.length);
      }, 3000);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [open, paused, product.images.length]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-black border border-red-500/30 p-6 md:p-10 rounded-sm max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 st-card-glow"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* LEFT - GALLERY */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-16 h-16 object-cover cursor-pointer transition-all ${active === i ? "border-2 border-red-500 opacity-100 scale-105" : "opacity-40 hover:opacity-70"
                  }`}
              />
            ))}
          </div>

          <div className="flex-1 order-1 md:order-2 bg-neutral-900 overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={product.images[active]}
                className="w-full h-full object-contain aspect-square"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT - INFO */}
        <div className="flex flex-col justify-center">
          <span className="st-glow text-red-500 text-xs font-bold tracking-[0.3em] uppercase mb-4">
            {product.badge}
          </span>
          <h2 className="st-title text-3xl md:text-4xl mb-6 st-glow">{product.title}</h2>


          <p className="text-white/60 mb-10 leading-relaxed font-light">
            High-definition archival quality print on premium heavyweight cotton.
            Limited edition series from the Abhisarga '26 collection.
          </p>

        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-red-600/50" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-red-600/50" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-red-600/50" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-red-600/50" />
      </motion.div>
    </div>
  );
}
