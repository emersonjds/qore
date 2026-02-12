import { z } from "zod";

export const itemPropostaSchema = z.object({
  numero: z.number(),
  descricao: z.string(),
  codigoCatMat: z.string(),
  unidadeMedida: z.string(),
  requisicaoMinima: z.number(),
  requisicaoMaxima: z.number(),
  painelPrecos: z.number(),
  precoUnitario: z.number().min(0, "Preço deve ser positivo"),
  quantidade: z.number().min(1, "Quantidade mínima é 1"),
  valorTotal: z.number(),
  fromCatalogo: z.boolean(),
});

export const propostaFormSchema = z.object({
  licitacaoId: z.string(),
  itens: z.array(itemPropostaSchema),
});

export type ItemProposta = z.infer<typeof itemPropostaSchema>;
export type PropostaFormData = z.infer<typeof propostaFormSchema>;
