import React from "react";

export type BadgeVariant = "pink" | "lavender" | "mint" | "yellow" | "peach";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "pink", className = "" }: BadgeProps) {
  const variantStyles = {
    pink: "bg-[#FFB3C6]/60 text-[#7A1D36] border-[#FFB3C6]",
    lavender: "bg-[#C9B1E8]/60 text-[#432371] border-[#C9B1E8]",
    mint: "bg-[#B2F0D6]/70 text-[#135A3D] border-[#B2F0D6]",
    yellow: "bg-[#FFF0A3]/70 text-[#6B5A10] border-[#FFF0A3]",
    peach: "bg-[#FFCBA4]/70 text-[#7A3E16] border-[#FFCBA4]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs md:text-sm font-bold tracking-wide border shadow-xs ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
