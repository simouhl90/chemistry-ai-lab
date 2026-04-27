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

    const colors = ['#00f0ff', '#ff0055', '#00ff9d', '#ffe66d', '#5f27cd', '#ff9ff3'];

    const atoms: Atom[] = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      electrons: Math.floor(Math.random() * 3) + 1,
      orbitRadius: Math.random() * 20 + 15,
      orbitSpeed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
      orbitPhase: Math.random() * Math.PI * 2,
      nucleusAlpha: Math.random() * 0.4 + 0.3,
    }));

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 11, 20, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      atoms.forEach(atom => {
        atom.x += atom.vx;
        atom.y += atom.vy;
        if (atom.x < -50) atom.x = canvas.width + 50;
        if (atom.x > canvas.width + 50) atom.x = -50;
        if (atom.y < -50) atom.y = canvas.height + 50;
        if (atom.y > canvas.height + 50) atom.y = -50;

        // Draw orbit paths
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle = atom.color;
        ctx.globalAlpha = 0.08;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Second orbit (tilted)
        ctx.beginPath();
        ctx.ellipse(atom.x, atom.y, atom.orbitRadius, atom.orbitRadius * 0.4, Math.PI / 4, 0, Math.PI * 2);
        ctx.strokeStyle = atom.color;
        ctx.globalAlpha = 0.05;
        ctx.stroke();

        // Draw electrons
        for (let e = 0; e < atom.electrons; e++) {
          const angle = atom.orbitPhase + time * atom.orbitSpeed * 60 + (e * Math.PI * 2) / atom.electrons;
          const ex = atom.x + atom.orbitRadius * Math.cos(angle);
          const ey = atom.y + atom.orbitRadius * Math.sin(angle);

          // Electron glow
          const grad = ctx.createRadialGradient(ex, ey, 0, ex, ey, 6);
          grad.addColorStop(0, atom.color);
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.globalAlpha = 0.6;
          ctx.beginPath();
          ctx.arc(ex, ey, 6, 0, Math.PI * 2);
          ctx.fill();

          // Electron core
          ctx.beginPath();
          ctx.arc(ex, ey, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 0.8;
          ctx.fill();
        }

        // Draw nucleus glow
        const nucGrad = ctx.createRadialGradient(atom.x, atom.y, 0, atom.x, atom.y, atom.radius * 3);
        nucGrad.addColorStop(0, atom.color + '80');
        nucGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = nucGrad;
        ctx.globalAlpha = atom.nucleusAlpha;
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw nucleus
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.radius, 0, Math.PI * 2);
        ctx.fillStyle = atom.color;
        ctx.globalAlpha = atom.nucleusAlpha + 0.2;
        ctx.fill();

        // Nucleus highlight
        ctx.beginPath();
        ctx.arc(atom.x - atom.radius * 0.25, atom.y - atom.radius * 0.25, atom.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.2;
        ctx.fill();
      });

      // Draw faint bond lines between nearby atoms
      ctx.globalAlpha = 1;
      atoms.forEach((a, i) => {
        atoms.forEach((b, j) => {
          if (j <= i) return;
          const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (dist < 200) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = a.color;
            ctx.globalAlpha = (1 - dist / 200) * 0.08;
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 6]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationRef.current); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />;
}
