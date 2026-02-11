"use client";

import {
  FileText,
  Edit,
  PauseCircle,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TimelineEventType =
  | "publicacao"
  | "alteracao"
  | "suspensao"
  | "recurso"
  | "resultado"
  | "cancelamento"
  | "esclarecimento"
  | "impugnacao";

interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description?: string;
  date: string;
  user?: string;
}

const eventConfig: Record<
  TimelineEventType,
  { icon: React.ReactNode; color: string; bgColor: string }
> = {
  publicacao: {
    icon: <FileText className="h-4 w-4" />,
    color: "text-brand-500",
    bgColor: "bg-brand-50 dark:bg-brand-500/15",
  },
  alteracao: {
    icon: <Edit className="h-4 w-4" />,
    color: "text-blue-light-500",
    bgColor: "bg-blue-light-50 dark:bg-blue-light-500/15",
  },
  suspensao: {
    icon: <PauseCircle className="h-4 w-4" />,
    color: "text-warning-500",
    bgColor: "bg-warning-50 dark:bg-warning-500/15",
  },
  recurso: {
    icon: <AlertTriangle className="h-4 w-4" />,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-500/15",
  },
  resultado: {
    icon: <CheckCircle className="h-4 w-4" />,
    color: "text-success-500",
    bgColor: "bg-success-50 dark:bg-success-500/15",
  },
  cancelamento: {
    icon: <XCircle className="h-4 w-4" />,
    color: "text-error-500",
    bgColor: "bg-error-50 dark:bg-error-500/15",
  },
  esclarecimento: {
    icon: <MessageSquare className="h-4 w-4" />,
    color: "text-gray-500",
    bgColor: "bg-gray-100 dark:bg-gray-800",
  },
  impugnacao: {
    icon: <AlertTriangle className="h-4 w-4" />,
    color: "text-error-500",
    bgColor: "bg-error-50 dark:bg-error-500/15",
  },
};

interface LicitacaoTimelineProps {
  events: TimelineEvent[];
}

export function LicitacaoTimeline({ events }: LicitacaoTimelineProps) {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => {
          const config = eventConfig[event.type];
          return (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== events.length - 1 && (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        config.bgColor,
                        config.color
                      )}
                    >
                      {config.icon}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-0.5">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {event.title}
                      </p>
                      {event.description && (
                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                          {event.description}
                        </p>
                      )}
                      {event.user && (
                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                          por {event.user}
                        </p>
                      )}
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-400 dark:text-gray-500">
                      <time dateTime={event.date}>
                        {new Date(event.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
