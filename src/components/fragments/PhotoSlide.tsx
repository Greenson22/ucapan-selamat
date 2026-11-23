import { BadgeVariant } from "@/components/elements/Badge";
import { PhotoSlideItem } from "@/components/sections/PhotoSlideSection";

export interface PhotoSlideProps {
  slide: PhotoSlideItem;
  isActive?: boolean;
  priority?: boolean;
  onPhotoClick?: () => void;
}

export type { PhotoSlideItem };
export type PhotoSlide = PhotoSlideItem;
export type PhotoSlideData = PhotoSlideItem;

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/elements/Badge";
import { Typography } from "@/components/elements/Typography";

export function PhotoSlide({ slide, isActive = false, priority = false, onPhotoClick }: PhotoSlideProps) {
  return (
    <article
      data-slide-id={slide.id}
      className="w-full h-screen snap-start shrink-0 flex flex-col justify-between relative overflow-hidden bg-white/40 backdrop-blur-xs select-none"
    >
      {/* 60vh Image Area */}
      <div
        onClick={onPhotoClick}
        className={`relative w-full h-[60vh] max-h-[60vh] overflow-hidden bg-pink-50/50 cursor-pointer group transition-all duration-300 ${
          isActive ? "animate-slide-enter" : "opacity-0 translate-y-6"
        } ${onPhotoClick ? "hover:opacity-95" : ""}`}
      >
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 40vh Text Content Area */}
      <div className="w-full h-[40vh] max-h-[40vh] flex flex-col justify-center items-center text-center px-6 sm:px-12 md:px-16 lg:px-24 py-4 md:py-6 bg-gradient-to-b from-transparent via-[#FFF9FC]/70 to-[#FFF9FC]">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-3">
          {/* Badge Peran */}
          <div className={isActive ? "animate-slide-badge" : "opacity-0 translate-y-3"}>
            <Badge variant={slide.badge.variant} className="shadow-xs backdrop-blur-xs">
              <span>{slide.badge.icon}</span>
              <span>{slide.badge.label}</span>
            </Badge>
          </div>

          {/* Caption (Pacifico) - Delay ~150ms */}
          <div className={isActive ? "animate-slide-caption" : "opacity-0 translate-y-5"}>
            <Typography
              as="h2"
              variant="heading"
              className="text-2xl sm:text-3xl md:text-4xl text-[#3D2C52] drop-shadow-xs"
            >
              {slide.caption}
            </Typography>
          </div>

          {/* Quote (Nunito italic) - Delay ~300ms */}
          <div className={isActive ? "animate-slide-quote" : "opacity-0 translate-y-5"}>
            <Typography
              as="p"
              variant="body"
              className="text-base sm:text-lg md:text-xl font-nunito italic text-[#5B4775] leading-relaxed max-w-xl"
            >
              &ldquo;{slide.quote}&rdquo;
            </Typography>
          </div>
        </div>
      </div>
    </article>
  );
}
