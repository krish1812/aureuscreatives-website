import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useReveal } from '../hooks/useReveal';
import Section from '../components/layout/Section';
import SectionHeader from '../components/layout/SectionHeader';
import CaseStudyCard from '../components/work/CaseStudyCard';
import SubpageHeroBg from '../components/layout/SubpageHeroBg';
import { CASE_STUDIES } from '../data/caseStudies';
import '../styles/work-page.css';

export default function Work() {
  useReveal();

  return (
    <main className="work-page">
      <Helmet>
        <title>Our Work | Aureus Creatives</title>
        <meta name="description" content="Explore our portfolio of successful influencer marketing campaigns for top brands in India." />
      </Helmet>

      <Section variant="dark" className="work-page-section subpage-hero" padded background={<SubpageHeroBg />}>

        <SectionHeader
          number="01"
          label="Campaign Portfolio"
          title="Campaigns that <em>deliver</em>."
          subtitle="We build authentic, high-impact connections between brands and audiences through data-driven creator partnerships."
        />

        <div className="work-grid">
          {CASE_STUDIES.map((study, index) => (
            <CaseStudyCard key={study.id || index} study={study} index={index} />
          ))}
        </div>
      </Section>
    </main>
  );
}
