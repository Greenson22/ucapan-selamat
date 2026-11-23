"use client";

import React from "react";

export interface SplashScreenProps {
  /** Nama yang ditampilkan di splash, misal "Fajar Lumenta" */
  name: string;
  /** Callback saat tombol "Mulai" ditekan */
  onStart: () => void;
  /** Ayat dekoratif di bawah tombol (opsional) */
  decorativeVerse?: string;
  /** Referensi ayat dekoratif, misal "Amsal 23:18 (TB)" */
  decorativeVerseRef?: string;
}

export function SplashScreen({
  name,
  onStart,
  decorativeVerse = "Sebab masa depan sungguh ada, dan harapanmu tidak akan sia-sia.",
  decorativeVerseRef = "Amsal 23:18 (TB)",
}: SplashScreenProps) {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex flex-col items-center justify-center
        bg-gradient-to-br from-[#C9B1E8] via-[#FFB3C6] to-[#FFCBA4]
        px-6 text-center
      "
    >
      {/* Overlay tipis untuk kedalaman */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none" />

      {/* Konten utama */}
      <div className="relative flex flex-col items-center gap-6 max-w-sm w-full">
        {/* Sub-judul */}
        <p className="font-pacifico text-lg sm:text-xl text-white/90 drop-shadow">
          Selamat Ulang Tahun
        </p>

        {/* Nama utama */}
        <h1 className="font-pacifico text-4xl sm:text-5xl text-white drop-shadow-md leading-tight">
          {name} 🎂
        </h1>

        {/* Tombol Mulai */}
        <button
          onClick={onStart}
          className="
            mt-2
            inline-flex items-center gap-2
            font-nunito font-bold text-lg text-[#3D2C52]
            bg-white hover:bg-pink-50
            px-10 py-4 rounded-full
            shadow-lg hover:shadow-xl
            transition-all duration-300 ease-out
            hover:scale-105 active:scale-95
            cursor-pointer
          "
          aria-label="Mulai memutar musik dan membuka halaman ulang tahun"
        >
          ▶ Mulai
        </button>

        {/* Ayat dekoratif */}
        {decorativeVerse && (
          <div className="mt-4 max-w-xs">
            <p className="font-nunito italic text-sm text-white/80 leading-relaxed">
              &ldquo;{decorativeVerse}&rdquo;
            </p>
            {decorativeVerseRef && (
              <p className="font-nunito text-xs text-white/60 mt-1 text-right">
                — {decorativeVerseRef}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
