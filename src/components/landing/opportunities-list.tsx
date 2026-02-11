"use client";

import { useState, useMemo } from "react";
import { LandingHero } from "./landing-hero";
import { LandingFilters } from "./landing-filters";
import { LicitacaoCard } from "./licitacao-card";
import { licitacoesMock } from "@/../mock/licitacoes";

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
        l.orgao.toLowerCase().includes(search.toLowerCase());

      const matchCategoria = categoria === "all" || l.categoria === categoria;
      const matchEstado = estado === "all" || l.estado === estado;
      const matchStatus = status === "all" || l.status === status;

      return matchSearch && matchCategoria && matchEstado && matchStatus;
    });
  }, [search, categoria, estado, status]);

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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Latest Opportunities
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {filtered.length} results found
        </span>
      </div>

      {/* Cards grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((licitacao) => (
            <LicitacaoCard key={licitacao.id} licitacao={licitacao} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-gray-500 dark:text-gray-400">
            No opportunities found with the selected filters.
          </p>
        </div>
      )}
    </div>
  );
}
