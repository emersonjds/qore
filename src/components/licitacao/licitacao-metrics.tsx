"use client";

import {
  FileText,
  DollarSign,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui-shadcn/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  iconBgColor,
}: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">
              {value}
            </p>
            {change !== undefined && (
              <div className="mt-2 flex items-center gap-1">
                {isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-success-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-error-500" />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    isPositive
                      ? "text-success-500"
                      : "text-error-500"
                  )}
                >
                  {Math.abs(change)}%
                </span>
                {changeLabel && (
                  <span className="text-sm text-gray-400">{changeLabel}</span>
                )}
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              iconBgColor
            )}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface LicitacaoMetricsProps {
  totalLicitacoes: number;
  valorEstimadoTotal: number;
  propostasRecebidas: number;
  taxaSucesso: number;
  changeLicitacoes?: number;
  changeValor?: number;
  changePropostas?: number;
  changeTaxa?: number;
}

export function LicitacaoMetrics({
  totalLicitacoes,
  valorEstimadoTotal,
  propostasRecebidas,
  taxaSucesso,
  changeLicitacoes,
  changeValor,
  changePropostas,
  changeTaxa,
}: LicitacaoMetricsProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      notation: value >= 1_000_000 ? "compact" : "standard",
      compactDisplay: "short",
    }).format(value);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Total de Licitações"
        value={totalLicitacoes.toLocaleString("pt-BR")}
        change={changeLicitacoes}
        changeLabel="vs mês anterior"
        icon={<FileText className="h-6 w-6 text-brand-500" />}
        iconBgColor="bg-brand-50 dark:bg-brand-500/15"
      />
      <MetricCard
        title="Valor Estimado Total"
        value={formatCurrency(valorEstimadoTotal)}
        change={changeValor}
        changeLabel="vs mês anterior"
        icon={<DollarSign className="h-6 w-6 text-success-500" />}
        iconBgColor="bg-success-50 dark:bg-success-500/15"
      />
      <MetricCard
        title="Propostas Recebidas"
        value={propostasRecebidas.toLocaleString("pt-BR")}
        change={changePropostas}
        changeLabel="vs mês anterior"
        icon={<Users className="h-6 w-6 text-blue-light-500" />}
        iconBgColor="bg-blue-light-50 dark:bg-blue-light-500/15"
      />
      <MetricCard
        title="Taxa de Sucesso"
        value={`${taxaSucesso.toFixed(1)}%`}
        change={changeTaxa}
        changeLabel="vs mês anterior"
        icon={<TrendingUp className="h-6 w-6 text-warning-500" />}
        iconBgColor="bg-warning-50 dark:bg-warning-500/15"
      />
    </div>
  );
}
