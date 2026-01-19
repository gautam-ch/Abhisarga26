'use client';

import { useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Linkedin, Github, ExternalLink } from "lucide-react";

const TeamCard = ({ name, role, photoUrl, frameUrl, socials = [] }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const safeSocials = Array.isArray(socials) ? socials : [];

  const mouseXSpring = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const shadow = useTransform(
    [mouseXSpring, mouseYSpring],
    ([x, y]) => `${-x * 50}px ${30 - y * 50}px 65px rgba(0, 0, 0, 0.8), 0px 0px 30px rgba(225, 29, 39, 0.2)`
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="flex flex-col items-center w-full group">
      <div className="relative [perspective:1200px] w-full">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, boxShadow: shadow, transformStyle: "preserve-3d" }}
          className="relative w-full aspect-[3/4] bg-white/[0.02] rounded-[15px] border border-white/[0.05] cursor-pointer"
        >
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[15px] z-0"
            style={{
              background: useTransform(
                [mouseXSpring, mouseYSpring],
                ([x, y]) => `radial-gradient(circle at ${50 + x * 100}% ${50 + y * 100}%, rgba(255,0,0,0.2) 0%, transparent 80%)`
              )
            }}
          />
          <motion.img
            src={photoUrl}
            className="absolute top-[18%] left-[12.5%] w-[75%] h-[75%] object-cover z-[1] rounded-[6px]"
            style={{ transform: "translateZ(25px)" }}
          />
          <motion.img
            src={frameUrl}
            className="absolute inset-0 w-full h-full object-contain z-[2] pointer-events-none"
            style={{ transform: "translateZ(50px)" }}
          />

          <div 
            className="hidden md:flex absolute top-[105%] left-[-40%] right-[-40%] mx-auto text-center z-[10] flex-col items-center"
            style={{ transform: "translateZ(70px)" }}
          >
            <h3 className="font-serif font-black text-[1.2rem] text-white uppercase tracking-[0.05em] [text-shadow:2px_2px_0px_#000]">
              {name}
            </h3>
            <p className="font-mono text-[0.8rem] font-bold text-[#FF2E2E] tracking-[0.3em] uppercase mt-1 mb-2">
              {role}
            </p>
            <div className="flex gap-2">
              {safeSocials.map((link, idx) => <SocialIcon key={idx} link={link} />)}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex md:hidden flex-col items-center text-center mt-6 z-20">
        <h3 className="font-serif font-black text-[1.1rem] text-white uppercase tracking-[0.05em]">
          {name}
        </h3>
        <p className="font-mono text-[0.8rem] font-bold text-[#FF2E2E] tracking-[0.2em] uppercase mt-1 mb-4">
          {role}
        </p>
        <div className="flex gap-4">
          {safeSocials.map((link, idx) => <SocialIcon key={idx} link={link} isMobile />)}
        </div>
      </div>
    </div>
  );
};

const SocialIcon = ({ link, isMobile }) => (
  <a
    href={link?.url || "#"}
    target="_blank"
    rel="noreferrer"
    className={`${isMobile ? 'w-9 h-9' : 'w-7 h-7'} flex justify-center items-center rounded-lg bg-black/50 border border-white/10 backdrop-blur-md`}
    onClick={(e) => e.stopPropagation()}
  >
    {link?.type === 'linkedin' ? <Linkedin size={isMobile ? 18 : 14} color="#0077B5" fill="#0077B5" /> : 
     link?.type === 'github' ? <Github size={isMobile ? 18 : 14} color="#ffffff" /> : 
     <ExternalLink size={isMobile ? 18 : 14} color="#ffffff" />}
  </a>
);

export default TeamCard;