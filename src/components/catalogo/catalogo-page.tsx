"use client";

import { useState, useMemo } from "react";
import {
  Package,
  Search,
  TrendingUp,
  Boxes,
  BrainCircuit,
  LayoutGrid,
  List,
  SlidersHorizontal,
  ChevronRight,
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
import { CatalogoUploadSection } from "./catalogo-upload";
import { ProdutoCard } from "./produto-card";
import { produtosMock, catalogoStats } from "@/../mock/catalogo";

export function CatalogoPage() {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("all");
  const [status, setStatus] = useState("all");
  const [showUpload, setShowUpload] = useState(false);

  const categorias = useMemo(
    () => [...new Set(produtosMock.map((p) => p.categoria))],
    []
  );

  const filtered = useMemo(() => {
    return produtosMock.filter((p) => {
      const matchSearch =
        !search ||
        p.nome.toLowerCase().includes(search.toLowerCase()) ||
        p.codigoInterno.toLowerCase().includes(search.toLowerCase()) ||
        p.descricao.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchCategoria = categoria === "all" || p.categoria === categoria;
      const matchStatus = status === "all" || p.status === status;

      return matchSearch && matchCategoria && matchStatus;
    });
  }, [search, categoria, status]);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="transition-colors hover:text-brand-500">
          Painel
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/" className="transition-colors hover:text-brand-500">
          Licitações
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-gray-900 dark:text-white">
          Meu Catálogo
        </span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Meu Catálogo
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gerencie os produtos da sua empresa e aumente as chances de match
            com editais.
          </p>
        </div>
        <Button onClick={() => setShowUpload(!showUpload)}>
          <Package className="h-4 w-4" />
          {showUpload ? "Fechar Upload" : "Importar Catálogo"}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
              <Boxes className="h-4 w-4 text-brand-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Total de Produtos
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {catalogoStats.totalProdutos}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success-50 dark:bg-success-500/10">
              <Package className="h-4 w-4 text-success-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">Ativos</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {catalogoStats.produtosAtivos}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-theme-purple-500/10">
              <BrainCircuit className="h-4 w-4 text-theme-purple-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Matches IA
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {catalogoStats.matchesTotal}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-light-50 dark:bg-blue-light-500/10">
              <TrendingUp className="h-4 w-4 text-blue-light-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Categorias
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {catalogoStats.categorias}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload section (collapsible) */}
      {showUpload && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <CatalogoUploadSection />
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar produto, código ou tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoria} onValueChange={setCategoria}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categorias.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <SlidersHorizontal className="h-3 w-3" />
            {filtered.length} produtos
          </Badge>
        </div>
      </div>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-white p-16 text-center dark:border-gray-700 dark:bg-white/[0.02]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5">
            <Package className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Nenhum produto encontrado
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Importe seu catálogo ou ajuste os filtros.
            </p>
          </div>
          <Button onClick={() => setShowUpload(true)} className="mt-2">
            <Package className="h-4 w-4" />
            Importar Catálogo
          </Button>
        </div>
      )}
    </div>
  );
}
