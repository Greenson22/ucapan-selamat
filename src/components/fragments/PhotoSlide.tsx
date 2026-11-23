import { BadgeVariant } from "@/components/elements/Badge";
import { PhotoSlideItem } from "@/components/sections/PhotoSlideSection";

export interface PhotoSlideProps {
  slide: PhotoSlideItem;
  isActive?: boolean;
  priority?: boolean;
  onPhotoClick?: () => void;
  onBackToTop?: () => void;
}

export type { PhotoSlideItem };
export type PhotoSlide = PhotoSlideItem;
export type PhotoSlideData = PhotoSlideItem;

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/elements/Badge";
import { Typography } from "@/components/elements/Typography";

export function PhotoSlide({ slide, isActive = false, priority = false, onPhotoClick, onBackToTop }: PhotoSlideProps) {
  return (
    <article
      data-slide-id={slide.id}
      className="w-full h-screen snap-start shrink-0 flex flex-col md:flex-row justify-center items-center relative overflow-hidden bg-white/40 md:bg-white/60 backdrop-blur-xs select-none p-4 md:p-8 lg:p-12 gap-4 md:gap-8 lg:gap-12"
    >
      {/* Photo Area (Mobile: 60vh top; Desktop: full height card / 50% width) */}
      <div
        onClick={onPhotoClick}
        className={`relative w-full md:w-1/2 lg:w-3/5 h-[55vh] md:h-[80vh] rounded-2xl md:rounded-3xl overflow-hidden bg-[#EDE3FA]/40 shadow-md md:shadow-xl cursor-pointer group transition-all duration-500 border border-[#A97DE8]/30 ${
          isActive ? "animate-slide-enter" : "opacity-0 translate-y-6 md:translate-y-0 md:translate-x-6"
        } ${onPhotoClick ? "hover:shadow-2xl hover:border-[#D4A017]/50" : ""}`}
      >
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
          className="object-cover md:object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#100828]/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content Area (Mobile: 40vh bottom; Desktop: 50% width centered text) */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center items-center md:items-start text-center md:text-left px-4 sm:px-6 md:px-4 py-2 md:py-6">
        <div className="max-w-xl flex flex-col items-center md:items-start gap-3 md:gap-4">
          {/* Badge Peran */}
          <div className={isActive ? "animate-slide-badge" : "opacity-0 translate-y-3"}>
            <Badge variant={slide.badge.variant} className="shadow-xs backdrop-blur-xs">
              <span>{slide.badge.icon}</span>
              <span>{slide.badge.label}</span>
            </Badge>
          </div>

          {/* Caption (Pacifico) */}
          <div className={isActive ? "animate-slide-caption" : "opacity-0 translate-y-5"}>
            <Typography
              as="h2"
              variant="heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#3B1A6B] drop-shadow-xs"
            >
              {slide.caption}
            </Typography>
          </div>

          {/* Quote (ayat Alkitab, Nunito italic) + Referensi ayat */}
          <div className={isActive ? "animate-slide-quote" : "opacity-0 translate-y-5"}>
            <Typography
              as="p"
              variant="body"
              className="text-sm sm:text-base md:text-lg lg:text-xl font-nunito italic text-[#5C3A91] leading-relaxed"
            >
              &ldquo;{slide.quote}&rdquo;
            </Typography>
            {slide.verseRef && (
              <p className="mt-2 text-xs sm:text-sm font-nunito font-semibold text-[#D4A017] md:text-left">
                — {slide.verseRef}
              </p>
            )}
          </div>

          {/* Tombol kembali ke awal di slide terakhir */}
          {onBackToTop && (
            <div className={`mt-2 ${isActive ? "animate-slide-quote" : "opacity-0 translate-y-5"}`}>
              <button
                type="button"
                onClick={onBackToTop}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#5C2D9A] hover:text-[#3B1A6B] bg-white/90 border border-[#A97DE8]/40 px-4 py-2 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                ↑ Kembali ke Awal
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
