// app/with-menu/layout.tsx
import type { Metadata } from "next";
import { Menu } from "@/components/Menu";

export const metadata: Metadata = {
  title: "Área do Profissional | e-volui",
  description: "Painel de controle para fisioterapeutas",
};

export default function WithMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Menu />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
