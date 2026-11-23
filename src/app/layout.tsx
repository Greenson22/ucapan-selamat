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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://ucapan-selamat-gules.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ucapan Selamat | Kartu Ucapan Digital Spesial",
  description: "Platform ucapan selamat ulang tahun interaktif, estetik, dan personal.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
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
