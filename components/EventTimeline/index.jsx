"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { TimelineCard } from './TimelineCard';
import { TimelineConnector } from './TimelineConnector';
import { FogOverlay } from './FogOverlay';
import { useActiveCard } from './hooks/useActiveCard';
const ghosttImage = '/ghostt.png';

export const EventTimeline = ({ events, className = '' }) => {
  // Early return if no events
  if (!events || events.length === 0) {
    return (
      <div className="min-h-screen bg-[#030204] flex items-center justify-center">
        <div className="text-white text-xl">Loading Event Timeline...</div>
      </div>
    );
  }

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const wheelContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleStart, setVisibleStart] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isHoveringTimeline, setIsHoveringTimeline] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const windowSize = 7;

  const maxStart = Math.max(events.length - windowSize, 0);
  const canGoPrev = visibleStart > 0;
  const canGoNext = visibleStart < maxStart;

  const visibleEvents = events.slice(visibleStart, visibleStart + windowSize);

  // Get unique dates from all events
  const uniqueDates = [...new Set(events.map(event => event.date))];

  // Motion value for horizontal position
  const x = useMotionValue(0);

  // Motion value for scrollbar handle
  // Smooth spring for horizontal movement with enhanced fluidity
  const smoothX = useSpring(x, {
    stiffness: 120,
    damping: 25,
    mass: 0.8,
    restDelta: 0.001,
  });

  const [isTouching, setIsTouching] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);

  // Get active card based on center position (card visually in front)
  const { index: activeIndex, isCentered } = useActiveCard(cardRefs, events.length, x);

  // Initialize selectedDate to the first event's date
  useEffect(() => {
    if (events.length > 0 && selectedDate === null) {
      setSelectedDate(events[0].date);
    }
  }, [events, selectedDate]);

  // Keep selectedIndex and selectedDate in sync with whichever card is visually in front
  useEffect(() => {
    if (!events.length) return;
    setSelectedIndex(activeIndex);

    // Sync selectedDate with the active event's date
    if (events[activeIndex]) {
      setSelectedDate(events[activeIndex].date);
    }
  }, [activeIndex, events]);

  const handleJumpToIndex = (index) => {
    if (!events.length) return;

    // Update selected index immediately
    setSelectedIndex(index);

    // Give state updates a moment before scrolling
    setTimeout(() => {
      if (isMobile && cardRefs.current[index]) {
        cardRefs.current[index].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      } else if (scrollDistance < 0 && cardRefs.current[index]) {
        // Desktop horizontal centering
        const card = cardRefs.current[index];
        const cardRect = card.getBoundingClientRect();
        const currentX = x.get();
        const viewportCenter = window.innerWidth / 2;
        const cardCenter = cardRect.left + cardRect.width / 2;
        const shift = viewportCenter - cardCenter;
        const targetX = Math.max(scrollDistance, Math.min(0, currentX + shift));

        animate(x, targetX, { duration: 0.8, ease: [0.32, 0.72, 0, 1] });
      }
    }, 50);
  };

  const handleJumpToDate = (date) => {
    // Set the selected date and index
    setSelectedDate(date);
    const firstEventIndex = events.findIndex(event => event.date === date);

    if (firstEventIndex !== -1) {
      setSelectedIndex(firstEventIndex);

      // Give state updates a moment before scrolling
      setTimeout(() => {
        if (isMobile && cardRefs.current[firstEventIndex]) {
          cardRefs.current[firstEventIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        } else if (scrollDistance < 0 && cardRefs.current[firstEventIndex]) {
          // Desktop horizontal scrolling
          const card = cardRefs.current[firstEventIndex];
          const cardRect = card.getBoundingClientRect();
          const currentX = x.get();
          const viewportCenter = window.innerWidth / 2;
          const cardCenter = cardRect.left + cardRect.width / 2;
          const shift = viewportCenter - cardCenter;
          const targetX = Math.max(scrollDistance, Math.min(0, currentX + shift));

          animate(x, targetX, { duration: 0.8, ease: [0.32, 0.72, 0, 1] });
        }
      }, 50);
    }
  };

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keep active event within the visible date window
  useEffect(() => {
    if (!events.length) return;

    if (selectedIndex < visibleStart) {
      setVisibleStart(selectedIndex);
    } else if (selectedIndex >= visibleStart + windowSize) {
      const newStart = Math.min(selectedIndex - windowSize + 1, maxStart);
      setVisibleStart(newStart);
    }
  }, [selectedIndex, events.length, maxStart, visibleStart]);

  // Handle drag start
  const handleMouseDown = (e) => {
    if (!isHoveringTimeline) return;

    setIsDragging(true);
    setDragStart(e.clientX);
    setIsGrabbing(true);

    // Add global mouse event listeners for drag
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle drag movement
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart;
    const currentX = x.get();
    const newX = Math.max(scrollDistance, Math.min(0, currentX + deltaX));

    x.set(newX);
    setDragStart(e.clientX);
  };

  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsGrabbing(false);

    // Remove global mouse event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Touch event handlers for swipe scrolling (similar to mouse drag)
  const handleTouchStart = (e) => {
    if (isMobile) return; // Mobile already has native scrolling

    setIsTouchDragging(true);
    setTouchDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isTouchDragging || isMobile) return;

    e.preventDefault(); // Prevent default scrolling

    const touchX = e.touches[0].clientX;
    const deltaX = touchX - touchDragStart;
    const currentX = x.get();
    const newX = Math.max(scrollDistance, Math.min(0, currentX + deltaX));

    x.set(newX);
    setTouchDragStart(touchX);
  };

  const handleTouchEnd = () => {
    setIsTouchDragging(false);
  };

  // Handle wheel for horizontal scrolling when hovering cards
  useEffect(() => {
    const container = wheelContainerRef.current;
    if (!container) return;

    const onWheel = (e) => {
      // Check if hovering the timeline track zone (cards or gaps)
      const isOverTrack = e.target.closest('[data-scroll-track="true"]');

      if (isOverTrack) {
        // Prevent default vertical scrolling
        e.preventDefault();
        e.stopPropagation();

        const currentX = x.get();
        // Scroll Down (positive deltaY) -> Move Right to Left (decrease x)
        // Smoothly and slowly: standard delta is too fast, reduce it
        const delta = e.deltaY * 0.4;
        const newX = Math.max(scrollDistance, Math.min(0, currentX - delta));
        x.set(newX);
      }
    };

    // Use non-passive listener to ensure preventDefault works
    container.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', onWheel);
    };
  }, [scrollDistance, x]);

  // Calculate the horizontal scroll distance
  useEffect(() => {
    if (!trackRef.current || isMobile) return;

    const calculateDistance = () => {
      const lastIndex = events.length - 1;
      const lastCard = cardRefs.current[lastIndex];

      if (!lastCard) return;

      const viewportCenter = window.innerWidth / 2;
      const cardRect = lastCard.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const currentX = x.get();

      // Calculate the exact x value needed to center the last card
      // Target = CurrentX + (DesiredPosition - CurrentPosition)
      const targetX = currentX + (viewportCenter - cardCenter);

      // Clamp to ensure we don't scroll past 0 (right side)
      setScrollDistance(Math.min(0, targetX));
    };

    // Recalculate initially and on resize
    const timer = setTimeout(calculateDistance, 100);
    window.addEventListener('resize', calculateDistance);

    return () => {
      window.removeEventListener('resize', calculateDistance);
      clearTimeout(timer);
    };
  }, [events.length, isMobile, x]);



  // Mobile vertical layout
  if (isMobile) {
    return (
      <div className={`relative min-h-screen bg-[#030204] st-noise ${className}`}>
        <FogOverlay />

        {/* Header */}
        <div className="relative z-20 pt-16 pb-8 px-6 text-center space-y-4">
          <motion.h1
            className="st-title text-2xl md:text-3xl font-bold mb-3 text-white st-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Schedule
          </motion.h1>
          <motion.p
            className="text-white/60 text-sm max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Scroll through dates or tap to jump to an event
          </motion.p>

          {/* Date timeline bar - all unique dates */}
          <motion.div
            className="mt-2 pb-2 flex items-center justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-black/60 px-3 py-2 max-w-full overflow-x-auto">
              {uniqueDates.map((date) => {
                const isSelected = selectedDate === date;
                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => handleJumpToDate(date)}
                    className={`relative rounded-full px-3 py-1 text-[0.7rem] md:text-xs uppercase tracking-[0.18em] transition-colors whitespace-nowrap flex-shrink-0 ${isSelected
                      ? 'bg-red-500 text-black'
                      : 'bg-black/40 text-white/70 hover:bg-red-500/20 hover:text-white'
                      }`}
                  >
                    {date}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative z-20 px-6 pb-20">
          <div className="relative max-w-lg mx-auto">
            {/* Vertical connector line */}
            <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-500/60 via-red-500/40 to-red-500/20 st-line-glow" />

            <div className="space-y-32">
              {events.map((event, index) => (
                <div key={event.id} className="relative pl-12">
                  {/* Dot */}
                  <div className="absolute left-2 top-8 w-5 h-5 rounded-full bg-red-500 st-dot-pulse">
                    <div className="absolute inset-1 rounded-full bg-white/30" />
                  </div>

                  <TimelineCard
                    ref={(el) => (cardRefs.current[index] = el)}
                    event={event}
                    index={index}
                    isActive={index === activeIndex}
                    isPast={index < activeIndex}
                    isFuture={index > activeIndex}
                    isMobile={isMobile}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop horizontal layout
  return (
    <motion.div
      ref={containerRef}
      className={`relative min-h-screen bg-[#030204] st-noise ${className}`}
      style={{ position: 'relative' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <FogOverlay />

      {/* Sticky container */}
      <div
        ref={wheelContainerRef}
        className="relative h-screen overflow-hidden flex flex-col justify-center select-none"
        onMouseEnter={() => setIsHoveringTimeline(true)}
        onMouseLeave={() => {
          setIsHoveringTimeline(false);
        }}
      >
        {/* Header */}
        <div className="relative z-20 text-center mb-8 px-6 space-y-4">
          <motion.h1
            className="st-title text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white st-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Schedule
          </motion.h1>


          {/* Date timeline bar - all unique dates */}
          <motion.div
            className="mt-6 pb-4 flex items-center justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-red-500/40 bg-black/60 px-4 py-2 max-w-full overflow-x-auto">
              {uniqueDates.map((date) => {
                const isSelected = selectedDate === date;
                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => handleJumpToDate(date)}
                    className={`relative rounded-full px-4 py-1 text-xs md:text-sm uppercase tracking-[0.22em] transition-colors whitespace-nowrap flex-shrink-0 ${isSelected
                      ? 'bg-red-500 text-black scale-110'
                      : 'bg-black/40 text-white/70 hover:bg-red-500/20 hover:text-white'
                      }`}
                  >
                    {date}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Horizontal Scroll Interaction Zone */}
        <div
          className="relative w-full py-24 z-20"
          data-scroll-track="true"
        >
          <div className="relative w-full pointer-events-auto">
            <motion.div
              ref={trackRef}
              className="flex items-center gap-4 px-[50vw]"
              style={{ x, position: 'relative', transform: 'translateZ(0)' }}
              drag="x"
              dragConstraints={{ left: scrollDistance, right: 0 }}
              dragElastic={0}
              whileTap={{ cursor: "grabbing" }}
            >
              {events.map((event, index) => (
                <div key={event.id} className="flex items-center">
                  <TimelineConnector
                    index={index}
                    isActive={index === activeIndex}
                    isPast={index < selectedIndex}
                    isLast={index === events.length - 1}
                  />
                  <TimelineCard
                    ref={(el) => (cardRefs.current[index] = el)}
                    event={event}
                    index={index}
                    isActive={index === activeIndex && isCentered}
                    isPast={index < selectedIndex}
                    isFuture={index > selectedIndex}
                    isMobile={isMobile}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>


      </div>
    </motion.div>
  );
};

export default EventTimeline;

