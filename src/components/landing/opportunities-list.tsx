"use client";

import { useState, useMemo } from "react";
import { ListFilter } from "lucide-react";
import { LandingHero } from "./landing-hero";
import { LandingFilters } from "./landing-filters";
import { LicitacaoCard } from "./licitacao-card";
import { licitacoesMock } from "@/../mock/licitacoes";
import { Badge } from "@/components/ui-shadcn/badge";

export function OpportunitiesList() {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("all");
  const [estado, setEstado] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return licitacoesMock.filter((l) => {
      const matchSearch =
        !search ||
        l.titulo.toLowerCase().includes(search.toLowerCase()) ||
        l.orgao.toLowerCase().includes(search.toLowerCase()) ||
        l.descricao.toLowerCase().includes(search.toLowerCase());

      const matchCategoria = categoria === "all" || l.categoria === categoria;
      const matchEstado = estado === "all" || l.estado === estado;
      const matchStatus = status === "all" || l.status === status;

      return matchSearch && matchCategoria && matchEstado && matchStatus;
    });
  }, [search, categoria, estado, status]);

  const hasActiveFilters =
    search !== "" ||
    categoria !== "all" ||
    estado !== "all" ||
    status !== "all";

  const clearFilters = () => {
    setSearch("");
    setCategoria("all");
    setEstado("all");
    setStatus("all");
  };

  return (
    <div className="space-y-6">
      <LandingHero />

      <LandingFilters
        search={search}
        onSearchChange={setSearch}
        categoria={categoria}
        onCategoriaChange={setCategoria}
        estado={estado}
        onEstadoChange={setEstado}
        status={status}
        onStatusChange={setStatus}
      />

      {/* Results header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Últimas Oportunidades
          </h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-brand-500 hover:text-brand-600 hover:underline dark:text-brand-400"
            >
              Limpar filtros
            </button>
          )}
        </div>
        <Badge variant="secondary" className="gap-1.5">
          <ListFilter className="h-3 w-3" />
          {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
        </Badge>
      </div>

      {/* Cards grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((licitacao) => (
            <LicitacaoCard key={licitacao.id} licitacao={licitacao} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-white/[0.02]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5">
            <ListFilter className="h-5 w-5 text-gray-400" />
          </div>
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Nenhuma oportunidade encontrada
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tente ajustar os filtros ou buscar por outro termo.
            </p>
          </div>
          <button
            onClick={clearFilters}
            className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
