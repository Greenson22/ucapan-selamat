"use client";

import React, { useRef, useState, useEffect } from "react";
import { PhotoSlide, PhotoSlideItem } from "@/components/fragments/PhotoSlide";

export interface PhotoSlideSectionProps {
  slides: PhotoSlideItem[];
  onPhotoClick?: (index: number) => void;
}

export function PhotoSlideSection({ slides, onPhotoClick }: PhotoSlideSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

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

  return (
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
          onPhotoClick={() => onPhotoClick?.(index)}
        />
      ))}
    </section>
  );
}
