import React from 'react';
import Section from '../layout/Section';
import SectionHeader from '../layout/SectionHeader';
import { TESTIMONIALS } from '../../data/testimonials';
import '../../styles/testimonials.css';

export default function Testimonials() {
  return (
    <Section variant="dark" className="testimonials" id="testimonials">
      <SectionHeader
        number="07"
        label="Partner Perspectives"
        title="Trusted by <em>ambitious teams</em>."
        subtitle="What brand directors, CMOs, and top creators have to say about partnering with Aureus Creatives."
      />

      <div className="testimonials-grid">
        {TESTIMONIALS.map((testimonial, idx) => {
          const name = testimonial.name || testimonial.author || 'Partner';
          const initial = testimonial.initial || name.charAt(0) || 'A';

          return (
            <div key={testimonial.id || idx} className="testimonial-card reveal" data-d={idx + 1}>
              <div className="testimonial-card__quote-mark serif" aria-hidden="true">&ldquo;</div>
              <blockquote 
                className="testimonial-card__quote" 
                dangerouslySetInnerHTML={{ __html: testimonial.quote }} 
              />
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar serif">
                  {initial}
                </div>
                <div className="testimonial-card__meta">
                  <div className="testimonial-card__name">{name}</div>
                  <div className="testimonial-card__role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
