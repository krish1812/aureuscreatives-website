import React from 'react';

export default function SubpageHeroBg() {
  return (
    <div className="subpage-hero-bg" aria-hidden="true">
      <div className="subpage-hero-bg__ambient" />
      <div className="subpage-hero-bg__beam subpage-hero-bg__beam--center" />
      <div className="subpage-hero-bg__beam subpage-hero-bg__beam--left" />
      <div className="subpage-hero-bg__beam subpage-hero-bg__beam--right" />
      <div className="subpage-hero-bg__vignette" />
    </div>
  );
}
