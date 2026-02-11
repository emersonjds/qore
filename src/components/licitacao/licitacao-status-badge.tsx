"use client";

import { Badge, type BadgeProps } from "@/components/ui-shadcn/badge";
import { cn } from "@/lib/utils";
import {
  type statusLicitacao,
  statusLicitacaoLabels,
} from "@/lib/schemas/licitacao";

type LicitacaoStatus = (typeof statusLicitacao)[number];

const statusVariantMap: Record<LicitacaoStatus, BadgeProps["variant"]> = {
  rascunho: "secondary",
  publicada: "info",
  em_andamento: "default",
  suspensa: "warning",
  encerrada: "success",
  cancelada: "destructive",
  deserta: "secondary",
  fracassada: "destructive",
};

interface LicitacaoStatusBadgeProps {
  status: LicitacaoStatus;
  className?: string;
}

export function LicitacaoStatusBadge({
  status,
  className,
}: LicitacaoStatusBadgeProps) {
  return (
    <Badge variant={statusVariantMap[status]} className={cn(className)}>
      {statusLicitacaoLabels[status]}
    </Badge>
  );
}
