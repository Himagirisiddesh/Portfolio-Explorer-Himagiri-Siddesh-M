import { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  r: number;
  g: number;
  b: number;
  opacity: number;
}

export function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();

    const blobs: Blob[] = [
      { x: width * 0.2, y: height * 0.3, vx: 0.18, vy: 0.10, radius: Math.max(width, height) * 0.38, r: 29, g: 78, b: 216, opacity: 0.13 },
      { x: width * 0.75, y: height * 0.6, vx: -0.12, vy: 0.15, radius: Math.max(width, height) * 0.32, r: 109, g: 40, b: 217, opacity: 0.11 },
      { x: width * 0.5, y: height * 0.85, vx: 0.20, vy: -0.08, radius: Math.max(width, height) * 0.28, r: 6, g: 182, b: 212, opacity: 0.09 },
      { x: width * 0.85, y: height * 0.15, vx: -0.14, vy: 0.12, radius: Math.max(width, height) * 0.22, r: 139, g: 92, b: 246, opacity: 0.08 },
      { x: width * 0.1, y: height * 0.75, vx: 0.16, vy: -0.11, radius: Math.max(width, height) * 0.25, r: 16, g: 185, b: 129, opacity: 0.07 },
    ];

    const particles: { x: number; y: number; r: number; opacity: number; speed: number; angle: number }[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.5 + Math.random() * 1,
      opacity: 0.08 + Math.random() * 0.18,
      speed: 0.15 + Math.random() * 0.25,
      angle: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      for (const blob of blobs) {
        blob.x += blob.vx;
        blob.y += blob.vy;
        if (blob.x < -blob.radius * 0.3 || blob.x > width + blob.radius * 0.3) blob.vx *= -1;
        if (blob.y < -blob.radius * 0.3 || blob.y > height + blob.radius * 0.3) blob.vy *= -1;

        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
        grad.addColorStop(0, `rgba(${blob.r},${blob.g},${blob.b},${blob.opacity})`);
        grad.addColorStop(0.5, `rgba(${blob.r},${blob.g},${blob.b},${blob.opacity * 0.4})`);
        grad.addColorStop(1, `rgba(${blob.r},${blob.g},${blob.b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of particles) {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      }

      const gridSpacing = 80;
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
