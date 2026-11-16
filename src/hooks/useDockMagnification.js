// src/hooks/useDockMagnification.js
import { useEffect, useRef } from 'react';

/**
 * useDockWave — Attaches macOS Dock-style magnification wave to any container of items.
 * As the pointer glides across the container, the item nearest to the cursor
 * magnifies the most, and neighboring items scale proportionately in a smooth wave.
 *
 * Runs inside requestAnimationFrame, updating CSS variables (--dock-scale, --dock-lift)
 * for butter-smooth 60–120fps hardware-accelerated GPU performance.
 */
export function useDockWave(options = {}, externalRef = null) {
  const localRef = useRef(null);
  const containerRef = externalRef || localRef;

  const {
    childSelector = '.dock-item',
    maxScale = 1.3,
    radius = 160,
    maxLift = 8,
    direction = 'x', // 'x' for horizontal dock rows, 'both' for 2D grids
    exponent = 1.3,
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Accessibility check: disable if user explicitly prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId = null;
    let cachedChildren = [];

    const cacheChildren = () => {
      const elements = container.querySelectorAll(childSelector);
      cachedChildren = Array.from(elements).map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          element: el,
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        };
      });
    };

    // Pre-cache coordinates on mount
    cacheChildren();

    const updateScales = (clientX, clientY) => {
      if (cachedChildren.length === 0) cacheChildren();

      cachedChildren.forEach((child) => {
        let distance;
        if (direction === 'x') {
          distance = Math.abs(clientX - child.centerX);
        } else {
          const dx = clientX - child.centerX;
          const dy = clientY - child.centerY;
          distance = Math.sqrt(dx * dx + dy * dy);
        }

        if (distance < radius) {
          // Smooth cosine falloff curve (macOS Dock signature curve with customizable exponent)
          const norm = distance / radius;
          const cosVal = Math.cos(norm * (Math.PI / 2));
          const factor = Math.pow(Math.max(0, cosVal), exponent);
          const scale = 1 + (maxScale - 1) * factor;
          const lift = -maxLift * factor;

          child.element.style.setProperty('--dock-scale', scale.toFixed(3));
          child.element.style.setProperty('--dock-lift', `${lift.toFixed(1)}px`);
          child.element.style.setProperty('--dock-active', factor > 0.03 ? '1' : '0');
        } else {
          child.element.style.setProperty('--dock-scale', '1');
          child.element.style.setProperty('--dock-lift', '0px');
          child.element.style.setProperty('--dock-active', '0');
        }
      });
    };

    const resetScales = () => {
      cachedChildren.forEach((child) => {
        child.element.style.setProperty('--dock-scale', '1');
        child.element.style.setProperty('--dock-lift', '0px');
        child.element.style.setProperty('--dock-active', '0');
      });
    };

    const handlePointerEnter = (e) => {
      cacheChildren();
      updateScales(e.clientX, e.clientY);
    };

    const handlePointerMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updateScales(e.clientX, e.clientY);
      });
    };

    const handlePointerLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      resetScales();
    };

    container.addEventListener('pointerenter', handlePointerEnter, { passive: true });
    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('resize', cacheChildren, { passive: true });
    window.addEventListener('scroll', cacheChildren, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', cacheChildren);
      window.removeEventListener('scroll', cacheChildren);
      resetScales();
    };
  }, [containerRef, childSelector, maxScale, radius, maxLift, direction, exponent]);

  return containerRef;
}

/**
 * useGlobalDockMagnification — Attaches macOS-style wave magnification & tactile tap physics
 * to all standalone interactive elements across the site.
 */
export function useGlobalDockMagnification() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Interactive target selector for all clickable / tappable items
    const targetSelector = `
      .btn,
      .dock-item,
      .nav-link,
      .nav-logo,
      .nav-toggle,
      .footer-cta-pill,
      .footer-social-icon,
      .brand-item,
      .work-card,
      .stat-card-wrap,
      .stat-card,
      .service-card,
      .testimonial-card,
      .why-aureus__framework-pill,
      .creator-photo-wrapper,
      .creator-item,
      .work-card__pill,
      .work-card__avatar,
      .work-card-category-pill,
      .nav-brand-glass,
      .cta-card
    `;

    const handlePointerDown = (e) => {
      const target = e.target.closest(targetSelector);
      if (!target) return;
      target.classList.add('dock-pressed');
    };

    const handlePointerUp = (e) => {
      const target = e.target.closest(targetSelector);
      if (target) {
        target.classList.remove('dock-pressed');
      }
      // Ensure all pressed states are cleared even if released outside
      document.querySelectorAll('.dock-pressed').forEach((el) => el.classList.remove('dock-pressed'));
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);
}
