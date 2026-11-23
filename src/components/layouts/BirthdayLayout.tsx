import React from "react";

interface BirthdayLayoutProps {
  children: React.ReactNode;
}

export function BirthdayLayout({ children }: BirthdayLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F5F0FF]">
      {/* Decorative GMIM Purple & Gold Background Blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 opacity-60">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#5C2D9A]/20 blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-[#A97DE8]/25 blur-3xl" />
        <div className="absolute top-2/3 left-1/4 w-80 h-80 rounded-full bg-[#D4A017]/15 blur-3xl" />
        <div className="absolute -bottom-32 right-1/3 w-96 h-96 rounded-full bg-[#7B4FC4]/20 blur-3xl" />
        <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-[#F5D76E]/15 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
