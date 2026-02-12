"use client";

import { useCallback } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui-shadcn/table";
import { Input } from "@/components/ui-shadcn/input";
import { Button } from "@/components/ui-shadcn/button";
import { Badge } from "@/components/ui-shadcn/badge";
import type { PropostaFormData, ItemProposta } from "@/lib/schemas/proposta-form";

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const emptyItem: ItemProposta = {
  numero: 0,
  descricao: "",
  codigoCatMat: "",
  unidadeMedida: "Unidade",
  requisicaoMinima: 0,
  requisicaoMaxima: 0,
  painelPrecos: 0,
  precoUnitario: 0,
  quantidade: 1,
  valorTotal: 0,
  fromCatalogo: false,
};

export function PropostaTabela() {
  const { register, watch, setValue } = useFormContext<PropostaFormData>();
  const { fields, append, remove } = useFieldArray<PropostaFormData>({
    name: "itens",
  });

  const itens = watch("itens");

  const totalGeral = itens.reduce((acc, item) => acc + (item.valorTotal || 0), 0);

  const recalcTotal = useCallback(
    (index: number, preco?: number, qtd?: number) => {
      const p = preco ?? itens[index]?.precoUnitario ?? 0;
      const q = qtd ?? itens[index]?.quantidade ?? 0;
      setValue(`itens.${index}.valorTotal`, p * q);
    },
    [itens, setValue]
  );

  function handleAddItem() {
    const nextNumero =
      itens.length > 0 ? Math.max(...itens.map((i) => i.numero)) + 1 : 1;
    append({ ...emptyItem, numero: nextNumero });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 dark:border-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-white/[0.03]">
              <TableHead className="w-[60px] text-center">N°</TableHead>
              <TableHead className="min-w-[250px]">Descrição do Item</TableHead>
              <TableHead className="w-[130px]">Código CAT/MAT</TableHead>
              <TableHead className="w-[110px]">Unidade</TableHead>
              <TableHead className="w-[100px] text-right">Req. Mín.</TableHead>
              <TableHead className="w-[100px] text-right">Req. Máx.</TableHead>
              <TableHead className="w-[150px] text-right">Preço Unit. (R$)</TableHead>
              <TableHead className="w-[140px] text-right">Valor Total</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {fields.map((field, index) => {
              const item = itens[index];
              return (
                <TableRow key={field.id}>
                  {/* N° */}
                  <TableCell className="text-center font-medium">
                    {item?.numero ?? index + 1}
                  </TableCell>

                  {/* Descrição */}
                  <TableCell>
                    <div className="flex items-start gap-2">
                      {item?.fromCatalogo ? (
                        <div>
                          <span className="text-sm">{item.descricao}</span>
                          <Badge variant="default" className="ml-2 text-[10px]">
                            Catálogo
                          </Badge>
                        </div>
                      ) : (
                        <Input
                          {...register(`itens.${index}.descricao`)}
                          placeholder="Descrição do item"
                          className="h-8 text-sm"
                        />
                      )}
                    </div>
                  </TableCell>

                  {/* Código CAT/MAT */}
                  <TableCell>
                    {item?.fromCatalogo ? (
                      <span className="text-xs text-gray-500 font-mono">
                        {item.codigoCatMat}
                      </span>
                    ) : (
                      <Input
                        {...register(`itens.${index}.codigoCatMat`)}
                        placeholder="BR..."
                        className="h-8 text-xs font-mono"
                      />
                    )}
                  </TableCell>

                  {/* Unidade */}
                  <TableCell>
                    {item?.fromCatalogo ? (
                      <span className="text-xs">{item.unidadeMedida}</span>
                    ) : (
                      <Input
                        {...register(`itens.${index}.unidadeMedida`)}
                        placeholder="Un."
                        className="h-8 text-xs"
                      />
                    )}
                  </TableCell>

                  {/* Req. Mín. */}
                  <TableCell className="text-right tabular-nums">
                    {item?.requisicaoMinima?.toLocaleString("pt-BR") ?? "—"}
                  </TableCell>

                  {/* Req. Máx. */}
                  <TableCell className="text-right tabular-nums">
                    {item?.requisicaoMaxima?.toLocaleString("pt-BR") ?? "—"}
                  </TableCell>

                  {/* Preço Unitário (editable) */}
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      {...register(`itens.${index}.precoUnitario`, {
                        valueAsNumber: true,
                        onChange: (e) => {
                          const val = parseFloat(e.target.value) || 0;
                          recalcTotal(index, val, undefined);
                        },
                      })}
                      className="h-8 text-right text-sm tabular-nums w-full"
                    />
                  </TableCell>

                  {/* Valor Total */}
                  <TableCell className="text-right font-medium tabular-nums">
                    {BRL.format(item?.valorTotal ?? 0)}
                  </TableCell>

                  {/* Remover */}
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-error-500"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}

            {fields.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-24 text-center text-gray-400"
                >
                  Nenhum item na proposta. Adicione itens abaixo.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={7} className="text-right font-semibold">
                Total Geral
              </TableCell>
              <TableCell className="text-right font-bold tabular-nums text-brand-600 dark:text-brand-400">
                {BRL.format(totalGeral)}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddItem}
        className="gap-1.5"
      >
        <Plus className="h-4 w-4" />
        Adicionar Item
      </Button>
    </div>
  );
}
