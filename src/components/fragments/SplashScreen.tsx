"use client";

import React from "react";
import Image from "next/image";

export interface SplashScreenProps {
  /** Nama yang ditampilkan di splash, misal "Fajar Lumenta" */
  name: string;
  /** Foto yang ditampilkan di splash screen */
  photoSrc?: string;
  /** Caption / alt foto */
  photoAlt?: string;
  /** Callback saat tombol "Mulai" ditekan */
  onStart: () => void;
  /** Ayat dekoratif di bawah tombol (opsional) */
  decorativeVerse?: string;
  /** Referensi ayat dekoratif, misal "Amsal 23:18 (TB)" */
  decorativeVerseRef?: string;
}

export function SplashScreen({
  name,
  photoSrc = "/images/fajar/1.jpg",
  photoAlt = "Fajar Lumenta",
  onStart,
  decorativeVerse = "Sebab masa depan sungguh ada, dan harapanmu tidak akan sia-sia.",
  decorativeVerseRef = "Amsal 23:18 (TB)",
}: SplashScreenProps) {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex flex-col items-center justify-center
        bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E1B4B]
        px-6 py-8 text-center overflow-y-auto
      "
    >
      {/* Background Image / Ambient Blur */}
      {photoSrc && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
          <Image
            src={photoSrc}
            alt=""
            fill
            sizes="100vw"
            className="object-cover scale-110 opacity-20 blur-2xl"
            priority
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 via-[#0F172A]/85 to-[#0F172A]/95" />
        </div>
      )}

      {/* Decorative ambient elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-sky-500/15 blur-3xl" />
      </div>

      {/* Konten utama */}
      <div className="relative z-10 flex flex-col items-center gap-5 max-w-sm w-full my-auto">
        {/* Foto pertama dengan bingkai elegan & menyatu */}
        {photoSrc && (
          <div className="relative group">
            {/* Soft glowing ambient ring */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-amber-300/40 via-sky-400/40 to-indigo-400/40 blur-md opacity-80 animate-pulse-subtle" />

            {/* Circular photo container */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white/80 shadow-2xl ring-4 ring-white/10">
              <Image
                src={photoSrc}
                alt={photoAlt}
                fill
                sizes="(max-width: 640px) 128px, 144px"
                className="object-cover object-top hover:scale-105 transition-transform duration-500 ease-out"
                priority
              />
            </div>

            {/* Mini floating celebratory badge */}
            <div className="absolute -bottom-1 -right-1 bg-white text-xs px-2.5 py-1 rounded-full shadow-md font-nunito font-extrabold text-[#1E293B] border border-amber-200">
              🎂 2026
            </div>
          </div>
        )}

        {/* Sub-judul & Nama */}
        <div className="flex flex-col items-center gap-1">
          <p className="font-pacifico text-base sm:text-lg text-amber-200/90 tracking-wide drop-shadow">
            Selamat Ulang Tahun
          </p>
          <h1 className="font-pacifico text-3xl sm:text-4xl text-white drop-shadow-md leading-tight">
            {name}
          </h1>
        </div>

        {/* Tombol Mulai */}
        <button
          onClick={onStart}
          className="
            mt-1
            inline-flex items-center gap-2
            font-nunito font-extrabold text-base sm:text-lg text-[#0F172A]
            bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100
            hover:from-white hover:to-amber-200
            px-8 py-3.5 rounded-full
            shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30
            transition-all duration-300 ease-out
            hover:scale-105 active:scale-95
            cursor-pointer
          "
          aria-label="Mulai memutar musik dan membuka halaman ulang tahun"
        >
          <span>Buka Ucapan</span>
          <span className="text-xl">✨</span>
        </button>

        {/* Ayat dekoratif */}
        {decorativeVerse && (
          <div className="mt-2 max-w-xs px-2">
            <p className="font-nunito italic text-xs sm:text-sm text-slate-300/90 leading-relaxed">
              &ldquo;{decorativeVerse}&rdquo;
            </p>
            {decorativeVerseRef && (
              <p className="font-nunito font-semibold text-[11px] text-amber-200/70 mt-1.5 text-right">
                — {decorativeVerseRef}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
