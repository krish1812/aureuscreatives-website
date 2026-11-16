import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useReveal } from '../hooks/useReveal';
import Section from '../components/layout/Section';
import SectionHeader from '../components/layout/SectionHeader';
import Button from '../components/ui/Button';
import SubpageHeroBg from '../components/layout/SubpageHeroBg';
import '../styles/for-brands-page.css';

const PROCESS_STEPS = [
  { title: 'The Brief', desc: 'We start by deeply understanding your brand, target audience, and campaign objectives.' },
  { title: 'The Strategy', desc: 'We build a custom plan and handpick creators who align with your goals and brand voice.' },
  { title: 'The Execution', desc: 'We manage everything—negotiations, content approvals, and publishing schedules.' },
  { title: 'The Results', desc: 'You receive comprehensive reporting on reach, engagement, and campaign ROI.' }
];

const DELIVERABLES = [
  { title: 'Custom Creator Shortlist', desc: 'A curated list of vetted creators who match your brand criteria perfectly.' },
  { title: 'Full Content Rights', desc: 'Negotiated usage rights for your brand\'s owned and paid channels.' },
  { title: 'End-to-End Management', desc: 'A dedicated account manager handling all communication and logistics.' },
  { title: 'Detailed Performance Report', desc: 'Post-campaign analytics breaking down every key metric.' }
];

export default function ForBrands() {
  useReveal();

  return (
    <main className="for-brands-page">
      <Helmet>
        <title>For Brands | Aureus Creatives</title>
        <meta name="description" content="Partner with Aureus Creatives to connect with the right creators for your brand." />
      </Helmet>

      <Section variant="dark" className="for-brands-hero subpage-hero" padded background={<SubpageHeroBg />}>
        <SectionHeader
          number="01"
          label="For Brands"
          title="The <em>right creators</em> for your brand."
          subtitle="We help you navigate the creator economy with data-driven strategy and authentic partnerships that drive actual business results."
        />
      </Section>

      <Section variant="dark" className="for-brands-process">
        <SectionHeader
          number="02"
          label="How We Work"
          title="From brief to <em>impact</em>."
          subtitle="A streamlined four-step workflow designed to protect your time and maximize ROI."
        />
        
        <div className="process-grid">
          {PROCESS_STEPS.map((step, index) => (
            <div key={index} className="process-step reveal" data-d={index + 1}>
              <span className="step-number serif">{index + 1}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="dark" className="deliverables-section">
        <SectionHeader
          number="03"
          label="Deliverables"
          title="Everything you need for a <em>successful campaign</em>."
          subtitle="Clear deliverables, no hidden surprises, and complete accountability from kickoff to post-campaign debrief."
        />
        
        <div className="deliverables-grid">
          {DELIVERABLES.map((item, index) => (
            <div key={index} className="deliverable-item reveal" data-d={(index % 2) + 1}>
              <div className="deliverable-icon serif">{index + 1}</div>
              <div className="deliverable-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="dark" className="brands-cta-section">
        <div className="brands-cta-content reveal" data-d="1">
          <h2 className="brands-cta-title serif">Ready to reach the <em>right audience</em>?</h2>
          <p className="brands-cta-sub">Let's discuss your next campaign brief and assemble your custom creator shortlist.</p>
          <Button to="/contact?role=brand" variant="primary" className="btn-primary--blue">
            Start your campaign
          </Button>
        </div>
      </Section>
    </main>
  );
}
