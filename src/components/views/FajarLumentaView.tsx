import React from "react";
import Link from "next/link";
import { BirthdayLayout } from "@/components/layouts/BirthdayLayout";
import { PageWrapper } from "@/components/layouts/PageWrapper";
import { HeroSection } from "@/components/sections/HeroSection";
import { GallerySection, PhotoItem } from "@/components/sections/GallerySection";
import { WishSection, WishItem } from "@/components/sections/WishSection";
import { ConfettiParticle } from "@/components/elements/ConfettiParticle";
import { MusicPlayer } from "@/components/fragments/MusicPlayer";

const defaultPhotos: PhotoItem[] = [
  {
    id: "1",
    src: "/images/fajar/foto-01.svg",
    alt: "Fajar Lumenta - Senyum Terbaik",
    caption: "Senyum Penuh Energi",
    subcaption: "Selalu bawa keceriaan di setiap suasana",
    badgeText: "Favorit",
    rotationClass: "rotate-[-1.5deg] hover:rotate-0",
  },
  {
    id: "2",
    src: "/images/fajar/foto-02.svg",
    alt: "Fajar Lumenta - Momen Berharga",
    caption: "Momen Spesial",
    subcaption: "Kenangan indah yang selalu diingat",
    badgeText: "Sweet",
    rotationClass: "rotate-[1.5deg] hover:rotate-0",
  },
  {
    id: "3",
    src: "/images/fajar/foto-03.svg",
    alt: "Fajar Lumenta - Petualangan Seru",
    caption: "Langkah Petualangan",
    subcaption: "Terus melangkah raih mimpi setinggi langit",
    badgeText: "Spirit",
    rotationClass: "rotate-[-2deg] hover:rotate-0",
  },
  {
    id: "4",
    src: "/images/fajar/foto-04.svg",
    alt: "Fajar Lumenta - Semangat Baru",
    caption: "Cahaya Inspirasi",
    subcaption: "Selalu jadi inspirasi bagi orang-orang sekitar",
    badgeText: "Bright",
    rotationClass: "rotate-[2deg] hover:rotate-0",
  },
  {
    id: "5",
    src: "/images/fajar/foto-05.svg",
    alt: "Fajar Lumenta - Tawa Bahagia",
    caption: "Tawa Paling Tulus",
    subcaption: "Semoga tawa ini selalu menghiasi hari-harimu",
    badgeText: "Joy",
    rotationClass: "rotate-[-1deg] hover:rotate-0",
  },
  {
    id: "6",
    src: "/images/fajar/foto-06.svg",
    alt: "Fajar Lumenta - Langkah Sukses",
    caption: "Menatap Masa Depan",
    subcaption: "Tahun baru dengan pencapaian yang kian gemilang",
    badgeText: "Success",
    rotationClass: "rotate-[1.5deg] hover:rotate-0",
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

        {/* Gallery Section */}
        <GallerySection photos={defaultPhotos} />

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
