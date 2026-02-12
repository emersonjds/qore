import type { Metadata } from "next";
import { PropostaForm } from "@/components/proposta";

export const metadata: Metadata = {
  title: "Nova Proposta - Licitações BR",
  description: "Crie e envie sua proposta para a licitação.",
};

export default async function PropostaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PropostaForm licitacaoId={id} />;
}
