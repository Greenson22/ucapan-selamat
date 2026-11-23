# PRD — Halaman Ucapan Ulang Tahun: Fajar Lumenta

> **Versi:** 1.1.0  
> **Tanggal:** 2026-11-23  
> **Status:** ✅ Disetujui & Siap Implementasi

---

## 1. Latar Belakang & Tujuan

Halaman `/happy-birthday/fajar-lumenta` adalah halaman ucapan ulang tahun digital yang personal dan imersif untuk **Fajar Lumenta** — seorang:

- 🕊️ **Penatua Pemuda GMIM Sion Raanan** (baru dilantik)
- 📐 **Guru Matematika** yang dikenal tegas namun berhati hangat

Tujuan halaman ini adalah menciptakan pengalaman visual yang berkesan, bukan sekadar galeri foto biasa. Setiap foto disajikan dalam satu "panggung penuh layar" dengan kata-kata yang relevan dengan identitas dan perjalanan Fajar.

---

## 2. Pengguna & Konteks

| Atribut | Detail |
|---|---|
| Pembaca utama | Fajar Lumenta & lingkaran terdekatnya |
| Perangkat | Mobile-first (smartphone), desktop sebagai bonus |
| Momen | Hari ulang tahun Fajar Lumenta |
| Nuansa | Hangat, personal, penuh penghargaan, sedikit humor mengingat sisi "galak-tapi-baik" beliau |

---

## 3. Fitur Utama yang Dibangun

### 3.1 Scroll-Snap Photo Sections (`PhotoSlideSection`)

**Deskripsi:**  
Menggantikan `GallerySection` lama. Setiap foto ditampilkan dalam satu section penuh layar (`100vh`), dengan perilaku **vertical scroll-snap** — saat pengguna menggulir, layar "terkunci" tepat di foto berikutnya.

**Perilaku Scroll:**
- CSS `scroll-snap-type: y mandatory` pada container
- Tiap slide: `scroll-snap-align: start`, tinggi `100vh`
- Smooth scroll antar slide
- Mendukung swipe gesture di mobile secara native

**Layout tiap slide (komposisi vertikal):**
```
┌─────────────────────────────────┐
│                                 │  ← 60vh
│          [FOTO FAJAR]           │
│       (object-fit: cover)       │
│                                 │
├─────────────────────────────────┤
│  [Caption / Judul Foto]         │  ← Pacifico, besar
│  [Quote / Kata Motivasi]        │  ← Nunito, italic
│  [Badge Peran]                  │  ← misal: 🕊️ Penatua / 📐 Guru
└─────────────────────────────────┘  ← 40vh
```

**Animasi saat masuk (IntersectionObserver):**
- Foto: `fade-in` + `slide-up` ketika slide menjadi aktif
- Teks: staggered `fade-in` setelah foto muncul (delay 150ms per baris)

---

### 3.2 Konten Caption & Quote Per Foto

AI menentukan caption berdasarkan identitas Fajar. Semua teks dalam **Bahasa Indonesia**, nuansa hangat namun tidak berlebihan.

| # | Foto | Caption (Pacifico) | Quote / Kata Motivasi (Nunito italic) | Badge |
|---|---|---|---|---|
| 1 | `1.jpg` | Sang Penatua Muda | _"Kepemimpinan sejati lahir dari hati yang melayani."_ | 🕊️ Penatua Pemuda |
| 2 | `2.jpg` | Di Balik Ketegasan | _"Guru terbaik bukan yang tak pernah marah, tapi yang marahnya penuh kasih."_ | 📐 Guru Matematika |
| 3 | `3.jpg` | Momen Bersama | _"Hidup paling bermakna saat dirayakan bersama orang-orang yang kita cintai."_ | 🎉 Momen Spesial |
| 4 | `4.jpg` | Langkah Iman | _"Setiap tanggung jawab baru adalah kepercayaan Tuhan yang digenapkan."_ | ✝️ Iman & Pelayanan |
| 5 | `5.jpg` | Fajar yang Sesungguhnya | _"Namamu bukan kebetulan — kamu memang selalu jadi awal dari hal-hal baik."_ | 🌅 Fajar Baru |
| 6 | `6.jpg` | Selamat Ulang Tahun! | _"Semoga usiamu bertambah, ilmumu semakin tajam, dan hatimu tetap hangat."_ | 🎂 HBD Fajar! |

> **Catatan implementasi:** Konten ini hardcoded di `FajarLumentaView.tsx` sebagai array `PhotoSlide[]`. Caption bisa direvisi kapan saja tanpa mengubah logika komponen.

---

### 3.3 Dot Navigator Vertikal (`SlideNavigator`)

**Posisi:** Sisi kanan layar, center vertikal (`fixed`, `right-4`, `top-50%`)

**Perilaku:**
- 6 dot kecil (satu per slide)
- Dot aktif: membesar + warna solid (pink `#FFB3C6` atau lavender `#C9B1E8`)
- Dot tidak aktif: kecil + transparan / outline
- Klik dot → scroll ke slide yang sesuai (smooth)
- Tooltip saat hover: nama caption foto

**Aksesibilitas:**
- `aria-label="Navigasi foto ke-N"`
- Keyboard navigable

---

### 3.4 Lightbox / Full-Screen Foto (`PhotoLightbox`)

**Trigger:** Tap/klik pada foto di dalam slide

**Perilaku:**
- Modal overlay gelap (`bg-black/85`)
- Foto ditampilkan penuh dengan `object-contain`
- Tombol tutup (×) di pojok kanan atas
- Swipe kiri/kanan untuk navigasi antar foto dalam lightbox
- Tombol panah prev/next
- Tekan `Escape` untuk menutup

---

### 3.5 Hero Section (Tetap Ada, Tanpa Perubahan)

Tidak diubah. Tetap menjadi section pertama sebelum scroll-snap dimulai.

---

### 3.6 WishSection (Tetap Ada, Setelah Photo Slides)

Tidak diubah. Muncul setelah 6 slide foto habis di-scroll.

---

## 4. Arsitektur Komponen

```
app/happy-birthday/fajar-lumenta/page.tsx
└── FajarLumentaView                          [view]
    ├── BirthdayLayout                        [layout]
    │   ├── ConfettiParticle                  [element]
    │   └── PageWrapper                       [layout]
    │       ├── <nav>                         [inline]
    │       ├── HeroSection                   [section] ← tidak berubah
    │       ├── PhotoSlideSection             [section] ← BARU (ganti GallerySection)
    │       │   ├── PhotoSlide × 6            [fragment] ← BARU
    │       │   │   ├── <img> / next/image    [element]
    │       │   │   ├── Caption               [element]
    │       │   │   ├── Quote                 [element]
    │       │   │   └── RoleBadge             [element]
    │       │   └── SlideNavigator            [fragment] ← BARU
    │       ├── PhotoLightbox                 [fragment] ← BARU
    │       ├── WishSection                   [section] ← tidak berubah
    │       └── <footer>                      [inline]
    └── MusicPlayer                           [fragment] ← tidak berubah
```

---

## 5. Domain Model

### Entitas Utama

```ts
interface PhotoSlide {
  id: string;               // "1" – "6"
  src: string;              // "/images/fajar/1.jpg"
  alt: string;              // deskripsi aksesibilitas
  caption: string;          // judul slide (Pacifico)
  quote: string;            // kata motivasi (Nunito italic)
  badge: {
    icon: string;           // emoji
    label: string;          // teks badge
  };
}

interface SlideNavigatorProps {
  total: number;            // 6
  activeIndex: number;      // 0–5
  onNavigate: (index: number) => void;
}

interface PhotoLightboxProps {
  slides: PhotoSlide[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}
```

### State Management

Semua state lokal — tidak ada global state manager yang dibutuhkan:

| State | Lokasi | Tipe | Deskripsi |
|---|---|---|---|
| `activeSlideIndex` | `PhotoSlideSection` | `number` | Slide yang sedang di-viewport |
| `lightboxOpen` | `PhotoSlideSection` | `boolean` | Apakah lightbox terbuka |
| `lightboxIndex` | `PhotoSlideSection` | `number` | Foto yang dibuka di lightbox |

---

## 6. Stack Teknis & Batasan

| Aspek | Keputusan |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Animasi | CSS `@keyframes` + IntersectionObserver (tidak menambah dependency baru) |
| Scroll Snap | CSS Native (`scroll-snap-type`, `scroll-snap-align`) |
| Lightbox | Custom komponen — tidak menggunakan library pihak ketiga |
| Font | Pacifico (heading/caption), Nunito (body/quote) |
| Gambar | `next/image` dengan `sizes` responsif |
| Import | Wajib menggunakan alias `@/` |

---

## 7. Spesifikasi Visual

### Warna Tema (Pastel Palette)

| Token | Hex | Digunakan Untuk |
|---|---|---|
| Pink | `#FFB3C6` | Dot aktif, aksen badge |
| Lavender | `#C9B1E8` | Dot navigator alternatif |
| Mint | `#B2F0D6` | Badge warna 3 |
| Yellow | `#FFF0A3` | Badge warna 4 |
| Dark Purple | `#3D2C52` | Teks utama |
| Purple mid | `#7B6B9A` | Teks sekunder/quote |

### Tipografi Slide

| Elemen | Font | Size | Weight |
|---|---|---|---|
| Caption / Judul | Pacifico | `2xl` – `3xl` | 400 (default Pacifico) |
| Quote | Nunito | `sm` – `base` | 400, italic |
| Badge label | Nunito | `xs` – `sm` | 700 (bold) |

---

## 8. Kriteria Selesai (Definition of Done)

- [ ] `GallerySection` lama **dihapus** dari `FajarLumentaView`
- [ ] `PhotoSlideSection` tampil dengan 6 slide, full `100vh`, scroll-snap aktif
- [ ] Setiap slide menampilkan foto asli (`1.jpg` – `6.jpg`), caption, quote, dan badge
- [ ] Animasi `fade-in` + `slide-up` aktif saat slide masuk viewport
- [ ] Dot navigator (`SlideNavigator`) tampil di kanan layar, aktif mengikuti scroll
- [ ] Klik dot → scroll smooth ke slide tersebut
- [ ] Klik foto → lightbox terbuka (`PhotoLightbox`)
- [ ] Lightbox mendukung navigasi prev/next + tutup via × atau `Escape`
- [ ] `WishSection` dan `HeroSection` **tidak berubah**
- [ ] Responsive: mobile-first, breakpoint `sm/md/lg` Tailwind
- [ ] Tidak ada `console.error` / TypeScript error saat `npm run build`
- [ ] Semua import menggunakan alias `@/`

---

## 9. Out of Scope

- Animasi parallax kompleks (bisa jadi iterasi berikutnya)
- Backend / database (halaman statis)
- Autentikasi atau akses terbatas
- Halaman ucapan untuk orang lain (PRD ini khusus Fajar Lumenta)

---

## 10. Referensi

- Struktur komponen: `AGENTS.md`
- Foto asli: `public/images/fajar/` — `1.jpg` s.d. `6.jpg`
- Audio BGM: `public/audio/happy-birthday.mp3`
- Halaman: `src/app/happy-birthday/fajar-lumenta/page.tsx`
- View utama: `src/components/views/FajarLumentaView.tsx`
