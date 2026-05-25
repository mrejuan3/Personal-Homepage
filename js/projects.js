/**
 * projects.js
 * Handles entrance animation for project cards using IntersectionObserver.
 */

export function initProjectCards() {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = [...cards].indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 90);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => observer.observe(card));
}
