import React from 'react';
import Section from '../layout/Section';
import SectionHeader from '../layout/SectionHeader';
import Button from '../ui/Button';
import { SERVICES } from '../../data/services';
import '../../styles/services-overview.css';

export default function ServicesOverview() {
  const displayedServices = SERVICES.slice(0, 4);
  const romanNumerals = ['I', 'II', 'III', 'IV'];

  return (
    <Section variant="dark" className="services-overview" id="services">
      <SectionHeader
        number="03"
        label="What We Do"
        title="End-to-end management for <em>category leaders</em>."
        subtitle="From strategic creator discovery to contracting, creative briefing, and post-campaign analytics — we manage every touchpoint so your team doesn't have to."
      />

      <div className="services-grid">
        {displayedServices.map((service, idx) => (
          <div key={service.id || idx} className="service-card reveal" data-d={idx + 1}>
            <div className="service-card__num serif">{romanNumerals[idx]}</div>
            <h3 className="service-card__title serif">{service.title}</h3>
            <p className="service-card__desc">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="services-action reveal" data-d="5">
        <Button to="/services" variant="primary" className="btn-primary--blue">
          See all services
        </Button>
      </div>
    </Section>
  );
}
