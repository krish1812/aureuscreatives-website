import React from 'react';
import Section from '../layout/Section';
import Button from '../ui/Button';
import { DUAL_CTA } from '../../data/siteContent';
import '../../styles/dual-cta.css';

export default function DualCTA() {
  const brandsTitle = DUAL_CTA.brands.title || 'Ready to reach the right audience?';
  const creatorsTitle = DUAL_CTA.creators.title || 'Join our creator network.';
  const brandsCtaLabel = DUAL_CTA.brands.cta.label || 'Start a Campaign';
  const creatorsCtaLabel = DUAL_CTA.creators.cta.label || 'Apply Now';

  return (
    <Section variant="light" className="dual-cta" id="start">
      <div className="dual-cta__grid">
        <div className="cta-card cta-card--brands reveal" data-d="1">
          <div className="cta-card__eyebrow">{DUAL_CTA.brands.eyebrow}</div>
          <h3 className="cta-card__headline serif">{brandsTitle}</h3>
          <ul className="cta-card__points">
            {DUAL_CTA.brands.points.map((point, idx) => (
              <li key={idx}>
                <span className="dot dot--blue" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="cta-card__button">
            <Button
              to={DUAL_CTA.brands.cta.href}
              variant="primary"
              className="btn-primary--blue"
            >
              {brandsCtaLabel}
            </Button>
          </div>
        </div>

        <div className="cta-card cta-card--creators reveal" data-d="2">
          <div className="cta-card__eyebrow">{DUAL_CTA.creators.eyebrow}</div>
          <h3 className="cta-card__headline serif">{creatorsTitle}</h3>
          <ul className="cta-card__points">
            {DUAL_CTA.creators.points.map((point, idx) => (
              <li key={idx}>
                <span className="dot dot--gold" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="cta-card__button">
            <Button
              to={DUAL_CTA.creators.cta.href}
              variant="primary"
              className="btn-primary--blue"
            >
              {creatorsCtaLabel}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
