import { useEffect, useRef } from 'react';

interface Atom {
  x: number; y: number; vx: number; vy: number;
  radius: number; color: string; electrons: number;
  orbitRadius: number; orbitSpeed: number; orbitPhase: number;
  nucleusAlpha: number;
}

export function AtomsCanvas() {
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

    // Vibrant atom colors
    const colors = ['#ff0055', '#ff6600', '#ffcc00', '#00ff66', '#00ccff', '#8855ff', '#ff44aa', '#44ffcc'];

    const atoms: Atom[] = Array.from({ length: 10 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      electrons: Math.floor(Math.random() * 3) + 2,
      orbitRadius: Math.random() * 25 + 20,
      orbitSpeed: (Math.random() * 0.025 + 0.012) * (Math.random() > 0.5 ? 1 : -1),
      orbitPhase: Math.random() * Math.PI * 2,
      nucleusAlpha: Math.random() * 0.4 + 0.5,
    }));

    let time = 0;

    const animate = () => {
      // Deep purple/indigo background
      ctx.fillStyle = 'rgba(8, 4, 20, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      atoms.forEach(atom => {
        atom.x += atom.vx;
        atom.y += atom.vy;
        if (atom.x < -60) atom.x = canvas.width + 60;
        if (atom.x > canvas.width + 60) atom.x = -60;
        if (atom.y < -60) atom.y = canvas.height + 60;
        if (atom.y > canvas.height + 60) atom.y = -60;

        // Draw orbit paths - brighter
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle = atom.color;
        ctx.globalAlpha = 0.15;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Second orbit (tilted)
        ctx.beginPath();
        ctx.ellipse(atom.x, atom.y, atom.orbitRadius, atom.orbitRadius * 0.4, Math.PI / 4, 0, Math.PI * 2);
        ctx.strokeStyle = atom.color;
        ctx.globalAlpha = 0.1;
        ctx.stroke();

        // Third orbit
        ctx.beginPath();
        ctx.ellipse(atom.x, atom.y, atom.orbitRadius * 0.6, atom.orbitRadius, -Math.PI / 3, 0, Math.PI * 2);
        ctx.strokeStyle = atom.color;
        ctx.globalAlpha = 0.07;
        ctx.stroke();

        // Draw electrons with bigger glow
        for (let e = 0; e < atom.electrons; e++) {
          const angle = atom.orbitPhase + time * atom.orbitSpeed * 60 + (e * Math.PI * 2) / atom.electrons;
          const ex = atom.x + atom.orbitRadius * Math.cos(angle);
          const ey = atom.y + atom.orbitRadius * Math.sin(angle);

          // Electron glow - bigger
          const grad = ctx.createRadialGradient(ex, ey, 0, ex, ey, 10);
          grad.addColorStop(0, atom.color);
          grad.addColorStop(0.4, atom.color + '88');
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.globalAlpha = 0.8;
          ctx.beginPath();
          ctx.arc(ex, ey, 10, 0, Math.PI * 2);
          ctx.fill();

          // Electron core
          ctx.beginPath();
          ctx.arc(ex, ey, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 0.95;
          ctx.fill();
        }

        // Draw nucleus with big glow
        const nucGrad = ctx.createRadialGradient(atom.x, atom.y, 0, atom.x, atom.y, atom.radius * 5);
        nucGrad.addColorStop(0, atom.color + 'aa');
        nucGrad.addColorStop(0.4, atom.color + '44');
        nucGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = nucGrad;
        ctx.globalAlpha = atom.nucleusAlpha;
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.radius * 5, 0, Math.PI * 2);
        ctx.fill();

        // Draw nucleus
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.radius, 0, Math.PI * 2);
        ctx.fillStyle = atom.color;
        ctx.globalAlpha = atom.nucleusAlpha + 0.3;
        ctx.fill();

        // Nucleus highlight
        ctx.beginPath();
        ctx.arc(atom.x - atom.radius * 0.25, atom.y - atom.radius * 0.25, atom.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.3;
        ctx.fill();
      });

      // Draw bond lines between nearby atoms
      ctx.globalAlpha = 1;
      atoms.forEach((a, i) => {
        atoms.forEach((b, j) => {
          if (j <= i) return;
          const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (dist < 250) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = a.color;
            ctx.globalAlpha = (1 - dist / 250) * 0.12;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([5, 7]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Initial clear with purple background
    ctx.fillStyle = '#080414';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationRef.current); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}
