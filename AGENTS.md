<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

## Struktur Folder Proyek

Proyek ini menggunakan arsitektur **component-based** dengan semua source code di dalam `src/`.
Baca juga: [`docs/PRD.md`](./docs/PRD.md) untuk spesifikasi produk lengkap.

### Struktur Direktori

```
ucapan-selamat/
├── src/
│   ├── app/                        ← ROUTING ONLY (Next.js App Router)
│   │   ├── layout.tsx              ← Root layout (html, body, global providers)
│   │   ├── page.tsx                ← Halaman utama "/"
│   │   ├── globals.css             ← CSS global + Tailwind directives
│   │   └── happy-birthday/
│   │       ├── page.tsx            ← "/happy-birthday" — index listing
│   │       └── fajar-lumenta/
│   │           └── page.tsx        ← "/happy-birthday/fajar-lumenta"
│   │
│   └── components/                 ← Semua komponen UI (non-routable)
│       ├── elements/               ← [ATOM] Unit UI terkecil
│       ├── fragments/              ← [MOLECULE] Gabungan beberapa element
│       ├── sections/               ← [ORGANISM] Blok besar halaman
│       ├── layouts/                ← [TEMPLATE] Wrapper layout halaman
│       └── views/                  ← [PAGE] Komposisi penuh satu halaman
│
├── public/
│   ├── images/fajar/               ← Foto-foto untuk halaman Fajar Lumenta
│   └── audio/                      ← File audio BGM
│
└── docs/
    └── PRD.md                      ← Product Requirements Document
```

### Hierarki Komponen & Aturan Import

```
views/ → dapat import dari: sections/, fragments/, elements/, layouts/
sections/ → dapat import dari: fragments/, elements/
fragments/ → dapat import dari: elements/ SAJA
layouts/ → dapat import dari: elements/ SAJA
elements/ → TIDAK BOLEH import dari layer manapun di atas
app/ → hanya import dari: views/, layouts/, atau sections/ (bila sederhana)
```

**❌ Dilarang:** Import melingkar atau import ke layer yang lebih tinggi
(misalnya `elements/` import dari `fragments/`)

### Konvensi Penamaan

| Kategori | Konvensi | Contoh |
|----------|----------|--------|
| Komponen React | `PascalCase.tsx` | `PhotoCard.tsx`, `HeroSection.tsx` |
| Halaman Next.js | lowercase `page.tsx` | `page.tsx` |
| Layout Next.js | lowercase `layout.tsx` | `layout.tsx` |
| Folder route | `kebab-case` | `fajar-lumenta/`, `happy-birthday/` |
| Aset gambar | `kebab-case` | `fajar-foto-01.jpg` |

### Import Alias

Semua import **wajib** menggunakan alias `@/` yang merujuk ke `src/`:

```tsx
// ✅ BENAR
import { PhotoCard } from "@/components/fragments/PhotoCard";
import FajarLumentaView from "@/components/views/FajarLumentaView";

// ❌ SALAH — jangan gunakan relative path panjang
import { PhotoCard } from "../../fragments/PhotoCard";
```

### Export Convention

```tsx
// ✅ Named export untuk komponen non-page (elements, fragments, sections, layouts)
export function Badge({ children }: BadgeProps) { ... }

// ✅ Default export untuk page dan view
export default function FajarLumentaView() { ... }
export default function FajarLumentaPage() { ... }

// ✅ Interface props dengan suffix "Props"
interface PhotoCardProps {
  src: string;
  caption?: string;
  alt: string;
}
```

### Desain Visual

Proyek menggunakan tema **Playful & Pastel**:
- **Font heading:** Pacifico (Google Fonts)
- **Font body:** Nunito (Google Fonts)
- **Warna utama:** pastel pink `#FFB3C6`, lavender `#C9B1E8`, mint `#B2F0D6`, yellow `#FFF0A3`, peach `#FFCBA4`
- **Teks:** dark purple `#3D2C52`
- **Semua komponen mobile-first** (Tailwind breakpoints: sm/md/lg/xl)

### Aset

- Foto Fajar Lumenta → `public/images/fajar/foto-{01-06}.jpg` (atau `.webp`)
- BGM audio → `public/audio/happy-birthday.mp3`
- Jika aset belum ada → gunakan placeholder gradient berwarna
