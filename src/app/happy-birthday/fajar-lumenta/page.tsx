import type { Metadata } from "next";
import FajarLumentaView from "@/components/views/FajarLumentaView";

export const metadata: Metadata = {
  title: "🎂 Selamat Ulang Tahun, Fajar Lumenta!",
  description: "Halaman kartu ucapan ulang tahun spesial, galeri foto, dan doa tulus untuk Fajar Lumenta.",
  openGraph: {
    title: "🎂 Selamat Ulang Tahun, Fajar Lumenta!",
    description: "Halaman kartu ucapan ulang tahun spesial, galeri foto, dan doa tulus untuk Fajar Lumenta.",
    url: "/happy-birthday/fajar-lumenta",
    siteName: "Ucapan Selamat",
    images: [
      {
        url: "/images/fajar/1.jpg",
        secureUrl: "https://ucapan-selamat-gules.vercel.app/images/fajar/1.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Foto Fajar Lumenta - Sang Penatua Muda",
      },
    ],
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "🎂 Selamat Ulang Tahun, Fajar Lumenta!",
    description: "Halaman kartu ucapan ulang tahun spesial, galeri foto, dan doa tulus untuk Fajar Lumenta.",
    images: ["/images/fajar/1.jpg"],
  },
};

export default function FajarLumentaPage() {
  return <FajarLumentaView />;
}
