import React from "react";

export type BadgeVariant = "pink" | "lavender" | "mint" | "yellow" | "peach" | "purple" | "gold";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "purple", className = "" }: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    // === Pemuda GMIM core variants ===
    purple:  "bg-[#5C2D9A]/20 text-[#3B1A6B] border-[#7B4FC4]/50",
    gold:    "bg-[#F5D76E]/50 text-[#7A5A00] border-[#D4A017]/60",
    // === Alias legacy (mapped ke GMIM palette) ===
    pink:    "bg-[#A97DE8]/25 text-[#3B1A6B] border-[#A97DE8]/50",
    lavender:"bg-[#EDE3FA]/80 text-[#5C2D9A] border-[#A97DE8]/40",
    mint:    "bg-[#B2F0D6]/70 text-[#135A3D] border-[#B2F0D6]",
    yellow:  "bg-[#F5D76E]/50 text-[#6B5A10] border-[#D4A017]/50",
    peach:   "bg-[#EDE3FA]/80 text-[#5C2D9A] border-[#7B4FC4]/40",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs md:text-sm font-bold tracking-wide border shadow-xs ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
