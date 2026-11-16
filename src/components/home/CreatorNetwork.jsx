import React from 'react';
import Section from '../layout/Section';
import SectionHeader from '../layout/SectionHeader';
import { CREATOR_FACES } from '../../data/creators';
import '../../styles/creator-network.css';

const TONES = [
  'linear-gradient(135deg, #6A93B8, #4D7396)',
  'linear-gradient(135deg, #7A91A6, #5B7286)',
  'linear-gradient(135deg, #5E89AB, #446C8C)',
  'linear-gradient(135deg, #71899E, #546C80)',
  'linear-gradient(135deg, #658CAE, #4A7091)',
];

export default function CreatorNetwork() {
  return (
    <Section variant="light" className="creator-network" id="creators">
      <SectionHeader
        number="06"
        label="The Creator Network"
        title="India's most <em>compelling voices</em>."
        subtitle="Over 1000+ vetted creators across tech, lifestyle, beauty, finance, travel, and gaming. We cultivate authentic relationships with creators who hold genuine audience trust."
      />

      <div className="creator-row reveal" data-d="1">
        {CREATOR_FACES.map((creator, idx) => {
          const isUp = idx % 2 === 0;
          const initials = (creator.name || 'CR')
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
          const tone = TONES[idx % TONES.length];

          return (
            <div
              key={creator.id || idx}
              className={`creator-item ${isUp ? 'creator-item--up' : 'creator-item--down'}`}
            >
              <div className="creator-label">
                <span className="creator-name">{creator.name}</span>
                {creator.niche && <span className="creator-niche-pill">{creator.niche}</span>}
              </div>
              <div className="creator-line" aria-hidden="true" />
              <div className="creator-photo-wrapper" style={{ background: tone }}>
                {creator.photo ? (
                  <img
                    src={creator.photo}
                    alt={creator.name}
                    className="creator-img"
                    style={{ objectPosition: creator.objectPosition || 'center center' }}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.parentElement.querySelector('.creator-initials');
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                ) : null}
                <span
                  className="creator-initials serif"
                  style={{ display: creator.photo ? 'none' : 'block' }}
                >
                  {initials}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
