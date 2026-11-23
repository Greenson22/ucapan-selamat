import React from "react";

export interface SlideNavigatorProps {
  total: number;
  activeIndex: number;
  captions?: string[];
  onNavigate: (index: number) => void;
  showHero?: boolean;
}

export function SlideNavigator({
  total,
  activeIndex,
  captions = [],
  onNavigate,
  showHero = false,
}: SlideNavigatorProps) {
  // If activeIndex is 0 and showHero is true (hero slide is active), hide the navigator or keep it subtle
  return (
    <nav
      aria-label="Navigasi slide foto"
      className={`fixed right-2.5 md:right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 md:gap-3 p-1.5 md:p-2 rounded-full bg-white/70 backdrop-blur-md shadow-md border border-[#A97DE8]/40 transition-opacity duration-300 ${
        showHero && activeIndex === 0 ? "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto" : "opacity-100"
      }`}
    >
      {showHero && (
        <button
          type="button"
          onClick={() => onNavigate(0)}
          title="Beranda Ucapan"
          aria-label="Kembali ke Beranda Ucapan"
          aria-current={activeIndex === 0 ? "true" : undefined}
          className={`transition-all duration-300 rounded-full flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-[#D4A017] ${
            activeIndex === 0
              ? "w-3.5 h-3.5 bg-[#5C2D9A] ring-2 ring-[#D4A017] shadow-sm scale-110"
              : "w-2.5 h-2.5 bg-transparent border border-[#7B4FC4]/60 hover:border-[#5C2D9A] hover:bg-[#A97DE8]/40"
          }`}
        >
          <span className="sr-only">Beranda</span>
        </button>
      )}

      {Array.from({ length: total }).map((_, index) => {
        const itemIndex = showHero ? index + 1 : index;
        const isActive = activeIndex === itemIndex;
        const caption = captions[index] || `Foto ${index + 1}`;
        const label = `Lihat foto ke-${index + 1}: ${caption}`;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onNavigate(itemIndex)}
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
