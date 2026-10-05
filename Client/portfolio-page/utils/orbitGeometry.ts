import type { OrbitCardMetrics } from '@/types/projects.types';

export type OrbitMetrics = OrbitCardMetrics;

type AnchorSide = 'left' | 'right';

/* Base calculation for angular orbit transformations. */
function calculateOrbitMetrics(
  index: number,
  scrollProgress: number,
  activeIndex: number,
  isMobile: boolean,
  side: AnchorSide
): OrbitMetrics {
  const relativeOffset = index - scrollProgress;
  const angularStepDeg = isMobile ? 24 : 18;
  const directionMultiplier = side === 'left' ? 1 : -1;
  
  const angleDeg = relativeOffset * angularStepDeg * directionMultiplier;
  const distance = Math.abs(relativeOffset);

  return {
    angleDeg,
    opacity: Math.max(0, 1 - distance * 0.4),
    scale: Math.max(0.7, 1 - distance * 0.08),
    zIndex: 100 - Math.round(distance * 10),
    localRotateZ: side === 'left' ? -angleDeg * 0.15 : angleDeg * 0.15,
    localRotateY: side === 'left' ? angleDeg * 0.75 : -angleDeg * 0.75,
    isSelected: activeIndex === index,
  };
}

/* Calculates orbit metrics for left-anchored elements (e.g., Projects section). */
export function calculateLeftOrbitMetrics(
  index: number,
  scrollProgress: number,
  activeIndex: number,
  isMobile: boolean
): OrbitMetrics {
  return calculateOrbitMetrics(index, scrollProgress, activeIndex, isMobile, 'left');
}

/* Calculates orbit metrics for right-anchored elements (e.g., Skills section). */
export function calculateRightOrbitMetrics(
  index: number,
  scrollProgress: number,
  activeIndex: number,
  isMobile: boolean
): OrbitMetrics {
  return calculateOrbitMetrics(index, scrollProgress, activeIndex, isMobile, 'right');
}