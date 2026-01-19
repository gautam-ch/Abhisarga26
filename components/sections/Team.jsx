'use client';

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from "framer-motion";
import TeamCard from "../TeamCard";
import { teamCategories } from "../../lib/content";

function CursorLight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 80 };
  const lightX = useSpring(mouseX, springConfig);
  const lightY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed inset-0 z-10 pointer-events-none"
      style={{
        background: useTransform(
          [lightX, lightY],
          ([x, y]) => `radial-gradient(circle 550px at ${x}px ${y}px, rgba(255, 0, 0, 0.4) 0%, rgba(255, 0, 0, 0.15) 45%, transparent 80%)`
        ),
      }}
    />
  );
}

export default function TeamPage() {
  const pageRef = useRef(null);
  const [isVoidActive, setIsVoidActive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const timer = setTimeout(() => setIsVoidActive(false), 2800);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const bgScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, 1.3]),
    { stiffness: 25, damping: 40 }
  );

  const getRowsForCategory = (members, catIdx) => {
    let rows = [];
    let tempMembers = [...members];

    if (isMobile) {
      // Mobile logic: 1 card per row
      while (tempMembers.length > 0) {
        rows.push(tempMembers.splice(0, 1));
      }
      return rows;
    }

    // Original Desktop logic
    if (catIdx === 0) {
      if (tempMembers.length > 0) rows.push(tempMembers.splice(0, 1));
      while (tempMembers.length > 0) rows.push(tempMembers.splice(0, 2));
    } else {
      let isThree = true;
      while (tempMembers.length > 0) {
        rows.push(tempMembers.splice(0, isThree ? 3 : 2));
        isThree = !isThree;
      }
    }
    return rows;
  };

  return (
    <div
      ref={pageRef}
      className="relative min-h-[350vh] w-full bg-black"
      style={{ isolation: "isolate" }}
    >
      <CursorLight />

      <AnimatePresence>
        {isVoidActive && (
          <motion.div
            key="void-loader"
            exit={{ opacity: 0, scale: 2, filter: "blur(60px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ scale: [1, 2, 0.5, 60], opacity: [1, 1, 1, 0] }}
              transition={{ duration: 2.8, ease: "circIn" }}
              className="w-2 h-2 bg-white rounded-full shadow-[0_0_60px_30px_#ff0000]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        style={{ opacity: scrollHintOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVoidActive ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="mt-[20vh] flex flex-col items-center px-4">
          <span className="text-white font-mono text-sm md:text-lg tracking-[0.8em] uppercase mb-10 text-center">
            Scroll to Explore
          </span>
          <div className="relative w-[1px] h-32 bg-white/10 overflow-hidden">
            <motion.div 
              animate={{ top: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute w-full h-20 bg-gradient-to-b from-transparent via-red-600 to-transparent"
            />
          </div>
        </div>
      </motion.div>

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/team/background_team.png')",
            scale: bgScale,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVoidActive ? 0 : 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      </div>

      <div className="relative z-20 pt-[110vh]">
        {teamCategories.map((cat, catIdx) => {
          const rows = getRowsForCategory(cat.members, catIdx);
          return (
            <section key={`cat-${catIdx}`} className="mb-[200px] md:mb-[400px] px-6 w-full max-w-[1400px] mx-auto">
              <CategoryHeader title={cat.category} />

              <div className="flex flex-col gap-16 md:gap-64 lg:gap-80 items-center w-full">
                {rows.map((row, rIdx) => {
                  const gapClass = row.length === 3 
                    ? "gap-12 md:gap-20 lg:gap-28" 
                    : "gap-16 md:gap-28 lg:gap-36"; 

                  return (
                    <div
                      key={`row-${catIdx}-${rIdx}`}
                      className={`flex justify-center items-center w-full ${gapClass}`}
                    >
                      {row.map((m, idx) => {
                        let xStart = 0;
                        if (!isMobile) {
                          if (row.length === 3) {
                            if (idx === 0) xStart = -100;
                            if (idx === 2) xStart = 100;
                          } else {
                            xStart = idx === 0 ? -80 : 80;
                          }
                        }

                        return (
                          <motion.div
                            key={`${m.name}-${idx}`}
                            initial={{ opacity: 0, y: 50, x: xStart }}
                            whileInView={{ opacity: 1, y: 0, x: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{
                              duration: 1,
                              ease: [0.25, 1, 0.5, 1],
                              delay: idx * 0.1,
                            }}
                            className="w-full md:w-[22%] max-w-[280px] md:max-w-[240px] shrink-0"
                          >
                            <TeamCard
                              {...m}
                              photoUrl={m.image}
                              frameUrl="/team/frame_team.png"
                              socials={m.socials}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
      <div className="h-[50vh]" />
    </div>
  );
}

function CategoryHeader({ title }) {
  return (
    <div className="flex flex-col items-center mb-16 md:mb-32">
      <h2 className="text-white font-serif font-black text-3xl md:text-6xl italic uppercase text-center tracking-tighter">
        {title}
      </h2>
    </div>
  );
}