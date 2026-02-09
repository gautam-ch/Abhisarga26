"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import TeamCard from "../TeamCard";
import { teamCategories } from "../../lib/content";
import D20Loader from "../D20Loader";

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
          ([x, y]) => `radial-gradient(circle 550px at ${x}px ${y}px, 
            rgba(255,0,0,0.4) 0%, 
            rgba(255,0,0,0.15) 45%, 
            transparent 80%)`
        ),
      }}
    />
  );
}

export default function TeamPage() {
  const pageRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);
  const [showPage, setShowPage] = useState(false);
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    if (showLoader) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [showLoader]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 820) setDeviceType("mobile");
      else if (width > 820 && width <= 1024) setDeviceType("tablet"); 
      else setDeviceType("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 0]);
  const bgScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.3]), { stiffness: 25, damping: 40 });

  const getRowsForCategory = (members, catIdx) => {
    let rows = [];
    let tempMembers = [...members];

    if (deviceType === "mobile") {
      while (tempMembers.length > 0) rows.push(tempMembers.splice(0, 1));
      return rows;
    }

    if (catIdx === 0) {
      if (tempMembers.length > 0) rows.push(tempMembers.splice(0, 1));
      while (tempMembers.length > 0) rows.push(tempMembers.splice(0, 2));
      return rows;
    }

    if (deviceType === "tablet") {
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
    <div ref={pageRef} className="relative min-h-[500vh] w-full bg-black overflow-x-hidden" style={{ isolation: "isolate" }}>
      
      <AnimatePresence>
        {showLoader && (
          <D20Loader onComplete={() => { 
            setShowPage(true); 
            setTimeout(() => setShowLoader(false), 2000); 
          }} />
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/team/background_team.png')", scale: bgScale }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      </div>

      <CursorLight />

      <motion.div 
        style={{ opacity: scrollHintOpacity }} 
        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
      >
        <span className="text-white font-mono text-xs md:text-sm lg:text-lg tracking-[0.8em] uppercase">
          Scroll to Explore
        </span>
      </motion.div>

      <motion.div 
        className="relative z-20 pt-[120vh] pb-[20vh] w-full" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: showPage ? 1 : 0 }}
      >
        {teamCategories.map((cat, catIdx) => {
          const rows = getRowsForCategory(cat.members, catIdx);
          return (
            <section key={catIdx} className="mb-[20rem] md:mb-[40rem] px-6 py-24 w-full max-w-[1400px] mx-auto flex flex-col items-center overflow-hidden">
              <div className="mb-24 md:mb-48 text-center">
                <h2 className="text-white font-serif font-black text-4xl md:text-7xl italic uppercase tracking-tighter">
                  {cat.category}
                </h2>
              </div>
              
              <div className={`flex flex-col items-center w-full ${deviceType === 'mobile' ? 'gap-y-40' : 'gap-y-80 md:gap-y-[20rem]'}`}>
                {rows.map((row, rIdx) => (
                  <div key={rIdx} className="flex flex-row flex-nowrap justify-center items-center w-full gap-x-8 md:gap-x-24 lg:gap-x-32">
                    {row.map((m, idx) => {
                      let xOffset = 0;
                      if (deviceType === "desktop") {
                        if (row.length === 3) {
                          if (idx === 0) xOffset = -100;
                          if (idx === 2) xOffset = 100;
                        } else if (row.length === 2) {
                          xOffset = idx === 0 ? -80 : 80;
                        }
                      } else if (deviceType === "tablet" && row.length === 2) {
                        xOffset = idx === 0 ? -40 : 40;
                      }

                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 60, x: xOffset }}
                          whileInView={{ opacity: 1, y: 0, x: 0 }}
                          viewport={{ once: true, amount: 0.05 }}
                          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: idx * 0.1 }}
                          className={`shrink-0 relative ${deviceType === 'mobile' ? 'w-full max-w-[320px] py-16' : 'md:w-[26%] max-w-[240px]'}`}
                        >
                          <TeamCard {...m} photoUrl={m.image} frameUrl="/team/frame_team.png" socials={m.socials} />
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </motion.div>
    </div>
  );
}