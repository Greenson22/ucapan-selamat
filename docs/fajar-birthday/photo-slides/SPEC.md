# SPEC — Scroll-Snap Photo Sections: Halaman Fajar Lumenta

> **Versi:** 1.0.0  
> **Tanggal:** 2026-11-23  
> **Referensi PRD:** `docs/fajar-birthday/photo-slides/PRD.md`  
> **Status:** Ready for Implementation

---

## Problem Statement

Halaman `/happy-birthday/fajar-lumenta` saat ini menampilkan galeri foto dalam format grid statis (`GallerySection`) yang terasa biasa dan tidak mencerminkan pentingnya momen — ulang tahun seseorang yang baru dilantik sebagai Penatua Pemuda GMIM Sion Raanan sekaligus dikenal sebagai Guru Matematika yang tegas namun hangat.

Pengguna (Fajar Lumenta dan lingkaran terdekatnya) ingin merasakan pengalaman yang lebih imersif dan personal: setiap foto punya "panggungnya" sendiri — penuh layar — disertai kata-kata yang relevan dengan identitas dan perjalanan hidupnya. Galeri grid saat ini tidak mampu menciptakan momen "wow" tersebut.

---

## Solution

Mengganti `GallerySection` (grid statis) dengan `PhotoSlideSection` — sebuah section baru yang menampilkan 6 foto Fajar dalam format **full-screen vertical scroll-snap**. Setiap foto mengisi satu layar penuh (`100vh`) dan saat digeser, layar "terkunci" tepat pada foto berikutnya. Tiap slide dilengkapi dengan caption (Pacifico), quote motivasi (Nunito italic), dan badge peran yang relevan dengan identitas Fajar.

Fitur pendukung:
- **Dot navigator vertikal** di sisi kanan layar untuk melihat posisi dan berpindah antar slide
- **Lightbox** saat foto diklik untuk melihat full-resolution dengan navigasi prev/next

---

## User Stories

1. Sebagai pengunjung halaman, saya ingin melihat setiap foto Fajar dalam tampilan penuh layar, sehingga setiap foto terasa seperti momen yang layak dirayakan.
2. Sebagai pengunjung halaman, saya ingin layar "terkunci" di setiap foto saat saya menggulir, sehingga saya tidak melewatkan satu foto pun secara tidak sengaja.
3. Sebagai pengunjung halaman, saya ingin setiap slide foto memiliki caption judul yang unik, sehingga saya langsung memahami makna atau cerita di balik foto tersebut.
4. Sebagai pengunjung halaman, saya ingin setiap slide memiliki quote/kata motivasi yang relevan dengan peran Fajar, sehingga ucapan terasa personal dan bermakna.
5. Sebagai pengunjung halaman, saya ingin badge peran (Penatua Pemuda / Guru Matematika) ditampilkan di setiap slide yang relevan, sehingga identitas Fajar tersampaikan dengan jelas.
6. Sebagai pengunjung halaman, saya ingin foto muncul dengan animasi fade-in dan slide-up saat saya tiba di sebuah slide, sehingga pengalaman scrolling terasa halus dan elegan.
7. Sebagai pengunjung halaman, saya ingin teks caption dan quote muncul dengan animasi bertahap (staggered) setelah foto muncul, sehingga alur membaca terasa natural.
8. Sebagai pengunjung halaman, saya ingin melihat dot navigator vertikal di sisi kanan layar, sehingga saya tahu sedang berada di foto ke berapa dari 6 foto.
9. Sebagai pengunjung halaman, saya ingin dot aktif tampil dengan warna solid yang berbeda dari dot tidak aktif, sehingga posisi saya dalam slide mudah terlihat sekilas.
10. Sebagai pengunjung halaman, saya ingin mengklik sebuah dot untuk langsung berpindah ke slide foto yang sesuai, sehingga saya bisa navigasi bebas tanpa harus scroll satu per satu.
11. Sebagai pengunjung halaman, saya ingin dot navigator menampilkan tooltip berisi nama caption foto saat saya hover, sehingga saya bisa memilih foto yang ingin dilihat sebelum berpindah.
12. Sebagai pengunjung halaman, saya ingin mengklik atau mengetuk foto dalam slide untuk membuka foto dalam tampilan full-screen (lightbox), sehingga saya bisa melihat detail foto dengan lebih jelas.
13. Sebagai pengunjung halaman, saya ingin lightbox memiliki tombol prev/next untuk berpindah antar foto tanpa menutup lightbox, sehingga pengalaman melihat foto lebih nyaman.
14. Sebagai pengunjung halaman, saya ingin menutup lightbox dengan menekan tombol × atau tombol `Escape` di keyboard, sehingga saya bisa keluar dengan cepat tanpa harus mencari tombol.
15. Sebagai pengguna mobile, saya ingin swipe kiri/kanan di dalam lightbox untuk berpindah antar foto, sehingga navigasi tetap nyaman tanpa tombol fisik.
16. Sebagai pengguna mobile, saya ingin animasi dan scroll-snap bekerja dengan baik di layar kecil, sehingga pengalaman di smartphone setara dengan di desktop.
17. Sebagai Fajar Lumenta (sang penerima), saya ingin melihat kata-kata yang mencerminkan identitas saya sebagai Penatua Pemuda GMIM Sion Raanan, sehingga ucapan ini terasa dibuat khusus untuk saya.
18. Sebagai Fajar Lumenta, saya ingin melihat humor ringan yang merujuk pada sisi "galak-tapi-baik" saya sebagai Guru Matematika, sehingga halaman ini terasa hangat sekaligus menggelitik.
19. Sebagai pengunjung halaman, saya ingin `HeroSection` dan `WishSection` tetap ada dan tidak berubah, sehingga alur cerita halaman (mulai dari sambutan → foto → doa) tetap utuh.
20. Sebagai pengunjung halaman, saya ingin tombol musik tetap berfungsi selama scroll-snap berlangsung, sehingga BGM tidak terputus saat berpindah antar slide.

---

## Implementation Decisions

### 1. Penghapusan `GallerySection` dari `FajarLumentaView`

`GallerySection` dan tipe `PhotoItem` yang di-import darinya dihapus seluruhnya dari `FajarLumentaView.tsx`. Array `defaultPhotos` (tipe lama) diganti dengan array `defaultSlides` bertipe `PhotoSlide` (tipe baru).

### 2. Tipe Data `PhotoSlide` (menggantikan `PhotoItem`)

Tipe domain baru yang lebih kaya dari `PhotoItem` lama:

```ts
// Hanya decision-rich parts — bukan implementasi lengkap
interface PhotoSlide {
  id: string;
  src: string;       // "/images/fajar/1.jpg" – "6.jpg" (file asli)
  alt: string;
  caption: string;   // font Pacifico
  quote: string;     // font Nunito italic
  badge: {
    icon: string;    // emoji (🕊️ / 📐 / dll)
    label: string;
    variant: "pink" | "lavender" | "mint" | "yellow" | "peach";
  };
}
```

> *Tipe ini dari prototype sesi grilling.*

### 3. `PhotoSlideSection` — Section baru (organism)

- Lokasi: `src/components/sections/PhotoSlideSection.tsx`
- Bertanggung jawab untuk: render container scroll-snap, 6 instance `PhotoSlide`, dan state management (`activeSlideIndex`, `lightboxOpen`, `lightboxIndex`)
- Menggunakan `IntersectionObserver` untuk mendeteksi slide aktif (karena tidak menambah dependency baru)
- CSS scroll-snap: `scroll-snap-type: y mandatory` pada container, `scroll-snap-align: start` tiap slide
- Container scroll-snap **terpisah dari `PageWrapper`** — ia adalah full-viewport container sendiri (tidak di dalam max-width constrained wrapper)

### 4. `PhotoSlide` — Fragment baru

- Lokasi: `src/components/fragments/PhotoSlide.tsx`
- Menerima props: `slide: PhotoSlide`, `isActive: boolean`, `onPhotoClick: () => void`
- Layout: `h-screen flex flex-col` — foto 60vh di atas, teks area 40vh di bawah
- Animasi masuk via CSS class yang di-toggle berdasarkan `isActive`: class `slide-enter` (opacity 0, translateY 20px) → `slide-enter-active` (opacity 1, translateY 0)
- Menggunakan `next/image` dengan `fill` dan `object-cover` untuk area foto
- Menggunakan `Badge` (element yang sudah ada) untuk badge peran
- Menggunakan `Typography` (element yang sudah ada) untuk caption dan quote

### 5. `SlideNavigator` — Fragment baru

- Lokasi: `src/components/fragments/SlideNavigator.tsx`
- `position: fixed`, sisi kanan layar, `z-index` di atas konten tapi di bawah lightbox
- Menerima: `total`, `activeIndex`, `onNavigate`
- Dot aktif: `w-3 h-3` solid, dot tidak aktif: `w-2 h-2` outline/transparan
- Tooltip menggunakan HTML `title` attribute (cukup untuk aksesibilitas dasar)
- `aria-label` per dot: `"Lihat foto ke-{n}: {caption}"`

### 6. `PhotoLightbox` — Fragment baru

- Lokasi: `src/components/fragments/PhotoLightbox.tsx`
- Overlay modal (`position: fixed`, full viewport, `z-50`)
- State navigasi (prev/next) dikelola secara internal di dalam lightbox
- `useEffect` untuk menambahkan listener `keydown` (Escape) saat `isOpen = true`, dan membersihkannya saat unmount
- Swipe gesture di mobile: via `onTouchStart` / `onTouchEnd` delta > 50px
- Menggunakan `next/image` dengan `object-contain` dan dimensi penuh

### 7. Scroll-Snap Container vs `PageWrapper`

`PageWrapper` saat ini memiliki `max-w-6xl` dan `px-4`. Container scroll-snap **tidak boleh dibungkus `PageWrapper`** karena perlu `width: 100vw` penuh. Urutan di `FajarLumentaView`:

```
<BirthdayLayout>
  <ConfettiParticle />
  <PageWrapper>         ← nav + HeroSection
    <nav> ... </nav>
    <HeroSection />
  </PageWrapper>
  <PhotoSlideSection /> ← full-width, di luar PageWrapper
  <PageWrapper>         ← WishSection + footer
    <WishSection />
    <footer> ... </footer>
  </PageWrapper>
  <MusicPlayer />       ← fixed, tidak terpengaruh
</BirthdayLayout>
```

### 8. Animasi — CSS Native (tanpa dependency baru)

Dua `@keyframes` baru ditambahkan ke `globals.css`:

- `slide-fade-in-up`: `opacity: 0, translateY(24px)` → `opacity: 1, translateY(0)`, durasi 400ms ease-out
- `slide-text-appear`: sama tapi dengan delay per elemen (via `animation-delay`)

Kelas Tailwind custom digunakan untuk memicu animasi berdasarkan `isActive`.

### 9. Konten Slide (hardcoded di `FajarLumentaView`)

| # | src | caption | quote | badge |
|---|---|---|---|---|
| 1 | `/images/fajar/1.jpg` | Sang Penatua Muda | "Kepemimpinan sejati lahir dari hati yang melayani." | 🕊️ Penatua Pemuda (lavender) |
| 2 | `/images/fajar/2.jpg` | Di Balik Ketegasan | "Guru terbaik bukan yang tak pernah marah, tapi yang marahnya penuh kasih." | 📐 Guru Matematika (yellow) |
| 3 | `/images/fajar/3.jpg` | Momen Bersama | "Hidup paling bermakna saat dirayakan bersama orang-orang yang kita cintai." | 🎉 Momen Spesial (mint) |
| 4 | `/images/fajar/4.jpg` | Langkah Iman | "Setiap tanggung jawab baru adalah kepercayaan Tuhan yang digenapkan." | ✝️ Iman & Pelayanan (pink) |
| 5 | `/images/fajar/5.jpg` | Fajar yang Sesungguhnya | "Namamu bukan kebetulan — kamu memang selalu jadi awal dari hal-hal baik." | 🌅 Fajar Baru (peach) |
| 6 | `/images/fajar/6.jpg` | Selamat Ulang Tahun! | "Semoga usiamu bertambah, ilmumu semakin tajam, dan hatimu tetap hangat." | 🎂 HBD Fajar! (pink) |

### 10. Tidak Ada Library Baru

Tidak ada npm package baru yang di-install. Semua implementasi menggunakan:
- CSS Native (scroll-snap, `@keyframes`)
- React built-in hooks (`useState`, `useEffect`, `useRef`)
- `IntersectionObserver` (browser API native)
- `next/image` (sudah ada)
- `Badge`, `Typography` elements (sudah ada)

---

## Testing Decisions

### Apa yang Membuat Test yang Baik

Test yang baik menguji **perilaku yang terlihat pengguna**, bukan detail implementasi internal. Jangan test nama class CSS, nama state internal, atau urutan render DOM yang tidak semantik. Test dari sudut pandang "apa yang pengguna lihat dan lakukan."

### Modul yang Perlu Ditest

| Modul | Seam | Jenis Test |
|---|---|---|
| `PhotoSlideSection` | Render 6 slide dengan data yang benar | Render test (React Testing Library) |
| `SlideNavigator` | Klik dot → callback `onNavigate` dipanggil dengan index yang benar | Interaction test |
| `SlideNavigator` | Dot dengan `activeIndex` tampil dengan aria/class aktif | Render test |
| `PhotoLightbox` | Muncul saat `isOpen=true`, tidak muncul saat `isOpen=false` | Render test |
| `PhotoLightbox` | Tombol × memanggil `onClose` | Interaction test |
| `PhotoLightbox` | Tombol next/prev mengubah foto yang ditampilkan | Interaction test |
| `PhotoLightbox` | Keyboard `Escape` memanggil `onClose` | Interaction test |
| `PhotoSlide` | Caption, quote, dan badge icon tampil di DOM | Render test |

### Prior Art

Proyek ini belum memiliki test suite yang ada (`__tests__/` atau `*.test.tsx` belum ditemukan). Pola test yang direkomendasikan mengacu pada React Testing Library standard: `render`, `screen.getByRole`, `userEvent.click`.

Contoh seam yang digunakan:

```ts
// Seam tunggal — test dari luar komponen composite
render(<PhotoSlideSection slides={mockSlides} />)
// Verifikasi: apakah 6 slide tampil? apakah navigator ada? apakah lightbox bisa dibuka?
```

Idealnya, seluruh fitur ini bisa ditest dari satu seam: `PhotoSlideSection` sebagai entry point composite — tanpa perlu mock internal state.

---

## Out of Scope

- **Parallax / depth effect** saat scroll (bisa jadi iterasi v2)
- **Swipe gesture antar slide** di luar lightbox (scroll-snap native sudah cukup)
- **Backend atau persistence** — semua data hardcoded, tidak ada API call
- **Edit konten slide dari UI** — konten diubah langsung di source code
- **Halaman ucapan untuk orang selain Fajar Lumenta** — SPEC ini hanya berlaku untuk `/happy-birthday/fajar-lumenta`
- **Autentikasi atau akses terbatas**
- **Perubahan pada `HeroSection`, `WishSection`, `MusicPlayer`, `BirthdayLayout`**
- **Perubahan pada `GallerySection`** (komponen dihapus dari halaman ini, bukan dihapus dari codebase karena bisa dipakai halaman lain)

---

## Further Notes

- **`GallerySection` tidak dihapus dari filesystem** — hanya di-remove dari `FajarLumentaView`. Komponen ini tetap ada di `src/components/sections/GallerySection.tsx` untuk kebutuhan halaman ucapan lain di masa depan.
- **Foto asli (`1.jpg`–`6.jpg`)** sudah ada di `public/images/fajar/`. Placeholder SVG (`foto-01.svg`–`foto-06.svg`) tidak lagi digunakan di halaman ini.
- **`scroll-smooth` sudah aktif** di `<html>` tag via `layout.tsx`. Scroll-snap container menggunakan `scroll-behavior: smooth` secara eksplisit di CSS untuk memastikan smooth scroll via `scrollIntoView`.
- **`MusicPlayer` tidak terpengaruh** — ia adalah `fixed` element dan tidak ada di dalam DOM tree scroll-snap, sehingga tetap berfungsi normal selama scroll.
- **Dot navigator `z-index`** harus di bawah lightbox (`z-50`) tapi di atas konten slide — gunakan `z-30`.
- **IntersectionObserver threshold** yang direkomendasikan: `0.6` — slide dianggap aktif jika 60% area terlihat di viewport.
