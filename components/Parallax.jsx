'use client'

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Monster3D from "./Monster";
gsap.registerPlugin(ScrollTrigger);

export default function Parallax() {
    const root = useRef(null);
    const mountain = useRef(null);
    const initialBg = useRef(null);
    const mainBg = useRef(null);
    const main = useRef(null);
    useEffect(() => {
        /* ================= LENIS ================= */
        const lenis = new Lenis({
            lerp: 0.08,
            smoothWheel: true,
            smoothTouch: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Sync ScrollTrigger on Lenis scroll
        lenis.on("scroll", () => {
            ScrollTrigger.update();
        });

        /* ================= GSAP ================= */
        const mm = gsap.matchMedia();

        mm.add(
            {
                isDesktop: "(min-width: 768px)",
                isMobile: "(max-width: 767px)",
            },
            (context) => {
                const { isDesktop } = context.conditions;

                const totalEnd = isDesktop ? "+=400%" : "+=500%";
                const mountainScaleOut = isDesktop ? 1.8 : 1.6;
                const initialBgZoomTo = isDesktop ? 1.6 : 1.4;
                const mainStartY = isDesktop ? 80 : 100;


                gsap.set(
                    [mountain.current, initialBg.current, mainBg.current, main.current],
                    { willChange: "transform, opacity" }
                );

                gsap.set(mountain.current, { scale: 1, opacity: 1 });
                gsap.set(initialBg.current, { scale: 1, opacity: 1 });
                gsap.set(mainBg.current, { scale: 1.3, opacity: 0 });
                gsap.set(main.current, {
                    yPercent: mainStartY,
                    opacity: 0,
                    scale: 0.95,
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: root.current,
                        start: "top top",
                        end: totalEnd,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });

                // Mountains exit
                tl.to(mountain.current, {
                    scale: mountainScaleOut,
                    opacity: 0,
                    ease: "power2.in",
                    duration: 1.6,
                });

                // Initial BG zoom
                tl.to(
                    initialBg.current,
                    {
                        scale: initialBgZoomTo,
                        ease: "none",
                        duration: 2.6,
                    },
                    0.4
                );

                // BG handoff
                tl.to(
                    initialBg.current,
                    {
                        opacity: 0,
                        ease: "power2.out",
                        duration: 1.6,
                    },
                    2.0
                );

                tl.to(
                    mainBg.current,
                    {
                        opacity: 1,
                        scale: 1,
                        ease: "power2.out",
                        duration: 1.8,
                    },
                    1.6
                );

                // Main enters center
                tl.to(
                    main.current,
                    {
                        yPercent: -50,
                        opacity: 1,
                        scale: 1,
                        ease: "power3.out",
                        duration: 1.6,
                    },
                    1.8
                );

                // Hero scale
                tl.to(
                    main.current,
                    {
                        ease: "power2.out",
                        duration: 1.5,
                    },
                    3.2
                );

                // Final BG zoom
                tl.to(
                    mainBg.current,
                    {
                        scale: 1.15,
                        ease: "none",
                        duration: 2.6,
                    },
                    2.6
                );

                return () => {
                    tl.kill();
                    ScrollTrigger.getAll().forEach((s) => s.kill());
                };
            }
        );

        ScrollTrigger.refresh();

        return () => {
            mm.revert();
            lenis.destroy();
        };
    }, []);


    return (
        <div ref={root} className="pointer-events-auto relative h-[450vh] md:h-[400vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* INITIAL BG */}
                <img
                    ref={initialBg}
                    src="/bg.jpeg"
                    className="absolute inset-0 h-full w-full object-cover z-10"
                    alt="Initial background"
                />

                {/* MAIN BG */}
                <img
                    ref={mainBg}
                    src="/iiitsstarngerthing.png"
                    className="absolute inset-0 h-full w-full object-cover z-20 "
                    alt="Main background"
                    style={{ transformOrigin: "center center" }}
                />

                {/* MAIN HERO (PERFECTLY CENTERED) */}
                <div
                    ref={main}
                    className="
    absolute left-1/2 top-1/2
    -translate-x-1/2 -translate-y-1/2
    w-[80%] sm:w-[72%] md:w-[65%] lg:w-[58%] xl:w-[52%]
    max-w-[1200px]
    h-[70vh]
    z-30
    pointer-events-none
  "
                >
                    {/* IMAGE LAYER */}
                    <img
                        src="/main.png"
                        alt="Main hero"
                        className="absolute inset-0 w-full h-full object-contain z-10"
                    />

                    {/* 3D MONSTER LAYER */}
                    <div className="pointer-events-auto absolute inset-0 z-20 w-full h-full">
                        <Monster3D />
                    </div>
                </div>

                {/* MOUNTAIN */}
                <img
                    ref={mountain}
                    src="/mountain.png"
                    className="absolute inset-0 h-full w-full object-cover z-40"
                    alt="Mountain foreground"
                />
            </div>

        </div>
    );
}
