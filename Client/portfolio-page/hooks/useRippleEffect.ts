import { useState, useCallback } from 'react';
import { GradientStops } from '@/types/contact.types';

export interface Ripple {
  id: number;
  colorStart: string;
  colorEnd: string;
}

/** Custom hook to manage active ripple state objects for interactive visual effects.
 * @param maxRipples Maximum number of concurrent ripple instances (defaults to 3). */

export function useRippleEffect(maxRipples = 3) {
  // State array holding active ripple instances
  const [ripples, setRipples] = useState<Ripple[]>([]);

  /* Spawns a new ripple instance using provided gradient color stops, automatically dropping older ripples if maxRipples limit is exceeded. */
  const addRipple = useCallback((stops: GradientStops) => {
    const newRipple: Ripple = {
      id: Date.now(),
      colorStart: stops.start,
      colorEnd: stops.end,
    };
    setRipples((prev) => [...prev.slice(-(maxRipples - 1)), newRipple]);
  }, [maxRipples]);

  /* Removes a ripple instance by its unique identifier upon animation completion.*/
  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return { ripples, addRipple, removeRipple };
}