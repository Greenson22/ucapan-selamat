import type { Metadata } from "next";
import Link from "next/link";
import { BirthdayLayout } from "@/components/layouts/BirthdayLayout";
import { PageWrapper } from "@/components/layouts/PageWrapper";
import { Typography } from "@/components/elements/Typography";
import { Badge } from "@/components/elements/Badge";

export const metadata: Metadata = {
  title: "Ucapan Selamat Digital 🎁",
  description: "Platform ucapan selamat estetik & personal.",
};

export default function HomePage() {
  return (
    <BirthdayLayout>
      <PageWrapper className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        <Badge variant="pink" className="mb-4">
          ✨ Special Greetings Platform
        </Badge>
        
        <Typography
          as="h1"
          variant="heading"
          className="text-4xl sm:text-5xl md:text-6xl text-[#3D2C52] max-w-2xl leading-tight"
        >
          Ucapan Selamat Digital 🎈
        </Typography>

        <Typography
          as="p"
          variant="body"
          className="text-base sm:text-lg text-[#7B6B9A] max-w-md mx-auto mt-4"
        >
          Kirimkan pesan kebahagiaan, kenangan manis, dan doa tulus dengan tampilan yang estetik dan berkesan.
        </Typography>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/happy-birthday/fajar-lumenta"
            className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FFB3C6] via-[#FFCBA4] to-[#FFF0A3] text-[#3D2C52] font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
          >
            🎂 Buka Ucapan Fajar Lumenta
          </Link>

          <Link
            href="/happy-birthday"
            className="px-6 py-3.5 rounded-full bg-white/90 border border-pink-200 text-[#5B4775] font-bold shadow-xs hover:shadow-md hover:bg-white transition-all text-sm sm:text-base"
          >
            📋 Lihat Semua Ucapan
          </Link>
        </div>
      </PageWrapper>
    </BirthdayLayout>
  );
}
