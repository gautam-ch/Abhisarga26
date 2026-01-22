"use client";

import { useState, useEffect } from 'react';

export const useActiveCard = (cardRefs, totalCards, xMotionValue = null) => {
  const [activeState, setActiveState] = useState({ index: 0, isCentered: true });

  useEffect(() => {
    const updateActiveCard = () => {
      if (!cardRefs.current) return;

      // Use viewport center - cards are centered in the viewport
      const viewportCenterX = window.innerWidth / 2;

      let bestIndex = 0;
      let bestScore = -Infinity;
      let bestDistance = Infinity;
      let activeCardWidth = 0;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const cardRect = card.getBoundingClientRect();
        const cardLeft = cardRect.left;
        const cardRight = cardRect.right;
        const cardCenter = cardRect.left + cardRect.width / 2;

        // Calculate how much of the card is visible in the center region
        // Center region is defined as viewportCenterX ± (cardWidth/2)
        const centerRegionLeft = viewportCenterX - cardRect.width / 2;
        const centerRegionRight = viewportCenterX + cardRect.width / 2;

        const visibleLeft = Math.max(cardLeft, centerRegionLeft);
        const visibleRight = Math.min(cardRight, centerRegionRight);
        const visibleWidth = Math.max(0, visibleRight - visibleLeft);

        // Score based on how centered the card is
        const distanceFromCenter = Math.abs(cardCenter - viewportCenterX);
        const score = visibleWidth / cardRect.width - distanceFromCenter / window.innerWidth;

        if (score > bestScore) {
          bestScore = score;
          bestIndex = index;
          bestDistance = distanceFromCenter;
          activeCardWidth = cardRect.width;
        }
      });

      // Consider centered if the distance from center is less than 1/3 of the card width
      // This ensures the card is significantly dominating the center view
      const isCentered = activeCardWidth > 0 && bestDistance < (activeCardWidth / 3);

      setActiveState(prev => {
        if (prev.index === bestIndex && prev.isCentered === isCentered) return prev;
        return { index: bestIndex, isCentered };
      });
    };

    // Initial check
    updateActiveCard();

    // Use requestAnimationFrame for smoother updates
    let rafId;
    const handleScroll = () => {
      rafId = requestAnimationFrame(updateActiveCard);
    };

    // Listen for window scroll (for vertical scrolling)
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Listen for motion value changes (for horizontal timeline scrolling)
    let unsubscribeMotion = null;
    let motionRafId = null;
    if (xMotionValue) {
      unsubscribeMotion = xMotionValue.onChange(() => {
        // Use requestAnimationFrame to throttle updates
        if (!motionRafId) {
          motionRafId = requestAnimationFrame(() => {
            updateActiveCard();
            motionRafId = null;
          });
        }
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (motionRafId) cancelAnimationFrame(motionRafId);
      if (unsubscribeMotion) unsubscribeMotion();
    };
  }, [cardRefs, totalCards, xMotionValue]);

  return activeState;
};

