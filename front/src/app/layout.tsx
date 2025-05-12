import { ReactNode } from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "@/styles/globals.scss";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "e-volui | Avaliações Funcionais em Fisioterapia",
  description:
    "Sistema web desenvolvido para apoiar avaliações funcionais em fisioterapia. Projeto acadêmico com foco na coleta, gestão e análise de dados clínicos.",
  keywords: [
    "fisioterapia",
    "avaliação funcional",
    "plataforma web",
    "e-volui",
    "TCC",
    "Next.js",
    "MongoDB",
    "TypeScript",
    "Express",
  ],
  authors: [
    { name: "Mateus Winter", url: "https://github.com/mateuswinter104" },
  ],
  creator: "Mateus Winter",
  metadataBase: new URL("https://e-volui.vercel.app"),
  openGraph: {
    title: "e-volui | Avaliações Funcionais em Fisioterapia",
    description:
      "Plataforma web para apoio em avaliações funcionais fisioterapêuticas. Projeto desenvolvido por Mateus Winter como parte de um TCC acadêmico.",
    url: "https://e-volui.vercel.app",
    siteName: "e-volui",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "e-volui - Avaliações em Fisioterapia",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
