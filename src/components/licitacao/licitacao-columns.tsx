"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui-shadcn/button";
import { Checkbox } from "@/components/ui-shadcn/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui-shadcn/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { LicitacaoStatusBadge } from "./licitacao-status-badge";
import {
  type statusLicitacao,
  type modalidadeLicitacao,
  modalidadeLabels,
} from "@/lib/schemas/licitacao";

export interface LicitacaoRow {
  id: string;
  numero: string;
  orgao: string;
  objeto: string;
  modalidade: (typeof modalidadeLicitacao)[number];
  dataAbertura: string;
  valorEstimado: number;
  status: (typeof statusLicitacao)[number];
}

export const licitacaoColumns: ColumnDef<LicitacaoRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "numero",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Número" />
    ),
    cell: ({ row }) => (
      <span className="font-medium text-brand-500">{row.getValue("numero")}</span>
    ),
  },
  {
    accessorKey: "orgao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Órgão" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[200px] truncate">{row.getValue("orgao")}</span>
    ),
  },
  {
    accessorKey: "objeto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Objeto" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[300px] truncate block">
        {row.getValue("objeto")}
      </span>
    ),
  },
  {
    accessorKey: "modalidade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modalidade" />
    ),
    cell: ({ row }) => {
      const modalidade = row.getValue("modalidade") as keyof typeof modalidadeLabels;
      return <span>{modalidadeLabels[modalidade]}</span>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "dataAbertura",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Abertura" />
    ),
    cell: ({ row }) => (
      <span>
        {new Date(row.getValue("dataAbertura")).toLocaleDateString("pt-BR")}
      </span>
    ),
  },
  {
    accessorKey: "valorEstimado",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor Estimado" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("valorEstimado"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
      return <span className="font-medium">{formatted}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return <LicitacaoStatusBadge status={row.getValue("status")} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const licitacao = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(licitacao.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Ver propostas</DropdownMenuItem>
            <DropdownMenuItem>Ver documentos</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
