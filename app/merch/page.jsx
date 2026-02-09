"use client";

import Image from "next/image";
import ProductSection from "../../components/ProductSection";

export default function Page() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden overflow-x-hidden">

      {/* ===== BACKGROUND IMAGE ===== */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/Images/Background_merch.jpg"
          alt="Merch background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* ===== BACKGROUND OVERLAY / GLOW ===== */}
      <div className="fixed inset-0 z-10 bg-gradient-to-b from-red-950/50 via-black to-black" />

      {/* ===== PAGE CONTENT ===== */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">

        {/* ===== HEADER ===== */}
        <header className="mt-4 sm:mt-6 text-center mb-12 sm:mb-16 lg:mb-20">
          <div
            className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full backdrop-blur border border-red-600/30 max-w-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(20,6,6,0.9) 0%, rgba(139,10,10,0.85) 35%, rgba(10,6,6,0.85) 100%)",
              boxShadow:
                "0 12px 40px rgba(220,38,38,0.22), inset 0 -2px 14px rgba(0,0,0,0.45)",
              textShadow: "0 2px 18px rgba(255,80,80,0.35)",
            }}
          >
            <span className="tracking-widest uppercase text-sm sm:text-base md:text-xl font-semibold text-red-200 text-center whitespace-normal">
              OFFICIAL MERCHANDISE DROP
            </span>
          </div>
        </header>

        {/* ===== PRODUCTS ===== */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-28">

          <ProductSection
            type="mens"
            model="/models/mens_tshirt.glb"
            badge="MEN'S EDITION"
            title="Upside Down Warrior"
            accent="red"
          />

          <ProductSection
            type="womens"
            model="/models/womens_tshirt.glb"
            badge="WOMEN'S EDITION"
            title="Demo Night"
            accent="blue"
          />

        </div>

        {/* ===== FOOTER (EMPTY BY DESIGN) ===== */}
        <footer className="mt-28 border-t border-white/10 pt-10" />
      </div>
    </div>
  );
}
