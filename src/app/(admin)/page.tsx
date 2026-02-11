import type { Metadata } from "next";
import { OpportunitiesList } from "@/components/landing/opportunities-list";

export const metadata: Metadata = {
  title: "Licitações BR - Oportunidades de Licitação",
  description:
    "Encontre e acompanhe oportunidades de licitação de órgãos públicos de todo o Brasil.",
};

export default function Home() {
  return <OpportunitiesList />;
}
