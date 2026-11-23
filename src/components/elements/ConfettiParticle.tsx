"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: string;
  size: number;
  color: string;
  delay: string;
  duration: string;
}

export function ConfettiParticle() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ["#FFB3C6", "#C9B1E8", "#B2F0D6", "#FFF0A3", "#FFCBA4", "#BEE1E6"];
    const generated: Particle[] = Array.from({ length: 32 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 98}%`,
      size: Math.floor(Math.random() * 8) + 6,
      color: colors[i % colors.length],
      delay: `${(Math.random() * 4).toFixed(1)}s`,
      duration: `${(Math.random() * 4 + 4).toFixed(1)}s`,
    }));
    setParticles(generated);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-20" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size * (p.id % 2 === 0 ? 1 : 1.6)}px`,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration} linear infinite`,
            animationDelay: p.delay,
            borderRadius: p.id % 3 === 0 ? "50%" : "2px",
          }}
          className="absolute -top-6 block opacity-85 shadow-xs"
        />
      ))}
    </div>
  );
}
