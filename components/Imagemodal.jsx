"use client";

import { useState } from "react";

export default function ImageModal({ open, onClose, product }) {
  const [active, setActive] = useState(0);
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/90 backdrop-blur z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-black to-red-950 p-8 rounded-2xl max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* LEFT */}
        <div className="bg-white rounded-xl p-4 flex gap-4">
          <div className="flex flex-col gap-2">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActive(i)}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                  active === i ? "ring-2 ring-sky-400" : "opacity-60"
                }`}
              />
            ))}
          </div>

          <img
            src={product.images[active]}
            className="rounded-xl max-w-md"
          />
        </div>

        {/* RIGHT */}
        <div className="text-white">
          <span className="text-sm text-red-400">{product.badge}</span>
          <h2 className="font-orbitron text-3xl my-3">{product.title}</h2>

          <div className="text-4xl font-bold mb-6">
            {product.price} <span className="text-sm">RS</span>
          </div>

          <button className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500 to-sky-400 font-orbitron">
            🛒 BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}
