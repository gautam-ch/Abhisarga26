"use client";

import { forwardRef, useState, useEffect, useRef, useMemo, useImperativeHandle } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
const demogorgonHandLeft = '/demogorgon-hand-left.png';
const demogorgonHandRight = '/demogorgon-hand-right.png';

// Fire spark component
const FireSpark = ({ delay, left, small }) => (
  <motion.div
    initial={{ y: 0, opacity: 1, scaleY: 1, scaleX: 1 }}
    animate={{
      y: small ? (-70 - Math.random() * 40) : (-180 - Math.random() * 80),
      x: (Math.random() - 0.5) * 30,
      opacity: [1, 0.9, 0],
      scaleY: small ? [1, 2, 2.5] : [1, 3, 5],
      scaleX: small ? [0.7, 0.5, 0.1] : [1, 0.8, 0.4]
    }}
    transition={{
      duration: small ? (1.8 + Math.random() * 1.0) : (3.0 + Math.random() * 1.5),
      delay,
      ease: [0.23, 1, 0.32, 1] // Smoother cubic-bezier easing
    }}
    className="absolute w-1 h-2 md:h-3 rounded-full"
    style={{
      left: `${left}%`,
      bottom: '100%',
      background: `radial-gradient(ellipse at center, #ff6b35, #ff4500, transparent)`,
      boxShadow: small ? '0 0 2px #ff6b35, 0 0 4px #ff4500' : '0 0 4px #ff6b35, 0 0 8px #ff4500, 0 0 12px #ff2200',
      transformOrigin: 'bottom center',
      willChange: 'transform, opacity',
    }}
  />
);

export const TimelineCard = forwardRef(({ event, index, isActive, isPast, isFuture, onHoverChange, isMobile }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [sparks, setSparks] = useState([]);
  const sparkIdRef = useRef(0);
  const cardRef = useRef(null);

  // Expose the DOM element to the parent ref
  useImperativeHandle(ref, () => cardRef.current);

  // Only animate if in view to save resources, especially on mobile
  const isInView = useInView(cardRef, { margin: "100px 0px 100px 0px" });

  // Generate continuous sparks when active (center card) or hovered (ONLY if in view and NOT mobile)
  useEffect(() => {
    if (isMobile || !isInView || (!isActive && !isHovered)) {
      setSparks([]);
      return;
    }

    // Smoother generation: more frequent but fewer per batch
    const intervalTime = 40;
    const sparkCount = 5;

    const interval = setInterval(() => {
      const newSparks = Array.from({ length: sparkCount }, () => ({
        id: sparkIdRef.current++,
        delay: Math.random() * 0.08,
        left: 5 + Math.random() * 90,
      }));

      setSparks(prev => {
        const limit = 50;
        return [...prev.slice(-limit), ...newSparks];
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isActive, isHovered, isMobile, isInView]);

  const cardVariants = {
    // ... (keep cardVariants same)
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smoother animation
        staggerChildren: 0.1,
      },
    },
  };

  // Blood drip elements for non-active card hover
  const bloodDrips = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: `${15 + i * 18}%`,
    delay: i * 0.08,
    height: `${60 + Math.random() * 40}%`,
  }));

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      className={`
        relative flex-shrink-0 w-[280px] md:w-[320px] lg:w-[380px]
        transition-all duration-700 ease-out
        ${isActive ? 'scale-105 z-20' : 'scale-100 z-10'}
        ${isPast && !isMobile ? 'opacity-60' : ''}
        ${isFuture && !isActive && !isMobile ? 'opacity-70 blur-[1px]' : ''}
      `}
      data-is-card="true"
      onMouseEnter={() => {
        setIsHovered(true);
        if (onHoverChange) onHoverChange(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (onHoverChange) onHoverChange(false);
      }}
    >
      {/* Demogorgon Hands for Active Card or Mobile (only when not hovered or active on desktop) */}
      <AnimatePresence>
        {(isActive || isMobile) && (
          <>
            {/* Right Hand */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute -right-6 md:-right-8 -bottom-6 md:-bottom-8 w-12 md:w-16 h-20 md:h-24 pointer-events-none z-30"
            >
              <img
                src={demogorgonHandRight}
                alt=""
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
            {/* Left Hand */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
              className="absolute -left-6 md:-left-8 -bottom-6 md:-bottom-8 w-12 md:w-16 h-20 md:h-24 pointer-events-none z-30"
            >
              <img
                src={demogorgonHandLeft}
                alt=""
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Blood Horror Effect for Non-Active Card Hover */}
      <AnimatePresence>
        {isHovered && !isActive && !isMobile && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {bloodDrips.map((drip) => (
              <motion.div
                key={drip.id}
                initial={{ y: '100%', scaleY: 0, opacity: 0 }}
                animate={{
                  y: '-20%',
                  scaleY: 1.2,
                  opacity: [0, 0.9, 0.7, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: drip.delay,
                  ease: 'easeOut',
                }}
                className="absolute bottom-0 w-3 md:w-4 rounded-t-full"
                style={{
                  left: drip.left,
                  height: drip.height,
                  background: `linear-gradient(to top, 
                    hsl(357 91% 45% / 0.9), 
                    hsl(0 100% 27% / 0.7), 
                    hsl(0 100% 20% / 0.4),
                    transparent
                  )`,
                  boxShadow: '0 0 20px hsl(357 91% 45% / 0.6), 0 0 40px hsl(0 100% 27% / 0.4)',
                  transformOrigin: 'bottom',
                }}
              />
            ))}
            {/* Blood splatter at the top */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.6, 0], scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-8"
              style={{
                background: 'radial-gradient(ellipse at center bottom, hsl(357 91% 45% / 0.5), transparent 70%)',
              }}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Fire Sparks Effect for Active Card or on Hover (NOT on mobile) */}
      <AnimatePresence>
        {(isActive || isHovered) && !isMobile && (
          <div className="absolute inset-x-0 top-0 h-20 pointer-events-none z-40 overflow-visible">
            {sparks.map((spark) => (
              <FireSpark key={spark.id} delay={spark.delay} left={spark.left} small={isMobile} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Card container */}
      <motion.div
        className={`
          relative p-6 md:p-8
          bg-black/60 backdrop-blur-sm
          border border-red-500/30
          transition-all duration-500 ease-out
          ${(isActive || isMobile) ? 'st-card-glow-active border-red-500/60' : 'st-card-glow'}
          hover:border-red-500/50 hover:bg-black/80
          group cursor-grab active:cursor-grabbing
          overflow-hidden
        `}
        whileHover={{
          scale: isActive ? 1 : 1.03,
          transition: { duration: 0.3, ease: "easeOut" }
        }}

      >
        {/* Date badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-red-500/20 text-red-200 border border-red-500/30 st-glow">
            {event.date}
          </span>
        </div>

        {/* Title */}
        <h3 className={`
          st-title text-xl md:text-2xl font-bold mb-3 text-white
          transition-all duration-300
          ${(isActive || isMobile) ? 'st-glow' : ''}
          group-hover:st-glow
        `}>
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4">
          {event.description}
        </p>

        {/* Location (if provided) */}
        {event.location && (
          <div className="flex items-center gap-2 text-xs text-white/50 uppercase tracking-wider">
            <svg
              className="w-3 h-3 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {event.location}
          </div>
        )}

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-red-500/50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-red-500/50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-red-500/50" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-red-500/50" />
      </motion.div>
    </motion.div>
  );
});

TimelineCard.displayName = 'TimelineCard';

