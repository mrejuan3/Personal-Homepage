/**
 * flourish.js
 * Draws a looping pink line down the projects page as the user scrolls,
 * with a small heart riding at the tip of the line. As the line reaches
 * each project, the pen traces the card's pink frame and the card pops up.
 */

const LOOP_RADIUS = 11;
const LOOP_POSITIONS = [0.28, 0.62, 0.4, 0.7];
const MAX_SPEED = 12; // px of line drawn per frame, keeps a steady pen-like pace
const CATCH_UP_AFTER = 2500; // px behind before the pen speeds up (after a fast scroll)
const SAMPLES = 600;
const START_DELAY = 1700; // ms, lets the title finish writing itself first
const CARD_DELAY = 450; // ms between the frame starting to draw and the card popping up
const SVG_NS = 'http://www.w3.org/2000/svg';

// returns true when it handles revealing the project cards
export function initFlourish() {
  const main = document.querySelector('.projects-main');
  const svg = main?.querySelector('.flourish');
  if (!svg) return false;

  const line = svg.querySelector('.flourish-line');
  const heart = svg.querySelector('.flourish-heart');
  const cards = [...main.querySelectorAll('.project-card')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  cards.forEach(addFrame);
  if (reduceMotion) cards.forEach((card) => reveal(card, 0));

  let started = reduceMotion;
  setTimeout(() => {
    started = true;
    updateTarget();
  }, START_DELAY);

  let length = 0;
  let samples = [];
  let triggers = [];
  let drawn = 0;
  let target = 0;
  let frame = null;

  function build() {
    const box = main.getBoundingClientRect();
    const d = buildPath(main, box);
    if (!d) return;

    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    line.setAttribute('d', d);
    length = line.getTotalLength();
    line.style.strokeDasharray = `${length}`;
    samples = samplePath(line, length);
    triggers = cards.map((card) => [card, revealLength(card, box, samples)]);

    drawn = reduceMotion ? length : Math.min(drawn, length);
    render();
    updateTarget();
  }

  // how far down the page the line should reach for the current scroll position;
  // once drawn, the line stays drawn when scrolling back up
  function updateTarget() {
    if (reduceMotion || !started) return;
    const depth = window.innerHeight * 0.7 - main.getBoundingClientRect().top;
    const hit = samples.find((s) => s.deepest >= depth);
    const atBottom =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    const reach = atBottom || !hit ? length : hit.length;
    target = Math.min(Math.max(target, reach), length);
    if (!frame) frame = requestAnimationFrame(step);
  }

  // moves the tip toward the target at a steady pace, speeding up to catch up
  // after a fast scroll and slowing gently at the end
  function step() {
    const remaining = target - drawn;
    const speed = MAX_SPEED + Math.max(remaining - CATCH_UP_AFTER, 0) * 0.04;
    drawn += Math.min(speed, Math.max(remaining * 0.08, 1.5));
    if (drawn >= target - 0.5) drawn = target;
    render();
    frame = drawn === target ? null : requestAnimationFrame(step);
  }

  function render() {
    line.style.strokeDashoffset = `${length - drawn}`;
    const tip = line.getPointAtLength(drawn);
    heart.setAttribute('transform', `translate(${tip.x} ${tip.y})`);
    heart.style.opacity = drawn > 1 ? '1' : '0';

    triggers.forEach(([card, at]) => {
      if (drawn >= at) reveal(card, CARD_DELAY);
    });
  }

  new ResizeObserver(build).observe(main);
  window.addEventListener('scroll', updateTarget, { passive: true });
  return true;
}

// pink hairline frame behind each card, traced by the pen when the card is revealed
function addFrame(card) {
  const frame = document.createElementNS(SVG_NS, 'svg');
  frame.setAttribute('class', 'card-frame');
  frame.setAttribute('aria-hidden', 'true');
  const rect = document.createElementNS(SVG_NS, 'rect');
  rect.setAttribute('width', '100%');
  rect.setAttribute('height', '100%');
  rect.setAttribute('pathLength', '100');
  frame.append(rect);
  card.before(frame);
}

function reveal(card, delay) {
  const column = card.parentElement;
  if (column.classList.contains('traced')) return;
  column.classList.add('traced');
  setTimeout(() => card.classList.add('visible'), delay);
}

// length along the line where it passes closest to the top-center of a card,
// using only the part of the line above the card
function revealLength(card, box, samples) {
  const rect = card.parentElement.getBoundingClientRect();
  const cx = rect.left - box.left + rect.width / 2;
  const top = rect.top - box.top;
  let best = null;
  samples.forEach((s) => {
    if (s.y > top) return;
    const dist = Math.hypot(s.x - cx, (top - s.y) * 2);
    if (!best || dist < best.dist) best = { dist, length: s.length };
  });
  return best ? best.length : 0;
}

// builds a line that sweeps across the gaps between rows of cards,
// turns down the sides of the page, and makes a cursive loop on each sweep
function buildPath(main, box) {
  const top = (el) => el.getBoundingClientRect().top - box.top;
  const bottom = (el) => el.getBoundingClientRect().bottom - box.top;

  const title = main.querySelector('.projects-title');
  const grid = main.querySelector('.row');
  const columns = [...main.querySelectorAll('.project-card')].map((card) => card.parentElement);
  if (!title || !grid || !columns.length) return null;

  // group the cards into rows by their top edge
  const rows = [];
  columns.forEach((col) => {
    const colTop = top(col);
    const row = rows.find((r) => Math.abs(r.top - colTop) < 2);
    if (row) row.bottom = Math.max(row.bottom, bottom(col));
    else rows.push({ top: colTop, bottom: bottom(col) });
  });

  // heights of the sweeps: above the grid, between each row, below the grid
  const sweeps = [(bottom(title) + rows[0].top) / 2];
  for (let i = 1; i < rows.length; i++) {
    sweeps.push((rows[i - 1].bottom + rows[i].top) / 2);
  }
  sweeps.push(rows[rows.length - 1].bottom + 32);

  const margin = Math.max(0, grid.getBoundingClientRect().left - box.left);
  const inset = Math.min(Math.max(margin / 2, 14), 60);
  const bulge = inset * 0.85;
  const left = inset;
  const right = box.width - inset;
  const r = LOOP_RADIUS;
  const n = (v) => v.toFixed(1);

  let x = -10;
  let y = (top(title) + bottom(title)) / 2;
  let d = `M ${n(x)} ${n(y)}`;

  sweeps.forEach((sweepY, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    const endX = dir === 1 ? right : left;

    // rounded turn down the side of the page
    if (i > 0) {
      const sideX = x - dir * bulge;
      d += ` C ${n(sideX)} ${n(y)} ${n(sideX)} ${n(sweepY)} ${n(x)} ${n(sweepY)}`;
      y = sweepY;
    }

    // glide to the loop
    const loopX = x + (endX - x) * LOOP_POSITIONS[i % LOOP_POSITIONS.length];
    const lead = Math.abs(loopX - x) * 0.5;
    d += ` C ${n(x + dir * lead)} ${n(y)} ${n(loopX - dir * lead)} ${n(sweepY)} ${n(loopX)} ${n(sweepY)}`;

    // cursive loop above the line
    d += ` C ${n(loopX + dir * 1.2 * r)} ${n(sweepY)} ${n(loopX + dir * r)} ${n(sweepY - 2 * r)} ${n(loopX)} ${n(sweepY - 2 * r)}`;
    const exitX = loopX + dir * 0.4 * r;
    const exitY = sweepY + 0.4 * r;
    d += ` C ${n(loopX - dir * r)} ${n(sweepY - 2 * r)} ${n(loopX - dir * 0.6 * r)} ${n(exitY)} ${n(exitX)} ${n(exitY)}`;

    // glide to the side of the page
    const tail = Math.abs(endX - exitX) * 0.4;
    d += ` C ${n(exitX + dir * tail)} ${n(exitY)} ${n(endX - dir * tail)} ${n(sweepY)} ${n(endX)} ${n(sweepY)}`;

    x = endX;
    y = sweepY;
  });

  return d;
}

// points along the line, with the furthest point down the page reached so far
function samplePath(path, total) {
  const samples = [];
  let deepest = -Infinity;
  for (let i = 0; i <= SAMPLES; i++) {
    const length = (total * i) / SAMPLES;
    const { x, y } = path.getPointAtLength(length);
    deepest = Math.max(deepest, y);
    samples.push({ length, x, y, deepest });
  }
  return samples;
}
