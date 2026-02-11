"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  Trash2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  ShieldAlert,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui-shadcn/badge";
import { Button } from "@/components/ui-shadcn/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui-shadcn/tooltip";
import type { Documento, DocumentoStatus } from "@/../mock/documentos";

const statusConfig: Record<
  DocumentoStatus,
  {
    label: string;
    icon: React.ReactNode;
    variant: "success" | "warning" | "destructive" | "secondary";
    color: string;
  }
> = {
  valido: {
    label: "Válido",
    icon: <CheckCircle2 className="h-4 w-4" />,
    variant: "success",
    color: "text-brand-500",
  },
  vencendo: {
    label: "Vencendo",
    icon: <Clock className="h-4 w-4" />,
    variant: "warning",
    color: "text-warning-500",
  },
  vencido: {
    label: "Vencido",
    icon: <XCircle className="h-4 w-4" />,
    variant: "destructive",
    color: "text-error-500",
  },
  pendente: {
    label: "Pendente",
    icon: <ShieldAlert className="h-4 w-4" />,
    variant: "secondary",
    color: "text-gray-400",
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

function getValidadeLabel(doc: Documento): string {
  if (!doc.dataValidade) return "Sem validade";
  if (doc.diasParaVencer === null) return formatDate(doc.dataValidade);
  if (doc.diasParaVencer < 0) return `Vencido há ${Math.abs(doc.diasParaVencer)} dias`;
  if (doc.diasParaVencer === 0) return "Vence hoje";
  return `Vence em ${doc.diasParaVencer} dias`;
}

interface DocumentoRowProps {
  documento: Documento;
}

export function DocumentoRow({ documento: doc }: DocumentoRowProps) {
  const [expanded, setExpanded] = useState(false);
  const st = statusConfig[doc.status];
  const licitacoesComProblema = doc.licitacoes.filter(
    (l) => l.exigido && !l.atende
  );
  const hasProblems = licitacoesComProblema.length > 0;

  return (
    <div
      className={`rounded-xl border transition-all ${
        doc.status === "vencido"
          ? "border-error-200 bg-error-50/30 dark:border-error-500/20 dark:bg-error-500/5"
          : doc.status === "vencendo"
            ? "border-warning-200 bg-warning-50/20 dark:border-warning-500/15 dark:bg-warning-500/5"
            : "border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
      }`}
    >
      {/* Main row */}
      <div className="flex items-center gap-4 p-4">
        {/* Icon */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
            doc.status === "vencido"
              ? "bg-error-100 dark:bg-error-500/15"
              : doc.status === "vencendo"
                ? "bg-warning-100 dark:bg-warning-500/15"
                : "bg-gray-100 dark:bg-white/5"
          }`}
        >
          <FileText className={`h-5 w-5 ${st.color}`} />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
              {doc.nome}
            </h4>
            <Badge variant={st.variant} className="shrink-0 text-[10px]">
              {st.label}
            </Badge>
            {hasProblems && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-0.5 rounded-full bg-error-100 px-1.5 py-0.5 text-[10px] font-bold text-error-600 dark:bg-error-500/15 dark:text-error-400">
                    <AlertTriangle className="h-2.5 w-2.5" />
                    {licitacoesComProblema.length}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  Impede participação em {licitacoesComProblema.length} licitaç
                  {licitacoesComProblema.length === 1 ? "ão" : "ões"}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-400 dark:text-gray-500">
            <span>{doc.categoria.nome}</span>
            <span>{doc.tipo} &middot; {doc.tamanho}</span>
            <span>Upload: {formatDate(doc.dataUpload)}</span>
            {doc.dataValidade && (
              <span
                className={
                  doc.status === "vencido"
                    ? "font-semibold text-error-500"
                    : doc.status === "vencendo"
                      ? "font-semibold text-warning-600 dark:text-warning-400"
                      : ""
                }
              >
                {getValidadeLabel(doc)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {(doc.status === "vencido" || doc.status === "vencendo") && (
            <Button variant="outline" size="sm" className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Renovar</span>
            </Button>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Baixar</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-error-500 hover:text-error-600">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remover</TooltipContent>
          </Tooltip>
          {doc.licitacoes.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Expanded: Licitações vinculadas */}
      {expanded && doc.licitacoes.length > 0 && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3 dark:border-gray-800">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Licitações que exigem este documento
          </p>
          <div className="space-y-2">
            {doc.licitacoes.map((l) => (
              <div
                key={l.licitacaoId}
                className={`flex items-start gap-2.5 rounded-lg p-2.5 ${
                  l.exigido && !l.atende
                    ? "bg-error-50/50 dark:bg-error-500/5"
                    : "bg-gray-50 dark:bg-white/[0.02]"
                }`}
              >
                {l.atende ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-500" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Edital nº {l.numeroEdital}
                    </span>
                    <span className="truncate text-xs text-gray-400">
                      — {l.titulo}
                    </span>
                  </div>
                  {l.mensagem && (
                    <p
                      className={`mt-0.5 text-xs ${
                        l.atende
                          ? "text-gray-400"
                          : "font-medium text-error-600 dark:text-error-400"
                      }`}
                    >
                      {l.mensagem}
                    </p>
                  )}
                  {l.atende && (
                    <p className="mt-0.5 text-xs text-brand-500">
                      Documento atende à exigência
                    </p>
                  )}
                </div>
                <Link
                  href={`/licitacoes/${l.licitacaoId}`}
                  className="shrink-0 text-gray-400 transition-colors hover:text-brand-500"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
