import React from "react";
import Link from "next/link";
import { BirthdayLayout } from "@/components/layouts/BirthdayLayout";
import { PageWrapper } from "@/components/layouts/PageWrapper";
import { HeroSection } from "@/components/sections/HeroSection";
import { PhotoSlideSection, PhotoSlideItem } from "@/components/sections/PhotoSlideSection";
import { WishSection, WishItem } from "@/components/sections/WishSection";
import { ConfettiParticle } from "@/components/elements/ConfettiParticle";
import { MusicPlayer } from "@/components/fragments/MusicPlayer";

const defaultSlides: PhotoSlideItem[] = [
  {
    id: "1",
    src: "/images/fajar/1.jpg",
    alt: "Fajar Lumenta - Sang Penatua Muda",
    caption: "Sang Penatua Muda",
    quote: "Kepemimpinan sejati lahir dari hati yang melayani.",
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
    quote: "Guru terbaik bukan yang tak pernah marah, tapi yang marahnya penuh kasih.",
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
    quote: "Hidup paling bermakna saat dirayakan bersama orang-orang yang kita cintai.",
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
    quote: "Setiap tanggung jawab baru adalah kepercayaan Tuhan yang digenapkan.",
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
    quote: "Namamu bukan kebetulan — kamu memang selalu jadi awal dari hal-hal baik.",
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
    quote: "Semoga usiamu bertambah, ilmumu semakin tajam, dan hatimu tetap hangat.",
    badge: {
      icon: "🎂",
      label: "HBD Fajar!",
      variant: "pink",
    },
  },
];

const defaultWishes: WishItem[] = [
  {
    id: "1",
    sender: "Keluarga & Sahabat",
    relation: "Dengan Penuh Kasih",
    message:
      "Selamat ulang tahun Fajar! Semoga senantiasa diberikan kesehatan yang prima, kebahagiaan tak bertepi, dan kemudahan dalam setiap urusan serta impianmu.",
    emoji: "💖",
    colorTheme: "pink",
  },
  {
    id: "2",
    sender: "Rekan & Teman Seperjuangan",
    relation: "Kolega & Sahabat",
    message:
      "Barakallah fii umrik Fajar! Teruslah berkarya, menjadi pribadi yang rendah hati, dan inspiratif. Semoga tahun ini penuh lompatan karier dan prestasi luar biasa!",
    emoji: "🚀",
    colorTheme: "lavender",
  },
  {
    id: "3",
    sender: "Lingkaran Hangat",
    relation: "Besties",
    message:
      "Happy birthday Fajar Lumenta! Tetap jadi sosok yang humble, asik, dan selalu menebarkan vibe positif di mana pun berada. Hari ini hari rayamu!",
    emoji: "🎂",
    colorTheme: "yellow",
  },
  {
    id: "4",
    sender: "Doa Tulus Semesta",
    relation: "Harapan Terbaik",
    message:
      "Semoga setiap langkah kakimu dimudahkan, setiap niat baikmu dibukakan pintu selebar-lebarnya, dan selalu dikelilingi orang-orang yang tulus mencintaimu.",
    emoji: "🌟",
    colorTheme: "mint",
  },
];

export default function FajarLumentaView() {
  return (
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

      {/* Bottom section wrapped in PageWrapper */}
      <PageWrapper>
        {/* Wish Section */}
        <WishSection wishes={defaultWishes} />

        {/* Footer */}
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

      {/* Floating Music Player */}
      <MusicPlayer src="/audio/happy-birthday.mp3" />
    </BirthdayLayout>
  );
}
