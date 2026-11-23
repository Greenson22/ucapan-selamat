import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <div className={`w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 ${className}`}>
      {children}
    </div>
  );
}
