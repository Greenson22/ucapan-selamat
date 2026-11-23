# PRD — Revamp: Splash Screen + Ayat Alkitab per Foto

> **Versi:** 1.0.0
> **Tanggal:** 2026-11-23
> **Status:** 🟡 Draft — Siap Review
> **Folder fitur:** `docs/fajar-birthday/bible-verse-revamp/`

---

## 1. Latar Belakang & Tujuan

Revamp ini merupakan iterasi lanjutan dari halaman `/happy-birthday/fajar-lumenta` yang sebelumnya sudah memiliki scroll-snap photo slides. Ada dua perubahan utama yang diminta:

1. **Splash / Landing Screen** — saat halaman pertama kali dibuka, pengguna disambut layar penuh sebelum melihat konten. Musik dan foto baru mulai saat pengguna secara aktif menekan tombol **"Mulai"**.
2. **Caption diganti Ayat Alkitab** — setiap quote di bawah foto (posisi Nunito italic) diganti dengan kutipan ayat Alkitab yang relevan dengan konteks foto dan identitas Fajar (penatua pemuda GMIM, guru Matematika).
3. **Hapus WishSection** — bagian "Untaian Doa & Ucapan Hangat" dihapus sepenuhnya. Slide foto ke-6 menjadi penutup alami, dilanjutkan langsung dengan footer.

Tujuannya: memperkuat nuansa rohani dan personal, sekaligus memberikan momen "pembukaan" yang dramatis sebelum konten dimulai.

---

## 2. Pengguna & Konteks

| Atribut        | Detail                                                                                 |
|----------------|----------------------------------------------------------------------------------------|
| Pembaca utama  | Fajar Lumenta & lingkaran terdekatnya                                                  |
| Perangkat      | Mobile-first (smartphone), desktop sebagai bonus                                       |
| Momen          | Hari ulang tahun Fajar Lumenta                                                        |
| Nuansa baru    | Rohani, hangat, personal — lebih mendalam secara spiritual dibanding versi sebelumnya |

---

## 3. Perubahan yang Dikerjakan

### 3.1 Splash / Landing Screen (`SplashScreen`)

**Deskripsi:**
Saat halaman `/happy-birthday/fajar-lumenta` pertama kali dibuka, seluruh konten utama (HeroSection, PhotoSlideSection, footer) tersembunyi di belakang layar penuh (_fullscreen splash_). Konten baru muncul setelah tombol ditekan.

**Tata Letak Splash (komposisi vertikal, `100dvh`):**
```
┌─────────────────────────────────────┐
│                                     │
│    [Foto latar / gradient pastel]   │  ← bg-cover, overlay gelap ringan
│                                     │
│         Selamat Ulang Tahun         │  ← Pacifico, text-3xl, putih
│           Fajar Lumenta 🎂          │  ← Pacifico, text-5xl, pink pastel
│                                     │
│   ┌─────────────────────────────┐   │
│   │       ▶  Mulai              │   │  ← Tombol besar, Nunito bold
│   └─────────────────────────────┘   │
│                                     │
│   "Karena masa depan sungguh ada,   │  ← Ayat kecil (opsional/dekoratif)
│    dan harapanmu tidak akan sia."   │
│           — Amsal 23:18             │
└─────────────────────────────────────┘
```

**Perilaku saat tombol "Mulai" ditekan:**
1. Splash screen menghilang dengan animasi `fade-out` (durasi ~600ms).
2. Musik BGM (`/audio/happy-birthday.mp3`) mulai diputar.
3. Halaman utama (HeroSection → PhotoSlideSection) muncul dengan `fade-in`.
4. Scroll position diatur ke atas (`window.scrollTo(0, 0)`).

> [!IMPORTANT]
> Musik hanya boleh mulai diputar **setelah interaksi pengguna** (klik tombol "Mulai") untuk mematuhi kebijakan autoplay browser.

**State:**
| State | Tipe | Nilai awal | Deskripsi |
|---|---|---|---|
| `splashDone` | `boolean` | `false` | `true` setelah tombol ditekan |

**Animasi:**
- Splash: `opacity: 1 → 0`, `pointer-events: none` setelah animasi selesai
- Konten utama: `opacity: 0 → 1` dimulai saat `splashDone = true`

---

### 3.2 Ayat Alkitab per Foto (menggantikan `quote`)

**Perubahan:** Field `quote` pada setiap `PhotoSlideItem` diganti dengan kutipan ayat Alkitab. Format tampilan tetap sama (Nunito italic, baris bawah foto), namun ditambah **referensi ayat** (misal: `— Yeremia 29:11`).

**Tabel Konten per Slide:**

| # | Foto | Caption (Pacifico) | Ayat Alkitab (Nunito italic) | Referensi | Badge |
|---|---|---|---|---|---|
| 1 | `1.jpg` | Sang Penatua Muda | _"Jangan seorang pun menganggap engkau rendah karena engkau muda. Jadilah teladan bagi orang-orang percaya, dalam perkataanmu, dalam tingkah lakumu, dalam kasihmu, dalam kesetiaanmu dan dalam kesucianmu."_ | 1 Timotius 4:12 (TB) | 🕊️ Penatua Pemuda |
| 2 | `2.jpg` | Di Balik Ketegasan | _"Besi menajamkan besi, orang menajamkan sesamanya."_ | Amsal 27:17 (TB) | 📐 Guru Matematika |
| 3 | `3.jpg` | Momen Bersama | _"Sungguh, alangkah baiknya dan indahnya, apabila saudara-saudara diam bersama dengan rukun!"_ | Mazmur 133:1 (TB) | 🎉 Momen Spesial |
| 4 | `4.jpg` | Langkah Iman | _"Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan."_ | Yeremia 29:11 (TB) | ✝️ Iman & Pelayanan |
| 5 | `5.jpg` | Fajar yang Sesungguhnya | _"Tak berkesudahan kasih setia TUHAN, tak habis-habisnya rahmat-Nya, selalu baru tiap pagi; besar kesetiaan-Mu!"_ | Ratapan 3:22-23 (TB) | 🌅 Fajar Baru |
| 6 | `6.jpg` | Selamat Ulang Tahun! | _"Terpujilah Tuhan! Hari demi hari Ia menanggung bagi kita; Allah adalah keselamatan kita."_ | Mazmur 68:19 (TB) | 🎂 HBD Fajar! |

> [!NOTE]
> Ayat-ayat di atas dipilih berdasarkan konteks identitas Fajar (penatua pemuda, guru, karakter). Dapat direvisi kapan saja di `FajarLumentaView.tsx` tanpa mengubah struktur komponen.

**Perubahan struktur data `PhotoSlideItem`:**
```ts
// Sebelumnya
interface PhotoSlideItem {
  quote: string; // kata motivasi biasa
}

// Sesudah — tambah field referensi
interface PhotoSlideItem {
  quote: string;        // teks ayat Alkitab
  verseRef?: string;    // referensi (opsional), misal: "Yeremia 29:11"
}
```

**Tampilan referensi ayat:**
```
┌──────────────────────────────────────┐
│  [Foto]                              │
├──────────────────────────────────────┤
│  Sang Penatua Muda          [Badge]  │  ← Caption, Pacifico
│                                      │
│  "Janganlah seorang pun              │  ← Quote, Nunito italic
│   menganggap engkau rendah           │
│   karena engkau muda."               │
│                              — 1 Tim 4:12  │  ← Referensi, Nunito sm, right-aligned
└──────────────────────────────────────┘
```

---

### 3.3 Hapus WishSection

**Perubahan:**
- Komponen `<WishSection>` dan data `defaultWishes` dihapus dari `FajarLumentaView.tsx`.
- Slide foto ke-6 ("Selamat Ulang Tahun!") menjadi penutup alami.
- Footer tetap ada, langsung setelah `PhotoSlideSection`.

> [!WARNING]
> File `src/components/sections/WishSection.tsx` dan `src/components/fragments/WishCard.tsx` **tidak perlu dihapus** dari filesystem — cukup tidak di-import dan tidak dirender di `FajarLumentaView`. Ini menjaga kemungkinan reuse di halaman lain.

---

## 4. Arsitektur Komponen

```
app/happy-birthday/fajar-lumenta/page.tsx
└── FajarLumentaView                          [view]
    ├── SplashScreen                          [fragment] ← BARU
    │   ├── <div> latar (gradient / foto)     [inline]
    │   ├── <h1> nama + judul                 [inline]
    │   ├── <button> "Mulai"                  [element] ← tombol utama
    │   └── <p> ayat dekoratif               [inline]
    ├── BirthdayLayout                        [layout] ← tampil setelah splashDone
    │   ├── ConfettiParticle                  [element]
    │   └── PageWrapper                       [layout]
    │       ├── <nav>                         [inline]
    │       ├── HeroSection                   [section] ← tidak berubah
    │       ├── PhotoSlideSection             [section] ← quote diganti ayat Alkitab
    │       │   ├── PhotoSlide × 6            [fragment]
    │       │   │   ├── <img> / next/image    [element]
    │       │   │   ├── Caption               [element]
    │       │   │   ├── Quote + VerseRef      [element] ← DIPERBARUI
    │       │   │   └── RoleBadge             [element]
    │       │   └── SlideNavigator            [fragment]
    │       ├── PhotoLightbox                 [fragment]
    │       └── <footer>                      [inline] ← langsung setelah slides
    └── MusicPlayer                           [fragment] ← diaktifkan via splashDone
```

---

## 5. Domain Model

```ts
// Tambahan field verseRef pada PhotoSlideItem
interface PhotoSlideItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  quote: string;        // teks ayat Alkitab (menggantikan kata motivasi)
  verseRef?: string;    // referensi ayat — tampil di bawah quote, right-aligned
  badge: {
    icon: string;
    label: string;
    variant: "pink" | "lavender" | "mint" | "yellow" | "peach";
  };
}

// State di FajarLumentaView
interface FajarLumentaViewState {
  splashDone: boolean;  // false = tampilkan splash, true = tampilkan konten
}

// Props SplashScreen baru
interface SplashScreenProps {
  name: string;         // "Fajar Lumenta"
  onStart: () => void;  // callback saat tombol "Mulai" ditekan
}
```

---

## 6. Stack Teknis & Batasan

| Aspek | Keputusan |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Animasi splash | CSS transition `opacity` + Tailwind `transition-opacity duration-700` |
| Autoplay musik | Hanya setelah klik (Web Audio Policy) — trigger via `splashDone` |
| Font | Pacifico (heading/caption), Nunito (body/quote/verseRef) |
| State | `useState` lokal di `FajarLumentaView` — tidak butuh global store |
| Import | Wajib menggunakan alias `@/` |
| Dependency baru | Tidak ada — semua native React + CSS |

---

## 7. Spesifikasi Visual Splash Screen

| Elemen | Spesifikasi |
|---|---|
| Latar | Gradient pastel (lavender → pink → peach) atau foto `1.jpg` dengan overlay `bg-black/40` |
| Judul kecil | `"Selamat Ulang Tahun"`, Pacifico, `text-2xl`, putih |
| Nama | `"Fajar Lumenta 🎂"`, Pacifico, `text-4xl md:text-5xl`, `#FFB3C6` (pink pastel) |
| Tombol Mulai | Nunito Bold, `text-lg`, rounded-full, bg-white, text `#3D2C52`, padding `px-10 py-4` |
| Tombol hover | `bg-pink-100`, scale `1.03`, transition smooth |
| Ayat dekoratif | Nunito italic, `text-sm`, putih/70%, center, max-w-sm |

---

## 8. Kriteria Selesai (Definition of Done)

- [ ] `SplashScreen` tampil fullscreen saat halaman pertama dibuka (`splashDone = false`)
- [ ] Tombol "Mulai" menekan → `splashDone = true`, musik mulai, splash fade-out
- [ ] Konten utama (HeroSection, PhotoSlideSection) tersembunyi saat splash aktif, muncul setelah `splashDone`
- [ ] `WishSection` dan `defaultWishes` **tidak lagi dirender** di `FajarLumentaView`
- [ ] `PhotoSlideItem` memiliki field `verseRef?: string` yang opsional
- [ ] Setiap slide menampilkan ayat Alkitab (field `quote`) + referensi (field `verseRef`) sesuai tabel di §3.2
- [ ] Referensi ayat tampil right-aligned, Nunito sm/xs, italic, di bawah teks ayat
- [ ] Musik **tidak autoplay** — hanya mulai saat tombol "Mulai" ditekan
- [ ] Responsive: splash dan konten mobile-first (Tailwind `sm/md/lg`)
- [ ] Tidak ada `console.error` / TypeScript error saat `npm run build`
- [ ] Semua import menggunakan alias `@/`

---

## 9. Out of Scope

- Animasi parallax pada splash (iterasi berikutnya)
- Halaman splash yang bisa di-bypass via URL param
- Backend / database — halaman tetap statis
- Penambahan foto baru (tetap menggunakan `1.jpg` – `6.jpg`)

---

## 10. Referensi

- PRD sebelumnya (photo slides): [`docs/fajar-birthday/photo-slides/PRD.md`](../photo-slides/PRD.md)
- View utama: `src/components/views/FajarLumentaView.tsx`
- Foto: `public/images/fajar/1.jpg` – `6.jpg`
- Audio BGM: `public/audio/happy-birthday.mp3`
- Komponen slide: `src/components/fragments/PhotoSlide.tsx`
- Komponen section: `src/components/sections/PhotoSlideSection.tsx`
