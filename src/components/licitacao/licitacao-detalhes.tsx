"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  MapPin,
  CalendarDays,
  FileDown,
  Gavel,
  Send,
  Heart,
  Sparkles,
  FileText,
  Clock,
  Tag,
  Hash,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui-shadcn/badge";
import { Button } from "@/components/ui-shadcn/button";
import { Separator } from "@/components/ui-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui-shadcn/tooltip";
import {
  licitacoesMock,
  type LicitacaoStatus,
  type MatchAnalise,
} from "@/../mock/licitacoes";

const statusConfig: Record<
  LicitacaoStatus,
  { label: string; variant: "success" | "destructive" | "warning" }
> = {
  Ativa: { label: "Ativa", variant: "success" },
  Encerrada: { label: "Encerrada", variant: "destructive" },
  Próxima: { label: "Próxima", variant: "warning" },
};

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getMatchColor(score: number) {
  if (score >= 75)
    return {
      bar: "bg-brand-500",
      text: "text-brand-600 dark:text-brand-400",
      bg: "bg-brand-50 dark:bg-brand-500/10",
      label: "Alta compatibilidade",
      icon: <CheckCircle2 className="h-5 w-5 text-brand-500" />,
    };
  if (score >= 40)
    return {
      bar: "bg-warning-500",
      text: "text-warning-600 dark:text-warning-400",
      bg: "bg-warning-50 dark:bg-warning-500/10",
      label: "Compatibilidade média",
      icon: <AlertTriangle className="h-5 w-5 text-warning-500" />,
    };
  return {
    bar: "bg-error-400",
    text: "text-error-500 dark:text-error-400",
    bg: "bg-error-50 dark:bg-error-500/10",
    label: "Baixa compatibilidade",
    icon: <XCircle className="h-5 w-5 text-error-400" />,
  };
}

// --- Itens mockados do edital (simulando a análise) ---
function gerarItensEdital(match: MatchAnalise) {
  const itensCompativeis = [
    "Dipirona sódica 500mg",
    "Paracetamol 750mg",
    "Seringa descartável 10ml",
    "Luva de procedimento M",
    "Álcool gel 70%",
    "Máscara cirúrgica tripla",
    "Computador desktop i5",
    "Monitor LED 24\"",
    "Switch gerenciável 24 portas",
    "Servidor rack 2U",
    "Software de gestão",
    "Notebook corporativo",
    "Cabo UTP Cat6",
    "Impressora multifuncional",
    "Nobreak 3kVA",
  ];

  const itensIncompativeis = [
    "Desfibrilador automático",
    "Tomógrafo computadorizado",
    "Ambulância UTI",
    "Gerador 150kVA",
    "Central telefônica IP",
    "Mobiliário hospitalar",
    "Ar-condicionado split 60k BTU",
    "Elevador de carga",
  ];

  const compativeis = itensCompativeis.slice(0, match.itensCompativeis);
  const incompativeis = itensIncompativeis.slice(
    0,
    match.totalItensEdital - match.itensCompativeis
  );

  return { compativeis, incompativeis };
}

interface LicitacaoDetalhesProps {
  id: string;
}

export function LicitacaoDetalhes({ id }: LicitacaoDetalhesProps) {
  const licitacao = useMemo(
    () => licitacoesMock.find((l) => l.id === id),
    [id]
  );
  const [favoritada, setFavoritada] = useState(false);

  if (!licitacao) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <FileText className="h-12 w-12 text-gray-300 dark:text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Licitação não encontrada
        </h2>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Painel
          </Link>
        </Button>
      </div>
    );
  }

  const config = statusConfig[licitacao.status];
  const matchConfig = getMatchColor(licitacao.match.score);
  const { compativeis, incompativeis } = gerarItensEdital(licitacao.match);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-brand-500 transition-colors">
          Painel
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-900 dark:text-white font-medium">
          Edital nº {licitacao.numeroEdital}
        </span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={config.variant}>{config.label}</Badge>
            <Badge variant="outline">{licitacao.modalidade}</Badge>
            <Badge variant="secondary">{licitacao.categoria}</Badge>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {licitacao.titulo}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <Hash className="h-4 w-4" />
              Edital nº {licitacao.numeroEdital}
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              {licitacao.orgao}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {licitacao.cidade}, {licitacao.estado}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFavoritada(!favoritada)}
              >
                <Heart
                  className={`h-4 w-4 ${
                    favoritada
                      ? "fill-error-500 text-error-500"
                      : "text-gray-500"
                  }`}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {favoritada ? "Remover dos favoritos" : "Salvar nos favoritos"}
            </TooltipContent>
          </Tooltip>
          <Button variant="outline">
            <FileDown className="h-4 w-4" />
            Baixar Edital
          </Button>
          <Button variant="outline">
            <Gavel className="h-4 w-4" />
            Portal
          </Button>
          {licitacao.status === "Ativa" && (
            <Button>
              <Send className="h-4 w-4" />
              Enviar Proposta
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Left column — Info principal */}
        <div className="space-y-6 xl:col-span-2">
          {/* Info cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                <Tag className="h-3.5 w-3.5" />
                Valor Estimado
              </div>
              <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                {formatCurrency(licitacao.valor)}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                <CalendarDays className="h-3.5 w-3.5" />
                Prazo Final
              </div>
              <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                {formatDate(licitacao.prazo)}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                <FileText className="h-3.5 w-3.5" />
                Itens do Edital
              </div>
              <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                {licitacao.match.totalItensEdital}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                <Clock className="h-3.5 w-3.5" />
                Modalidade
              </div>
              <p className="mt-2 text-sm font-bold text-gray-900 dark:text-white">
                {licitacao.modalidade}
              </p>
            </div>
          </div>

          {/* Descrição */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Descrição do Objeto
            </h2>
            <Separator className="my-4" />
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {licitacao.descricao}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              O presente processo licitatório tem por finalidade a seleção da
              proposta mais vantajosa para a Administração Pública, observados os
              princípios da legalidade, impessoalidade, moralidade, publicidade e
              eficiência, conforme disposto na Lei nº 14.133/2021.
            </p>
          </div>

          {/* Itens do Edital — Análise detalhada */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                Análise de Itens do Edital
              </h2>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {licitacao.match.itensCompativeis}/
                {licitacao.match.totalItensEdital} compatíveis
              </span>
            </div>
            <Separator className="my-4" />

            {compativeis.length > 0 && (
              <div className="mb-4">
                <h3 className="mb-2 flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Itens compatíveis com seu catálogo
                </h3>
                <div className="space-y-1.5">
                  {compativeis.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-lg bg-brand-50/50 px-3 py-2 text-sm text-gray-700 dark:bg-brand-500/5 dark:text-gray-300"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {incompativeis.length > 0 && (
              <div>
                <h3 className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400">
                  <XCircle className="h-4 w-4" />
                  Itens não encontrados no catálogo
                </h3>
                <div className="space-y-1.5">
                  {incompativeis.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-500 dark:bg-white/[0.02] dark:text-gray-400"
                    >
                      <XCircle className="h-3.5 w-3.5 shrink-0 text-gray-300 dark:text-gray-600" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column — Match + Ações */}
        <div className="space-y-6">
          {/* Match card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-2">
              <Sparkles className={`h-5 w-5 ${matchConfig.text}`} />
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                Análise de Compatibilidade
              </h2>
            </div>
            <Separator className="my-4" />

            {/* Score grande */}
            <div className="flex flex-col items-center py-4">
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full ${matchConfig.bg}`}
              >
                <span className={`text-3xl font-bold ${matchConfig.text}`}>
                  {licitacao.match.score}%
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                {matchConfig.icon}
                <span
                  className={`text-sm font-medium ${matchConfig.text}`}
                >
                  {matchConfig.label}
                </span>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
              <div
                className={`h-full rounded-full transition-all ${matchConfig.bar}`}
                style={{ width: `${licitacao.match.score}%` }}
              />
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Itens compatíveis
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {licitacao.match.itensCompativeis} de{" "}
                  {licitacao.match.totalItensEdital}
                </span>
              </div>
              <Separator />
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Palavras-chave encontradas
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {licitacao.match.keywordsMatch.map((kw) => (
                    <span
                      key={kw}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${matchConfig.bg} ${matchConfig.text}`}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Documentos */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Documentos
            </h2>
            <Separator className="my-4" />
            <div className="space-y-2">
              {[
                { nome: "Edital Completo", tipo: "PDF", tamanho: "2.4 MB" },
                { nome: "Termo de Referência", tipo: "PDF", tamanho: "1.1 MB" },
                { nome: "Planilha de Itens", tipo: "XLSX", tamanho: "340 KB" },
                { nome: "Minuta do Contrato", tipo: "PDF", tamanho: "890 KB" },
              ].map((doc) => (
                <button
                  key={doc.nome}
                  className="flex w-full items-center gap-3 rounded-lg border border-gray-100 p-3 text-left transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-error-50 dark:bg-error-500/10">
                    <FileText className="h-4 w-4 text-error-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                      {doc.nome}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {doc.tipo} &middot; {doc.tamanho}
                    </p>
                  </div>
                  <FileDown className="h-4 w-4 shrink-0 text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          {licitacao.status === "Ativa" && (
            <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 dark:border-brand-500/20 dark:bg-brand-500/5">
              <h3 className="font-semibold text-brand-700 dark:text-brand-400">
                Pronto para participar?
              </h3>
              <p className="mt-1 text-sm text-brand-600/70 dark:text-brand-400/60">
                Envie sua proposta antes do prazo final e concorra a esta
                licitação.
              </p>
              <Button className="mt-4 w-full">
                <Send className="h-4 w-4" />
                Enviar Proposta
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
