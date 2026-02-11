"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Upload,
  Search,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  ShieldAlert,
  ChevronRight,
  SlidersHorizontal,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui-shadcn/input";
import { Button } from "@/components/ui-shadcn/button";
import { Badge } from "@/components/ui-shadcn/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui-shadcn/select";
import { DocumentosAlertas } from "./documentos-alertas";
import { DocumentoRow } from "./documento-row";
import {
  documentosMock,
  categoriasDocumento,
  getDocumentoStats,
} from "@/../mock/documentos";

export function DocumentosPage() {
  const stats = getDocumentoStats();
  const [search, setSearch] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("all");
  const [statusFiltro, setStatusFiltro] = useState("all");
  const [showUpload, setShowUpload] = useState(false);
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
  }, []);

  const filtered = useMemo(() => {
    return documentosMock.filter((doc) => {
      const matchSearch =
        !search ||
        doc.nome.toLowerCase().includes(search.toLowerCase()) ||
        doc.descricao.toLowerCase().includes(search.toLowerCase()) ||
        doc.categoria.nome.toLowerCase().includes(search.toLowerCase());

      const matchCategoria =
        categoriaFiltro === "all" || doc.categoria.id === categoriaFiltro;
      const matchStatus = statusFiltro === "all" || doc.status === statusFiltro;

      return matchSearch && matchCategoria && matchStatus;
    });
  }, [search, categoriaFiltro, statusFiltro]);

  // Agrupa por categoria para exibição
  const agrupados = useMemo(() => {
    const grupos = new Map<string, typeof filtered>();
    for (const doc of filtered) {
      const key = doc.categoria.id;
      if (!grupos.has(key)) grupos.set(key, []);
      grupos.get(key)!.push(doc);
    }
    return grupos;
  }, [filtered]);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="transition-colors hover:text-brand-500">
          Painel
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-gray-900 dark:text-white">
          Documentos
        </span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Documentos
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Mantenha a documentação da sua empresa atualizada para participar de
            licitações sem impedimentos.
          </p>
        </div>
        <Button onClick={() => setShowUpload(!showUpload)}>
          <Upload className="h-4 w-4" />
          Enviar Documento
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <button
          onClick={() => setStatusFiltro("all")}
          className={`rounded-xl border p-4 text-left transition-all ${
            statusFiltro === "all"
              ? "border-brand-300 bg-brand-50/50 ring-1 ring-brand-200 dark:border-brand-500/30 dark:bg-brand-500/5"
              : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-white/[0.03]"
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Total
            </span>
          </div>
          <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
            {stats.total}
          </p>
        </button>

        <button
          onClick={() => setStatusFiltro("valido")}
          className={`rounded-xl border p-4 text-left transition-all ${
            statusFiltro === "valido"
              ? "border-brand-300 bg-brand-50/50 ring-1 ring-brand-200 dark:border-brand-500/30 dark:bg-brand-500/5"
              : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-white/[0.03]"
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand-500" />
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Válidos
            </span>
          </div>
          <p className="mt-1 text-xl font-bold text-brand-600 dark:text-brand-400">
            {stats.validos}
          </p>
        </button>

        <button
          onClick={() => setStatusFiltro("vencendo")}
          className={`rounded-xl border p-4 text-left transition-all ${
            statusFiltro === "vencendo"
              ? "border-warning-300 bg-warning-50/50 ring-1 ring-warning-200 dark:border-warning-500/30 dark:bg-warning-500/5"
              : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-white/[0.03]"
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-warning-500" />
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Vencendo
            </span>
          </div>
          <p className="mt-1 text-xl font-bold text-warning-600 dark:text-warning-400">
            {stats.vencendo}
          </p>
        </button>

        <button
          onClick={() => setStatusFiltro("vencido")}
          className={`rounded-xl border p-4 text-left transition-all ${
            statusFiltro === "vencido"
              ? "border-error-300 bg-error-50/50 ring-1 ring-error-200 dark:border-error-500/30 dark:bg-error-500/5"
              : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-white/[0.03]"
          }`}
        >
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-error-500" />
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Vencidos
            </span>
          </div>
          <p className="mt-1 text-xl font-bold text-error-600 dark:text-error-400">
            {stats.vencidos}
          </p>
        </button>

        <button
          onClick={() => setStatusFiltro("pendente")}
          className={`rounded-xl border p-4 text-left transition-all ${
            statusFiltro === "pendente"
              ? "border-gray-400 bg-gray-100/50 ring-1 ring-gray-300 dark:border-gray-600 dark:bg-white/5"
              : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-white/[0.03]"
          }`}
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Pendentes
            </span>
          </div>
          <p className="mt-1 text-xl font-bold text-gray-600 dark:text-gray-300">
            {stats.pendentes}
          </p>
        </button>
      </div>

      {/* Alertas de bloqueio */}
      <DocumentosAlertas />

      {/* Upload area (collapsible) */}
      {showUpload && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`animate-in fade-in slide-in-from-top-2 duration-300 rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
            dragging
              ? "border-brand-400 bg-brand-50/50 dark:border-brand-500 dark:bg-brand-500/5"
              : "border-gray-200 bg-white dark:border-gray-700 dark:bg-white/[0.02]"
          }`}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5">
            <Upload className={`h-6 w-6 ${dragging ? "text-brand-500" : "text-gray-400"}`} />
          </div>
          <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Arraste seu documento aqui ou{" "}
            <button className="font-semibold text-brand-500 hover:underline">
              selecione um arquivo
            </button>
          </p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            PDF, JPG, PNG ou DOCX &middot; Máximo 10 MB
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {categoriasDocumento.map((cat) => (
              <span
                key={cat.id}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-500 dark:bg-white/5 dark:text-gray-400"
              >
                {cat.nome}
                {cat.obrigatorio && (
                  <span className="ml-1 text-error-500">*</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar documento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categoriasDocumento.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Badge variant="secondary" className="shrink-0 gap-1">
          <SlidersHorizontal className="h-3 w-3" />
          {filtered.length} documento{filtered.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Documents grouped by category */}
      {filtered.length > 0 ? (
        <div className="space-y-6">
          {Array.from(agrupados.entries()).map(([catId, docs]) => {
            const cat = categoriasDocumento.find((c) => c.id === catId);
            return (
              <div key={catId}>
                <div className="mb-3 flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {cat?.nome}
                  </h3>
                  {cat?.obrigatorio && (
                    <span className="rounded bg-error-50 px-1.5 py-0.5 text-[9px] font-bold uppercase text-error-500 dark:bg-error-500/10">
                      Obrigatório
                    </span>
                  )}
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    ({docs.length})
                  </span>
                </div>
                <div className="space-y-2">
                  {docs.map((doc) => (
                    <DocumentoRow key={doc.id} documento={doc} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-white p-16 text-center dark:border-gray-700 dark:bg-white/[0.02]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5">
            <FolderOpen className="h-6 w-6 text-gray-400" />
          </div>
          <p className="font-medium text-gray-700 dark:text-gray-300">
            Nenhum documento encontrado
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Envie documentos ou ajuste os filtros.
          </p>
          <Button onClick={() => setShowUpload(true)} className="mt-2">
            <Upload className="h-4 w-4" />
            Enviar Documento
          </Button>
        </div>
      )}
    </div>
  );
}
