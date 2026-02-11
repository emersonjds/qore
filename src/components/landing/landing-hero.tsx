import { TrendingUp, Clock, FileCheck } from "lucide-react";

export function LandingHero() {
  return (
    <section className="space-y-6">
      {/* Welcome message */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bem-vindo de volta!
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Encontre e acompanhe as melhores oportunidades de licitação para o seu
          negócio.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
            <TrendingUp className="h-5 w-5 text-brand-500" />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              142
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Oportunidades ativas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning-50 dark:bg-warning-500/10">
            <Clock className="h-5 w-5 text-warning-500" />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              23
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Encerrando esta semana
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-light-50 dark:bg-blue-light-500/10">
            <FileCheck className="h-5 w-5 text-blue-light-500" />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              8
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Novas hoje
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
