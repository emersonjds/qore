import type { Metadata } from "next";
import { CatalogoPage } from "@/components/catalogo/catalogo-page";

export const metadata: Metadata = {
  title: "Meu Catálogo - Licitações BR",
  description:
    "Gerencie o catálogo de produtos da sua empresa para análise automática de compatibilidade.",
};

export default function Catalogo() {
  return <CatalogoPage />;
}
