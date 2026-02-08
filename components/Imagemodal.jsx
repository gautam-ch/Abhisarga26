"use client";

import { useEffect, useState, useRef } from "react";

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
      className="fixed inset-0 backdrop-blur z-50 flex items-center justify-center p-6"
      style={{
        backgroundImage: "url('/background2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-black/80 rounded-2xl shadow-2xl max-w-6xl w-full overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-30 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
        >
          ✕
        </button>

        {/* Main image area */}
        <div className="flex flex-col items-center justify-center p-6">
          <div
            className="relative w-full md:h-[520px] h-[360px] flex items-center justify-center bg-gradient-to-b from-black to-gray-900 rounded-lg overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <button
              onClick={() => setActive((s) => (s - 1 + product.images.length) % product.images.length)}
              className="absolute left-3 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition"
              aria-label="Previous"
            >
              ‹
            </button>

            <img
              src={product.images[active]}
              alt={product.title || "Product image"}
              className="max-h-[86%] max-w-[92%] object-contain rounded-md drop-shadow-2xl transition-all duration-300"
            />

            <button
              onClick={() => setActive((s) => (s + 1) % product.images.length)}
              className="absolute right-3 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition"
              aria-label="Next"
            >
              ›
            </button>
          </div>

          {/* Thumbnails */}
          <div className="mt-4 w-full flex items-center justify-center gap-3 overflow-x-auto py-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-md overflow-hidden transition-all duration-200 ${
                  active === i ? "ring-2 ring-red-500 scale-105" : "opacity-70"
                }`}
                style={{width: 96, height: 96}}
              >
                <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
