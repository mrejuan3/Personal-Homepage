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

  /* Example code of what I did for animation */
  function typewriteTagLine() {
  const tagline = document.querySelector(".hero-tagline");
  if (!tagline) return;

  const fullText = tagline.textContent.trim();
  tagline.textContent = "";

  let i = 0;
  const interval = setInterval(() => {
    tagline.textContent += fullText[i];
    i += 1;
    if (i >= fullText.length) clearInterval(interval);
  }, 25); // 25ms per character

  /* End of example of what I did for animation

  cards.forEach((card) => observer.observe(card));
}
