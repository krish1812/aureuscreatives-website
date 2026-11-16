import { useState, useEffect } from 'react';
import '../styles/preloader.css';

/**
 * Preloader — Gold-tinted brand reveal splash screen.
 * Only shows on first visit per session (sessionStorage).
 * Logo fades in from blur, holds, then fades out.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem('aureus_splash_shown') !== '1';
    } catch {
      return true;
    }
  });
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    try {
      sessionStorage.setItem('aureus_splash_shown', '1');
    } catch {}

    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1200);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 1800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      id="splash"
      className={`preloader ${fading ? 'preloader--fading' : ''}`}
      aria-hidden="true"
    >
      <div className="preloader__brand">
        <span className="preloader__logo-text">AUREUS</span>
        <span className="preloader__logo-sub">CREATIVES</span>
      </div>
    </div>
  );
}
