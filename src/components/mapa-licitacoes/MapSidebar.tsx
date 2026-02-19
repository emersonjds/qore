"use client";

import React from "react";
import Link from "next/link";
import { MapPin, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui-shadcn/scroll-area";
import { Badge } from "@/components/ui-shadcn/badge";
import type { GrupoEstado } from "@/lib/geo-utils";

const STATUS_VARIANT: Record<string, "success" | "destructive" | "warning"> = {
  Ativa: "success",
  Encerrada: "destructive",
  Próxima: "warning",
};

function formatBRL(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("pt-BR");
}

interface MapSidebarProps {
  grupos: GrupoEstado[];
  estadoSelecionado: string | null;
}

const MapSidebar: React.FC<MapSidebarProps> = ({
  grupos,
  estadoSelecionado,
}) => {
  const gruposFiltrados = estadoSelecionado
    ? grupos.filter((g) => g.estado === estadoSelecionado)
    : grupos;

  if (gruposFiltrados.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 py-12 text-gray-400 dark:text-gray-500">
        <FileText className="h-12 w-12" />
        <p className="text-sm">Nenhuma licitação encontrada.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-1">
        {gruposFiltrados.map((grupo) => (
          <div key={grupo.estado}>
            {/* Header do grupo */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-500" />
                <span className="font-semibold text-sm text-gray-800 dark:text-white/90">
                  {grupo.estado}
                </span>
                <Badge variant="secondary">
                  {grupo.licitacoes.length}
                </Badge>
              </div>
              {grupo.distanciaKm != null && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {grupo.distanciaKm.toLocaleString("pt-BR")} km
                </span>
              )}
            </div>

            {/* Cards de licitações */}
            <div className="space-y-2 ml-6">
              {grupo.licitacoes.map((lic) => (
                <Link
                  key={lic.id}
                  href={`/licitacoes/${lic.id}`}
                  className="block rounded-lg border border-gray-200 p-3 transition-colors hover:border-brand-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-brand-500/30 dark:hover:bg-white/[0.03]"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="text-sm font-medium text-gray-800 dark:text-white/90 line-clamp-1">
                      {lic.titulo}
                    </h4>
                    <Badge variant={STATUS_VARIANT[lic.status]}>
                      {lic.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 line-clamp-1">
                    {lic.orgao}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-brand-600 dark:text-brand-400">
                      {formatBRL(lic.valor)}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500">
                      Prazo: {formatDate(lic.prazo)}
                    </span>
                  </div>
                  {/* Match score bar */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        Match
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">
                        {lic.match.score}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                      <div
                        className="h-full rounded-full bg-brand-500 transition-all"
                        style={{ width: `${lic.match.score}%` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default MapSidebar;
