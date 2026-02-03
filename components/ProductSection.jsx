"use client";

import { useState } from "react";
import ImageModal from "./Imagemodal";
import ThreeViewer from "./ThreeViewer";

export default function ProductSection({
  type,
  model,
  badge,
  title,
  accent,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const images =
    type === "mens"
      ? ["/images/mens_1.jpg", "/images/mens_2.jpg", "/images/mens_3.jpg"]
      : ["/images/womens_1.jpg", "/images/womens_2.jpg", "/images/womens_3.jpg"];

  return (
    <>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

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

            {/* Title and descriptive text removed per request */}

            {/* price removed per design */}

            {/* Buy button removed. Make View Images full-width */}
            <button
              onClick={() => setModalOpen(true)}
              className="
                w-full flex items-center justify-center gap-3
                mb-4 py-3 sm:py-4 rounded-xl font-orbitron tracking-widest
                text-sky-100 text-base sm:text-lg
                border border-sky-400/30
                bg-gradient-to-r from-sky-600/10 via-sky-500/8 to-sky-600/12
                backdrop-blur-md
                transition-all duration-300
                hover:text-white
                hover:border-sky-300
                hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]
              "
            >
              <span className="text-xl transition-transform mr-2">📷</span>
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
        product={{ title, badge, images }}
      />
    </>
  );
}
