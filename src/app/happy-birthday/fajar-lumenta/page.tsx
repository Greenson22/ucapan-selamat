import type { Metadata } from "next";
import FajarLumentaView from "@/components/views/FajarLumentaView";

export const metadata: Metadata = {
  title: "🎂 Selamat Ulang Tahun, Fajar Lumenta!",
  description: "Halaman kartu ucapan ulang tahun spesial, galeri foto, dan doa tulus untuk Fajar Lumenta.",
};

export default function FajarLumentaPage() {
  return <FajarLumentaView />;
}
