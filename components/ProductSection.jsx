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

  const images =
    type === "mens"
      ? ["/images/mens_1.jpg", "/images/mens_2.jpg", "/images/mens_3.jpg"]
      : ["/images/womens_1.jpg", "/images/womens_2.jpg", "/images/womens_3.jpg"];
  const is400 = String(price).trim().startsWith("400");

  return (
    <>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

          {/* ===== 3D VIEW (MEN) ===== */}
          {type === "mens" && (
            <div className="relative">
              <ThreeViewer model={model} />
              <p className="absolute bottom-3 left-3 text-xs text-gray-400">
                Drag • Scroll
              </p>
            </div>
          )}

          {/* ===== PRODUCT DETAILS ===== */}
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

            <h2 className="font-orbitron text-4xl mb-4">
              {title}
            </h2>

            <p className="text-gray-300 mb-4">
              Premium cotton blend with glow-in-the-dark print
            </p>

            <p className="text-sm text-gray-400 mb-6">
              Unisex • Standard fit • Same price for all
            </p>

            <div className="mb-6">
              <div className="flex items-end gap-4">
                {is400 ? (
                  // Professional, slightly smaller Stranger Things–inspired style for 400 RS
                  <>
                    <div className="relative">
                      <span
                        className="font-semibold text-3xl md:text-4xl leading-none relative z-10 text-[#f3d6d6]"
                        style={{
                          fontFamily: "'Georgia', serif",
                          letterSpacing: '0.06em',
                          textShadow: '0 2px 8px rgba(168, 34, 34, 0.45), 0 0 18px rgba(120, 22, 22, 0.12)'
                        }}
                      >
                        {price}
                      </span>

                      {/* subtle neon underline */}
                      <span className="absolute left-0 right-0 bottom-[-8px] h-1 bg-gradient-to-r from-[#ff6b6b] via-[#a52a6a] to-[#3bd1d1] opacity-90 rounded-sm blur-sm" />
                    </div>

                    <span className="text-sm text-[#f0c7c7] mb-1 font-medium tracking-wider">RS</span>
                  </>
                ) : (
                  <>
                    <span
                      className={`font-extrabold text-5xl md:text-6xl leading-none bg-clip-text text-transparent ${
                        accent === "red"
                          ? "bg-gradient-to-r from-red-400 via-pink-500 to-red-600"
                          : "bg-gradient-to-r from-sky-300 via-indigo-400 to-sky-500"
                      } drop-shadow-[0_10px_30px_rgba(255,77,109,0.18)]`}
                    >
                      {price}
                    </span>

                    <span className="text-sm text-gray-300 mb-1">RS</span>
                  </>
                )}
              </div>

            </div>

            {/* ===== BUY ===== */}
            <button className="
              relative w-full mb-4 py-4
              rounded-xl font-orbitron tracking-widest
              text-black text-lg
              bg-gradient-to-r from-red-600 via-red-500 to-red-600
              shadow-[0_0_25px_rgba(239,68,68,0.7)]
              transition-all duration-300
              hover:scale-[1.04]
              hover:shadow-[0_0_45px_rgba(239,68,68,1)]
              active:scale-[0.98]
              overflow-hidden
            ">
              <span className="relative z-10">🛒 BUY NOW</span>

              {/* glow sweep */}
              <span className="
                absolute inset-0
                bg-gradient-to-r from-transparent via-white/30 to-transparent
                translate-x-[-120%]
                hover:translate-x-[120%]
                transition-transform duration-700
              " />
            </button>

            <button
              onClick={() => setModalOpen(true)}
              className="
                group flex items-center gap-3
                text-sm font-medium tracking-widest
                text-sky-300
                px-4 py-3 rounded-lg
                border border-sky-400/30
                bg-sky-500/5
                backdrop-blur-md
                transition-all duration-300
                hover:text-white
                hover:border-sky-400
                hover:bg-sky-400/20
                hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]
              "
            >
              <span className="text-lg transition-transform group-hover:scale-110">
                📷
              </span>
              VIEW MORE IMAGES
            </button>
          </div>

          {/* ===== 3D VIEW (WOMEN) ===== */}
          {type === "womens" && (
            <div className="relative">
              <ThreeViewer model={model} />
              <p className="absolute bottom-3 left-3 text-xs text-gray-400">
                Drag • Scroll
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== IMAGE MODAL ===== */}
      <ImageModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={{ title, badge, price, images }}
      />
    </>
  );
}
