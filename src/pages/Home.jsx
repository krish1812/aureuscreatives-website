import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useReveal } from '../hooks/useReveal';
import Hero from '../components/home/Hero';
import TrustedBy from '../components/home/TrustedBy';
import StatsShowcase from '../components/home/StatsShowcase';
import ServicesOverview from '../components/home/ServicesOverview';
import WhyAureus from '../components/home/WhyAureus';
import SelectedWork from '../components/home/SelectedWork';
import CreatorNetwork from '../components/home/CreatorNetwork';
import DualCTA from '../components/home/DualCTA';
import Testimonials from '../components/home/Testimonials';

export default function Home() {
  useReveal();

  return (
    <main>
      <Helmet>
        <title>Aureus Creatives | Premium Influencer Marketing Agency</title>
        <meta name="description" content="Aureus Creatives connects top brands with India's most impactful creators to build campaigns that deliver real results." />
      </Helmet>
      
      <Hero />
      <TrustedBy />
      <StatsShowcase />
      <ServicesOverview />
      <WhyAureus />
      <SelectedWork />
      <CreatorNetwork />
      <Testimonials />
      <DualCTA />
    </main>
  );
}
