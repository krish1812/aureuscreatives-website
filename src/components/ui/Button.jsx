import { Link } from 'react-router-dom';

/**
 * Button — Pill-shaped CTA button with primary, ghost, and blue variants.
 * Intelligently routes internal paths with React Router Link, and external URLs with standard anchor.
 */
export default function Button({ 
  variant = 'primary', 
  href, 
  to, 
  onClick, 
  children, 
  className = '', 
  ...rest 
}) {
  const classes = `btn btn-${variant} liquid-glass-btn dock-item ${className}`.trim();
  const target = to || href;

  // Internal route (either explicit 'to' or 'href' starting with '/')
  if (target && target.startsWith('/')) {
    return (
      <Link to={target} className={classes} {...rest}>
        {children}
        <span className="arrow" aria-hidden="true">→</span>
      </Link>
    );
  }

  // Anchor or external link
  if (target) {
    const isExternal = target.startsWith('http') || target.startsWith('mailto:');
    return (
      <a 
        href={target} 
        className={classes} 
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
        <span className="arrow" aria-hidden="true">→</span>
      </a>
    );
  }

  // Regular button element
  return (
    <button type={rest.type || 'button'} className={classes} onClick={onClick} {...rest}>
      {children}
      <span className="arrow" aria-hidden="true">→</span>
    </button>
  );
}
