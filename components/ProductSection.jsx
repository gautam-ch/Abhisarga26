"use client";

import { useState } from "react";
import ImageModal from "./Imagemodal";
import ThreeViewer from "./ThreeViewer";

export default function ProductSection({
  type,
  model,
  badge,
  title,
  price,
  accent,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [size, setSize] = useState("XL");

  const images =
    type === "mens"
      ? ["/images/mens_1.jpg", "/images/mens_2.jpg", "/images/mens_3.jpg"]
      : ["/images/womens_1.jpg", "/images/womens_2.jpg", "/images/womens_3.jpg"];

  return (
    <>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

          {/* 3D VIEW */}
          {type === "mens" && (
            <div className="relative">
              <ThreeViewer model={model} />
              <p className="absolute bottom-3 left-3 text-xs text-gray-400">
                Drag • Scroll
              </p>
            </div>
          )}

          {/* DETAILS */}
          <div>
            <span
              className={`inline-block mb-4 px-4 py-1 rounded-full text-xs tracking-widest border
              ${
                accent === "red"
                  ? "bg-red-500/20 text-red-400 border-red-500/30"
                  : "bg-sky-400/20 text-sky-300 border-sky-400/30"
              }`}
            >
              {badge}
            </span>

            <h2 className="font-orbitron text-4xl mb-4">{title}</h2>
            <p className="text-gray-300 mb-6">
              Premium cotton blend with glow-in-the-dark print
            </p>

            <div className="text-5xl font-bold mb-6">
              {price}
              <span className="text-sm text-gray-400 ml-2">RS</span>
            </div>

            {/* SIZE */}
            <div className="flex gap-3 mb-8">
              {["S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 rounded-lg font-semibold transition
                    ${
                      size === s
                        ? "bg-red-500 text-white"
                        : "bg-black border border-white/20 hover:border-sky-400"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* BUY */}
            <button className="w-full mb-4 py-4 rounded-xl font-orbitron tracking-widest bg-gradient-to-r from-red-500 to-sky-400 hover:scale-[1.02] transition shadow-lg">
              🛒 BUY NOW
            </button>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
            >
              📷 VIEW MORE IMAGES
            </button>
          </div>

          {/* WOMEN 3D */}
          {type === "womens" && (
            <div className="relative">
              <ThreeViewer model={model} />
            </div>
          )}
        </div>
      </section>

      <ImageModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={{ title, badge, price, images }}
      />
    </>
  );
}
