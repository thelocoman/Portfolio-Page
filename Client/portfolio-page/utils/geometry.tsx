import type { WheelDimensions } from '@/types/contact.types';

/* Calculates SVG arc path commands for rendering a segmented wheel  */
export function calculateSlicePath(
  index: number,
  totalSlices: number,
  dimensions: WheelDimensions,
  gapAngle = 0.04
): string {
  const { wheelSize, centerRadius, outerRadius } = dimensions;
  const anglePerSlice = (2 * Math.PI) / totalSlices;

  const startAngle = index * anglePerSlice - Math.PI / 2 + gapAngle / 2;
  const endAngle = (index + 1) * anglePerSlice - Math.PI / 2 - gapAngle / 2;
  const center = wheelSize / 2;

  const x1 = center + outerRadius * Math.cos(startAngle);
  const y1 = center + outerRadius * Math.sin(startAngle);
  const x2 = center + outerRadius * Math.cos(endAngle);
  const y2 = center + outerRadius * Math.sin(endAngle);

  const x3 = center + centerRadius * Math.cos(endAngle);
  const y3 = center + centerRadius * Math.sin(endAngle);
  const x4 = center + centerRadius * Math.cos(startAngle);
  const y4 = center + centerRadius * Math.sin(startAngle);

  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

  return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${centerRadius} ${centerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
}

/**
 * Calculates absolute center coordinates for positioning elements within a wheel slice.
 */
export function calculateSliceCenterCoordinates(
  index: number,
  totalSlices: number,
  dimensions: WheelDimensions
): { x: number; y: number } {
  const { wheelSize, centerRadius, outerRadius } = dimensions;
  const midAngle = (index + 0.5) * ((2 * Math.PI) / totalSlices) - Math.PI / 2;
  const iconRadius = (centerRadius + outerRadius) / 2;

  return {
    x: Math.round(wheelSize / 2 + iconRadius * Math.cos(midAngle)),
    y: Math.round(wheelSize / 2 + iconRadius * Math.sin(midAngle)),
  };
}