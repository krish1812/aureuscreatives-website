import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/selected-work.css';

const BRAND_PALETTES = {
  Nivea: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(0, 50, 160, 0.32) 0%, rgba(10, 11, 16, 0.95) 75%)',
    accent: '#0032A0',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '0.04em',
  },
  'TRESemmé': {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(212, 175, 55, 0.24) 0%, rgba(10, 11, 16, 0.95) 75%)',
    accent: '#D4AF37',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '0.06em',
  },
  Tresemme: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(212, 175, 55, 0.24) 0%, rgba(10, 11, 16, 0.95) 75%)',
    accent: '#D4AF37',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '0.06em',
  },
  Philips: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(11, 94, 215, 0.28) 0%, rgba(10, 11, 16, 0.95) 75%)',
    accent: '#0B5ED7',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '0.08em',
  },
  Phillips: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(11, 94, 215, 0.28) 0%, rgba(10, 11, 16, 0.95) 75%)',
    accent: '#0B5ED7',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '0.08em',
  },
  Wobble: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(139, 92, 246, 0.26) 0%, rgba(10, 11, 16, 0.95) 75%)',
    accent: '#8B5CF6',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '-0.01em',
  },
  Mahindra: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(220, 38, 38, 0.24) 0%, rgba(10, 11, 16, 0.95) 75%)',
    accent: '#DC2626',
    fontStyle: 'italic',
    fontWeight: '800',
    letterSpacing: '0.02em',
  },
  ShineXpro: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(6, 182, 212, 0.24) 0%, rgba(10, 11, 16, 0.95) 75%)',
    accent: '#06B6D4',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '0.05em',
  },
  TV9: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(219, 0, 0, 0.24) 0%, rgba(10, 11, 16, 0.95) 75%)',
    accent: '#DB0000',
    fontStyle: 'normal',
    fontWeight: '900',
    letterSpacing: '0.08em',
  },
  GMR: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(0, 57, 116, 0.28) 0%, rgba(10, 11, 16, 0.95) 75%)',
    accent: '#FAAB53',
    fontStyle: 'normal',
    fontWeight: '900',
    letterSpacing: '0.12em',
  },
  Zarva: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(236, 72, 153, 0.24) 0%, rgba(10, 11, 16, 0.95) 75%)',
    accent: '#EC4899',
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: '0.06em',
  },
};

export default function CaseStudyCard({ study, index = 0 }) {
  const navigate = useNavigate();
  const brandName = study.brand || 'Brand';
  const palette = BRAND_PALETTES[brandName] || {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(16, 54, 125, 0.25) 0%, rgba(10, 11, 16, 0.95) 75%)',
    accent: '#74B4D9',
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: '0em',
  };

  const targetUrl = study.url || `/work/${study.slug || study.id}`;

  const handleClick = (e) => {
    // If middle click or keyboard modifier, let browser open in new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
      return;
    }
    e.preventDefault();
    navigate(targetUrl);
    window.scrollTo(0, 0);
  };

  return (
    <Link
      to={targetUrl}
      href={targetUrl}
      onClick={handleClick}
      className="case-study-card reveal"
      data-d={(index % 3) + 1}
      aria-label={`${brandName} case study — ${study.headline}`}
    >
      {/* Top Visual / Media Area */}
      <div 
        className={`case-study-card__cover ${study.bannerImage ? 'case-study-card__cover--has-image' : ''}`}
        style={{ background: palette.bg }}
      >
        {study.bannerImage ? (
          <>
            <img 
              src={study.bannerImage} 
              alt={`${brandName} Case Study`}
              className="case-study-card__banner-img"
              loading="lazy"
            />
            <div className="case-study-card__banner-overlay" aria-hidden="true" />
            <div className="case-study-card__crosshairs" aria-hidden="true">
              <span className="ch ch--tl">+</span>
              <span className="ch ch--tr">+</span>
              <span className="ch ch--bl">+</span>
              <span className="ch ch--br">+</span>
            </div>
            <div className="case-study-card__view-badge" aria-hidden="true">
              <span>View case study</span>
              <span className="arr">→</span>
            </div>
            <div className="case-study-card__brand-pill-overlay">
              <span>{brandName.toUpperCase()}</span>
            </div>
          </>
        ) : (
          <>
            {/* Subtle grid crosshairs & ambient texture */}
            <div className="case-study-card__grid-bg" aria-hidden="true" />
            <div className="case-study-card__crosshairs" aria-hidden="true">
              <span className="ch ch--tl">+</span>
              <span className="ch ch--tr">+</span>
              <span className="ch ch--bl">+</span>
              <span className="ch ch--br">+</span>
            </div>

            {/* View Campaign Floating Hover Badge */}
            <div className="case-study-card__view-badge" aria-hidden="true">
              <span>View case study</span>
              <span className="arr">→</span>
            </div>

            {/* Centered Brand Logo */}
            <div className="case-study-card__logo-wrap">
              <span 
                className="case-study-card__brand-logo"
                style={{ 
                  fontWeight: palette.fontWeight,
                  fontStyle: palette.fontStyle,
                  letterSpacing: palette.letterSpacing
                }}
              >
                {brandName}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Bottom Content Area */}
      <div className="case-study-card__body">
        <div className="case-study-card__meta">
          <span className="category-kicker">
            {study.tag ? study.tag.toUpperCase() : 'CREATOR-LED CAMPAIGN'} &bull; {study.year || '2026'}
          </span>
        </div>

        <h4 className="case-study-card__partner-title">
          {brandName.toUpperCase()}
        </h4>

        <h3 className="case-study-card__headline serif">
          {study.headline}
        </h3>

        {study.stats && study.stats.length > 0 && (
          <div className="case-study-card__stat-pills">
            {study.stats.slice(0, 3).map((st, sIdx) => (
              <span key={sIdx} className="stat-pill">
                <strong>{st.value}</strong> {st.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
