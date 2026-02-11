"use client";

import { useState, useCallback } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import { uploadsRecentes, type CatalogoUpload } from "@/../mock/catalogo";

const statusMap = {
  concluido: {
    icon: <CheckCircle2 className="h-4 w-4 text-brand-500" />,
    label: "Concluído",
    text: "text-brand-600 dark:text-brand-400",
  },
  processando: {
    icon: <Loader2 className="h-4 w-4 animate-spin text-warning-500" />,
    label: "Processando...",
    text: "text-warning-600 dark:text-warning-400",
  },
  erro: {
    icon: <AlertCircle className="h-4 w-4 text-error-500" />,
    label: "Erro",
    text: "text-error-600 dark:text-error-400",
  },
};

const tipoIconColor: Record<CatalogoUpload["tipo"], string> = {
  PDF: "bg-error-50 text-error-500 dark:bg-error-500/10",
  XLSX: "bg-brand-50 text-brand-600 dark:bg-brand-500/10",
  CSV: "bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/10",
};

export function CatalogoUploadSection() {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    // Upload logic would go here
  }, []);

  return (
    <div className="space-y-5">
      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
          dragging
            ? "border-brand-400 bg-brand-50/50 dark:border-brand-500 dark:bg-brand-500/5"
            : "border-gray-200 bg-white hover:border-brand-300 hover:bg-gray-50/50 dark:border-gray-700 dark:bg-white/[0.02] dark:hover:border-brand-500/40"
        }`}
      >
        <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
          dragging ? "bg-brand-100 dark:bg-brand-500/20" : "bg-gray-100 dark:bg-white/5"
        }`}>
          <Upload className={`h-6 w-6 transition-colors ${
            dragging ? "text-brand-500" : "text-gray-400"
          }`} />
        </div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Arraste seu catálogo aqui ou{" "}
          <button className="font-semibold text-brand-500 hover:text-brand-600 hover:underline">
            selecione um arquivo
          </button>
        </p>
        <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">
          Suporta PDF, XLSX e CSV &middot; Máximo 25 MB
        </p>
        <div className="mt-4 flex gap-2">
          <span className="rounded-full bg-error-50 px-2.5 py-1 text-[10px] font-semibold text-error-500 dark:bg-error-500/10">
            PDF
          </span>
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold text-brand-600 dark:bg-brand-500/10">
            XLSX
          </span>
          <span className="rounded-full bg-blue-light-50 px-2.5 py-1 text-[10px] font-semibold text-blue-light-600 dark:bg-blue-light-500/10">
            CSV
          </span>
        </div>
      </div>

      {/* Uploads recentes */}
      {uploadsRecentes.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Uploads recentes
          </h3>
          <div className="space-y-2">
            {uploadsRecentes.map((upload) => {
              const st = statusMap[upload.status];
              return (
                <div
                  key={upload.id}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 dark:border-gray-800 dark:bg-white/[0.02]"
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tipoIconColor[upload.tipo]}`}>
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-700 dark:text-gray-300">
                      {upload.nomeArquivo}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                      <span>{upload.tamanho}</span>
                      <span>&middot;</span>
                      <span>{upload.dataUpload}</span>
                      {upload.status === "concluido" && (
                        <>
                          <span>&middot;</span>
                          <span className="text-brand-500">
                            {upload.produtosExtraidos} produtos
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1 text-xs font-medium ${st.text}`}>
                      {st.icon}
                      <span className="hidden sm:inline">{st.label}</span>
                    </span>
                    <button className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/5 dark:hover:text-gray-300">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
