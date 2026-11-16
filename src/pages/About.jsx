import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useReveal } from '../hooks/useReveal';
import Section from '../components/layout/Section';
import SectionHeader from '../components/layout/SectionHeader';
import SubpageHeroBg from '../components/layout/SubpageHeroBg';
import '../styles/about-page.css';

const VALUES = [
  { title: 'Quality over quantity', desc: 'We don\'t believe in mass-blasting generic content. Every creator partnership is carefully curated for maximum relevance, cultural alignment, and measurable return.' },
  { title: 'Data-driven creativity', desc: 'Beautiful content is the prerequisite, but content that converts is the goal. We blend instinctive cultural storytelling with rigorous audience metrics.' },
  { title: 'Radical transparency', desc: 'No hidden markup fees, no opaque metrics, no bot followers. We build lasting trust through complete reporting clarity with both brands and creators.' },
  { title: 'Deep cultural fluency', desc: 'We understand the nuances of the Indian digital landscape, navigating hyper-local language affinities, regional micro-trends, and national conversations.' }
];

const STATS = [
  { value: '10+', label: 'Campaigns Delivered' },
  { value: '35M+', label: 'Audience Reach' },
  { value: '1000+', label: 'Creators in our Network' }
];

export default function About() {
  useReveal();

  return (
    <main className="about-page">
      <Helmet>
        <title>About Us | Aureus Creatives</title>
        <meta name="description" content="Learn about Aureus Creatives, a premier influencer marketing agency founded in India." />
      </Helmet>

      <Section variant="dark" className="about-hero subpage-hero" padded background={<SubpageHeroBg />}>
        <SectionHeader
          number="01"
          label="About Aureus"
          title="Redefining influence for the <em>modern brand</em>."
          subtitle="We were founded in India to bridge the gap between ambitious brand marketing and the dynamic creator economy."
        />

        <div className="about-cover reveal" data-d="2">
          <h2 className="serif">
            We architect <em>cultural moments</em> that move the needle.
          </h2>
          <p>
            Brands were chasing vanity metrics, while talented creators were being treated like static billboards.
            We created Aureus Creatives to build authentic, high-impact partnerships grounded in audience affinity,
            uncompromising production values, and commercial accountability.
          </p>
        </div>
      </Section>

      <Section variant="dark" className="about-approach">
        <SectionHeader
          number="02"
          label="Our Philosophy"
          title="The principles that guide <em>every campaign</em>."
          subtitle="A commitment to craft, integrity, and measurable business outcomes."
        />
        
        <div className="approach-grid">
          {VALUES.map((val, index) => (
            <div key={index} className="approach-card reveal" data-d={(index % 2) + 1}>
              <h3 className="serif">{val.title}</h3>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="dark" className="about-stats">
        <SectionHeader
          number="03"
          label="Cumulative Impact"
          title="Scale built on <em>verified trust</em>."
        />

        <div className="stats-bar reveal" data-d="1">
          {STATS.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
