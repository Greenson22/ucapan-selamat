import React from "react";
import Link from "next/link";
import { Badge } from "@/components/elements/Badge";
import { Typography } from "@/components/elements/Typography";

interface HeroSectionProps {
  name: string;
  subtitle?: string;
  birthdate?: string;
  onExploreClick?: () => void;
}

export function HeroSection({
  name,
  subtitle = "Semoga hari bahagiamu dipenuhi senyuman hangat, cinta, dan keberkahan berlimpah!",
  birthdate = "Hari Spesial & Penuh Sukacita 🎉",
  onExploreClick,
}: HeroSectionProps) {
  return (
    <article
      data-slide-id="hero"
      className="w-full h-screen snap-start shrink-0 flex flex-col justify-between items-center relative overflow-hidden px-4 py-4 md:py-8 select-none"
    >
      {/* Floating decorative elements */}
      <div className="absolute top-12 left-4 md:left-20 animate-float text-3xl md:text-5xl select-none pointer-events-none" aria-hidden="true">
        🎈
      </div>
      <div className="absolute top-14 right-4 md:right-24 animate-float-slow text-3xl md:text-5xl select-none pointer-events-none" aria-hidden="true">
        🧁
      </div>
      <div className="absolute bottom-20 left-6 md:left-32 animate-float-slow text-2xl md:text-4xl select-none pointer-events-none" aria-hidden="true">
        ✨
      </div>
      <div className="absolute bottom-24 right-6 md:right-32 animate-float text-2xl md:text-4xl select-none pointer-events-none" aria-hidden="true">
        🎁
      </div>

      {/* Top minimal navigation bar */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between pt-2 pb-2 md:pb-4 border-b border-[#A97DE8]/30 z-10">
        <Link
          href="/happy-birthday"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-[#5C2D9A] hover:text-[#3B1A6B] transition-colors"
        >
          ← Kembali
        </Link>
        <span className="font-pacifico text-xs md:text-base text-[#D4A017]">
          Fajar&apos;s Birthday 🕊️🎂
        </span>
      </header>

      {/* Main Hero Content */}
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-3 md:gap-4 my-auto px-2 z-10">
        <Badge variant="gold" className="animate-pulse-subtle text-xs sm:text-sm">
          🎂 {birthdate}
        </Badge>

        <Typography
          as="h1"
          variant="heading"
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight md:leading-normal text-transparent bg-clip-text bg-gradient-to-r from-[#3B1A6B] via-[#7B4FC4] to-[#D4A017] px-2 py-1"
        >
          Happy Birthday,
          <br />
          <span>{name}!</span>
        </Typography>

        <Typography
          as="p"
          variant="body"
          className="text-sm sm:text-base md:text-xl text-[#5C2D9A] max-w-lg mx-auto font-semibold"
        >
          {subtitle}
        </Typography>

        {/* Cake celebration banner */}
        <div className="inline-flex items-center gap-2.5 px-4 sm:px-6 py-2.5 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#A97DE8]/30 shadow-sm mt-1">
          <span className="text-2xl sm:text-3xl">🎂</span>
          <p className="font-nunito text-xs sm:text-sm font-bold text-[#1E0E3C]">
            Tiup lilinnya &amp; panjatkan harapan terbaikmu hari ini! ✨
          </p>
        </div>
      </div>

      {/* Bottom Scroll Indicator Button */}
      <footer className="w-full flex flex-col items-center pb-4 z-10">
        <button
          type="button"
          onClick={onExploreClick}
          aria-label="Lihat galeri foto kenangan"
          className="group flex flex-col items-center gap-1.5 text-xs font-bold text-[#5C2D9A] hover:text-[#3B1A6B] transition-all cursor-pointer focus:outline-hidden"
        >
          <span className="bg-white/80 backdrop-blur-xs border border-[#A97DE8]/30 px-3.5 py-1.5 rounded-full shadow-xs group-hover:shadow-md transition-all">
            Lihat Kenangan Foto 📸
          </span>
          <span className="animate-bounce text-base md:text-lg">↓</span>
        </button>
      </footer>
    </article>
  );
}
