import React from "react";

export interface SlideNavigatorProps {
  total: number;
  activeIndex: number;
  captions?: string[];
  onNavigate: (index: number) => void;
}

export function SlideNavigator({
  total,
  activeIndex,
  captions = [],
  onNavigate,
}: SlideNavigatorProps) {
  return (
    <nav
      aria-label="Navigasi slide foto"
      className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 p-2 rounded-full bg-white/40 backdrop-blur-md shadow-xs border border-pink-100/50"
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = activeIndex === index;
        const caption = captions[index] || `Foto ${index + 1}`;
        const label = `Lihat foto ke-${index + 1}: ${caption}`;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onNavigate(index)}
            title={caption}
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
            className={`transition-all duration-300 rounded-full flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-[#FFB3C6] ${
              isActive
                ? "w-3 h-3 bg-[#FFB3C6] ring-2 ring-[#FFB3C6]/60 shadow-xs scale-110"
                : "w-2 h-2 bg-transparent border border-[#7B6B9A]/50 hover:border-[#FFB3C6] hover:bg-[#FFB3C6]/30"
            }`}
          />
        );
      })}
    </nav>
  );
}
