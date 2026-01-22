"use client";

import { useEffect } from "react";

export default function CursorEffect() {
  useEffect(() => {
    const glow = document.getElementById("cursor-glow");
    const particleContainer = document.getElementById("particle-container");

    if (!glow || !particleContainer) return;

    const move = (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";

      if (Math.random() < 0.25) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = e.clientX + "px";
        p.style.top = e.clientY + "px";
        particleContainer.appendChild(p);
        setTimeout(() => p.remove(), 1000);
      }
    };

    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div id="cursor-glow"></div>
      <div id="particle-container"></div>
    </>
  );
}
