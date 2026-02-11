import type { Metadata } from "next";
import { LicitacaoDetalhes } from "@/components/licitacao/licitacao-detalhes";

export const metadata: Metadata = {
  title: "Detalhes da Licitação - Licitações BR",
  description: "Visualize os detalhes completos da licitação.",
};

export default async function LicitacaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LicitacaoDetalhes id={id} />;
}
