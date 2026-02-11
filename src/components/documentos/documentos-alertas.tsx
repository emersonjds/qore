"use client";

import {
  AlertTriangle,
  XCircle,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui-shadcn/badge";
import { Button } from "@/components/ui-shadcn/button";
import { getDocumentoStats } from "@/../mock/documentos";

export function DocumentosAlertas() {
  const { bloqueios, vencidos, vencendo } = getDocumentoStats();
  const [expanded, setExpanded] = useState(true);

  if (bloqueios.length === 0 && vencidos === 0 && vencendo === 0) return null;

  // Agrupa bloqueios por documento
  const porDocumento = bloqueios.reduce(
    (acc, b) => {
      if (!acc[b.documentoId]) {
        acc[b.documentoId] = {
          nome: b.documentoNome,
          status: b.documentoStatus,
          licitacoes: [],
        };
      }
      acc[b.documentoId].licitacoes.push(b);
      return acc;
    },
    {} as Record<
      string,
      {
        nome: string;
        status: string;
        licitacoes: typeof bloqueios;
      }
    >
  );

  return (
    <div className="rounded-2xl border border-error-200 bg-error-50/50 dark:border-error-500/20 dark:bg-error-500/5">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-5"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-error-100 dark:bg-error-500/20">
            <AlertTriangle className="h-5 w-5 text-error-600 dark:text-error-400" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-error-700 dark:text-error-400">
              Atenção: documentos impedem participação em licitações
            </h3>
            <p className="mt-0.5 text-xs text-error-500/70 dark:text-error-400/60">
              {bloqueios.length} problema{bloqueios.length !== 1 ? "s" : ""}{" "}
              encontrado{bloqueios.length !== 1 ? "s" : ""} em{" "}
              {Object.keys(porDocumento).length} documento
              {Object.keys(porDocumento).length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="font-bold">
            {bloqueios.length}
          </Badge>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-error-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-error-400" />
          )}
        </div>
      </button>

      {/* Body */}
      {expanded && (
        <div className="border-t border-error-200/50 px-5 pb-5 dark:border-error-500/10">
          <div className="mt-4 space-y-4">
            {Object.entries(porDocumento).map(([docId, doc]) => (
              <div
                key={docId}
                className="rounded-xl border border-error-100 bg-white p-4 dark:border-error-500/10 dark:bg-white/[0.02]"
              >
                <div className="flex items-center gap-2">
                  {doc.status === "vencido" ? (
                    <XCircle className="h-4 w-4 shrink-0 text-error-500" />
                  ) : (
                    <Clock className="h-4 w-4 shrink-0 text-warning-500" />
                  )}
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {doc.nome}
                  </span>
                  <Badge
                    variant={doc.status === "vencido" ? "destructive" : "warning"}
                    className="text-[10px]"
                  >
                    {doc.status === "vencido" ? "Vencido" : "Vencendo"}
                  </Badge>
                </div>

                <div className="mt-3 space-y-2">
                  {doc.licitacoes.map((l) => (
                    <div
                      key={l.licitacaoId}
                      className="flex items-start gap-2 rounded-lg bg-gray-50 p-2.5 dark:bg-white/[0.03]"
                    >
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-error-400" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            Edital nº {l.edital}
                          </span>
                          <span className="truncate text-xs text-gray-400">
                            — {l.licitacaoTitulo}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-error-600 dark:text-error-400">
                          {l.mensagem}
                        </p>
                      </div>
                      <Link
                        href={`/licitacoes/${l.licitacaoId}`}
                        className="shrink-0 text-gray-400 hover:text-brand-500"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Atualizar documento
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
