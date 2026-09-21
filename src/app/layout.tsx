import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PakaiLagi AI | Jual, Donasi, atau Daur Ulang Barang Bekas",
    template: "%s | PakaiLagi AI",
  },
  description:
    "Platform ekonomi sirkular berbasis AI yang menilai kondisi barang rumah tangga tidak terpakai, lalu merekomendasikan apakah sebaiknya dijual, didonasikan, atau didaur ulang.",
  applicationName: "PakaiLagi AI",
  keywords: [
    "PakaiLagi",
    "ekonomi sirkular",
    "barang bekas",
    "jual barang bekas",
    "donasi barang",
    "daur ulang",
    "Circular Passport",
    "Condition Score",
  ],
  openGraph: {
    title: "PakaiLagi AI | Jual, Donasi, atau Daur Ulang Barang Bekas",
    description:
      "Cek kondisi barang tidak terpakai dengan AI, lalu salurkan ke pembeli, penerima donasi, atau daur ulang.",
    siteName: "PakaiLagi AI",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
