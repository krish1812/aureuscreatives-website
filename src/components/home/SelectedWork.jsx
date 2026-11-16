import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../layout/Section';
import SectionHeader from '../layout/SectionHeader';
import Button from '../ui/Button';
import CaseStudyCard from '../work/CaseStudyCard';
import { CASE_STUDIES } from '../../data/caseStudies';
import '../../styles/selected-work.css';

export default function SelectedWork() {
  const displayedWorks = CASE_STUDIES.slice(0, 3);

  return (
    <Section variant="dark" className="selected-work" id="work">
      <Link to="/work" className="selected-work__header-link" aria-label="View all case studies">
        <SectionHeader
          number="05"
          label="Selected Work"
          title="Work that captures <em>culture & converts</em>."
          subtitle="Explore how we partner with category-defining brands to create influencer campaigns that cut through the noise and deliver measurable commercial results."
        />
      </Link>

      <div className="work-grid">
        {displayedWorks.map((work, idx) => (
          <CaseStudyCard key={work.id || idx} study={work} index={idx} />
        ))}
      </div>

      <div className="work-action reveal" data-d="4">
        <Button to="/work" variant="primary" className="btn-primary--blue">
          See all work
        </Button>
      </div>
    </Section>
  );
}
