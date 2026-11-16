import React from 'react';

/**
 * Section — Unified full-bleed section component for Aureus Creatives.
 * Supports theme/variant ('dark', 'light', 'blue'), responsive padding, and inner container.
 */
export default function Section({
  id,
  variant,
  theme,
  padded = false,
  className = '',
  style = {},
  background,
  children,
}) {
  const resolvedTheme = variant || theme || 'dark';
  const baseClass = `sec sec--${resolvedTheme} theme-${resolvedTheme} ${padded ? 'section-padded' : ''} ${className}`.trim();

  return (
    <section id={id} className={baseClass} style={style}>
      {background}
      <div className="sec-inner container">
        {children}
      </div>
    </section>
  );
}
