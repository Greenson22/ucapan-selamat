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
      className={`group relative flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#FFB3C6]/80 text-[#3D2C52] shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-[#FFB3C6] ${className}`}
    >
      <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
        {isPlaying ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB3C6] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#E85D88]" />
          </>
        ) : (
          <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-zinc-300" />
        )}
      </span>

      <span className="text-sm sm:text-base">
        {isPlaying ? "🎵" : "🔇"}
      </span>

      <span className="text-[11px] sm:text-xs font-bold tracking-wide">
        {isPlaying ? "Musik: On" : "Musik: Off"}
      </span>
    </button>
  );
}
