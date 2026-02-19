"use client";

import React, { useMemo, useState } from "react";
import {
  Loader2,
  MapPinOff,
  MapPin,
  X,
} from "lucide-react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui-shadcn/select";
import { useGeolocation } from "@/hooks/useGeolocation";
import { agruparPorEstado } from "@/lib/geo-utils";
import { licitacoesMock, type LicitacaoStatus } from "../../../mock/licitacoes";
import BrazilMap from "./BrazilMap";
import MapSidebar from "./MapSidebar";

const categorias = [
  "Saúde",
  "Educação",
  "Infraestrutura",
  "Tecnologia",
  "Serviços Gerais",
  "Alimentação",
  "Segurança",
  "Transporte",
];

export default function MapaLicitacoes() {
  const { latitude, longitude, loading, error, requestLocation } =
    useGeolocation();

  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [categoriaFilter, setCategoriaFilter] = useState<string>("todas");
  const [raioKm, setRaioKm] = useState<number>(5000);
  const [estadoSelecionado, setEstadoSelecionado] = useState<string | null>(
    null
  );

  // Filtrar licitações
  const licitacoesFiltradas = useMemo(() => {
    return licitacoesMock.filter((lic) => {
      if (statusFilter !== "todos" && lic.status !== statusFilter) return false;
      if (categoriaFilter !== "todas" && lic.categoria !== categoriaFilter)
        return false;
      return true;
    });
  }, [statusFilter, categoriaFilter]);

  // Agrupar por estado com distância
  const grupos = useMemo(() => {
    const agrupados = agruparPorEstado(
      licitacoesFiltradas,
      latitude,
      longitude
    );

    // Filtrar por raio se a localização estiver disponível
    if (latitude != null && longitude != null) {
      return agrupados.filter(
        (g) => g.distanciaKm == null || g.distanciaKm <= raioKm
      );
    }
    return agrupados;
  }, [licitacoesFiltradas, latitude, longitude, raioKm]);

  const handleMarkerClick = (estado: string) => {
    setEstadoSelecionado((prev) => (prev === estado ? null : estado));
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Mapa de Licitações" />

      {/* Banner de geolocalização */}
      <div className="mb-4">
        {loading && (
          <div className="flex items-center gap-2 rounded-lg bg-blue-light-50 px-4 py-2.5 text-sm text-blue-light-500 dark:bg-blue-light-500/10">
            <Loader2 className="h-4 w-4 animate-spin" />
            Obtendo sua localização...
          </div>
        )}
        {error && (
          <div className="flex items-center justify-between rounded-lg bg-warning-50 px-4 py-2.5 text-sm text-warning-600 dark:bg-warning-500/10 dark:text-orange-400">
            <div className="flex items-center gap-2">
              <MapPinOff className="h-4 w-4" />
              {error}
            </div>
            <button
              onClick={requestLocation}
              className="text-xs font-medium underline hover:no-underline"
            >
              Tentar novamente
            </button>
          </div>
        )}
        {!loading && !error && latitude != null && (
          <div className="flex items-center gap-2 rounded-lg bg-success-50 px-4 py-2.5 text-sm text-success-600 dark:bg-success-500/10 dark:text-success-500">
            <MapPin className="h-4 w-4" />
            Localização detectada. Licitações ordenadas por proximidade.
          </div>
        )}
      </div>

      {/* Filtros */}
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <div className="w-44">
          <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Ativa">Ativa</SelectItem>
              <SelectItem value="Encerrada">Encerrada</SelectItem>
              <SelectItem value="Próxima">Próxima</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-48">
          <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
            Categoria
          </label>
          <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              {categorias.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-52">
          <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
            Raio: {raioKm.toLocaleString("pt-BR")} km
          </label>
          <input
            type="range"
            min={100}
            max={5000}
            step={100}
            value={raioKm}
            onChange={(e) => setRaioKm(Number(e.target.value))}
            className="h-9 w-full accent-brand-500"
            disabled={latitude == null}
          />
        </div>

        {estadoSelecionado && (
          <button
            onClick={() => setEstadoSelecionado(null)}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-gray-300 px-3 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <X className="h-3.5 w-3.5" />
            Limpar: {estadoSelecionado}
          </button>
        )}
      </div>

      {/* Layout Grid: mapa + sidebar */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <BrazilMap
            grupos={grupos}
            userLat={latitude}
            userLng={longitude}
            estadoSelecionado={estadoSelecionado}
            onMarkerClick={handleMarkerClick}
          />
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] lg:max-h-[600px]">
          <h3 className="mb-3 text-sm font-semibold text-gray-800 dark:text-white/90">
            Licitações por Estado
          </h3>
          <MapSidebar
            grupos={grupos}
            estadoSelecionado={estadoSelecionado}
          />
        </div>
      </div>
    </div>
  );
}
