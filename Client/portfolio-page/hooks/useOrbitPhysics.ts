import { useState, useEffect, useRef, useCallback } from 'react';

/**Custom hook to calculate smoothly interpolated 3D orbital scroll progress,  index snapping, wheel events, and touch drag gestures.
 * @param totalItems Total number of items in the orbit deck.
 */
export function useOrbitPhysics(totalItems: number) {
  // Currently active focused index (clamped between 0 and totalItems - 1)
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Smoothly interpolated continuous scroll position
  const [scrollProgress, setScrollProgress] = useState(0);

  // Discrete ref targets to prevent unneeded re-renders during 60fps RAF loop
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartYRef = useRef(0);
  const isDraggingRef = useRef(false);

  /* Linear interpolation (Lerp) physics step function. Smoothly eases current progress toward target progress using requestAnimationFrame. */
  const updatePhysics = useCallback(() => {
    const diff = targetProgressRef.current - currentProgressRef.current;

    // Continue animation loop if target and current progress differ significantly
    if (Math.abs(diff) > 0.0001) {
      currentProgressRef.current += diff * 0.12; // Easing speed factor
      setScrollProgress(currentProgressRef.current);

      const nextActiveIndex = Math.min(
        totalItems - 1,
        Math.max(0, Math.round(currentProgressRef.current))
      );

      setActiveIndex((prev) => (prev !== nextActiveIndex ? nextActiveIndex : prev));
      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    } else {
      // Lock values to exact target when threshold is reached
      currentProgressRef.current = targetProgressRef.current;
      setScrollProgress(targetProgressRef.current);
      const finalIndex = Math.min(
        totalItems - 1,
        Math.max(0, Math.round(targetProgressRef.current))
      );
      setActiveIndex(finalIndex);
      animationFrameRef.current = null;
    }
  }, [totalItems]);

  /* Starts RAF loop if it isn't already active. */
  const startPhysicsLoop = useCallback(() => {
    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    }
  }, [updatePhysics]);

  // Initial setup loop listener
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };
  }, [updatePhysics]);

  /* Adjusts target progress position by a relative delta value. */
  const offsetTargetProgress = useCallback(
    (delta: number) => {
      const maxVal = totalItems - 1;
      targetProgressRef.current = Math.min(maxVal, Math.max(0, targetProgressRef.current + delta));
      startPhysicsLoop();
    },
    [totalItems, startPhysicsLoop]
  );

  /* Snaps orbit target progress to the nearest integer index. */
  const snapToNearest = useCallback(() => {
    targetProgressRef.current = Math.min(
      totalItems - 1,
      Math.max(0, Math.round(targetProgressRef.current))
    );
    startPhysicsLoop();
  }, [totalItems, startPhysicsLoop]);

  /* Wheel event handler translating mouse scroll deltas into orbital physics steps. */
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.0035;
      offsetTargetProgress(delta);

      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      snapTimeoutRef.current = setTimeout(snapToNearest, 150);
    },
    [offsetTargetProgress, snapToNearest]
  );

  /* Touch start gesture initialization. */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    touchStartYRef.current = e.touches[0].clientY;
    isDraggingRef.current = true;
  }, []);

  /* Touch movement gesture updates. */
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDraggingRef.current) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY;
      offsetTargetProgress(deltaY * 0.007);
      touchStartYRef.current = currentY;
    },
    [offsetTargetProgress]
  );

  /* Touch end gesture cleanup with auto-snap. */
  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    snapToNearest();
  }, [snapToNearest]);

  /* Programmatically focuses a given index (e.g., card click selection). */
  const selectAndFocusProject = useCallback(
    (index: number) => {
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      targetProgressRef.current = index;
      startPhysicsLoop();
    },
    [startPhysicsLoop]
  );

  return {
    activeIndex,
    scrollProgress,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    selectAndFocusProject,
  };
}