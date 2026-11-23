import React from "react";
import { WishCard } from "@/components/fragments/WishCard";
import { Typography } from "@/components/elements/Typography";

export interface WishItem {
  id: string;
  sender: string;
  relation: string;
  message: string;
  emoji: string;
  colorTheme?: "pink" | "lavender" | "mint" | "yellow" | "peach";
}

interface WishSectionProps {
  wishes: WishItem[];
}

export function WishSection({ wishes }: WishSectionProps) {
  return (
    <section className="py-8 md:py-14">
      <div className="text-center mb-8 md:mb-12">
        <Typography as="h2" variant="heading" className="text-2xl sm:text-3xl md:text-4xl text-[#3D2C52]">
          Untaian Doa &amp; Ucapan Hangat 💌
        </Typography>
        <Typography as="p" variant="caption" className="text-sm md:text-base mt-2 max-w-md mx-auto">
          Pesan-pesan tulus dari orang-orang tersayang untuk Fajar Lumenta
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
        {wishes.map((item) => (
          <WishCard
            key={item.id}
            sender={item.sender}
            relation={item.relation}
            message={item.message}
            emoji={item.emoji}
            colorTheme={item.colorTheme}
          />
        ))}
      </div>
    </section>
  );
}
