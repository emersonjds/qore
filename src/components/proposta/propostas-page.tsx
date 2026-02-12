"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ChevronRight,
  FileText,
  Send,
  Trophy,
  DollarSign,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui-shadcn/input";
import { Badge } from "@/components/ui-shadcn/badge";
import { Button } from "@/components/ui-shadcn/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui-shadcn/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui-shadcn/table";
import { statusPropostaLabels } from "@/lib/schemas/licitacao";
import { propostasMock, type StatusProposta } from "@/../mock/propostas";

const statusBadgeVariant: Record<
  StatusProposta,
  "secondary" | "info" | "default" | "success" | "destructive" | "solid-success" | "warning"
> = {
  rascunho: "secondary",
  submetida: "info",
  em_analise: "default",
  classificada: "success",
  desclassificada: "destructive",
  vencedora: "solid-success",
  recurso: "warning",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("pt-BR");
}

export function PropostasPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return propostasMock.filter((p) => {
      const matchSearch =
        !search ||
        p.titulo.toLowerCase().includes(search.toLowerCase()) ||
        p.numeroEdital.toLowerCase().includes(search.toLowerCase()) ||
        p.orgao.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === "all" || p.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const stats = useMemo(() => {
    const total = propostasMock.length;
    const enviadasEmAnalise = propostasMock.filter(
      (p) => p.status === "submetida" || p.status === "em_analise"
    ).length;
    const vencedoras = propostasMock.filter(
      (p) => p.status === "vencedora"
    ).length;
    const valorTotal = propostasMock.reduce((acc, p) => acc + p.valorTotal, 0);
    return { total, enviadasEmAnalise, vencedoras, valorTotal };
  }, []);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="transition-colors hover:text-brand-500">
          Painel
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/propostas" className="transition-colors hover:text-brand-500">
          Propostas
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-gray-900 dark:text-white">
          Minhas Propostas
        </span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Minhas Propostas
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Acompanhe o status de todas as propostas enviadas para licitações.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
              <FileText className="h-4 w-4 text-brand-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Total de Propostas
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-light-50 dark:bg-blue-light-500/10">
              <Send className="h-4 w-4 text-blue-light-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Enviadas / Em Análise
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {stats.enviadasEmAnalise}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success-50 dark:bg-success-500/10">
              <Trophy className="h-4 w-4 text-success-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Vencedoras
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {stats.vencedoras}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-light-50 dark:bg-blue-light-500/10">
              <DollarSign className="h-4 w-4 text-blue-light-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Valor Total
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatCurrency(stats.valorTotal)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar por edital, título ou órgão..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="rascunho">Rascunho</SelectItem>
            <SelectItem value="submetida">Submetida</SelectItem>
            <SelectItem value="em_analise">Em Análise</SelectItem>
            <SelectItem value="classificada">Classificada</SelectItem>
            <SelectItem value="desclassificada">Desclassificada</SelectItem>
            <SelectItem value="vencedora">Vencedora</SelectItem>
            <SelectItem value="recurso">Em Recurso</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {filtered.length > 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº Edital</TableHead>
                <TableHead>Objeto / Título</TableHead>
                <TableHead className="hidden md:table-cell">Órgão</TableHead>
                <TableHead className="hidden sm:table-cell">Data Envio</TableHead>
                <TableHead className="hidden lg:table-cell text-center">Itens</TableHead>
                <TableHead className="hidden sm:table-cell text-right">Valor Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((proposta) => (
                <TableRow key={proposta.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/licitacoes/${proposta.licitacaoId}`}
                      className="text-brand-500 hover:underline"
                    >
                      {proposta.numeroEdital}
                    </Link>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {proposta.titulo}
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[180px] truncate">
                    {proposta.orgao}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell whitespace-nowrap">
                    {formatDate(proposta.dataEnvio)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-center">
                    {proposta.qtdItens}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-right whitespace-nowrap">
                    {formatCurrency(proposta.valorTotal)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant[proposta.status]}>
                      {statusPropostaLabels[proposta.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/licitacoes/${proposta.licitacaoId}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver detalhes</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-white p-16 text-center dark:border-gray-700 dark:bg-white/[0.02]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5">
            <FileText className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Nenhuma proposta encontrada
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Ajuste os filtros ou envie uma nova proposta.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
