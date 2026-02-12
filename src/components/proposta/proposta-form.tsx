"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, ChevronRight, FileText, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui-shadcn/button";
import { Separator } from "@/components/ui-shadcn/separator";
import { licitacoesMock } from "@/../mock/licitacoes";
import { editalItensPorLicitacao } from "@/../mock/edital-itens";
import { produtosMock } from "@/../mock/catalogo";
import { matchItensEdital } from "@/lib/matching";
import {
  propostaFormSchema,
  type PropostaFormData,
} from "@/lib/schemas/proposta-form";
import { PropostaTabela } from "./proposta-tabela";

interface PropostaFormProps {
  licitacaoId: string;
}

export function PropostaForm({ licitacaoId }: PropostaFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const licitacao = useMemo(
    () => licitacoesMock.find((l) => l.id === licitacaoId),
    [licitacaoId]
  );

  const itensIniciais = useMemo(() => {
    const itensEdital = editalItensPorLicitacao[licitacaoId] || [];
    const matches = matchItensEdital(itensEdital, produtosMock);

    return matches.map((m) => ({
      numero: m.itemEdital.numero,
      descricao: m.itemEdital.descricao,
      codigoCatMat: m.itemEdital.codigoCatMat,
      unidadeMedida: m.itemEdital.unidadeMedida,
      requisicaoMinima: m.itemEdital.requisicaoMinima,
      requisicaoMaxima: m.itemEdital.requisicaoMaxima,
      painelPrecos: m.itemEdital.painelPrecos,
      precoUnitario: m.precoSugerido,
      quantidade: m.itemEdital.requisicaoMinima,
      valorTotal: m.precoSugerido * m.itemEdital.requisicaoMinima,
      fromCatalogo: m.matched,
    }));
  }, [licitacaoId]);

  const form = useForm<PropostaFormData>({
    resolver: zodResolver(propostaFormSchema),
    defaultValues: {
      licitacaoId,
      itens: itensIniciais,
    },
  });

  if (!licitacao) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <FileText className="h-12 w-12 text-gray-300 dark:text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Licitação não encontrada
        </h2>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Painel
          </Link>
        </Button>
      </div>
    );
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast.success("Proposta enviada com sucesso!", {
      description: `Proposta para o Edital nº ${licitacao!.numeroEdital} foi submetida.`,
    });
    router.push(`/licitacoes/${licitacaoId}`);
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-brand-500 transition-colors">
          Painel
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href={`/licitacoes/${licitacaoId}`}
          className="hover:text-brand-500 transition-colors"
        >
          Edital nº {licitacao.numeroEdital}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-900 dark:text-white font-medium">
          Nova Proposta
        </span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Nova Proposta
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {licitacao.titulo} &mdash; {licitacao.orgao}
        </p>
      </div>

      <Separator />

      {/* Tabela */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <PropostaTabela />

          <Separator />

          {/* Ações */}
          <div className="flex items-center justify-between">
            <Button type="button" variant="outline" asChild>
              <Link href={`/licitacoes/${licitacaoId}`}>
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Link>
            </Button>

            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {isSubmitting ? "Enviando..." : "Enviar Proposta"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
