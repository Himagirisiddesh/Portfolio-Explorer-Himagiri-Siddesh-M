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

interface CircuitNode {
  x: number;
  y: number;
  phase: number;
  drift: number;
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

    // Slow ambient color fields plus a restrained circuit network keep the
    // background alive without competing with the portfolio content.
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
    const circuits: CircuitNode[] = Array.from({ length: 30 }, (_, i) => ({
      x: ((i * 47 + 13) % 101) / 100,
      y: ((i * 71 + 19) % 97) / 100,
      phase: i * 0.73,
      drift: 0.08 + (i % 4) * 0.025,
    }));

    const draw = () => {
      const time = performance.now() / 1000;
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

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      // Dim perspective traces echo the circuit-board reference image.
      ctx.lineWidth = 1;
      for (let i = -8; i <= 8; i += 1) {
        const baseX = W / 2 + i * Math.max(W, H) * 0.085;
        const sway = Math.sin(time * 0.12 + i) * 18;
        ctx.strokeStyle = "rgba(37, 99, 235, 0.055)";
        ctx.beginPath();
        ctx.moveTo(baseX + sway, H);
        ctx.lineTo(W / 2 + i * W * 0.018, H * 0.46);
        ctx.stroke();
      }

      // Connected nodes drift imperceptibly, with light pulses travelling
      // through the network at different speeds.
      const points = circuits.map((node) => ({
        x: node.x * W + Math.sin(time * node.drift + node.phase) * 12,
        y: node.y * H + Math.cos(time * node.drift * 0.8 + node.phase) * 9,
        phase: node.phase,
      }));
      points.forEach((point, i) => {
        const next = points[(i + 1) % points.length];
        const pulse = (Math.sin(time * 1.25 + point.phase) + 1) / 2;
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.045 + pulse * 0.06})`;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(point.x + (next.x - point.x) * 0.45, point.y);
        ctx.lineTo(point.x + (next.x - point.x) * 0.45, next.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();

        ctx.fillStyle = `rgba(125, 211, 252, ${0.12 + pulse * 0.34})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.2 + pulse * 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // A faint scanner sweeps through the scene like a live system monitor.
      const scanY = ((time * 22) % (H + 160)) - 80;
      const scan = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
      scan.addColorStop(0, "rgba(34, 211, 238, 0)");
      scan.addColorStop(0.5, "rgba(34, 211, 238, 0.1)");
      scan.addColorStop(1, "rgba(34, 211, 238, 0)");
      ctx.fillStyle = scan;
      ctx.fillRect(0, scanY - 50, W, 100);
      ctx.restore();

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
