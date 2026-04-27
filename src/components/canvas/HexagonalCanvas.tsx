import { useEffect, useRef } from 'react';

interface HexCell {
  x: number; y: number; size: number; alpha: number; targetAlpha: number;
  color: string; phase: number; speed: number;
}

export function HexagonalCanvas() {
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

    const cells: HexCell[] = [];
    const hexSize = 40;
    const colors = ['#00f0ff', '#00cc99', '#5f27cd', '#ff0055'];

    // Build hex grid
    for (let row = -1; row < canvas.height / (hexSize * 1.5) + 1; row++) {
      for (let col = -1; col < canvas.width / (hexSize * Math.sqrt(3)) + 1; col++) {
        const x = col * hexSize * Math.sqrt(3) + (row % 2 ? hexSize * Math.sqrt(3) / 2 : 0);
        const y = row * hexSize * 1.5;
        cells.push({
          x, y, size: hexSize - 2, alpha: 0, targetAlpha: Math.random() * 0.15 + 0.02,
          color: colors[Math.floor(Math.random() * colors.length)],
          phase: Math.random() * Math.PI * 2, speed: Math.random() * 0.005 + 0.002,
        });
      }
    }

    let time = 0;

    const drawHex = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = cx + size * Math.cos(angle);
        const py = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const animate = () => {
      ctx.fillStyle = '#050b14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      cells.forEach(cell => {
        cell.phase += cell.speed;
        const pulse = Math.sin(cell.phase + time) * 0.5 + 0.5;
        const alpha = cell.targetAlpha * (0.3 + pulse * 0.7);

        drawHex(cell.x, cell.y, cell.size);
        ctx.strokeStyle = cell.color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Subtle fill
        ctx.globalAlpha = alpha * 0.1;
        ctx.fillStyle = cell.color;
        ctx.fill();
      });

      // Floating molecules (small connected dots)
      ctx.globalAlpha = 1;
      for (let i = 0; i < 5; i++) {
        const mx = canvas.width * 0.2 + Math.sin(time * 0.3 + i * 1.5) * canvas.width * 0.3;
        const my = canvas.height * 0.2 + Math.cos(time * 0.4 + i * 2) * canvas.height * 0.3;
        const color = colors[i % colors.length];

        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.6;
        ctx.fill();

        // Bond lines to neighbors
        for (let j = i + 1; j < 5; j++) {
          const mx2 = canvas.width * 0.2 + Math.sin(time * 0.3 + j * 1.5) * canvas.width * 0.3;
          const my2 = canvas.height * 0.2 + Math.cos(time * 0.4 + j * 2) * canvas.height * 0.3;
          const dist = Math.sqrt((mx - mx2) ** 2 + (my - my2) ** 2);
          if (dist < 300) {
            ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx2, my2);
            ctx.strokeStyle = color; ctx.globalAlpha = (1 - dist / 300) * 0.15;
            ctx.lineWidth = 2; ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationRef.current); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />;
}
