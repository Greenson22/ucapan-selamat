import React from "react";

interface BirthdayLayoutProps {
  children: React.ReactNode;
}

export function BirthdayLayout({ children }: BirthdayLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FFF9FC]">
      {/* Decorative Pastel Background Blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 opacity-70">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FFB3C6]/30 blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-[#C9B1E8]/35 blur-3xl" />
        <div className="absolute top-2/3 left-1/4 w-80 h-80 rounded-full bg-[#B2F0D6]/35 blur-3xl" />
        <div className="absolute -bottom-32 right-1/3 w-96 h-96 rounded-full bg-[#FFF0A3]/35 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
