import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useReveal } from '../hooks/useReveal';
import Section from '../components/layout/Section';
import SubpageHeroBg from '../components/layout/SubpageHeroBg';
import Button from '../components/ui/Button';
import { CASE_STUDIES } from '../data/caseStudies';
import '../styles/case-study-page.css';

const BRAND_PALETTES = {
  Nivea: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(0, 50, 160, 0.32) 0%, rgba(10, 11, 16, 0.96) 75%)',
    accent: '#0032A0',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '0.04em',
  },
  'TRESemmé': {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(212, 175, 55, 0.24) 0%, rgba(10, 11, 16, 0.96) 75%)',
    accent: '#D4AF37',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '0.06em',
  },
  Tresemme: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(212, 175, 55, 0.24) 0%, rgba(10, 11, 16, 0.96) 75%)',
    accent: '#D4AF37',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '0.06em',
  },
  Philips: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(11, 94, 215, 0.28) 0%, rgba(10, 11, 16, 0.96) 75%)',
    accent: '#0B5ED7',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '0.08em',
  },
  Phillips: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(11, 94, 215, 0.28) 0%, rgba(10, 11, 16, 0.96) 75%)',
    accent: '#0B5ED7',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '0.08em',
  },
  Wobble: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(139, 92, 246, 0.26) 0%, rgba(10, 11, 16, 0.96) 75%)',
    accent: '#8B5CF6',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '-0.01em',
  },
  Mahindra: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(220, 38, 38, 0.24) 0%, rgba(10, 11, 16, 0.96) 75%)',
    accent: '#DC2626',
    fontStyle: 'italic',
    fontWeight: '800',
    letterSpacing: '0.02em',
  },
  ShineXpro: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(6, 182, 212, 0.24) 0%, rgba(10, 11, 16, 0.96) 75%)',
    accent: '#06B6D4',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '0.05em',
  },
  TV9: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(219, 0, 0, 0.24) 0%, rgba(10, 11, 16, 0.96) 75%)',
    accent: '#DB0000',
    fontStyle: 'normal',
    fontWeight: '900',
    letterSpacing: '0.08em',
  },
  GMR: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(0, 57, 116, 0.28) 0%, rgba(10, 11, 16, 0.96) 75%)',
    accent: '#FAAB53',
    fontStyle: 'normal',
    fontWeight: '900',
    letterSpacing: '0.12em',
  },
  Zarva: {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(236, 72, 153, 0.24) 0%, rgba(10, 11, 16, 0.96) 75%)',
    accent: '#EC4899',
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: '0.06em',
  },
};

export default function CaseStudyDetail() {
  useReveal();
  const { slug } = useParams();

  const study = CASE_STUDIES.find(
    (s) => s.slug === slug || s.id === slug || s.brand.toLowerCase() === slug?.toLowerCase()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!study) {
    return <Navigate to="/work" replace />;
  }

  const brandName = study.brand;
  const palette = BRAND_PALETTES[brandName] || {
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(16, 54, 125, 0.3) 0%, rgba(10, 11, 16, 0.96) 75%)',
    accent: '#74B4D9',
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: '0em',
  };

  const nextStudy = study.nextStudy
    ? CASE_STUDIES.find((s) => s.slug === study.nextStudy.slug) || CASE_STUDIES[0]
    : CASE_STUDIES[0];

  return (
    <main className="case-study-page">
      <Helmet>
        <title>{`${brandName} Case Study | Aureus Creatives`}</title>
        <meta name="description" content={study.headline} />
      </Helmet>

      {/* Hero Section */}
      <Section variant="dark" className="cs-detail-hero" padded background={<SubpageHeroBg />}>
        {/* Back Link */}
        <div className="cs-back-nav reveal" data-d="1">
          <Link to="/work" className="cs-back-link">
            <span className="arr">←</span>
            <span>All Case Studies</span>
          </Link>
        </div>

        {/* Eyebrow */}
        <div className="cs-hero-eyebrow reveal" data-d="1">
          <span className="num">01</span>
          <span>Case Study &bull; {brandName}</span>
          <span className="line" />
        </div>

        {/* Headline */}
        <h1 className="cs-hero-title serif reveal" data-d="2">
          {study.headline}
        </h1>

        {/* Lede Subtitle */}
        <p className="cs-hero-lede reveal" data-d="3">
          {study.lede || study.subtitle}
        </p>

        {/* Meta Strip */}
        <div className="cs-meta-strip reveal" data-d="4">
          <div className="cs-meta-cell">
            <span className="label">Brand</span>
            <span className="value"><em>{brandName}</em></span>
          </div>
          <div className="cs-meta-cell">
            <span className="label">Discipline</span>
            <span className="value">{study.discipline || study.tag}</span>
          </div>
          <div className="cs-meta-cell">
            <span className="label">Timeline</span>
            <span className="value">{study.year || '2026'}</span>
          </div>
          <div className="cs-meta-cell">
            <span className="label">Platforms</span>
            <span className="value">{study.platforms?.join(' · ') || 'Instagram · YouTube'}</span>
          </div>
        </div>

        {/* Visual Showcase Banner */}
        <div className="cs-visual-showcase reveal" data-d="4">
          <div 
            className={`cs-visual-banner ${study.bannerImage ? 'cs-visual-banner--has-image' : ''}`} 
            style={{ background: palette.bg }}
          >
            {study.bannerImage ? (
              <>
                <img 
                  src={study.bannerImage} 
                  alt={`${brandName} Campaign Banner`}
                  className="cs-visual-banner__img"
                />
                <div className="cs-visual-banner__overlay" aria-hidden="true" />
                <div className="cs-visual-banner__crosshairs" aria-hidden="true">
                  <span className="ch" style={{ top: 0, left: 0 }}>+</span>
                  <span className="ch" style={{ top: 0, right: 0 }}>+</span>
                  <span className="ch" style={{ bottom: 0, left: 0 }}>+</span>
                  <span className="ch" style={{ bottom: 0, right: 0 }}>+</span>
                </div>
              </>
            ) : (
              <>
                <div className="cs-visual-banner__grid" aria-hidden="true" />
                <div className="cs-visual-banner__crosshairs" aria-hidden="true">
                  <span className="ch" style={{ top: 0, left: 0 }}>+</span>
                  <span className="ch" style={{ top: 0, right: 0 }}>+</span>
                  <span className="ch" style={{ bottom: 0, left: 0 }}>+</span>
                  <span className="ch" style={{ bottom: 0, right: 0 }}>+</span>
                </div>

                <div className="cs-visual-center">
                  <span
                    className="cs-visual-wordmark"
                    style={{
                      fontWeight: palette.fontWeight,
                      fontStyle: palette.fontStyle,
                      letterSpacing: palette.letterSpacing,
                    }}
                  >
                    {brandName}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 01. The Brief */}
        {study.brief && (
          <div className="cs-editorial-sec reveal" data-d="1">
            <div className="cs-editorial-grid">
              <div className="cs-editorial-sidebar">
                <span className="cs-sec-num">01</span>
                <h2 className="cs-sec-heading serif">The <em>Brief</em></h2>
              </div>
              <div className="cs-editorial-body">
                {study.brief.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 02. What Success Looked Like */}
        {study.success && (
          <div className="cs-editorial-sec reveal" data-d="2">
            <div className="cs-editorial-grid">
              <div className="cs-editorial-sidebar">
                <span className="cs-sec-num">02</span>
                <h2 className="cs-sec-heading serif">Success Looked <em>Like</em></h2>
              </div>
              <div className="cs-editorial-body">
                <ul className="cs-bullet-list">
                  {study.success.map((item, i) => (
                    <li key={i} className="cs-bullet-item">
                      <span className="cs-bullet-dot" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 03. The Aureus Playbook */}
        {study.playbook && (
          <div className="cs-editorial-sec reveal" data-d="2">
            <div className="cs-editorial-grid">
              <div className="cs-editorial-sidebar">
                <span className="cs-sec-num">03</span>
                <h2 className="cs-sec-heading serif">The Aureus <em>Playbook</em></h2>
              </div>
              <div className="cs-editorial-body">
                {study.playbook.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 04. The Commercial Impact */}
        {study.stats && study.stats.length > 0 && (
          <div className="cs-editorial-sec reveal" data-d="3">
            <div className="cs-editorial-grid">
              <div className="cs-editorial-sidebar">
                <span className="cs-sec-num">04</span>
                <h2 className="cs-sec-heading serif">The <em>Impact</em></h2>
              </div>
              <div>
                <div className="cs-impact-grid">
                  {study.stats.map((st, i) => (
                    <div key={i} className="cs-impact-card">
                      <div className="cs-impact-val">{st.value}</div>
                      <div className="cs-impact-label">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 05. Campaign Deliverables */}
        {study.deliverables && study.deliverables.length > 0 && (
          <div className="cs-editorial-sec reveal" data-d="3">
            <div className="cs-editorial-grid">
              <div className="cs-editorial-sidebar">
                <span className="cs-sec-num">05</span>
                <h2 className="cs-sec-heading serif">Campaign <em>Deliverables</em></h2>
              </div>
              <div className="cs-deliverables-wrap">
                {study.deliverables.map((item, i) => (
                  <span key={i} className="cs-deliverable-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 06. Why It Worked */}
        {study.whyItWorked && (
          <div className="cs-editorial-sec reveal" data-d="4">
            <div className="cs-editorial-grid">
              <div className="cs-editorial-sidebar">
                <span className="cs-sec-num">06</span>
                <h2 className="cs-sec-heading serif">Why It <em>Worked</em></h2>
              </div>
              <div className="cs-editorial-body">
                {study.whyItWorked.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Outro / Next Case Study CTA */}
        <div className="cs-outro-sec reveal" data-d="4">
          <div className="cs-outro-box">
            <div>
              <h2 className="cs-outro-heading serif">
                Great campaigns start with the <em>right creators</em>.
              </h2>
              <p className="cs-outro-sub">
                Ready to turn authentic creator influence into measurable business growth?
              </p>
            </div>

            <div className="cs-outro-actions">
              {nextStudy && (
                <Link to={`/work/${nextStudy.slug}`} className="cs-next-study-pill">
                  <div className="next-label">
                    <span className="kicker">Next Case Study</span>
                    <span className="next-title">{nextStudy.brand}</span>
                  </div>
                  <span className="arr">→</span>
                </Link>
              )}

              <div className="cs-button-row">
                <Button to="/work" variant="ghost">
                  See All Work
                </Button>
                <Button to="/contact" variant="primary" className="btn-primary--blue">
                  Start a Project
                </Button>
              </div>
            </div>
          </div>
        </div>

      </Section>
    </main>
  );
}
