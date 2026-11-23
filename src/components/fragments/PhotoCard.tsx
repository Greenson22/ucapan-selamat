import React from "react";
import Image from "next/image";
import { Badge } from "@/components/elements/Badge";

interface PhotoCardProps {
  src: string;
  alt: string;
  caption: string;
  subcaption?: string;
  badgeText?: string;
  rotationClass?: string;
}

export function PhotoCard({
  src,
  alt,
  caption,
  subcaption,
  badgeText,
  rotationClass = "hover:rotate-0",
}: PhotoCardProps) {
  return (
    <div
      className={`group relative bg-white p-3.5 pb-5 rounded-2xl shadow-md hover:shadow-xl border border-pink-100 transition-all duration-300 transform hover:-translate-y-1.5 ${rotationClass}`}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-tr from-[#FFE5EC] via-[#F0E6FF] to-[#E8FFF5]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badgeText && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <Badge variant="pink">{badgeText}</Badge>
          </div>
        )}
      </div>

      <div className="mt-3.5 text-center px-1">
        <h4 className="font-nunito font-bold text-base md:text-lg text-[#3D2C52] group-hover:text-[#A83279] transition-colors">
          {caption}
        </h4>
        {subcaption && (
          <p className="font-nunito text-xs md:text-sm text-[#7B6B9A] mt-0.5">
            {subcaption}
          </p>
        )}
      </div>
    </div>
  );
}
