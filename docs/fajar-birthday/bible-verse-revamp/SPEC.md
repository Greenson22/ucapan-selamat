# SPEC — Bible Verse Revamp + Splash Screen

> **Versi:** 1.0.0
> **Tanggal:** 2026-11-23
> **Status:** 🟡 Siap Implementasi
> **Referensi PRD:** [`PRD.md`](./PRD.md)
> **Ayat Alkitab:** Terjemahan Baru (TB) — Lembaga Alkitab Indonesia

---

## Daftar File yang Diubah / Dibuat

| Aksi | File | Keterangan |
|---|---|---|
| ✏️ Edit | `src/components/sections/PhotoSlideSection.tsx` | Tambah field `verseRef` pada `PhotoSlideItem` |
| ✏️ Edit | `src/components/fragments/PhotoSlide.tsx` | Render `verseRef` di bawah quote |
| ✏️ Edit | `src/components/views/FajarLumentaView.tsx` | Tambah `SplashScreen`, hapus `WishSection`, update ayat |
| 🆕 Buat | `src/components/fragments/SplashScreen.tsx` | Komponen splash fullscreen baru |

> [!NOTE]
> `WishSection.tsx` dan `WishCard.tsx` **tidak dihapus** dari filesystem. Hanya tidak diimport/dirender di `FajarLumentaView`.

---

## 1. Perubahan `PhotoSlideItem` Interface

**File:** `src/components/sections/PhotoSlideSection.tsx`

### Sebelum
```ts
export interface PhotoSlideItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  quote: string;
  badge: {
    icon: string;
    label: string;
    variant: BadgeVariant;
  };
}
```

### Sesudah
```ts
export interface PhotoSlideItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  quote: string;      // Teks ayat Alkitab (Terjemahan Baru)
  verseRef?: string;  // ← BARU: referensi ayat, misal "1 Timotius 4:12 (TB)"
  badge: {
    icon: string;
    label: string;
    variant: BadgeVariant;
  };
}
```

**Tidak ada perubahan lain** di `PhotoSlideSection.tsx` — `verseRef` cukup dilewatkan ke `PhotoSlide` via prop `slide`.

---

## 2. Render `verseRef` di `PhotoSlide`

**File:** `src/components/fragments/PhotoSlide.tsx`

### Target perubahan

Blok `{/* Quote (Nunito italic) - Delay ~300ms */}` saat ini:

```tsx
{/* Quote (Nunito italic) - Delay ~300ms */}
<div className={isActive ? "animate-slide-quote" : "opacity-0 translate-y-5"}>
  <Typography
    as="p"
    variant="body"
    className="text-base sm:text-lg md:text-xl font-nunito italic text-[#5B4775] leading-relaxed max-w-xl"
  >
    &ldquo;{slide.quote}&rdquo;
  </Typography>
</div>
```

### Sesudah (ganti blok di atas dengan):

```tsx
{/* Quote (ayat Alkitab, Nunito italic) + Referensi ayat — Delay ~300ms */}
<div className={isActive ? "animate-slide-quote" : "opacity-0 translate-y-5"}>
  <Typography
    as="p"
    variant="body"
    className="text-sm sm:text-base md:text-lg font-nunito italic text-[#5B4775] leading-relaxed max-w-xl"
  >
    &ldquo;{slide.quote}&rdquo;
  </Typography>
  {slide.verseRef && (
    <p className="mt-1 text-xs sm:text-sm font-nunito text-[#7B6B9A] text-right max-w-xl mx-auto pr-1">
      — {slide.verseRef}
    </p>
  )}
</div>
```

> [!NOTE]
> Ukuran font quote diturunkan satu level (`text-base sm:text-lg md:text-xl` → `text-sm sm:text-base md:text-lg`) agar teks ayat yang lebih panjang tidak overflow pada layar kecil.

---

## 3. Komponen Baru: `SplashScreen`

**File:** `src/components/fragments/SplashScreen.tsx`

```tsx
"use client";

import React from "react";

interface SplashScreenProps {
  /** Nama yang ditampilkan di splash, misal "Fajar Lumenta" */
  name: string;
  /** Callback saat tombol "Mulai" ditekan */
  onStart: () => void;
  /** Ayat dekoratif di bawah tombol (opsional) */
  decorativeVerse?: string;
  /** Referensi ayat dekoratif, misal "Amsal 23:18" */
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
```

**Hierarki:** `SplashScreen` adalah `fragment` — boleh diimport dari `views/`.

---

## 4. Perubahan `FajarLumentaView`

**File:** `src/components/views/FajarLumentaView.tsx`

### 4.1 Tambahan import

```tsx
// Tambahkan import ini
import { SplashScreen } from "@/components/fragments/SplashScreen";
```

### 4.2 Hapus import & data WishSection

```tsx
// HAPUS baris-baris ini:
import { WishSection, WishItem } from "@/components/sections/WishSection";

const defaultWishes: WishItem[] = [ ... ]; // seluruh array
```

### 4.3 Tambah state `splashDone`

Di dalam `FajarLumentaView()`, tambahkan:

```tsx
"use client"; // ← pastikan directive ini ada di baris pertama file

// ...
import React, { useState, useRef, useCallback } from "react";

export default function FajarLumentaView() {
  const [splashDone, setSplashDone] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = useCallback(() => {
    setSplashDone(true);
    // Putar musik segera setelah interaksi user
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio play failed:", err);
      });
    }
  }, []);

  // ... render
```

> [!IMPORTANT]
> `"use client"` **wajib** ditambahkan di baris pertama `FajarLumentaView.tsx` jika belum ada, karena sekarang menggunakan `useState`.

### 4.4 Render lengkap sesudah perubahan

```tsx
"use client";

import React, { useState, useRef, useCallback } from "react";
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
    badge: { icon: "🕊️", label: "Penatua Pemuda", variant: "lavender" },
  },
  {
    id: "2",
    src: "/images/fajar/2.jpg",
    alt: "Fajar Lumenta - Di Balik Ketegasan",
    caption: "Di Balik Ketegasan",
    quote: "Besi menajamkan besi, orang menajamkan sesamanya.",
    verseRef: "Amsal 27:17 (TB)",
    badge: { icon: "📐", label: "Guru Matematika", variant: "yellow" },
  },
  {
    id: "3",
    src: "/images/fajar/3.jpg",
    alt: "Fajar Lumenta - Momen Bersama",
    caption: "Momen Bersama",
    quote:
      "Sungguh, alangkah baiknya dan indahnya, apabila saudara-saudara diam bersama dengan rukun!",
    verseRef: "Mazmur 133:1 (TB)",
    badge: { icon: "🎉", label: "Momen Spesial", variant: "mint" },
  },
  {
    id: "4",
    src: "/images/fajar/4.jpg",
    alt: "Fajar Lumenta - Langkah Iman",
    caption: "Langkah Iman",
    quote:
      "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.",
    verseRef: "Yeremia 29:11 (TB)",
    badge: { icon: "✝️", label: "Iman & Pelayanan", variant: "pink" },
  },
  {
    id: "5",
    src: "/images/fajar/5.jpg",
    alt: "Fajar Lumenta - Fajar yang Sesungguhnya",
    caption: "Fajar yang Sesungguhnya",
    quote:
      "Tak berkesudahan kasih setia TUHAN, tak habis-habisnya rahmat-Nya, selalu baru tiap pagi; besar kesetiaan-Mu!",
    verseRef: "Ratapan 3:22-23 (TB)",
    badge: { icon: "🌅", label: "Fajar Baru", variant: "peach" },
  },
  {
    id: "6",
    src: "/images/fajar/6.jpg",
    alt: "Fajar Lumenta - Selamat Ulang Tahun!",
    caption: "Selamat Ulang Tahun!",
    quote:
      "Terpujilah Tuhan! Hari demi hari Ia menanggung bagi kita; Allah adalah keselamatan kita.",
    verseRef: "Mazmur 68:19 (TB)",
    badge: { icon: "🎂", label: "HBD Fajar!", variant: "pink" },
  },
];

export default function FajarLumentaView() {
  const [splashDone, setSplashDone] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = useCallback(() => {
    setSplashDone(true);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio play failed:", err);
      });
    }
  }, []);

  return (
    <>
      {/* Splash Screen — tampil di depan saat splashDone = false */}
      {!splashDone && (
        <SplashScreen name="Fajar Lumenta" onStart={handleStart} />
      )}

      {/* Konten utama — selalu di-mount agar audio bisa di-preload */}
      <div
        className={`transition-opacity duration-700 ${
          splashDone ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!splashDone}
      >
        <BirthdayLayout>
          <ConfettiParticle />

          <PageWrapper>
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

            <HeroSection name="Fajar Lumenta" />
          </PageWrapper>

          <PhotoSlideSection slides={defaultSlides} />

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

          {/* Audio preloaded tapi diplay via handleStart */}
          <audio
            ref={audioRef}
            src="/audio/happy-birthday.mp3"
            loop
            preload="auto"
          />

          {/* Tombol toggle musik tetap ada setelah splash done */}
          {splashDone && <MusicPlayer src="/audio/happy-birthday.mp3" />}
        </BirthdayLayout>
      </div>
    </>
  );
}
```

> [!WARNING]
> `MusicPlayer` memiliki `<audio>` element-nya sendiri. Karena sekarang `FajarLumentaView` juga memegang `audioRef` untuk play pertama kali via splash, ada **dua audio element** yang berpotensi konflik. Ada dua pilihan penyelesaian:
>
> **Opsi A (Direkomendasikan):** Upgrade `MusicPlayer` agar menerima prop `audioRef` eksternal, sehingga satu `<audio>` dipakai bersama.
>
> **Opsi B (Sederhana):** Setelah `splashDone = true`, sembunyikan `audioRef` yang dipakai splash dan biarkan `MusicPlayer` mengurus audio-nya sendiri — user cukup menekan tombol musik untuk melanjutkan.

---

## 5. Spesifikasi Animasi Splash

| Perilaku | Implementasi |
|---|---|
| Splash muncul | Langsung tampil (`fixed inset-0 z-50`), tidak butuh animasi masuk |
| Konten utama tersembunyi | `opacity-0 pointer-events-none` selama `splashDone = false` |
| Transisi saat "Mulai" ditekan | `setSplashDone(true)` → konten fade-in via `transition-opacity duration-700` |
| Splash menghilang | Conditional render: `{!splashDone && <SplashScreen />}` — langsung unmount |
| Tombol hover | `hover:scale-105 active:scale-95 transition-all duration-300` |

> [!TIP]
> Menggunakan unmount (`{!splashDone && ...}`) daripada animasi fade-out pada splash agar lebih sederhana. Jika ingin efek fade-out splash yang halus, tambahkan state `splashFading` dan delay unmount ~600ms dengan `setTimeout`.

---

## 6. Urutan Implementasi

```
1. Edit PhotoSlideSection.tsx  → tambah verseRef pada PhotoSlideItem
2. Edit PhotoSlide.tsx         → render verseRef di bawah quote
3. Buat SplashScreen.tsx       → komponen fragment baru
4. Edit FajarLumentaView.tsx   → state splashDone, hapus WishSection, update data slides
```

---

## 7. Checklist TypeScript

- [ ] `PhotoSlideItem.verseRef` bertipe `string | undefined` (optional `?`)
- [ ] `SplashScreen` props: `name: string`, `onStart: () => void`, `decorativeVerse?: string`, `decorativeVerseRef?: string`
- [ ] `FajarLumentaView` menggunakan `"use client"` directive
- [ ] Tidak ada `any` type yang diperkenalkan
- [ ] `npm run build` selesai tanpa error

---

## 8. Checklist Aksesibilitas

- [ ] `<button>` Mulai memiliki `aria-label` deskriptif
- [ ] Konten utama memiliki `aria-hidden={!splashDone}` selama splash aktif
- [ ] `verseRef` ditampilkan sebagai teks biasa (bukan tooltip), dapat dibaca screen reader
- [ ] Tombol musik (`MusicPlayer`) tetap memiliki `aria-label` toggle

---

## 9. Data Ayat Alkitab (Terjemahan Baru — TB)

Referensi final yang digunakan dalam kode:

| Slide | `caption` | `quote` (Terjemahan Baru) | `verseRef` |
|---|---|---|---|
| 1 | Sang Penatua Muda | "Jangan seorang pun menganggap engkau rendah karena engkau muda. Jadilah teladan bagi orang-orang percaya, dalam perkataanmu, dalam tingkah lakumu, dalam kasihmu, dalam kesetiaanmu dan dalam kesucianmu." | `1 Timotius 4:12 (TB)` |
| 2 | Di Balik Ketegasan | "Besi menajamkan besi, orang menajamkan sesamanya." | `Amsal 27:17 (TB)` |
| 3 | Momen Bersama | "Sungguh, alangkah baiknya dan indahnya, apabila saudara-saudara diam bersama dengan rukun!" | `Mazmur 133:1 (TB)` |
| 4 | Langkah Iman | "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan." | `Yeremia 29:11 (TB)` |
| 5 | Fajar yang Sesungguhnya | "Tak berkesudahan kasih setia TUHAN, tak habis-habisnya rahmat-Nya, selalu baru tiap pagi; besar kesetiaan-Mu!" | `Ratapan 3:22-23 (TB)` |
| 6 | Selamat Ulang Tahun! | "Terpujilah Tuhan! Hari demi hari Ia menanggung bagi kita; Allah adalah keselamatan kita." | `Mazmur 68:19 (TB)` |
