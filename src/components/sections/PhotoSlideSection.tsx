"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { PhotoSlide, PhotoSlideItem } from "@/components/fragments/PhotoSlide";
import { SlideNavigator } from "@/components/fragments/SlideNavigator";
import { PhotoLightbox } from "@/components/fragments/PhotoLightbox";

export interface PhotoSlideSectionProps {
  slides: PhotoSlideItem[];
}

export function PhotoSlideSection({ slides }: PhotoSlideSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slideElements = container.querySelectorAll<HTMLElement>("article[data-slide-id]");
    if (slideElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(slideElements).indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    slideElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [slides]);

  const handleNavigate = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const slideElements = container.querySelectorAll<HTMLElement>("article[data-slide-id]");
    const targetSlide = slideElements[index];

    if (targetSlide) {
      targetSlide.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handlePhotoClick = useCallback((index: number) => {
    setActiveLightboxIndex(index);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  return (
    <div className="relative w-full">
      <section
        ref={containerRef}
        aria-label="Galeri Foto Fajar Lumenta"
        className="w-full h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory relative z-20 focus:outline-hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {slides.map((slide, index) => (
          <PhotoSlide
            key={slide.id}
            slide={slide}
            isActive={activeIndex === index}
            priority={index === 0}
            onPhotoClick={() => handlePhotoClick(index)}
          />
        ))}
      </section>

      {/* Vertical Dot Navigator */}
      <SlideNavigator
        total={slides.length}
        activeIndex={activeIndex}
        captions={slides.map((s) => s.caption)}
        onNavigate={handleNavigate}
      />

      {/* Photo Lightbox */}
      <PhotoLightbox
        slides={slides}
        initialIndex={activeLightboxIndex ?? 0}
        isOpen={activeLightboxIndex !== null}
        onClose={handleCloseLightbox}
      />
    </div>
  );
}
