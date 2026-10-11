import { initProjectCards } from './projects.js';
import { initFlourish } from './flourish.js';

document.addEventListener('DOMContentLoaded', () => {
  // the looping line reveals the cards itself; otherwise fade them in on scroll
  if (!initFlourish()) initProjectCards();
});
