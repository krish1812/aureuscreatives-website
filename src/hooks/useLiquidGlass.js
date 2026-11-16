// src/hooks/useLiquidGlass.js
import { useEffect, useRef } from 'react';

/**
 * useLiquidGlass — High-performance pointer-responsive specular reflection hook.
 * Dynamically tracks cursor position relative to an element and updates
 * CSS variables (--glass-x, --glass-y, --glass-opacity) inside requestAnimationFrame.
 * 
 * Bypasses React state to ensure zero component re-renders and solid 60–120fps performance.
 * Automatically respects prefers-reduced-motion and touch-only devices.
 */
export function useLiquidGlass(customRef = null) {
  const localRef = useRef(null);
  const targetRef = customRef || localRef;

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    // Check accessibility & device capabilities
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchOnly = window.matchMedia('(hover: none)').matches;
    if (prefersReducedMotion || isTouchOnly) return;

    let rafId = null;
    let rect = null;

    const updatePosition = (clientX, clientY) => {
      if (!rect) {
        rect = el.getBoundingClientRect();
      }
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      el.style.setProperty('--glass-x', `${x}px`);
      el.style.setProperty('--glass-y', `${y}px`);
      el.style.setProperty('--glass-opacity', '1');
    };

    const handlePointerEnter = (e) => {
      rect = el.getBoundingClientRect();
      updatePosition(e.clientX, e.clientY);
    };

    const handlePointerMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updatePosition(e.clientX, e.clientY);
      });
    };

    const handlePointerLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.style.setProperty('--glass-opacity', '0');
      rect = null;
    };

    el.addEventListener('pointerenter', handlePointerEnter, { passive: true });
    el.addEventListener('pointermove', handlePointerMove, { passive: true });
    el.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener('pointerenter', handlePointerEnter);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [targetRef]);

  return targetRef;
}

/**
 * Global helper to attach Liquid Glass specular tracking to a querySelector group
 * Useful for static card grids (e.g. .service-card, .work-card, etc.)
 */
export function useLiquidGlassGroup(selector) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchOnly = window.matchMedia('(hover: none)').matches;
    if (prefersReducedMotion || isTouchOnly) return;

    const elements = document.querySelectorAll(selector);
    const cleanups = [];

    elements.forEach((el) => {
      let rafId = null;
      let rect = null;

      const handlePointerEnter = (e) => {
        rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--glass-x', `${x}px`);
        el.style.setProperty('--glass-y', `${y}px`);
        el.style.setProperty('--glass-opacity', '1');
      };

      const handlePointerMove = (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (!rect) rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          el.style.setProperty('--glass-x', `${x}px`);
          el.style.setProperty('--glass-y', `${y}px`);
        });
      };

      const handlePointerLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
        el.style.setProperty('--glass-opacity', '0');
        rect = null;
      };

      el.addEventListener('pointerenter', handlePointerEnter, { passive: true });
      el.addEventListener('pointermove', handlePointerMove, { passive: true });
      el.addEventListener('pointerleave', handlePointerLeave, { passive: true });

      cleanups.push(() => {
        if (rafId) cancelAnimationFrame(rafId);
        el.removeEventListener('pointerenter', handlePointerEnter);
        el.removeEventListener('pointermove', handlePointerMove);
        el.removeEventListener('pointerleave', handlePointerLeave);
      });
    });

    return () => {
      cleanups.forEach((c) => c());
    };
  }, [selector]);
}

/**
 * useLiquidGlassDelegated — Global delegated pointer tracker for dynamic/paginated cards.
 * Listens on window/document with event delegation, updating --glass-x and --glass-y
 * without requiring manual refs or re-attaching on route changes.
 */
export function useLiquidGlassDelegated(selector = '.service-card, .work-card, .testimonial-card, .cta-card') {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchOnly = window.matchMedia('(hover: none)').matches;
    if (prefersReducedMotion || isTouchOnly) return;

    let currentEl = null;
    let rect = null;
    let rafId = null;

    const onPointerMove = (e) => {
      const targetEl = e.target.closest(selector);
      if (!targetEl) {
        if (currentEl) {
          currentEl.style.setProperty('--glass-opacity', '0');
          currentEl = null;
          rect = null;
        }
        return;
      }

      if (targetEl !== currentEl) {
        if (currentEl) {
          currentEl.style.setProperty('--glass-opacity', '0');
        }
        currentEl = targetEl;
        rect = currentEl.getBoundingClientRect();
      }

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!currentEl) return;
        if (!rect) rect = currentEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        currentEl.style.setProperty('--glass-x', `${x}px`);
        currentEl.style.setProperty('--glass-y', `${y}px`);
        currentEl.style.setProperty('--glass-opacity', '1');
      });
    };

    const onPointerOut = (e) => {
      if (!currentEl) return;
      if (!e.relatedTarget || !currentEl.contains(e.relatedTarget)) {
        if (rafId) cancelAnimationFrame(rafId);
        currentEl.style.setProperty('--glass-opacity', '0');
        currentEl = null;
        rect = null;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerout', onPointerOut);
      if (currentEl) {
        currentEl.style.setProperty('--glass-opacity', '0');
      }
    };
  }, [selector]);
}

