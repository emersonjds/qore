import Link from "next/link";
import {
  Building2,
  MapPin,
  DollarSign,
  CalendarDays,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui-shadcn/badge";
import { Button } from "@/components/ui-shadcn/button";
import type { Licitacao, LicitacaoStatus } from "@/../mock/licitacoes";

const statusConfig: Record<
  LicitacaoStatus,
  { label: string; variant: "success" | "destructive" | "warning" }
> = {
  Ativa: { label: "Active", variant: "success" },
  Encerrada: { label: "Closed", variant: "destructive" },
  Próxima: { label: "Upcoming", variant: "warning" },
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

interface LicitacaoCardProps {
  licitacao: Licitacao;
}

export function LicitacaoCard({ licitacao }: LicitacaoCardProps) {
  const config = statusConfig[licitacao.status];

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-theme-sm transition-shadow hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header */}
      <div className="flex items-start justify-between p-5 pb-0">
        <Badge variant={config.variant}>{config.label}</Badge>
        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <MapPin className="h-3.5 w-3.5" />
          {licitacao.cidade}, {licitacao.estado}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {licitacao.titulo}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <Building2 className="h-4 w-4 shrink-0" />
          <span className="truncate">{licitacao.orgao}</span>
        </div>

        {/* Value + Deadline */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-gray-50 p-3 dark:bg-white/5">
            <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Value
            </span>
            <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-gray-900 dark:text-white">
              <DollarSign className="h-3.5 w-3.5 text-blue-600" />
              {formatCurrency(licitacao.valor)}
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 dark:bg-white/5">
            <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Deadline
            </span>
            <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-gray-900 dark:text-white">
              <CalendarDays className="h-3.5 w-3.5 text-blue-600" />
              {formatDate(licitacao.prazo)}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {licitacao.descricao}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 border-t border-gray-100 p-4 dark:border-gray-800">
        <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
          <Link href={`/licitacoes/${licitacao.id}`}>
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link href={`/licitacoes/${licitacao.id}`} target="_blank">
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
