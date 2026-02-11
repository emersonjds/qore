"use client";

import Image from "next/image";
import {
  ShieldCheck,
  Tag,
  Boxes,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  BrainCircuit,
} from "lucide-react";
import { Badge } from "@/components/ui-shadcn/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui-shadcn/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui-shadcn/dropdown-menu";
import { Button } from "@/components/ui-shadcn/button";
import type { Produto, ProdutoStatus, NormaConformidade } from "@/../mock/catalogo";

const statusMap: Record<ProdutoStatus, { label: string; variant: "success" | "secondary" | "warning" }> = {
  ativo: { label: "Ativo", variant: "success" },
  inativo: { label: "Inativo", variant: "secondary" },
  pendente: { label: "Pendente", variant: "warning" },
};

const normaColors: Record<NormaConformidade, string> = {
  ABNT: "bg-blue-light-50 text-blue-light-700 dark:bg-blue-light-500/10 dark:text-blue-light-400",
  ANVISA: "bg-error-50 text-error-600 dark:bg-error-500/10 dark:text-error-400",
  INMETRO: "bg-warning-50 text-warning-700 dark:bg-warning-500/10 dark:text-warning-400",
  ISO: "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400",
  MAPA: "bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400",
};

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface ProdutoCardProps {
  produto: Produto;
}

export function ProdutoCard({ produto }: ProdutoCardProps) {
  const st = statusMap[produto.status];

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-xs transition-all hover:border-brand-200 hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-brand-500/30">
      {/* Image */}
      <div className="relative aspect-[7/5] w-full overflow-hidden bg-gray-100 dark:bg-white/5">
        <Image
          src={produto.imagemUrl}
          alt={produto.nome}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
        {/* Overlay badges */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          <Badge variant={st.variant} className="shadow-sm">
            {st.label}
          </Badge>
        </div>
        {/* Match count */}
        {produto.matchCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-theme-purple-500/90 px-2 py-1 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm">
                <BrainCircuit className="h-3 w-3" />
                {produto.matchCount} matches
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Este produto apareceu em {produto.matchCount} editais
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
              {produto.nome}
            </h3>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <span>{produto.codigoInterno}</span>
              <span>&middot;</span>
              <span>NCM {produto.ncm}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="h-4 w-4" />
                Ver detalhes
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-error-600 focus:text-error-600">
                <Trash2 className="h-4 w-4" />
                Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Category + Unit */}
        <div className="mt-2 flex items-center gap-1.5">
          <span className="flex items-center gap-1 rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-white/5 dark:text-gray-400">
            <Tag className="h-2.5 w-2.5" />
            {produto.subcategoria}
          </span>
          <span className="flex items-center gap-1 rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-white/5 dark:text-gray-400">
            <Boxes className="h-2.5 w-2.5" />
            {produto.unidade}
          </span>
        </div>

        {/* Description */}
        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          {produto.descricao}
        </p>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatCurrency(produto.precoUnitario)}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            / {produto.unidade.toLowerCase().includes("caixa") ? "cx" : "un"}
          </span>
        </div>

        {/* Conformidades */}
        <div className="mt-3 border-t border-gray-100 pt-3 dark:border-gray-800">
          <div className="mb-1.5 flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
            <ShieldCheck className="h-3 w-3" />
            Conformidades
          </div>
          <div className="flex flex-wrap gap-1">
            {produto.conformidades.map((c) => (
              <Tooltip key={c.codigo}>
                <TooltipTrigger asChild>
                  <span className={`cursor-default rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${normaColors[c.norma]}`}>
                    {c.norma}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-56">
                  <p className="font-semibold">{c.codigo}</p>
                  <p className="text-xs text-gray-400">{c.descricao}</p>
                  {c.validade && (
                    <p className="mt-0.5 text-xs text-gray-500">
                      Validade: {c.validade}
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
