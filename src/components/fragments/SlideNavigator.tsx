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
      className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 p-2 rounded-full bg-white/60 backdrop-blur-md shadow-md border border-[#A97DE8]/40"
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
            className={`transition-all duration-300 rounded-full flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-[#D4A017] ${
              isActive
                ? "w-3.5 h-3.5 bg-[#5C2D9A] ring-2 ring-[#D4A017] shadow-sm scale-110"
                : "w-2.5 h-2.5 bg-transparent border border-[#7B4FC4]/60 hover:border-[#5C2D9A] hover:bg-[#A97DE8]/40"
            }`}
          />
        );
      })}
    </nav>
  );
}
