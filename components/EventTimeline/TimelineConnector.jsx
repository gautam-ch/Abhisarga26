"use client";

import { motion } from 'framer-motion';

export const TimelineConnector = ({
  index,
  isActive,
  isPast,
  isLast,
}) => {
  return (
    <div className="flex items-center flex-shrink-0">
      {/* Dot */}
      <motion.div
        className={`
          relative w-4 h-4 md:w-5 md:h-5 rounded-full
          bg-red-500
          transition-all duration-500
          ${isActive ? 'st-dot-pulse scale-125' : ''}
          ${isPast ? 'opacity-60' : ''}
        `}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15, duration: 0.4 }}
      >
        {/* Inner glow */}
        <div className="absolute inset-1 rounded-full bg-white/30" />

        {/* Outer halo */}
        <div
          className={`
            absolute -inset-2 rounded-full
            bg-red-500/20
            transition-all duration-500
            ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
          `}
        />
      </motion.div>

      {/* Connector line */}
      <motion.div
        className={`
          relative h-[2px] w-16 md:w-24 lg:w-32
          origin-left
          transition-all duration-500
          ${isPast || isActive ? 'st-line-glow' : ''}
        `}
        style={{
          background: isPast || isActive
            ? 'linear-gradient(90deg, hsl(357, 91%, 45%) 0%, hsl(0, 100%, 27%) 100%)'
            : 'linear-gradient(90deg, hsl(357, 91%, 45%, 0.3) 0%, hsl(0, 100%, 27%, 0.2) 100%)',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.2, duration: 0.6, ease: 'easeOut' }}
      >
        {/* Animated glow traveling along the line */}
        {(isPast || isActive) && (
          <motion.div
            className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-red-500/80 to-transparent"
            animate={{
              x: ['0%', '400%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              delay: index * 0.3,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

