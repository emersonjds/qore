"use client";

import * as React from "react";
import {
  FileText,
  Download,
  Eye,
  Trash2,
  Upload,
  MoreHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui-shadcn/badge";
import { Button } from "@/components/ui-shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui-shadcn/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui-shadcn/table";
import {
  type statusDocumento,
} from "@/lib/schemas/licitacao";

type DocumentStatus = (typeof statusDocumento)[number];

interface Document {
  id: string;
  nome: string;
  tipo: string;
  tamanho: number;
  dataUpload: string;
  status: DocumentStatus;
  url?: string;
}

const statusConfig: Record<
  DocumentStatus,
  { label: string; variant: "default" | "success" | "destructive" | "warning" | "secondary" }
> = {
  pendente: { label: "Pendente", variant: "secondary" },
  em_validacao: { label: "Em Validação", variant: "warning" },
  aprovado: { label: "Aprovado", variant: "success" },
  rejeitado: { label: "Rejeitado", variant: "destructive" },
  expirado: { label: "Expirado", variant: "secondary" },
};

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

interface DocumentListProps {
  documents: Document[];
  onView?: (doc: Document) => void;
  onDownload?: (doc: Document) => void;
  onDelete?: (doc: Document) => void;
  onUpload?: () => void;
}

export function DocumentList({
  documents,
  onView,
  onDownload,
  onDelete,
  onUpload,
}: DocumentListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Documentos
        </h3>
        {onUpload && (
          <Button onClick={onUpload} size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        )}
      </div>

      {documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 py-12 text-center dark:border-gray-700">
          <FileText className="h-12 w-12 text-gray-300 dark:text-gray-600" />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Nenhum documento encontrado
          </p>
          {onUpload && (
            <Button variant="outline" size="sm" className="mt-4" onClick={onUpload}>
              Enviar documento
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Data Upload</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => {
                const config = statusConfig[doc.status];
                return (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{doc.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{doc.tipo.replace("_", " ")}</TableCell>
                    <TableCell>{formatFileSize(doc.tamanho)}</TableCell>
                    <TableCell>
                      {new Date(doc.dataUpload).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Ações</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onView && (
                            <DropdownMenuItem onClick={() => onView(doc)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar
                            </DropdownMenuItem>
                          )}
                          {onDownload && (
                            <DropdownMenuItem onClick={() => onDownload(doc)}>
                              <Download className="mr-2 h-4 w-4" />
                              Baixar
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => onDelete(doc)}
                                className="text-error-500 focus:text-error-500"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
