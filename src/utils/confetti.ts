// src/utils/confetti.ts
import confetti from 'canvas-confetti';

export function fireConfetti() {
  const count = 200;
  const defaults = { origin: { y: 0.7 } };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
  }

  fire(0.25, { spread: 26, startVelocity: 55, colors: ['#7C6FE9', '#34D399'] });
  fire(0.2, { spread: 60, colors: ['#7C6FE9', '#a78bfa'] });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#34D399', '#6ee7b7'] });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#FFD700', '#FFA500'] });
  fire(0.1, { spread: 120, startVelocity: 45, colors: ['#7C6FE9', '#34D399'] });
}
