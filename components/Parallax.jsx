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
    const initialBg = useRef(null);     // we'll repurpose or replace
    const mainBg = useRef(null);
    const main = useRef(null);

    // New: video ref for scroll-scrubbed background
    const bgVideoRef = useRef(null);
    const videoDuration = useRef(10); // fallback duration in seconds
    let lenis;
    useEffect(() => {
        /* ================= LENIS ================= */
        lenis = new Lenis({
            lerp: 0.08,
            smoothWheel: true,
            smoothTouch: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        lenis.on("scroll", () => {
            ScrollTrigger.update();
        });

        /* ================= VIDEO METADATA ================= */
        if (bgVideoRef.current) {
            const video = bgVideoRef.current;
            video.muted = true;
            video.playsInline = true;
            video.preload = "auto";
            video.pause();
            video.currentTime = 0;

            const onLoaded = () => {
                if (video.duration && !isNaN(video.duration) && video.duration > 0.1) {
                    videoDuration.current = video.duration;
                }
            };

            video.addEventListener("loadedmetadata", onLoaded);
            // Also try once more after a delay in case metadata loads late
            setTimeout(onLoaded, 1500);

            return () => {
                video.removeEventListener("loadedmetadata", onLoaded);
            };
        }
    }, []);

    useEffect(() => {
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
                        scrub: 0.7,           // ← slightly delayed feel = smoother on most devices
                        invalidateOnRefresh: true,
                    },
                });

                // 1. Mountains exit
                tl.to(mountain.current, {
                    scale: mountainScaleOut,
                    opacity: 0,
                    ease: "power2.in",
                    duration: 1.6,
                });

                // 2. Scroll-scrubbed VIDEO (main background replacement / overlay)
                tl.to(
                    {}, // dummy tween target
                    {
                        duration: 12, // ← how many "timeline seconds" = how long scroll takes to finish video
                        ease: "none",
                        onUpdate: () => {
                            if (bgVideoRef.current) {
                                const progress = tl.progress();
                                bgVideoRef.current.currentTime = progress * videoDuration.current;
                            }
                        },
                    },
                    0   // start early — adjust 0 → 0.5 if you want it delayed
                );

                // 3. Optional: fade out old initial video if you keep it
                tl.to(
                    initialBg.current,
                    {
                        opacity: 0,
                        ease: "power2.out",
                        duration: 1.2,
                    },
                    1.5
                );

                // 4. Initial BG zoom (if still visible briefly)
                tl.to(
                    initialBg.current,
                    {
                        scale: initialBgZoomTo,
                        ease: "none",
                        duration: 2.6,
                    },
                    0.4
                );

                // 5. Main BG handoff
                tl.to(
                    mainBg.current,
                    {
                        opacity: 1,
                        scale: 1,
                        ease: "power2.out",
                        duration: 1.8,
                    },
                    2.8
                );

                // 6. Main hero enters
                tl.to(
                    main.current,
                    {
                        yPercent: -50,
                        opacity: 1,
                        scale: 1,
                        ease: "power3.out",
                        duration: 1.6,
                    },
                    3.0
                );

                // 7. Final BG zoom
                tl.to(
                    mainBg.current,
                    {
                        scale: 1.15,
                        ease: "none",
                        duration: 2.6,
                    },
                    4.0
                );

                return () => {
                    tl.kill();
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

                {/* SCRUB-CONTROLLED BACKGROUND VIDEO – this is the new main bg */}
                <video

                    src="/circle_rotating.mp4"           // ← Replace with your video path
                    muted
                    autoPlay
                    loop
                    preload="auto"
                    className="absolute inset-0 h-full w-full object-cover z-5"

                />

                {/* OLD INITIAL BG – kept but will fade out */}
                {/* <video
                    ref={initialBg}
                    src="/circle_rotating.mp4"
                    className="absolute inset-0 h-full w-full object-cover z-10"
                    muted
                    playsInline
                    preload="metadata"
                /> */}

                {/* MAIN BG image – comes in later */}
                <img
                    ref={mainBg}
                    src="/iiitsstarngerthing.png"
                    className="absolute inset-0 h-full w-full object-cover z-20"
                    alt="Main background"
                    style={{ transformOrigin: "center center" }}
                />

                {/* MAIN HERO */}
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
                    <img
                        src="/main.png"
                        alt="Main hero"
                        className="absolute inset-0 w-full h-full object-contain z-10"
                    />
                    <div className="pointer-events-auto absolute inset-0 z-20 w-full h-full">
                        <Monster3D />
                    </div>
                </div>

                {/* MOUNTAIN foreground */}
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