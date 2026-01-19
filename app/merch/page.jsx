"use client";

import ProductSection from "../../components/ProductSection";

export default function Page() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-red-950/40 via-black to-black" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">

        {/* HEADER */}
        <header className="text-center mb-20">
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20">
            <span className="tracking-widest text-sm text-red-400">
              OFFICIAL MERCHANDISE DROP
            </span>
          </div>

          <h1 className="font-orbitron text-5xl md:text-6xl font-bold mb-4">
            <span className="text-red-500">ABHISARGA</span>{" "}
            <span className="text-sky-400">2026</span>
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Enter the <span className="text-red-400 font-semibold">Upside Down</span>{" "}
            with our premium 3D T-shirt collection
          </p>
        </header>

        {/* PRODUCTS */}
        <div className="space-y-28">
          <ProductSection
            type="mens"
            model="/models/mens_tshirt.glb"
            badge="MEN'S EDITION"
            title="Upside Down Warrior"
            price="400"
            accent="red"
          />

          <ProductSection
            type="womens"
            model="/models/womens_tshirt.glb"
            badge="WOMEN'S EDITION"
            title="Demogorgon Night"
            price="400"
            accent="blue"
          />
        </div>

        {/* FOOTER */}
        <footer className="mt-28 text-center border-t border-white/10 pt-10">
          <h3 className="font-orbitron text-2xl mb-4">ABHISARGA</h3>
          <p className="text-gray-400 max-w-xl mx-auto">
            Premium Stranger-Things inspired 3D merchandise experience
          </p>
        </footer>
      </div>
    </div>
  );
}
