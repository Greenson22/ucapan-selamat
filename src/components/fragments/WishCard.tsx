import React from "react";
import { Badge } from "@/components/elements/Badge";

interface WishCardProps {
  sender: string;
  relation: string;
  message: string;
  emoji: string;
  colorTheme?: "pink" | "lavender" | "mint" | "yellow" | "peach";
}

export function WishCard({
  sender,
  relation,
  message,
  emoji,
  colorTheme = "pink",
}: WishCardProps) {
  const bgStyles = {
    pink: "bg-gradient-to-br from-[#FFF0F4] to-white border-[#FFB3C6]/60",
    lavender: "bg-gradient-to-br from-[#F5EFFF] to-white border-[#C9B1E8]/60",
    mint: "bg-gradient-to-br from-[#EFFFF7] to-white border-[#B2F0D6]/60",
    yellow: "bg-gradient-to-br from-[#FFFDEB] to-white border-[#FFF0A3]/80",
    peach: "bg-gradient-to-br from-[#FFF4ED] to-white border-[#FFCBA4]/60",
  };

  return (
    <div
      className={`relative p-5 md:p-6 rounded-2xl border shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${bgStyles[colorTheme]}`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-xs text-xl">
            {emoji}
          </span>
          <div>
            <h4 className="font-nunito font-bold text-base text-[#3D2C52]">
              {sender}
            </h4>
            <span className="font-nunito text-xs text-[#7B6B9A]">
              {relation}
            </span>
          </div>
        </div>
        <Badge variant={colorTheme}>Wish</Badge>
      </div>

      <p className="font-nunito text-sm md:text-base text-[#3D2C52]/90 leading-relaxed italic">
        &ldquo;{message}&rdquo;
      </p>
    </div>
  );
}
