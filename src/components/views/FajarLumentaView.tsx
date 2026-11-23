"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { BirthdayLayout } from "@/components/layouts/BirthdayLayout";
import { PageWrapper } from "@/components/layouts/PageWrapper";
import { HeroSection } from "@/components/sections/HeroSection";
import { PhotoSlideSection, PhotoSlideItem } from "@/components/sections/PhotoSlideSection";
import { ConfettiParticle } from "@/components/elements/ConfettiParticle";
import { MusicPlayer } from "@/components/fragments/MusicPlayer";
import { SplashScreen } from "@/components/fragments/SplashScreen";

const defaultSlides: PhotoSlideItem[] = [
  {
    id: "1",
    src: "/images/fajar/1.jpg",
    alt: "Fajar Lumenta - Sang Penatua Muda",
    caption: "Sang Penatua Muda",
    quote:
      "Jangan seorang pun menganggap engkau rendah karena engkau muda. Jadilah teladan bagi orang-orang percaya, dalam perkataanmu, dalam tingkah lakumu, dalam kasihmu, dalam kesetiaanmu dan dalam kesucianmu.",
    verseRef: "1 Timotius 4:12 (TB)",
    badge: {
      icon: "🕊️",
      label: "Penatua Pemuda",
      variant: "lavender",
    },
  },
  {
    id: "2",
    src: "/images/fajar/2.jpg",
    alt: "Fajar Lumenta - Di Balik Ketegasan",
    caption: "Di Balik Ketegasan",
    quote: "Besi menajamkan besi, orang menajamkan sesamanya.",
    verseRef: "Amsal 27:17 (TB)",
    badge: {
      icon: "📐",
      label: "Guru Matematika",
      variant: "yellow",
    },
  },
  {
    id: "3",
    src: "/images/fajar/3.jpg",
    alt: "Fajar Lumenta - Momen Bersama",
    caption: "Momen Bersama",
    quote:
      "Sungguh, alangkah baiknya dan indahnya, apabila saudara-saudara diam bersama dengan rukun!",
    verseRef: "Mazmur 133:1 (TB)",
    badge: {
      icon: "🎉",
      label: "Momen Spesial",
      variant: "mint",
    },
  },
  {
    id: "4",
    src: "/images/fajar/4.jpg",
    alt: "Fajar Lumenta - Langkah Iman",
    caption: "Langkah Iman",
    quote:
      "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.",
    verseRef: "Yeremia 29:11 (TB)",
    badge: {
      icon: "✝️",
      label: "Iman & Pelayanan",
      variant: "pink",
    },
  },
  {
    id: "5",
    src: "/images/fajar/5.jpg",
    alt: "Fajar Lumenta - Fajar yang Sesungguhnya",
    caption: "Fajar yang Sesungguhnya",
    quote:
      "Tak berkesudahan kasih setia TUHAN, tak habis-habisnya rahmat-Nya, selalu baru tiap pagi; besar kesetiaan-Mu!",
    verseRef: "Ratapan 3:22-23 (TB)",
    badge: {
      icon: "🌅",
      label: "Fajar Baru",
      variant: "peach",
    },
  },
  {
    id: "6",
    src: "/images/fajar/6.jpg",
    alt: "Fajar Lumenta - Selamat Ulang Tahun!",
    caption: "Selamat Ulang Tahun!",
    quote:
      "Terpujilah Tuhan! Hari demi hari Ia menanggung bagi kita; Allah adalah keselamatan kita.",
    verseRef: "Mazmur 68:19 (TB)",
    badge: {
      icon: "🎂",
      label: "HBD Fajar!",
      variant: "pink",
    },
  },
];

export default function FajarLumentaView() {
  const [splashDone, setSplashDone] = useState(false);

  const handleStart = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <>
      {/* Splash Screen — tampil di depan saat splashDone = false */}
      {!splashDone && (
        <SplashScreen
          name="Fajar Lumenta"
          photoSrc="/images/fajar/1.jpg"
          photoAlt="Fajar Lumenta"
          onStart={handleStart}
        />
      )}

      {/* Konten utama — selalu di-mount agar transisi mulus dan SEO ramah */}
      <div
        className={`transition-opacity duration-700 ${
          splashDone ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!splashDone}
      >
        <BirthdayLayout>
          <ConfettiParticle />

          {/* Top section wrapped in PageWrapper */}
          <PageWrapper>
            {/* Navigation Bar Minimal */}
            <nav className="flex items-center justify-between pb-6 border-b border-pink-100/80">
              <Link
                href="/happy-birthday"
                className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-[#7B6B9A] hover:text-[#3D2C52] transition-colors"
              >
                ← Kembali ke Daftar Ucapan
              </Link>
              <span className="font-pacifico text-sm md:text-base text-[#D94F70]">
                Fajar&apos;s Birthday 🎂
              </span>
            </nav>

            {/* Hero Section */}
            <HeroSection name="Fajar Lumenta" />
          </PageWrapper>

          {/* Photo Slide Section - full-width scroll-snap outside PageWrapper */}
          <PhotoSlideSection slides={defaultSlides} />

          {/* Footer */}
          <PageWrapper>
            <footer className="mt-16 pt-8 border-t border-pink-100 text-center text-xs md:text-sm text-[#7B6B9A] pb-10">
              <p>
                Dibuat dengan cinta dan penuh doa untuk{" "}
                <span className="font-bold text-[#3D2C52]">Fajar Lumenta</span>.
              </p>
              <p className="mt-1 text-xs text-[#7B6B9A]/80">
                © 2026 Ucapan Selamat Digital.
              </p>
            </footer>
          </PageWrapper>

          {/* Floating Music Player otomatis memutar lagu saat splashDone = true */}
          {splashDone && (
            <MusicPlayer src="/audio/happy-birthday.mp3" autoPlay={true} />
          )}
        </BirthdayLayout>
      </div>
    </>
  );
}
