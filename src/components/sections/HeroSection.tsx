import React from "react";
import { Badge } from "@/components/elements/Badge";
import { Typography } from "@/components/elements/Typography";

interface HeroSectionProps {
  name: string;
  subtitle?: string;
  birthdate?: string;
}

export function HeroSection({
  name,
  subtitle = "Semoga hari bahagiamu dipenuhi senyuman hangat, cinta, dan keberkahan berlimpah!",
  birthdate = "Hari Spesial & Penuh Sukacita 🎉",
}: HeroSectionProps) {
  return (
    <section className="relative pt-12 pb-14 md:pt-16 md:pb-20 text-center px-4">
      {/* Floating decorative elements */}
      <div className="absolute top-2 left-6 md:left-20 animate-float text-3xl md:text-5xl select-none" aria-hidden="true">
        🎈
      </div>
      <div className="absolute top-8 right-6 md:right-24 animate-float-slow text-3xl md:text-5xl select-none" aria-hidden="true">
        🧁
      </div>
      <div className="absolute bottom-2 left-10 md:left-32 animate-float-slow text-2xl md:text-4xl select-none" aria-hidden="true">
        ✨
      </div>
      <div className="absolute bottom-4 right-10 md:right-32 animate-float text-2xl md:text-4xl select-none" aria-hidden="true">
        🎁
      </div>

      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
        <Badge variant="pink" className="animate-pulse-subtle">
          🎂 {birthdate}
        </Badge>

        <Typography
          as="h1"
          variant="heading"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight md:leading-normal text-transparent bg-clip-text bg-gradient-to-r from-[#D94F70] via-[#854DAB] to-[#489379] px-2 py-1"
        >
          Happy Birthday,
          <br />
          <span>{name}!</span>
        </Typography>

        <Typography
          as="p"
          variant="body"
          className="text-base sm:text-lg md:text-xl text-[#5B4775] max-w-xl mx-auto font-semibold mt-2"
        >
          {subtitle}
        </Typography>

        {/* Cake celebration banner */}
        <div className="mt-4 inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-xs border border-pink-100 shadow-sm">
          <span className="text-3xl">🎂</span>
          <p className="font-nunito text-xs sm:text-sm font-bold text-[#3D2C52]">
            Tiup lilinnya &amp; panjatkan harapan terbaikmu hari ini! ✨
          </p>
        </div>
      </div>
    </section>
  );
}
