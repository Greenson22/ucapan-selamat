# PRD — Tema Pemuda GMIM & Optimasi Desktop View

> **Versi:** 1.2.0  
> **Tanggal:** 2026-11-23  
> **Status:** ✅ Selesai Diimplementasikan  
> **Modul:** `fajar-birthday/pemuda-gmim-theme-desktop`  

---

## 1. Latar Belakang & Masalah

### 1.1 Identitas Pemuda GMIM
Fajar Lumenta adalah seorang Penatua Pemuda GMIM Sion Raanan yang baru saja dilantik. Tema visual awal yang bernuansa pink/pastel dinilai kurang merepresentasikan identitas pelayanan dan jabatan kepemudaan gerejawi beliau.

Berdasarkan atribut dan lambang resmi **Komisi Pelayanan Pemuda Sinode GMIM (Gereja Masehi Injili di Minahasa)**:
- **Warna Ungu:** Melambangkan kesiapan pemuda untuk memberitakan Injil (sebagaimana 4 lembar sayap burung manguni pada logo) serta kesetiaan pada Injil (warna tulisan "PEMUDA GMIM"). Ungu juga simbol kemuliaan dan penyerahan diri kepada Kristus.
- **Warna Emas / Kuning Keemasan:** Melambangkan mahkota kemuliaan, kemegahan rohani, dan api semangat kepemudaan yang sering digunakan pada panji, stola, dan lambang resmi pelayanan Pemuda GMIM.

### 1.2 Keterbatasan Tampilan Desktop
Sebelumnya, section slide foto (`PhotoSlide.tsx`) didesain dengan format mobile-first vertikal ketat: foto mengambil `60vh` dan teks mengambil `40vh`. Saat dibuka di layar desktop atau monitor lebar:
- Foto mengalami crop berlebih atau terdistorsi dalam rasio sempit.
- Layout vertikal menyisakan ruang kosong lebar di kiri dan kanan tanpa keseimbangan komposisi.
- Foto tidak dapat dinikmati secara proporsional di perangkat desktop/laptop.

---

## 2. Sasaran & Tujuan

1. **Transformasi Tema Visual Pemuda GMIM:**
   - Mengganti palet warna pink pastel menjadi palet warna resmi **Ungu Pemuda GMIM** dan **Emas (Gold)**.
   - Menyesuaikan ambient background, font gradient, badge peran, confetti, tombol navigasi, dan splash screen.

2. **Responsivitas & Optimasi Tampilan Desktop:**
   - Menghadirkan layout dua kolom berdampingan (*side-by-side* / split view) pada desktop (`md:` breakpoint ke atas): foto di satu sisi dengan tinggi proporsional dan `object-contain`, teks quote/caption di sisi sampingnya.
   - Memastikan pengguna desktop dapat melihat foto secara utuh tanpa terpotong dan tetap mempertahankan scroll-snap vertikal yang mulus.

---

## 3. Spesifikasi Teknis & Desain

### 3.1 Palet Warna Pemuda GMIM (`src/app/globals.css`)

| Nama Token | Hex | Makna & Penggunaan |
|---|---|---|
| `--gmim-purple-deep` | `#3B1A6B` | Ungu tua: latar splash screen, teks caption heading |
| `--gmim-purple` | `#5C2D9A` | Ungu utama: identitas sayap/tulisan logo Pemuda GMIM, dot navigator aktif |
| `--gmim-purple-mid` | `#7B4FC4` | Ungu medium: gradasi teks hero, border badge |
| `--gmim-purple-light` | `#A97DE8` | Ungu muda: hover state, border divider, soft glow |
| `--gmim-purple-pale` | `#EDE3FA` | Ungu pucat: background container foto desktop & badge |
| `--gmim-gold` | `#D4A017` | Emas kemuliaan: border fokus, aksen ayat, ring foto |
| `--gmim-gold-light` | `#F5D76E` | Kuning keemasan: tombol utama, badge highlight |
| `--gmim-gold-pale` | `#FDF3CD` | Emas pucat: aksen gradient tombol & kartu |
| `--gmim-bg` | `#F5F0FF` | Background utama halaman (lembut, terang, bernuansa ungu muda) |

### 3.2 Adaptasi Layout Desktop (`PhotoSlide.tsx`)

- **Mobile View (`< md`):**
  - Komposisi vertikal fleksibel (`flex-col`).
  - Foto mengambil porsi proporsional `55vh` dengan rounded border dan shadow.
  - Teks caption, badge, dan quote berada di bagian bawah.

- **Desktop View (`≥ md`):**
  - Menggunakan layout horizontal berdampingan: `flex-row items-center justify-center gap-8 lg:gap-12`.
  - **Sisi Kiri/Foto:** Mengambil 50% - 60% lebar layar (`w-1/2 lg:w-3/5`), tinggi `80vh` dengan styling kartu berbingkai halus (`rounded-3xl`, `border border-[#A97DE8]/30`, shadow lembut), menggunakan `object-contain` agar foto utuh terlihat tanpa terpotong.
  - **Sisi Kanan/Teks:** Mengambil 40% - 50% lebar layar (`w-1/2 lg:w-2/5`), teks rata kiri (`md:text-left`, `md:items-start`), typography ukuran besar (`lg:text-5xl`), dan referensi ayat berwarna emas (`#D4A017`).

### 3.3 Komponen Terkait yang Diperbarui

1. `src/app/globals.css`: Variabel CSS bertema Pemuda GMIM.
2. `src/components/layouts/BirthdayLayout.tsx`: Background ambient blobs bernuansa ungu dan emas.
3. `src/components/elements/Badge.tsx`: Varian warna `purple` dan `gold`.
4. `src/components/sections/HeroSection.tsx`: Gradasi teks hero ungu-emas dan aksen tombol/badge emas.
5. `src/components/fragments/PhotoSlide.tsx`: Split layout dua kolom untuk desktop + foto `object-contain`.
6. `src/components/fragments/SlideNavigator.tsx`: Dot aktif berwarna ungu Pemuda GMIM dengan ring emas.
7. `src/components/fragments/SplashScreen.tsx`: Latar gradasi ungu gelap GMIM dengan tombol emas bercahaya.
8. `src/components/elements/ConfettiParticle.tsx`: Partikel confetti ungu, emas, dan lavendel.
9. `src/components/views/FajarLumentaView.tsx`: Konfigurasi badge slide dan footer resmi Pemuda GMIM.

---

## 4. Kriteria Selesai (Definition of Done)

- [x] Palet warna Pemuda GMIM (Ungu & Emas) terpasang di seluruh komponen.
- [x] Foto pada tampilan desktop tampil utuh dan jelas (tidak terpotong kasar) dengan layout responsif dua kolom.
- [x] Interaksi scroll-snap vertikal tetap bekerja dengan baik di mobile maupun desktop.
- [x] Lightbox foto layar penuh tetap berfungsi normal saat foto diklik.
- [x] Build Next.js (`npm run build`) berhasil tanpa error lint/TypeScript.
