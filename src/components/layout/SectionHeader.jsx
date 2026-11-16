import React from 'react';

/**
 * SectionHeader — Standardized editorial section header for Aureus Creatives.
 * Renders an uppercase numbered eyebrow, an oversized editorial display title,
 * and an optional subtitle paragraph.
 */
export default function SectionHeader({
  number,
  label,
  title,
  subtitle,
  className = '',
}) {
  const hasLabel = Boolean(number || label);

  return (
    <div className={`section-header ${className}`}>
      {hasLabel && (
        <div className="section-label reveal" data-d="1">
          {number && <span className="num">{number}</span>}
          {label && <span className="text">{label}</span>}
          <span className="line" />
        </div>
      )}

      {title && (
        typeof title === 'string' ? (
          <h2
            className="section-title reveal"
            data-d="2"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        ) : (
          <h2 className="section-title reveal" data-d="2">
            {title}
          </h2>
        )
      )}

      {subtitle && (
        <p className="section-subtitle reveal" data-d="3">
          {subtitle}
        </p>
      )}
    </div>
  );
}
