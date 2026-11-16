import React, { useRef, useEffect, useState } from 'react';
import { HOME_STATS } from '../../data/stats';
import { useCountUp } from '../../hooks/useCountUp';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useDockWave } from '../../hooks/useDockMagnification';
import '../../styles/stats.css';

export default function StatsShowcase() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 900px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const statsGridRef = useDockWave({
    childSelector: '.stat-card-wrap',
    maxScale: 1.15,
    radius: 560,
    maxLift: 16,
    direction: 'x',
    exponent: 1.2,
  });

  useEffect(() => {
    // Check if already in viewport on mount
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setInView(true);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="stats-showcase"
    >
      <div 
        ref={statsGridRef} 
        className={`stats-grid reveal ${inView ? 'in' : ''}`} 
        data-d="1"
      >
        {HOME_STATS.map((stat, idx) => (
          <div 
            key={idx} 
            className="stat-card-wrap dock-item"
          >
            <StatCard 
              stat={stat} 
              idx={idx} 
              inView={inView} 
              isMobile={isMobile}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ stat, idx, inView, isMobile, prefersReducedMotion }) {
  const rawCount = useCountUp(
    stat.value,
    inView,
    prefersReducedMotion ? 0 : 1800,
    idx * 160
  );
  const count = Math.round(rawCount);
  
  const isMiddle = idx === 1;
  const cardClass = `stat-card ${isMiddle ? 'stat-card--middle' : 'stat-card--outer'}`;
  const tilt = isMobile ? '0deg' : `${stat.tilt || (idx === 0 ? -4 : idx === 2 ? 4 : 0)}deg`;
  
  return (
    <div className={cardClass} style={{ '--tilt': tilt }}>
      <div className="stat-number">
        {count}{stat.suffix}
      </div>
      <h3 className="stat-heading">{stat.heading}</h3>
      <div className="stat-divider"></div>
      <p className="stat-sub">{stat.sub || stat.subText}</p>
    </div>
  );
}
