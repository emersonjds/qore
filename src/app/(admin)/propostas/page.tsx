import type { Metadata } from "next";
import { PropostasPage } from "@/components/proposta/propostas-page";

export const metadata: Metadata = {
  title: "Minhas Propostas - Licitações BR",
  description:
    "Acompanhe o status de todas as propostas enviadas para licitações.",
};

export default function Propostas() {
  return <PropostasPage />;
}
