import type { Metadata } from "next";
import MapaLicitacoes from "@/components/mapa-licitacoes/MapaLicitacoes";

export const metadata: Metadata = {
  title: "Mapa de Licitações | Qore",
  description:
    "Visualize licitações no mapa do Brasil, filtradas por proximidade, status e categoria.",
};

export default function MapaLicitacoesPage() {
  return <MapaLicitacoes />;
}
