import { useEffect, useRef } from 'react';

export function GradientCanvas() {
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

    let time = 0;

    // Smooth gradient colors that cycle
    const gradientColors = [
      { r: 5, g: 15, b: 40 },    // Deep navy
      { r: 15, g: 5, b: 35 },    // Deep purple
      { r: 5, g: 25, b: 30 },    // Dark teal
      { r: 20, g: 8, b: 25 },    // Dark magenta
      { r: 8, g: 20, b: 20 },    // Dark emerald
    ];

    const animate = () => {
      time += 0.003;

      // Create large moving gradient blobs
      const w = canvas.width;
      const h = canvas.height;

      // Base dark fill
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, w, h);

      // Draw multiple overlapping gradient circles that move slowly
      for (let i = 0; i < 5; i++) {
        const c = gradientColors[i];
        const cx = w * 0.5 + Math.sin(time * 0.7 + i * 1.3) * w * 0.4;
        const cy = h * 0.5 + Math.cos(time * 0.5 + i * 1.7) * h * 0.4;
        const radius = Math.max(200, w * 0.4);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${c.r * 3}, ${c.g * 3}, ${c.b * 3}, 0.25)`);
        grad.addColorStop(0.5, `rgba(${c.r * 2}, ${c.g * 2}, ${c.b * 2}, 0.12)`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // Add a subtle moving highlight
      const hx = w * 0.3 + Math.sin(time * 0.3) * w * 0.3;
      const hy = h * 0.3 + Math.cos(time * 0.4) * h * 0.2;
      const hGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, 400);
      hGrad.addColorStop(0, 'rgba(0, 100, 200, 0.06)');
      hGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = hGrad;
      ctx.fillRect(0, 0, w, h);

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationRef.current); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}
