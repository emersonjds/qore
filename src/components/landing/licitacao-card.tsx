"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  MapPin,
  CalendarDays,
  ArrowRight,
  Heart,
  FileDown,
  Send,
  Gavel,
  Sparkles,
  BrainCircuit,
  Lock,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui-shadcn/badge";
import { Button } from "@/components/ui-shadcn/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui-shadcn/tooltip";
import type { Licitacao, LicitacaoStatus, MatchAnalise } from "@/../mock/licitacoes";

const statusConfig: Record<
  LicitacaoStatus,
  { label: string; variant: "success" | "destructive" | "warning" }
> = {
  Ativa: { label: "Ativa", variant: "success" },
  Encerrada: { label: "Encerrada", variant: "destructive" },
  Próxima: { label: "Próxima", variant: "warning" },
};

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("pt-BR");
}

function getMatchColor(score: number) {
  if (score >= 75) return { bar: "bg-brand-500", text: "text-brand-600 dark:text-brand-400", bg: "bg-brand-50 dark:bg-brand-500/10", label: "Alta compatibilidade" };
  if (score >= 40) return { bar: "bg-warning-500", text: "text-warning-600 dark:text-warning-400", bg: "bg-warning-50 dark:bg-warning-500/10", label: "Compatibilidade média" };
  return { bar: "bg-error-400", text: "text-error-500 dark:text-error-400", bg: "bg-error-50 dark:bg-error-500/10", label: "Baixa compatibilidade" };
}

function MatchPanel({ match, onClose }: { match: MatchAnalise; onClose: () => void }) {
  const config = getMatchColor(match.score);

  return (
    <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300 rounded-xl border border-theme-purple-500/20 bg-gradient-to-br from-theme-purple-500/5 to-brand-500/5 p-4 dark:from-theme-purple-500/10 dark:to-brand-500/10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-theme-purple-500/10">
            <BrainCircuit className="h-3.5 w-3.5 text-theme-purple-500" />
          </div>
          <span className="text-xs font-semibold text-gray-800 dark:text-white">
            Análise IA
          </span>
          <span className="rounded bg-theme-purple-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-theme-purple-500">
            Pro
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-0.5 text-gray-400 transition-colors hover:bg-gray-200/50 hover:text-gray-600 dark:hover:bg-white/10 dark:hover:text-gray-300"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Score + bar */}
      <div className="mt-3 flex items-center gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${config.bg}`}>
          <span className={`text-base font-bold ${config.text}`}>
            {match.score}%
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold ${config.text}`}>
              {config.label}
            </span>
            <span className="text-[11px] text-gray-400 dark:text-gray-500">
              {match.itensCompativeis}/{match.totalItensEdital} itens
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200/50 dark:bg-white/10">
            <div
              className={`h-full rounded-full transition-all duration-500 ${config.bar}`}
              style={{ width: `${match.score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div className="mt-3 flex flex-wrap gap-1">
        {match.keywordsMatch.map((kw) => (
          <span
            key={kw}
            className="rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-white/5 dark:text-gray-400"
          >
            {kw}
          </span>
        ))}
      </div>
    </div>
  );
}

// Estado bloqueado — para quem não é PRO
function MatchLockedPanel() {
  return (
    <div className="mt-4 rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-4 text-center dark:border-gray-700 dark:bg-white/[0.02]">
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5">
          <Lock className="h-4 w-4 text-gray-400" />
        </div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
          Assine o plano <span className="font-bold text-theme-purple-500">Pro</span> para desbloquear a análise de compatibilidade por IA.
        </p>
        <button className="mt-1 rounded-lg bg-theme-purple-500/10 px-3 py-1.5 text-xs font-semibold text-theme-purple-500 transition-colors hover:bg-theme-purple-500/20">
          Conhecer planos
        </button>
      </div>
    </div>
  );
}

interface LicitacaoCardProps {
  licitacao: Licitacao;
  /** Simula se o usuário tem plano Pro (default: true para demo) */
  isPro?: boolean;
}

export function LicitacaoCard({ licitacao, isPro = true }: LicitacaoCardProps) {
  const config = statusConfig[licitacao.status];
  const [favoritada, setFavoritada] = useState(licitacao.favoritada ?? false);
  const [showAnalise, setShowAnalise] = useState(false);

  return (
    <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-theme-xs transition-all hover:border-brand-200 hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-brand-500/30">
      {/* Header */}
      <div className="flex items-center justify-between p-5 pb-0">
        <div className="flex items-center gap-2">
          <Badge variant={config.variant}>{config.label}</Badge>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {licitacao.modalidade}
          </span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setShowAnalise(!showAnalise)}
              className={`relative flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold transition-all ${
                showAnalise
                  ? "bg-theme-purple-500/10 text-theme-purple-500"
                  : "bg-gray-100 text-gray-500 hover:bg-theme-purple-500/10 hover:text-theme-purple-500 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-theme-purple-500/10 dark:hover:text-theme-purple-500"
              }`}
            >
              <BrainCircuit className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">IA</span>
              {/* Badge PRO */}
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-theme-purple-500 text-[7px] font-bold text-white">
                <Sparkles className="h-2 w-2" />
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            Análise de compatibilidade por IA
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            {licitacao.titulo}
          </h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setFavoritada(!favoritada)}
                className="shrink-0 rounded-lg p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-white/5"
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    favoritada
                      ? "fill-error-500 text-error-500"
                      : "text-gray-400 hover:text-error-400"
                  }`}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {favoritada ? "Remover dos favoritos" : "Salvar nos favoritos"}
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Edital nº {licitacao.numeroEdital}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <MapPin className="h-3 w-3" />
            {licitacao.cidade}, {licitacao.estado}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <Building2 className="h-4 w-4 shrink-0" />
          <span className="truncate">{licitacao.orgao}</span>
        </div>

        {/* Valor Estimado + Prazo */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-gray-50 p-3 dark:bg-white/5">
            <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Valor Estimado
            </span>
            <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
              {formatCurrency(licitacao.valor)}
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 dark:bg-white/5">
            <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Prazo Final
            </span>
            <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-gray-900 dark:text-white">
              <CalendarDays className="h-3.5 w-3.5 text-brand-500" />
              {formatDate(licitacao.prazo)}
            </div>
          </div>
        </div>

        {/* Análise IA — toggle */}
        {showAnalise && (
          isPro ? (
            <MatchPanel match={licitacao.match} onClose={() => setShowAnalise(false)} />
          ) : (
            <MatchLockedPanel />
          )
        )}

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {licitacao.descricao}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 border-t border-gray-100 p-4 dark:border-gray-800">
        {licitacao.status === "Ativa" ? (
          <Button asChild className="flex-1">
            <Link href={`/licitacoes/${licitacao.id}`}>
              <Send className="h-4 w-4" />
              Enviar Proposta
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/licitacoes/${licitacao.id}`}>
              <ArrowRight className="h-4 w-4" />
              Ver Detalhes
            </Link>
          </Button>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <FileDown className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Baixar Edital</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Gavel className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ver Edital no Portal</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
