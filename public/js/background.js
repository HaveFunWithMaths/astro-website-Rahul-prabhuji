/**
 * Cosmic Background & Starfield Parallax Canvas
 * High-performance canvas rendering multi-tier starfields, constellations, and nebulae.
 */

class CosmicBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.constellations = [];
    this.numStars = 220;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollY = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX - window.innerWidth / 2) * 0.04;
      this.mouse.targetY = (e.clientY - window.innerHeight / 2) * 0.04;
    });
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY * 0.15;
    });

    this.generateStars();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.generateStars();
  }

  generateStars() {
    this.stars = [];
    const count = Math.floor((this.canvas.width * this.canvas.height) / 5500);

    for (let i = 0; i < count; i++) {
      const isGold = Math.random() < 0.18;
      const isCyan = Math.random() < 0.12;
      let color = 'rgba(248, 250, 252, ';
      if (isGold) color = 'rgba(245, 208, 97, ';
      else if (isCyan) color = 'rgba(56, 189, 248, ';

      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        baseY: Math.random() * this.canvas.height,
        radius: Math.random() * 1.6 + 0.3,
        alpha: Math.random() * 0.7 + 0.3,
        baseAlpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        colorBase: color,
        layer: Math.random() * 2 + 0.5, // Parallax depth layer
      });
    }
  }

  drawConstellations() {
    const maxDist = 110;
    this.ctx.lineWidth = 0.5;

    for (let i = 0; i < this.stars.length; i += 3) {
      for (let j = i + 1; j < this.stars.length; j += 4) {
        const dx = this.stars[i].x - this.stars[j].x;
        const dy = this.stars[i].y - this.stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.14;
          this.ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
          this.ctx.beginPath();
          this.ctx.moveTo(this.stars[i].x, this.stars[i].y);
          this.ctx.lineTo(this.stars[j].x, this.stars[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Smooth mouse interpolation
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Draw constellation connecting lines
    this.drawConstellations();

    // Draw Stars
    for (let star of this.stars) {
      star.twinklePhase += star.twinkleSpeed;
      const twinkle = Math.sin(star.twinklePhase) * 0.35 + 0.65;
      const currentAlpha = star.baseAlpha * twinkle;

      // Parallax coordinate adjustments
      const px = star.x + this.mouse.x * star.layer;
      let py = (star.baseY - this.scrollY * star.layer) % this.canvas.height;
      if (py < 0) py += this.canvas.height;

      star.y = py;

      this.ctx.fillStyle = `${star.colorBase}${currentAlpha})`;
      this.ctx.beginPath();
      this.ctx.arc(px, py, star.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Subtle glow for larger stars
      if (star.radius > 1.3) {
        this.ctx.fillStyle = `${star.colorBase}${currentAlpha * 0.25})`;
        this.ctx.beginPath();
        this.ctx.arc(px, py, star.radius * 2.8, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CosmicBackground('cosmic-canvas');
});
