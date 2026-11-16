import { useEffect, useRef } from 'react';
import '../../styles/marquee.css';

/**
 * Marquee — Infinite auto-scrolling horizontal strip.
 * Used for the "Trusted By" brand logo carousel.
 * Pauses on hover. Supports reverse direction / direction="right".
 */
export default function Marquee({ children, reverse = false, direction = 'left', speed = 50, className = '' }) {
  const isReverse = reverse || direction === 'right';

  return (
    <div className={`marquee ${className}`}>
      <div
        className={`marquee-track ${isReverse ? 'marquee-track--reverse' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {/* Duplicate children for seamless infinite loop */}
        {children}
      </div>
    </div>
  );
}
