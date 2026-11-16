import { useState, useEffect, useRef } from 'react';

/**
 * Animated count-up hook. Counts from 0 to `target` with an ease-out cubic
 * curve over `duration` ms, starting only when `run` is true.
 * 
 * @param {number} target - The final value
 * @param {boolean} run - Whether to start counting (typically tied to in-view state)
 * @param {number} duration - Animation duration in ms (default 1900)
 * @param {number} delay - Stagger delay in ms (default 0)
 * @returns {number} The current animated value
 */
export function useCountUp(target, run = false, duration = 1900, delay = 0) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!run) {
      setValue(0);
      return;
    }

    const startAt = performance.now() + delay;

    const tick = (now) => {
      if (now < startAt) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(1, (now - startAt) / duration);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, run, duration, delay]);

  return value;
}
