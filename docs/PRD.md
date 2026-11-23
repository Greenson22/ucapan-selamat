# 📋 Product Requirements Document (PRD)

> **Proyek:** ucapan-selamat  
> **Versi:** 1.0.0  
> **Tanggal:** 2026-11-23  
> **Status:** Draft  

---

## 1. Latar Belakang & Tujuan

### 1.1 Latar Belakang

Proyek `ucapan-selamat` adalah aplikasi web berbasis **Next.js 16 (App Router)** yang bertujuan menjadi platform digital untuk menyampaikan ucapan selamat yang personal dan berkesan. Halaman pertama yang dibangun adalah halaman ulang tahun untuk **Fajar Lumenta**.

### 1.2 Tujuan Produk

- Menyediakan halaman ucapan ulang tahun yang **estetik, personal, dan mobile-responsif**
- Membangun **arsitektur komponen yang skalabel** agar halaman baru mudah ditambahkan
- Menetapkan **standar kode dan struktur folder** yang konsisten untuk seluruh tim / AI agent

### 1.3 Target Pengguna

| Peran | Deskripsi |
|-------|-----------|
| **Penerima** | Fajar Lumenta — orang yang menerima ucapan selamat |
| **Pengirim** | Orang-orang yang ingin memberikan ucapan |
| **Admin/Dev** | Developer atau AI yang menambahkan halaman baru |

---

## 2. Arsitektur Proyek

### 2.1 Stack Teknologi

| Teknologi | Versi | Peran |
|-----------|-------|-------|
| Next.js | 16.4.6 | Framework (App Router) |
| React | 19.3.0 | UI Library |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | 4.3.3 | Styling |
| `@tailwindcss/turbopack` | 4.3.3 | CSS bundler saat dev |

### 2.2 Struktur Folder

```
ucapan-selamat/
├── src/                              ← Seluruh source code aplikasi
│   ├── app/                          ← Next.js App Router (routing ONLY)
│   │   ├── layout.tsx                ← Root layout (html, body, global providers)
│   │   ├── page.tsx                  ← Halaman utama "/"
│   │   ├── globals.css               ← CSS global + Tailwind directives
│   │   └── happy-birthday/           ← Route group halaman ulang tahun
│   │       ├── page.tsx              ← Index "/happy-birthday"
│   │       └── fajar-lumenta/
│   │           └── page.tsx          ← "/happy-birthday/fajar-lumenta"
│   │
│   └── components/                   ← Semua komponen UI (non-routable)
│       ├── elements/                 ← [ATOM] Unit terkecil UI
│       ├── fragments/                ← [MOLECULE] Gabungan beberapa element
│       ├── sections/                 ← [ORGANISM] Bagian halaman besar
│       ├── layouts/                  ← [TEMPLATE] Struktur layout halaman
│       └── views/                    ← [PAGE-LEVEL] Komposisi penuh satu halaman
│
├── public/                           ← Aset statis
│   ├── images/
│   │   └── fajar/                    ← Foto-foto untuk halaman Fajar Lumenta
│   └── audio/
│       └── happy-birthday.mp3        ← BGM ulang tahun
│
└── docs/                             ← Dokumentasi proyek
    └── PRD.md                        ← Dokumen ini
```

### 2.3 Hierarki Komponen

```
views/           ← Menyusun sections + layouts menjadi satu halaman
  └── sections/  ← Menyusun fragments menjadi blok halaman
        └── fragments/ ← Menyusun elements menjadi UI yang bermakna
              └── elements/ ← Unit UI paling kecil (button, text, icon)

layouts/         ← Standalone — wrapper struktur halaman (tidak menyusun sections)
```

#### Aturan Penting Hierarki
- `elements/` → **TIDAK boleh** import dari `fragments/`, `sections/`, `views/`, `layouts/`
- `fragments/` → Boleh import dari `elements/` saja
- `sections/` → Boleh import dari `elements/` dan `fragments/`
- `layouts/` → Boleh import dari `elements/` saja
- `views/` → Boleh import dari semua layer di bawahnya
- `app/` → Hanya import dari `views/`, `layouts/`, atau langsung `sections/` jika sederhana

---

## 3. Konvensi Penamaan

### 3.1 File & Folder

| Kategori | Konvensi | Contoh |
|----------|----------|--------|
| Komponen React | `PascalCase.tsx` | `PhotoCard.tsx` |
| Halaman Next.js | lowercase (`page.tsx`) | `page.tsx` |
| Layout Next.js | lowercase (`layout.tsx`) | `layout.tsx` |
| Folder route | `kebab-case` | `fajar-lumenta/` |
| Folder komponen | `camelCase` | `elements/`, `fragments/` |
| Aset gambar | `kebab-case` | `fajar-foto-01.jpg` |
| File CSS | `camelCase.module.css` (jika perlu) | `hero.module.css` |

### 3.2 Komponen

```tsx
// ✅ BENAR — named export untuk komponen non-page
export function PhotoCard({ src, caption }: PhotoCardProps) { ... }

// ✅ BENAR — default export untuk page dan view
export default function FajarLumentaView() { ... }

// ✅ BENAR — interface props dengan suffix "Props"
interface PhotoCardProps {
  src: string;
  caption?: string;
  alt: string;
}
```

### 3.3 Import Alias

Semua import menggunakan alias `@/` yang merujuk ke `src/`:

```tsx
// ✅ BENAR
import { PhotoCard } from "@/components/fragments/PhotoCard";
import { HeroSection } from "@/components/sections/HeroSection";

// ❌ SALAH (relative path panjang)
import { PhotoCard } from "../../fragments/PhotoCard";
```

---

## 4. Spesifikasi Halaman

### 4.1 Halaman Index `/happy-birthday`

**Tujuan:** Landing page yang menampilkan daftar halaman ucapan ulang tahun yang tersedia.

**Konten:**
- Judul "🎂 Ucapan Selamat Ulang Tahun"
- Grid kartu halaman yang tersedia (saat ini: Fajar Lumenta)
- Link ke masing-masing halaman

---

### 4.2 Halaman `/happy-birthday/fajar-lumenta`

**Tujuan:** Halaman ucapan ulang tahun personal untuk Fajar Lumenta.

#### 4.2.1 Section: Hero

| Elemen | Detail |
|--------|--------|
| Judul utama | "Happy Birthday, Fajar Lumenta! 🎂" |
| Subjudul | Pesan singkat pembuka yang hangat |
| Animasi | Confetti jatuh dari atas + balloon mengambang |
| Background | Gradient pastel (lavender → pink → mint) |
| Font | Pacifico (heading), Nunito (body) |

#### 4.2.2 Section: Gallery Foto

| Elemen | Detail |
|--------|--------|
| Layout | Grid masonry: 1 col mobile, 2 col tablet, 3 col desktop |
| Komponen | `PhotoCard` — style polaroid (white frame + shadow + caption) |
| Interaksi | Hover: slight rotate + scale up (shake/tilt effect) |
| Placeholder | 6 slot foto default (`public/images/fajar/foto-{01-06}.jpg`) |

#### 4.2.3 Section: Ucapan Selamat

| Elemen | Detail |
|--------|--------|
| Komponen | `WishCard` — kartu ucapan dengan icon + teks |
| Jumlah | Minimum 4 kartu ucapan |
| Interaksi | Hover: lift effect + warna border berubah |
| Konten | Ucapan-ucapan positif dan hangat |

#### 4.2.4 Fragment: Music Player

| Elemen | Detail |
|--------|--------|
| Posisi | Floating button pojok kanan bawah |
| State | Play / Pause dengan ikon animasi |
| Audio | `public/audio/happy-birthday.mp3` |
| Behavior | Autoplay (muted) → user click play untuk unmute |
| Animasi | Tombol pulse saat musik playing |

---

## 5. Desain Visual

### 5.1 Color Palette (Playful & Pastel)

| Token | Hex | Penggunaan |
|-------|-----|------------|
| `--color-pastel-pink` | `#FFB3C6` | Background aksen, badge, border |
| `--color-pastel-lavender` | `#C9B1E8` | Hero gradient mulai |
| `--color-pastel-yellow` | `#FFF0A3` | Kartu ucapan background |
| `--color-pastel-mint` | `#B2F0D6` | Foto frame, aksen hijau |
| `--color-pastel-peach` | `#FFCBA4` | Button hover, aksen oranye |
| `--color-text-dark` | `#3D2C52` | Teks utama (gelap ungu) |
| `--color-text-mid` | `#7B6B9A` | Teks sekunder |
| `--color-bg-base` | `#FFF9FC` | Background halaman |

### 5.2 Typography

| Peran | Font | Weight | Size (mobile → desktop) |
|-------|------|--------|--------------------------|
| Heading H1 | Pacifico | 400 | `2.5rem` → `4rem` |
| Heading H2 | Pacifico | 400 | `1.75rem` → `2.5rem` |
| Body | Nunito | 400–700 | `1rem` → `1.125rem` |
| Caption | Nunito | 400 | `0.875rem` |
| Badge | Nunito | 700 | `0.875rem` |

### 5.3 Spacing & Layout

- **Max width halaman:** `1200px`
- **Padding horizontal:** `1rem` (mobile), `2rem` (tablet), `4rem` (desktop)
- **Border radius default:** `1rem` (kartu), `9999px` (badge/button)
- **Shadow kartu:** `0 8px 32px rgba(0,0,0,0.08)`

### 5.4 Animasi & Interaksi

| Animasi | Trigger | Durasi | Detail |
|---------|---------|--------|--------|
| Confetti | On load | ∞ loop | Partikel warna-warni jatuh dari atas |
| Balloon | On load | ∞ loop | 3–5 balon mengambang naik pelan |
| Photo hover | Hover | 200ms | Rotasi ±3° + scale 1.05 |
| Wish card hover | Hover | 200ms | translateY(-8px) + shadow deeper |
| Music pulse | While playing | ∞ loop | Ring pulse animation di tombol |

---

## 6. Responsivitas

### Breakpoints (Tailwind CSS v4)

| Nama | Min-width | Perangkat |
|------|-----------|-----------|
| default | 0 | Mobile (320px+) |
| `sm` | 640px | Mobile landscape / Small tablet |
| `md` | 768px | Tablet portrait |
| `lg` | 1024px | Tablet landscape / Desktop kecil |
| `xl` | 1280px | Desktop |

### Mobile-First Rules
- **Semua komponen** dirancang mobile-first
- Foto grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Font heading: `text-4xl md:text-5xl lg:text-6xl`
- Musik player: selalu visible di semua ukuran layar

---

## 7. Aksesibilitas

- Semua gambar harus memiliki atribut `alt` deskriptif
- Tombol musik harus memiliki `aria-label` dan `aria-pressed`
- Kontras warna minimum WCAG AA (4.5:1 untuk teks normal)
- Halaman dapat dinavigasi dengan keyboard
- Animasi menghormati `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Aset yang Dibutuhkan

### 8.1 Gambar

| Path | Ukuran Rekomendasi | Format | Keterangan |
|------|--------------------|--------|------------|
| `public/images/fajar/foto-01.jpg` | 800×800px | WebP/JPEG | Foto Fajar #1 |
| `public/images/fajar/foto-02.jpg` | 800×800px | WebP/JPEG | Foto Fajar #2 |
| `public/images/fajar/foto-03.jpg` | 800×800px | WebP/JPEG | Foto Fajar #3 |
| `public/images/fajar/foto-04.jpg` | 800×800px | WebP/JPEG | Foto Fajar #4 |
| `public/images/fajar/foto-05.jpg` | 800×800px | WebP/JPEG | Foto Fajar #5 |
| `public/images/fajar/foto-06.jpg` | 800×800px | WebP/JPEG | Foto Fajar #6 |

> **Catatan:** Jika foto belum tersedia, placeholder gradient berwarna akan digunakan.

### 8.2 Audio

| Path | Format | Keterangan |
|------|--------|------------|
| `public/audio/happy-birthday.mp3` | MP3, 128kbps+ | BGM lagu Happy Birthday |

> **Catatan:** File audio harus bebas lisensi (royalty-free) atau milik sendiri.

---

## 9. Fase Pengembangan

### Fase 1 — Fondasi (Saat Ini)
- [x] Setup tsconfig dengan alias `@/*` → `src/`
- [ ] Migrasi `app/` ke `src/app/`
- [ ] Buat struktur folder `src/components/`
- [ ] Update `AGENTS.md` dengan aturan folder

### Fase 2 — Komponen Dasar
- [ ] Buat element components (Typography, Badge, ConfettiParticle, MusicToggleButton)
- [ ] Buat fragment components (PhotoCard, WishCard, MusicPlayer)
- [ ] Buat layout components (PageWrapper, BirthdayLayout)

### Fase 3 — Halaman Fajar Lumenta
- [ ] Buat HeroSection dengan animasi
- [ ] Buat GallerySection dengan foto placeholder
- [ ] Buat WishSection dengan kartu ucapan
- [ ] Susun FajarLumentaView
- [ ] Buat `/happy-birthday/fajar-lumenta/page.tsx`

### Fase 4 — Polish & QA
- [ ] Verifikasi responsivitas di semua breakpoint
- [ ] Tambah `prefers-reduced-motion`
- [ ] Audit aksesibilitas
- [ ] Build production check

---

## 10. Kriteria Penerimaan (Acceptance Criteria)

| # | Kriteria | Priority |
|---|----------|----------|
| AC-01 | Halaman `/happy-birthday/fajar-lumenta` dapat dibuka tanpa error | 🔴 Must |
| AC-02 | Tampilan mobile responsif di 375px (iPhone SE) | 🔴 Must |
| AC-03 | Animasi confetti dan balloon berjalan saat halaman dimuat | 🔴 Must |
| AC-04 | Foto gallery tampil dengan layout grid yang benar | 🔴 Must |
| AC-05 | Kartu ucapan tampil dengan styling yang estetik | 🔴 Must |
| AC-06 | Tombol musik dapat toggle play/pause | 🔴 Must |
| AC-07 | Build production (`npm run build`) berhasil tanpa error | 🔴 Must |
| AC-08 | TypeScript type check (`tsc --noEmit`) bersih | 🟡 Should |
| AC-09 | Halaman index `/happy-birthday` dapat dibuka | 🟡 Should |
| AC-10 | Animasi menghormati `prefers-reduced-motion` | 🟢 Nice |

---

## 11. Referensi

- [Next.js 16 App Router Docs](https://nextjs.org/docs/app)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Google Fonts — Pacifico](https://fonts.google.com/specimen/Pacifico)
- [Google Fonts — Nunito](https://fonts.google.com/specimen/Nunito)
- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
