import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useReveal } from '../hooks/useReveal';
import Section from '../components/layout/Section';
import SectionHeader from '../components/layout/SectionHeader';
import Button from '../components/ui/Button';
import SubpageHeroBg from '../components/layout/SubpageHeroBg';
import '../styles/for-creators-page.css';

const OFFERS = [
  { title: 'Fair Rates & Fast Payments', desc: 'We negotiate the best market rates for your creative work and guarantee on-time payment cycles with zero chasing.' },
  { title: 'Genuine Brand Partnerships', desc: 'We partner you with brands that genuinely align with your aesthetic, niche, and community values—no awkward briefs.' },
  { title: 'Creative Autonomy', desc: 'You know your audience best. We protect your editorial voice so content feels native, engaging, and unforced.' }
];

const CREATOR_TYPES = [
  'Lifestyle & Fashion',
  'Tech & Consumer Electronics',
  'Beauty & Skincare',
  'Food, Dining & Travel',
  'Personal Finance & Fintech',
  'Gaming, Esports & Anime',
  'Health, Wellness & Fitness',
  'Career, Growth & Productivity'
];

export default function ForCreators() {
  useReveal();

  return (
    <main className="for-creators-page">
      <Helmet>
        <title>For Creators | Aureus Creatives</title>
        <meta name="description" content="Join the Aureus network to partner with premium brands and grow your creator business." />
      </Helmet>

      <Section variant="dark" className="for-creators-hero subpage-hero" padded background={<SubpageHeroBg />}>
        <SectionHeader
          number="01"
          label="For Creators"
          title="Partner with <em>brands that matter</em>."
          subtitle="We represent leading digital voices and connect them with ambitious brands for impactful, respectful, and well-compensated campaigns."
        />
      </Section>

      <Section variant="dark" className="creators-offer-section">
        <SectionHeader
          number="02"
          label="What We Offer"
          title="We put <em>creators first</em>."
          subtitle="A transparent agency partnership designed to support your creative vision and grow your career sustainably."
        />
        
        <div className="offer-grid">
          {OFFERS.map((offer, index) => (
            <div key={index} className="offer-card reveal" data-d={index + 1}>
              <span className="offer-index serif">0{index + 1}</span>
              <h3 className="offer-title">{offer.title}</h3>
              <p className="offer-desc">{offer.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="dark" className="creators-types-section">
        <SectionHeader
          number="03"
          label="Verticals & Niches"
          title="Representing voices across <em>every cultural niche</em>."
          subtitle="Whether you command a hyper-engaged micro-community or reach millions daily, there is a place for your craft at Aureus."
        />
        
        <div className="types-grid">
          {CREATOR_TYPES.map((type, index) => (
            <div key={index} className="type-item reveal" data-d={(index % 4) + 1}>
              <span className="type-dot" aria-hidden="true" />
              <h3>{type}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="dark" className="creators-cta-section">
        <div className="creators-cta-content reveal" data-d="1">
          <h2 className="creators-cta-title serif">Ready to take your content to the <em>next level</em>?</h2>
          <p className="creators-cta-sub">Apply to join our curated network. We review portfolios on a rolling weekly basis.</p>
          <Button to="/contact?role=creator" variant="primary" className="btn-primary--blue">
            Apply to join the network
          </Button>
        </div>
      </Section>
    </main>
  );
}
