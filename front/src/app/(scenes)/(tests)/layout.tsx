import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Área do Profissional | e-volui",
  description: "Painel de controle para fisioterapeutas",
};

export default function TestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <div className="d-flex flex-column gap-32">
        <div className="d-flex flex-column gap-24">{children}</div>
      </div>
    </div>
  );
}
