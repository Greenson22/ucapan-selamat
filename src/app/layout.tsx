import type { Metadata } from "next";
import { Pacifico, Nunito } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ucapan Selamat | Kartu Ucapan Digital Spesial",
  description: "Platform ucapan selamat ulang tahun interaktif, estetik, dan personal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${pacifico.variable} ${nunito.variable} scroll-smooth`}>
      <body className="font-nunito bg-[#FFF9FC] text-[#3D2C52] antialiased min-h-screen selection:bg-[#FFB3C6] selection:text-[#3D2C52]">
        {children}
      </body>
    </html>
  );
}
