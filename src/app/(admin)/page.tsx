import type { Metadata } from "next";
import { OpportunitiesList } from "@/components/landing/opportunities-list";

export const metadata: Metadata = {
  title: "Licitações BR - Find Government Opportunities",
  description:
    "Access real-time bidding opportunities from agencies across Brazil.",
};

export default function Home() {
  return <OpportunitiesList />;
}
