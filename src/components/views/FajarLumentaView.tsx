"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { BirthdayLayout } from "@/components/layouts/BirthdayLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import { PhotoSlide } from "@/components/fragments/PhotoSlide";
import { SlideNavigator } from "@/components/fragments/SlideNavigator";
import { PhotoLightbox } from "@/components/fragments/PhotoLightbox";
import { PhotoSlideItem } from "@/components/sections/PhotoSlideSection";
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
      variant: "purple",
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
      variant: "gold",
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
      variant: "lavender",
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
      variant: "purple",
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
      variant: "gold",
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
      variant: "purple",
    },
  },
];

export default function FajarLumentaView() {
  const [splashDone, setSplashDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const handleStart = useCallback(() => {
    setSplashDone(true);
  }, []);

  // IntersectionObserver to track currently visible section (Hero = 0, Photo 1 = 1, ... Photo 6 = 6)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !splashDone) return;

    const sections = container.querySelectorAll<HTMLElement>("article[data-slide-id]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.55,
      }
    );

    sections.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [splashDone]);

  const handleNavigate = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll<HTMLElement>("article[data-slide-id]");
    const target = sections[index];

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveIndex(index);
    }
  }, []);

  const handlePhotoClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <>
      {/* Splash Screen */}
      {!splashDone && (
        <SplashScreen
          name="Fajar Lumenta"
          photoSrc="/images/fajar/1.jpg"
          photoAlt="Fajar Lumenta"
          onStart={handleStart}
        />
      )}

      {/* Konten utama terpadu dalam satu scroll snap container */}
      <div
        className={`transition-opacity duration-700 ${
          splashDone ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!splashDone}
      >
        <BirthdayLayout>
          <ConfettiParticle />

          {/* Unified Scroll-Snap Container */}
          <main
            ref={containerRef}
            aria-label="Ucapan Ulang Tahun Fajar Lumenta"
            className="w-full h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory relative z-20 focus:outline-hidden"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* Slide 0: Hero Section */}
            <HeroSection
              name="Fajar Lumenta"
              onExploreClick={() => handleNavigate(1)}
            />

            {/* Slide 1 - 6: Foto Kenangan */}
            {defaultSlides.map((slide, index) => (
              <PhotoSlide
                key={slide.id}
                slide={slide}
                isActive={activeIndex === index + 1}
                priority={index === 0}
                onPhotoClick={() => handlePhotoClick(index)}
                onBackToTop={index === defaultSlides.length - 1 ? () => handleNavigate(0) : undefined}
              />
            ))}
          </main>

          {/* Vertical Dot Navigator */}
          <SlideNavigator
            total={defaultSlides.length}
            activeIndex={activeIndex}
            captions={defaultSlides.map((s) => s.caption)}
            onNavigate={handleNavigate}
            showHero={true}
          />

          {/* Photo Lightbox */}
          <PhotoLightbox
            slides={defaultSlides}
            initialIndex={lightboxIndex}
            isOpen={lightboxOpen}
            onClose={handleCloseLightbox}
          />

          {/* Floating Music Player */}
          {splashDone && (
            <MusicPlayer src="/audio/count-on-me.mp3" autoPlay={true} />
          )}
        </BirthdayLayout>
      </div>
    </>
  );
}
