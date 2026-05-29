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
  alpha: number;
}

export function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();

    // Soft ambient glows only — no grid, no particles, no stars
    const blobs: Blob[] = [
      // Blue behind portrait (right side)
      { x: W * 0.72, y: H * 0.45, vx: 0.10, vy: 0.07, radius: Math.max(W, H) * 0.55, r: 37, g: 99, b: 235, alpha: 0.12 },
      // Deep blue left-center
      { x: W * 0.25, y: H * 0.65, vx: -0.08, vy: 0.09, radius: Math.max(W, H) * 0.40, r: 29, g: 78, b: 216, alpha: 0.07 },
      // Purple accent top-right
      { x: W * 0.85, y: H * 0.18, vx: -0.06, vy: 0.11, radius: Math.max(W, H) * 0.35, r: 124, g: 58, b: 237, alpha: 0.09 },
      // Subtle indigo bottom left
      { x: W * 0.10, y: H * 0.85, vx: 0.09, vy: -0.06, radius: Math.max(W, H) * 0.30, r: 67, g: 56, b: 202, alpha: 0.06 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, W, H);

      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.radius * 0.4 || b.x > W + b.radius * 0.4) b.vx *= -1;
        if (b.y < -b.radius * 0.4 || b.y > H + b.radius * 0.4) b.vy *= -1;

        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        g.addColorStop(0, `rgba(${b.r},${b.g},${b.b},${b.alpha})`);
        g.addColorStop(0.45, `rgba(${b.r},${b.g},${b.b},${b.alpha * 0.35})`);
        g.addColorStop(1, `rgba(${b.r},${b.g},${b.b},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
