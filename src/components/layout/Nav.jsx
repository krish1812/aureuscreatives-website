import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, NAV_CTA, FOOTER_LINKS } from '../../data/navigation';
import { useLiquidGlass } from '../../hooks/useLiquidGlass';
import { useDockWave } from '../../hooks/useDockMagnification';
import '../../styles/nav.css';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide nav when scrolling into footer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const footerEntry = entries.find((e) => e.target.classList.contains('footer-wrap'));
        if (footerEntry) {
          setHidden(footerEntry.isIntersecting);
        }
      },
      { threshold: 0.05 }
    );

    const timer = setTimeout(() => {
      const footer = document.querySelector('.footer-wrap');
      if (footer) observer.observe(footer);
    }, 200);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('nav-locked');
    } else {
      document.documentElement.classList.remove('nav-locked');
    }
    return () => document.documentElement.classList.remove('nav-locked');
  }, [isOpen]);

  // Close menu on resize or route change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && isOpen) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const pillRef = useLiquidGlass();
  useDockWave({ childSelector: '.dock-item', maxScale: 1.22, radius: 140, maxLift: 4, direction: 'x' }, pillRef);

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''} ${isOpen ? 'nav--open' : ''}`}>
        <div ref={pillRef} className="nav-pill liquid-glass-nav">
          <Link to="/" className="nav-logo dock-item" aria-label="Aureus Creatives Home">
            <div className="nav-brand-glass">
              <img
                src="/aureus-logo.png"
                alt="Aureus Creatives"
                className="nav-brand-logo"
              />
              <span className="nav-brand-glass-sheen" aria-hidden="true" />
            </div>
            <span className="brand-text">
              <span className="brand-primary">Aureus</span>
              <span className="brand-secondary">Creatives</span>
            </span>
          </Link>

          <div className="nav-divider" aria-hidden="true" />

          <div className="nav-links">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`nav-link dock-item ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link to={NAV_CTA.path} className="nav-link cta dock-item">
              {NAV_CTA.label}
            </Link>
          </div>

          <button
            type="button"
            className="nav-toggle"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Panel */}
      <div className={`nav-mobile-panel ${isOpen ? 'open' : ''}`}>
        <div className="nav-mobile-inner">
          <div className="nav-mobile-links">
            {NAV_LINKS.map((link, idx) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`nav-mobile-link ${isActive ? 'active' : ''}`}
                  style={{ transitionDelay: `${0.05 + idx * 0.05}s` }}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to={NAV_CTA.path}
              className="nav-mobile-cta"
              style={{ transitionDelay: `${0.05 + NAV_LINKS.length * 0.05}s` }}
            >
              {NAV_CTA.label}
            </Link>
          </div>

          <div className="nav-mobile-footer">
            <div className="nav-mobile-contact">
              <a href="mailto:info@aureuscreatives.com">info@aureuscreatives.com</a>
            </div>
            <div className="nav-mobile-socials">
              {FOOTER_LINKS?.social?.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
