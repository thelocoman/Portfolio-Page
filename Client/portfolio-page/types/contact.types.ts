import type { ReactNode } from 'react';

export interface GradientStops {
  readonly start: string;
  readonly end: string;
}

export interface ContactAction {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly description: string;
  readonly gradientStops: GradientStops;
  readonly icon: ReactNode;
}

export interface WheelDimensions {
  readonly wheelSize: number;
  readonly centerRadius: number;
  readonly outerRadius: number;
}