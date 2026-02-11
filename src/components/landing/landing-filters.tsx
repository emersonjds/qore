"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui-shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui-shadcn/select";

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

const estados = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

interface LandingFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  categoria: string;
  onCategoriaChange: (value: string) => void;
  estado: string;
  onEstadoChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export function LandingFilters({
  search,
  onSearchChange,
  categoria,
  onCategoriaChange,
  estado,
  onEstadoChange,
  status,
  onStatusChange,
}: LandingFiltersProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by keyword or agency..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category */}
          <Select value={categoria} onValueChange={onCategoriaChange}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categorias.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Region (State) */}
          <Select value={estado} onValueChange={onEstadoChange}>
            <SelectTrigger>
              <SelectValue placeholder="Region (State)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {estados.map((uf) => (
                <SelectItem key={uf} value={uf}>
                  {uf}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Ativa">Ativa</SelectItem>
              <SelectItem value="Encerrada">Encerrada</SelectItem>
              <SelectItem value="Próxima">Próxima</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
