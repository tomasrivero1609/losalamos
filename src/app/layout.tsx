import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getWhatsAppLines } from "@/lib/whatsapp";
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
  title: "LOS ÁLAMOS — Indumentaria laboral",
  description: "Catálogo de indumentaria laboral. Consultas por WhatsApp.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const whatsappLines = getWhatsAppLines();

  return (
    <html lang="es" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <Header />
        {children}
        <FloatingWhatsApp lines={whatsappLines} />
      </body>
    </html>
  );
}
