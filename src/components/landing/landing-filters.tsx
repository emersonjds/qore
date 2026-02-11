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
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar por palavra-chave ou órgão..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category */}
        <Select value={categoria} onValueChange={onCategoriaChange}>
          <SelectTrigger>
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
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
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os estados</SelectItem>
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
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="Ativa">Ativa</SelectItem>
            <SelectItem value="Encerrada">Encerrada</SelectItem>
            <SelectItem value="Próxima">Próxima</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
