import { useEffect, useRef } from 'react';

interface Star {
  x: number; y: number; radius: number; alpha: number;
  twinkleSpeed: number; twinklePhase: number; color: string;
}

interface ShootingStar {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; trail: { x: number; y: number }[];
  color: string;
}

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const starColors = ['#ffffff', '#ffe4c4', '#c4d4ff', '#ffd700', '#00f0ff', '#ff9ff3', '#88ccff', '#ffaacc'];
    const stars: Star[] = Array.from({ length: 250 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.04 + 0.008,
      twinklePhase: Math.random() * Math.PI * 2,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    const shootingStars: ShootingStar[] = [];
    let time = 0;

    const animate = () => {
      // Deep navy/black space
      ctx.fillStyle = '#010409';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Colorful nebula blobs - bigger and brighter
      const nebulaData = [
        { x: canvas.width * 0.15, y: canvas.height * 0.25, r: 300, color: '#1a0a3e' },
        { x: canvas.width * 0.75, y: canvas.height * 0.55, r: 350, color: '#0a1a3e' },
        { x: canvas.width * 0.5, y: canvas.height * 0.85, r: 250, color: '#1e0a2e' },
        { x: canvas.width * 0.85, y: canvas.height * 0.15, r: 200, color: '#0a2e2e' },
      ];
      nebulaData.forEach(n => {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        grad.addColorStop(0, n.color);
        grad.addColorStop(0.6, n.color + '88');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.4 + Math.sin(time * 0.003) * 0.15;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw stars
      time += 1;
      stars.forEach(star => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5;
        const alpha = star.alpha * (0.4 + twinkle * 0.6);

        // Star glow - bigger
        if (star.radius > 0.8) {
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 6);
          glow.addColorStop(0, star.color + '66');
          glow.addColorStop(0.5, star.color + '22');
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.globalAlpha = alpha * 0.6;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 6, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      });

      // Shooting stars - more frequent with colors
      if (Math.random() < 0.012 && shootingStars.length < 4) {
        const ssColors = ['#ffffff', '#00f0ff', '#ffd700', '#ff9ff3'];
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.3,
          vx: (Math.random() * 5 + 3) * (Math.random() > 0.5 ? 1 : -1),
          vy: Math.random() * 3 + 2,
          life: 0,
          maxLife: Math.random() * 50 + 30,
          trail: [],
          color: ssColors[Math.floor(Math.random() * ssColors.length)],
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.trail.push({ x: ss.x, y: ss.y });
        if (ss.trail.length > 20) ss.trail.shift();
        ss.x += ss.vx; ss.y += ss.vy; ss.life++;

        // Draw trail
        if (ss.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(ss.trail[0].x, ss.trail[0].y);
          for (let j = 1; j < ss.trail.length; j++) ctx.lineTo(ss.trail[j].x, ss.trail[j].y);
          ctx.strokeStyle = ss.color;
          ctx.globalAlpha = (1 - ss.life / ss.maxLife) * 0.7;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Head glow
        const headGrad = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 8);
        headGrad.addColorStop(0, '#ffffff');
        headGrad.addColorStop(0.5, ss.color + 'aa');
        headGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = headGrad;
        ctx.globalAlpha = (1 - ss.life / ss.maxLife) * 0.9;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 8, 0, Math.PI * 2);
        ctx.fill();

        if (ss.life >= ss.maxLife) shootingStars.splice(i, 1);
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationRef.current); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}
