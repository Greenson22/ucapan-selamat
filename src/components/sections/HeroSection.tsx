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
      className="w-full h-screen snap-start shrink-0 flex flex-col justify-between items-center relative overflow-hidden px-4 pt-3 pb-8 md:py-8 select-none"
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
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between pt-1 pb-1 md:py-4 border-b border-[#A97DE8]/30 z-10">
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
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-2.5 sm:gap-3 md:gap-4 my-auto px-2 z-10">
        <Badge variant="gold" className="animate-pulse-subtle text-xs sm:text-sm">
          🎂 {birthdate}
        </Badge>

        <Typography
          as="h1"
          variant="heading"
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight md:leading-normal text-transparent bg-clip-text bg-gradient-to-r from-[#3B1A6B] via-[#7B4FC4] to-[#D4A017] px-2 py-0.5"
        >
          Happy Birthday,
          <br />
          <span>{name}, S.Pd.!</span>
        </Typography>

        <Typography
          as="p"
          variant="body"
          className="text-xs sm:text-base md:text-xl text-[#5C2D9A] max-w-lg mx-auto font-semibold px-2"
        >
          {subtitle}
        </Typography>

        {/* Cake celebration banner */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#A97DE8]/30 shadow-xs sm:shadow-sm mt-0.5">
          <span className="text-xl sm:text-3xl">🎂</span>
          <p className="font-nunito text-xs sm:text-sm font-bold text-[#1E0E3C]">
            Tiup lilinnya &amp; panjatkan harapan terbaikmu hari ini! ✨
          </p>
        </div>
      </div>

      {/* Bottom Scroll Indicator Button - Positioned higher on mobile with attractive animations */}
      <footer className="w-full flex flex-col items-center pb-2 sm:pb-4 mb-2 sm:mb-0 z-10">
        <button
          type="button"
          onClick={onExploreClick}
          aria-label="Lihat galeri foto kenangan"
          className="group relative flex flex-col items-center gap-1.5 cursor-pointer focus:outline-hidden"
        >
          {/* Subtle radar / pulse glow ring behind the button */}
          <span
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4A017]/40 via-[#A97DE8]/40 to-[#5C2D9A]/40 animate-radar pointer-events-none"
            aria-hidden="true"
          />

          {/* Eye-catching badge balloon button */}
          <span className="relative animate-attention bg-gradient-to-r from-white via-[#FAF5FF] to-white hover:via-white backdrop-blur-md border-2 border-[#D4A017] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg group-hover:shadow-2xl transition-all text-[#3B1A6B] flex items-center gap-2.5 text-sm sm:text-base md:text-lg font-black tracking-wide">
            <span className="text-base sm:text-xl animate-bounce">📸</span>
            <span>Lihat Kenangan Foto</span>
            <span className="inline-block text-[#D4A017] font-bold animate-pulse">✨</span>
          </span>

          {/* Animated bouncy helper text & arrow */}
          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-extrabold text-[#7B4FC4] group-hover:text-[#3B1A6B] transition-colors mt-0.5">
            <span>sentuh atau gulir ke bawah</span>
            <span className="animate-bounce font-bold text-sm">↓</span>
          </div>
        </button>
      </footer>
    </article>
  );
}
