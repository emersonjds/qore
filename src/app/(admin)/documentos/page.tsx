import type { Metadata } from "next";
import { DocumentosPage } from "@/components/documentos/documentos-page";

export const metadata: Metadata = {
  title: "Documentos - Licitações BR",
  description:
    "Gerencie a documentação da sua empresa para processos de licitação.",
};

export default function Documentos() {
  return <DocumentosPage />;
}
