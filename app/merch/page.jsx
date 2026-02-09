"use client";

import ProductSection from "../../components/ProductSection";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#030204] text-white overflow-hidden st-noise">

      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 -z-10 bg-radial-gradient from-red-900/20 via-transparent to-transparent opacity-50" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,37,70,0.15),transparent_50%)]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24">

        {/* HEADER */}
        <header className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6 px-6 py-2 rounded-full bg-black/60 backdrop-blur border border-red-500/30"
          >
            <span className="tracking-[0.3em] text-xs uppercase text-red-500 font-medium">
              OFFICIAL MERCHANDISE DROP
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl font-light tracking-wide"
          >
            Enter the <span className="text-red-500 font-semibold italic">Upside Down</span>{" "}
            with our premium limited edition collection
          </motion.p>
        </header>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <ProductSection
            type="mens"
            badge="MEN'S EDITION"
            title="Shadow Warrior"
          />

          <ProductSection
            type="womens"
            badge="WOMEN'S EDITION"
            title="Night Stalker"
          />
        </div>
      </div>
    </div>
  );
}
