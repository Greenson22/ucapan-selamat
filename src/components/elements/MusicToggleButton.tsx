"use client";

import React from "react";

interface MusicToggleButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  className?: string;
}

export function MusicToggleButton({ isPlaying, onToggle, className = "" }: MusicToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? "Jeda musik ulang tahun" : "Putar musik ulang tahun"}
      aria-pressed={isPlaying}
      className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#FFB3C6]/80 text-[#3D2C52] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-[#FFB3C6] ${className}`}
    >
      <span className="relative flex h-3 w-3">
        {isPlaying ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB3C6] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E85D88]" />
          </>
        ) : (
          <span className="relative inline-flex rounded-full h-3 w-3 bg-zinc-300" />
        )}
      </span>

      <span className="text-lg">
        {isPlaying ? "🎵" : "🔇"}
      </span>

      <span className="text-xs md:text-sm font-bold tracking-wide">
        {isPlaying ? "Musik: On" : "Musik: Off"}
      </span>
    </button>
  );
}
