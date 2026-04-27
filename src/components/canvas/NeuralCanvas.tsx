import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  radius: number; color: string; alpha: number;
  trail: { x: number; y: number }[];
}

export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const createParticle = useCallback((width: number, height: number): Particle => {
    const colors = ['#00f0ff', '#ff0055', '#00ff9d', '#ffe66d', '#5f27cd'];
    return {
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1, color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2, trail: [],
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    particlesRef.current = Array.from({ length: 80 }, () => createParticle(canvas.width, canvas.height));
    const handleMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 11, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      particles.forEach((p, i) => {
        const dx = mouse.x - p.x, dy = mouse.y - p.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) { p.vx += dx * 0.0001; p.vy += dy * 0.0001; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        p.vx *= 0.999; p.vy *= 0.999;
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 20) p.trail.shift();
        if (p.trail.length > 1) {
          ctx.beginPath(); ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let j = 1; j < p.trail.length; j++) ctx.lineTo(p.trail[j].x, p.trail[j].y);
          ctx.strokeStyle = p.color; ctx.globalAlpha = p.alpha * 0.3; ctx.lineWidth = 0.5; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        gradient.addColorStop(0, p.color + '40'); gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const o = particles[j], dx2 = p.x - o.x, dy2 = p.y - o.y, d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (d2 < 150) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = p.color; ctx.globalAlpha = (1 - d2 / 150) * 0.2; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      });
      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener('resize', resize); window.removeEventListener('mousemove', handleMouseMove); cancelAnimationFrame(animationRef.current); };
  }, [createParticle]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}
