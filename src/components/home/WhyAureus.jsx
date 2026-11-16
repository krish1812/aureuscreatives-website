import React from 'react';
import Section from '../layout/Section';
import SectionHeader from '../layout/SectionHeader';
import { WHY_AUREUS } from '../../data/siteContent';
import '../../styles/why-aureus.css';

export default function WhyAureus() {
  const headline = WHY_AUREUS.title || 'We go beyond follower counts.';
  const subtitle = WHY_AUREUS.subtitle || 'Six things we evaluate before matching any creator with your brand.';

  return (
    <Section variant="light" className="why-aureus" id="why-aureus">
      <SectionHeader
        number={WHY_AUREUS.label?.number || '04'}
        label={WHY_AUREUS.label?.text || 'The Aureus Standard'}
        title="We evaluate what <em>actually</em> moves the needle."
        subtitle="Follower counts can be bought or inflated. Real cultural influence cannot. We assess six core pillars before recommending any creator for your campaign."
      />

      <div className="why-aureus__content">
        <div className="why-aureus__left reveal" data-d="1">
          <div className="why-aureus__framework-pill">
            Evaluation Matrix
          </div>
          <h3 className="why-aureus__headline serif">
            {headline.replace('follower counts', '')}<em>follower counts.</em>
          </h3>
          <p className="why-aureus__sub">{subtitle}</p>
        </div>

        <div className="why-aureus__right">
          {WHY_AUREUS.points.map((point, idx) => {
            const num = (idx + 1).toString().padStart(2, '0');
            return (
              <div key={idx} className="why-point reveal" data-d={(idx % 3) + 1}>
                <span className="why-point__num serif">{num}</span>
                <div className="why-point__body">
                  <h4 className="why-point__title">{point.title}</h4>
                  <p className="why-point__desc">{point.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
