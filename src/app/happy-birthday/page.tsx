import type { Metadata } from "next";
import Link from "next/link";
import { BirthdayLayout } from "@/components/layouts/BirthdayLayout";
import { PageWrapper } from "@/components/layouts/PageWrapper";
import { Typography } from "@/components/elements/Typography";
import { Badge } from "@/components/elements/Badge";

export const metadata: Metadata = {
  title: "Daftar Ucapan Ulang Tahun 🎂",
  description: "Kumpulan kartu ucapan selamat ulang tahun interaktif.",
};

const birthdayList = [
  {
    slug: "fajar-lumenta",
    name: "Fajar Lumenta",
    title: "Happy Birthday Fajar Lumenta! 🎉",
    desc: "Kartu ucapan personal dengan galeri kenangan, musik perayaan, dan doa tulus.",
    tag: "Terbaru",
    color: "pink" as const,
  },
];

export default function HappyBirthdayIndexPage() {
  return (
    <BirthdayLayout>
      <PageWrapper className="max-w-4xl py-12 md:py-20">
        <div className="text-center mb-10">
          <Badge variant="pink" className="mb-3">
            🎉 Kartu Ucapan Digital
          </Badge>
          <Typography as="h1" variant="heading" className="text-3xl sm:text-4xl md:text-5xl text-[#3D2C52]">
            Daftar Ucapan Ulang Tahun 🎂
          </Typography>
          <Typography as="p" variant="body" className="mt-3 text-base md:text-lg text-[#7B6B9A] max-w-lg mx-auto">
            Pilih dan lihat kartu ucapan selamat ulang tahun yang telah dibuat
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {birthdayList.map((item) => (
            <Link
              key={item.slug}
              href={`/happy-birthday/${item.slug}`}
              className="group block p-6 rounded-2xl bg-white/90 backdrop-blur-xs border border-pink-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">🎂</span>
                <Badge variant={item.color}>{item.tag}</Badge>
              </div>
              <h2 className="font-nunito font-bold text-xl text-[#3D2C52] group-hover:text-[#D94F70] transition-colors">
                {item.name}
              </h2>
              <p className="font-nunito text-sm text-[#7B6B9A] mt-2 leading-relaxed">
                {item.desc}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#D94F70]">
                Buka Halaman Ucapan →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#7B6B9A] hover:text-[#3D2C52] transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </PageWrapper>
    </BirthdayLayout>
  );
}
