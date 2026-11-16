import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '../../data/navigation';
import '../../styles/footer.css';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

export default function Footer() {
  const socials = FOOTER_LINKS.socials || FOOTER_LINKS.social || [];

  return (
    <div className="footer-wrap">
      <footer className="footer" role="contentinfo">
        <div className="footer-bg" aria-hidden="true">
          <div className="footer-ambient-blue" />
          <div className="footer-ambient-gold" />
        </div>

        <div className="footer-content">
          {/* Top CTA Band */}
          <div className="footer-cta reveal" data-d="1">
            <div className="footer-cta__left">
              <span className="footer-cta__eyebrow">Get In Touch</span>
              <h2 className="footer-cta__title">
                Ready to launch your <em>next campaign</em>?
              </h2>
              <p className="footer-cta__sub">
                Tell us about your brand, your audience, and the kind of attention you are after.
                We'll assemble the roster, the strategy, and a transparent plan.
              </p>
            </div>

            <div className="footer-cta__right">
              <Link to="/contact?role=brand" className="footer-cta-pill footer-cta-pill--brands">
                <div className="footer-cta-pill__info">
                  <span className="footer-cta-pill__label">For Brands</span>
                  <span className="footer-cta-pill__action">Start a project</span>
                </div>
                <span className="footer-cta-pill__arrow" aria-hidden="true">&rarr;</span>
              </Link>

              <Link to="/for-creators" className="footer-cta-pill footer-cta-pill--creators">
                <div className="footer-cta-pill__info">
                  <span className="footer-cta-pill__label">For Creators</span>
                  <span className="footer-cta-pill__action">Join our network</span>
                </div>
                <span className="footer-cta-pill__arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Footer Navigation Columns */}
          <div className="footer-columns reveal" data-d="2">
            <div className="footer-col footer-col--brand">
              <Link to="/" className="footer-logo" aria-label="Aureus Creatives">
                <div className="nav-brand-glass footer-brand-glass">
                  <img
                    src="/aureus-logo.png"
                    alt="Aureus Creatives"
                    className="nav-brand-logo footer-brand-logo"
                  />
                  <span className="nav-brand-glass-sheen" aria-hidden="true" />
                </div>
                <span className="brand-text">
                  <span className="brand-primary">Aureus</span>
                  <span className="brand-secondary">Creatives</span>
                </span>
              </Link>
              <p className="footer-tagline">
                India's premier influencer marketing agency, connecting visionary brands with category-defining creators.
              </p>
              <div className="footer-contact-details">
                <a href="mailto:info@aureuscreatives.com" className="footer-email">
                  info@aureuscreatives.com
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Navigation</h4>
              <ul>
                {FOOTER_LINKS?.pages?.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path || link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Engage</h4>
              <ul>
                <li><Link to="/for-brands">For Brands</Link></li>
                <li><Link to="/for-creators">For Creators</Link></li>
                <li><Link to="/work">Campaign Portfolio</Link></li>
                <li><Link to="/contact">Book a Strategy Call</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Social</h4>
              <div className="footer-socials">
                <a
                  href="https://www.instagram.com/aureuscreatives"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.linkedin.com/company/aureus-creatives"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://x.com/aureuscreatives"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="X"
                >
                  <XIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="footer-bottom reveal" data-d="3">
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} Aureus Creatives. All rights reserved.
            </p>
            <div className="footer-legal">
              {FOOTER_LINKS?.legal?.map((link) => (
                <Link key={link.label} to={link.path || link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
