import React, { useEffect, useRef } from 'react';

export default function CubeWave() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid configuration
    const cols = 35;
    const rows = 35;
    const cubeSize = 24; // size of isometric cube face
    const cubeHeight = 80; // height of the sides
    
    // Isometric angles
    const isoCos = Math.cos(Math.PI / 6); // 0.866
    const isoSin = Math.sin(Math.PI / 6); // 0.5

    let time = 0;

    const render = () => {
      time += 0.015;
      
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      // Centering calculations
      // Isometric grid width: cols * size * isoCos + rows * size * isoCos
      const gridWidth = (cols + rows) * cubeSize * isoCos;
      const gridHeight = (cols + rows) * cubeSize * isoSin;
      const centerX = width / 2;
      const centerY = height / 2 - gridHeight / 6; // lift slightly

      // Draw cubes back-to-front (depth-sorting)
      for (let gx = 0; gx < cols; gx++) {
        for (let gz = 0; gz < rows; gz++) {
          // Layered noise logic
          // Math.pow(Math.max(0, wave), 2) for flat plains & sharp hills
          const dx = gx - cols / 2;
          const dz = gz - rows / 2;
          const dist = Math.sqrt(dx * dx + dz * dz) * 0.18;
          
          const w1 = Math.sin(dist - time * 1.5) * 0.5;
          const w2 = Math.sin(gx * 0.15 + time * 0.7) * Math.cos(gz * 0.12 + time * 0.5) * 0.5;
          
          const wave = w1 + w2;
          const rawHeight = Math.pow(Math.max(0, wave), 2); // sharp hills
          const hVal = rawHeight * 120; // max height scale

          // Isometric projection
          const isoX = centerX + (gx - gz) * cubeSize * isoCos;
          const isoY = centerY + (gx + gz) * cubeSize * isoSin - hVal;

          // Vertices for Top Face
          const p1x = isoX;
          const p1y = isoY;
          
          const p2x = isoX + cubeSize * isoCos;
          const p2y = isoY + cubeSize * isoSin;
          
          const p3x = isoX;
          const p3y = isoY + cubeSize;
          
          const p4x = isoX - cubeSize * isoCos;
          const p4y = isoY + cubeSize * isoSin;

          // 1. Left Face: rgb(5,5,5)
          ctx.beginPath();
          ctx.moveTo(p4x, p4y);
          ctx.lineTo(p3x, p3y);
          ctx.lineTo(p3x, p3y + cubeHeight);
          ctx.lineTo(p4x, p4y + cubeHeight);
          ctx.closePath();
          ctx.fillStyle = 'rgb(5,5,5)';
          ctx.fill();

          // 2. Right Face: rgb(12,12,12)
          ctx.beginPath();
          ctx.moveTo(p3x, p3y);
          ctx.lineTo(p2x, p2y);
          ctx.lineTo(p2x, p2y + cubeHeight);
          ctx.lineTo(p3x, p3y + cubeHeight);
          ctx.closePath();
          ctx.fillStyle = 'rgb(12,12,12)';
          ctx.fill();

          // 3. Top Face: Brightness based on height
          // tops that brighten based on height: (20 + (height / 150) * 80)
          const C = Math.floor(20 + (hVal / 150) * 80);
          ctx.beginPath();
          ctx.moveTo(p1x, p1y);
          ctx.lineTo(p2x, p2y);
          ctx.lineTo(p3x, p3y);
          ctx.lineTo(p4x, p4y);
          ctx.closePath();
          ctx.fillStyle = `rgb(${C}, ${C}, ${C})`;
          ctx.fill();
          
          // Subtle border to outline the cubes
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
