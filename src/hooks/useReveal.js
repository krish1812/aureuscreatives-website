import { useEffect } from 'react';

/**
 * Sets up an IntersectionObserver that adds the 'in' class to every
 * element with className 'reveal' once it scrolls into view.
 * 
 * The [data-d="1|2|3|4"] attribute on .reveal elements adds staggered
 * transition-delay so sibling elements animate in sequence.
 * 
 * Call once in any page/layout component.
 */
export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
}
