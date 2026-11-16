import React from 'react';
import { HERO } from '../../data/siteContent';
import Button from '../ui/Button';
import '../../styles/hero.css';

export default function Hero() {
  const ctas = HERO.ctas || [];

  return (
    <section className="hero" id="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg__ambient" />
        <div className="hero-bg__beam hero-bg__beam--center" />
        <div className="hero-bg__beam hero-bg__beam--left" />
        <div className="hero-bg__beam hero-bg__beam--right" />
        <div className="hero-bg__floor" />
        <div className="hero-bg__vignette" />
      </div>

      <div className="hero-inner">
        <div className="hero-eyebrow reveal" data-d="1">
          <span className="dot" aria-hidden="true" />
          <span>{HERO.eyebrow}</span>
        </div>

        <h1 className="hero-title serif reveal" data-d="2">
          <span className="hero-title-line">Where brands find their voice.</span>
          <span className="hero-title-line">
            And creators <em>amplify it.</em>
          </span>
        </h1>

        <p className="hero-sub reveal" data-d="3">
          We don't just do &ldquo;influencer marketing.&rdquo;
          <br className="hero-sub-break" />
          We build brand influence through creators who own distribution.
        </p>

        <div className="hero-ctas reveal" data-d="4">
          <Button
            to="/work"
            variant="primary"
            className="btn-primary--blue"
          >
            See Our Work
          </Button>
          <Button
            to="/contact"
            variant="primary"
            className="btn-primary--blue"
          >
            Work With Us
          </Button>
        </div>
      </div>
    </section>
  );
}
