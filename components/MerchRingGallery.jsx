"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function MerchRingGallery({ open, onClose }) {
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    const items = document.querySelectorAll(".ring-item");
    const radius = 260;

    items.forEach((item, i) => {
      const angle = (i / items.length) * Math.PI * 2;
      gsap.set(item, {
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        rotationY: (angle * 180) / Math.PI,
      });
    });

    gsap.fromTo(
      ".ring-item",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.8 }
    );

    const onMove = (e) => {
      const rotY = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".ring", {
        rotationY: rotY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur">
      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-red-400 tracking-widest"
      >
        CLOSE ✕
      </button>

      <div className="w-full h-full flex items-center justify-center perspective-[1200px]">
        <div className="ring relative w-[600px] h-[600px] transform-style-preserve-3d">

          {/* TREE */}
          <img
            src="/images/tree.png"
            className="absolute inset-0 m-auto w-[360px] z-20 pointer-events-none"
          />

          {/* T-SHIRTS */}
          {["red", "black", "blue"].map((c, i) => (
            <div
              key={i}
              onClick={() => router.push(`/merch/${c}`)}
              className="ring-item absolute top-1/2 left-1/2 w-[130px] -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125 hover:translate-z-[80px]"
            >
              <img
                src={`/images/shirt-${c}.png`}
                className="w-full drop-shadow-[0_0_30px_rgba(255,0,0,0.6)]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
