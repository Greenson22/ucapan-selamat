import React from "react";
import { PhotoCard } from "@/components/fragments/PhotoCard";
import { Typography } from "@/components/elements/Typography";

export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  subcaption?: string;
  badgeText?: string;
  rotationClass?: string;
}

interface GallerySectionProps {
  photos: PhotoItem[];
}

export function GallerySection({ photos }: GallerySectionProps) {
  return (
    <section className="py-8 md:py-12">
      <div className="text-center mb-8 md:mb-12">
        <Typography as="h2" variant="heading" className="text-2xl sm:text-3xl md:text-4xl text-[#3D2C52]">
          Galeri Kenangan &amp; Momen Manis 📸
        </Typography>
        <Typography as="p" variant="caption" className="text-sm md:text-base mt-2 max-w-md mx-auto">
          Setiap senyum dan langkah penuh warna yang telah dilewati
        </Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            caption={photo.caption}
            subcaption={photo.subcaption}
            badgeText={photo.badgeText}
            rotationClass={photo.rotationClass}
          />
        ))}
      </div>
    </section>
  );
}
