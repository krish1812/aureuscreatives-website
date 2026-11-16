import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useReveal } from '../hooks/useReveal';
import Section from '../components/layout/Section';
import SectionHeader from '../components/layout/SectionHeader';
import Button from '../components/ui/Button';
import SubpageHeroBg from '../components/layout/SubpageHeroBg';
import { SERVICES } from '../data/services';
import '../styles/services-page.css';

export default function Services() {
  useReveal();

  return (
    <main className="services-page">
      <Helmet>
        <title>Our Services | Aureus Creatives</title>
        <meta name="description" content="End-to-end influencer marketing services for top brands. Strategy, creator sourcing, management, and reporting." />
      </Helmet>

      <Section variant="dark" className="services-hero subpage-hero" padded background={<SubpageHeroBg />}>
        <SectionHeader
          number="01"
          label="Our Services"
          title="Everything your campaign needs. <em>One team</em>."
          subtitle="From finding the right creator to reporting the final numbers — we handle the entire influencer marketing process so you don't have to."
        />
      </Section>

      <Section variant="light" className="services-grid-section">
        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <div key={service.id || index} className="service-item reveal" data-d={(index % 2 === 0) ? "1" : "2"}>
              <span className="service-number serif">{service.number}.</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="services-cta-wrapper reveal" data-d="1">
          <h2 className="services-cta-text serif">Ready to start your <em>next campaign</em>?</h2>
          <Button to="/contact" variant="primary" className="btn-primary--blue">
            Start a project
          </Button>
        </div>
      </Section>
    </main>
  );
}
