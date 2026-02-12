import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Caio — Desenvolvedor Web",
  description:
    "Portfólio de Caio, desenvolvedor web especializado em criar interfaces modernas, performáticas e memoráveis com React, Next.js e TypeScript.",
  openGraph: {
    title: "Caio — Desenvolvedor Web",
    description:
      "Portfólio de Caio, desenvolvedor web especializado em criar interfaces modernas e performáticas.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caio — Desenvolvedor Web",
    description:
      "Portfólio de Caio, desenvolvedor web especializado em criar interfaces modernas e performáticas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${syne.variable} ${dmSans.variable} antialiased bg-bg-primary text-text-primary font-[family-name:var(--font-dm-sans)]`}
      >
        {children}
      </body>
    </html>
  );
}
