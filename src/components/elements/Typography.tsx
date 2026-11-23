import React from "react";

interface TypographyProps {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  variant?: "heading" | "body" | "subheading" | "caption";
  children: React.ReactNode;
  className?: string;
}

export function Typography({
  as: Component = "p",
  variant = "body",
  children,
  className = "",
}: TypographyProps) {
  const variantStyles = {
    heading: "font-pacifico text-[#3D2C52] tracking-wide",
    subheading: "font-nunito font-bold text-[#5B4775]",
    body: "font-nunito text-[#3D2C52]/90 leading-relaxed",
    caption: "font-nunito text-sm text-[#7B6B9A]",
  };

  return <Component className={`${variantStyles[variant]} ${className}`}>{children}</Component>;
}
