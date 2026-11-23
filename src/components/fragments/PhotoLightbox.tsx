"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { PhotoSlideItem } from "@/components/elements/PhotoSlideTypes";

const SWIPE_THRESHOLD_PX = 50;

export interface PhotoLightboxProps {
  slides: PhotoSlideItem[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function PhotoLightbox({
  slides,
  initialIndex = 0,
  isOpen,
  onClose,
}: PhotoLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const touchStartXRef = useRef<number | null>(null);

  // Sync internal currentIndex with initialIndex when lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  }, [slides.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  }, [slides.length]);

  // Keyboard navigation & Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;

    if (deltaX > SWIPE_THRESHOLD_PX) {
      // Swiped right -> previous photo
      handlePrev();
    } else if (deltaX < -SWIPE_THRESHOLD_PX) {
      // Swiped left -> next photo
      handleNext();
    }
    touchStartXRef.current = null;
  };

  if (!isOpen || slides.length === 0) return null;

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tampilan foto layar penuh"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs transition-opacity duration-300"
    >
      {/* Top action bar: Close button & indicator */}
      <div className="absolute top-4 inset-x-4 md:inset-x-8 flex items-center justify-between z-50 pointer-events-none">
        <div className="text-white/80 text-xs sm:text-sm font-nunito font-semibold bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
          {currentIndex + 1} / {slides.length} — {currentSlide.caption}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Tutup tampilan penuh (Escape)"
          className="pointer-events-auto p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors text-xl leading-none w-10 h-10 flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-pink-300"
        >
          ✕
        </button>
      </div>

      {/* Prev button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        aria-label="Foto sebelumnya"
        className="absolute left-3 md:left-6 z-50 p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-colors text-2xl leading-none flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-pink-300"
      >
        ‹
      </button>

      {/* Photo Area */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90vw] md:w-[85vw] h-[80vh] flex items-center justify-center select-none"
      >
        <Image
          src={currentSlide.src}
          alt={currentSlide.alt}
          fill
          priority
          sizes="90vw"
          className="object-contain object-center drop-shadow-2xl"
        />
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Foto selanjutnya"
        className="absolute right-3 md:right-6 z-50 p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-colors text-2xl leading-none flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-pink-300"
      >
        ›
      </button>
    </div>
  );
}
