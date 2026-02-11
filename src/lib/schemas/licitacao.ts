import { z } from "zod";

// ===== Enums =====

export const modalidadeLicitacao = [
  "pregao_eletronico",
  "pregao_presencial",
  "concorrencia",
  "tomada_precos",
  "convite",
  "concurso",
  "leilao",
  "dialogo_competitivo",
] as const;

export const statusLicitacao = [
  "rascunho",
  "publicada",
  "em_andamento",
  "suspensa",
  "encerrada",
  "cancelada",
  "deserta",
  "fracassada",
] as const;

export const statusProposta = [
  "rascunho",
  "submetida",
  "em_analise",
  "classificada",
  "desclassificada",
  "vencedora",
  "recurso",
] as const;

export const tipoDocumento = [
  "edital",
  "ata",
  "contrato",
  "proposta",
  "habilitacao",
  "recurso",
  "impugnacao",
  "esclarecimento",
  "aditivo",
  "outros",
] as const;

export const statusDocumento = [
  "pendente",
  "em_validacao",
  "aprovado",
  "rejeitado",
  "expirado",
] as const;

// ===== Labels em Português =====

export const modalidadeLabels: Record<typeof modalidadeLicitacao[number], string> = {
  pregao_eletronico: "Pregão Eletrônico",
  pregao_presencial: "Pregão Presencial",
  concorrencia: "Concorrência",
  tomada_precos: "Tomada de Preços",
  convite: "Convite",
  concurso: "Concurso",
  leilao: "Leilão",
  dialogo_competitivo: "Diálogo Competitivo",
};

export const statusLicitacaoLabels: Record<typeof statusLicitacao[number], string> = {
  rascunho: "Rascunho",
  publicada: "Publicada",
  em_andamento: "Em Andamento",
  suspensa: "Suspensa",
  encerrada: "Encerrada",
  cancelada: "Cancelada",
  deserta: "Deserta",
  fracassada: "Fracassada",
};

export const statusPropostaLabels: Record<typeof statusProposta[number], string> = {
  rascunho: "Rascunho",
  submetida: "Submetida",
  em_analise: "Em Análise",
  classificada: "Classificada",
  desclassificada: "Desclassificada",
  vencedora: "Vencedora",
  recurso: "Em Recurso",
};

// ===== Validators =====

const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

// ===== Schemas =====

export const empresaSchema = z.object({
  razaoSocial: z
    .string()
    .min(3, "Razão social deve ter no mínimo 3 caracteres")
    .max(200, "Razão social deve ter no máximo 200 caracteres"),
  nomeFantasia: z.string().max(200).optional(),
  cnpj: z
    .string()
    .refine((val) => cnpjRegex.test(val), "CNPJ inválido. Use o formato: 00.000.000/0000-00"),
  inscricaoEstadual: z.string().max(20).optional(),
  inscricaoMunicipal: z.string().max(20).optional(),
  endereco: z.object({
    logradouro: z.string().min(1, "Logradouro é obrigatório"),
    numero: z.string().min(1, "Número é obrigatório"),
    complemento: z.string().optional(),
    bairro: z.string().min(1, "Bairro é obrigatório"),
    cidade: z.string().min(1, "Cidade é obrigatória"),
    estado: z.string().length(2, "Estado deve ter 2 caracteres (sigla)"),
    cep: z.string().refine((val) => /^\d{5}-\d{3}$/.test(val), "CEP inválido. Use o formato: 00000-000"),
  }),
  telefone: z.string().min(10, "Telefone inválido").optional(),
  email: z.string().email("E-mail inválido"),
  responsavel: z.object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    cpf: z.string().refine((val) => cpfRegex.test(val), "CPF inválido. Use o formato: 000.000.000-00"),
    cargo: z.string().min(2, "Cargo é obrigatório"),
    email: z.string().email("E-mail inválido"),
    telefone: z.string().optional(),
  }),
});

export const licitacaoSchema = z.object({
  numero: z.string().min(1, "Número da licitação é obrigatório"),
  objeto: z
    .string()
    .min(10, "Objeto deve ter no mínimo 10 caracteres")
    .max(2000, "Objeto deve ter no máximo 2000 caracteres"),
  modalidade: z.enum(modalidadeLicitacao, {
    message: "Selecione uma modalidade",
  }),
  orgao: z.string().min(3, "Órgão é obrigatório"),
  unidadeGestora: z.string().optional(),
  valorEstimado: z
    .number()
    .positive("Valor deve ser positivo")
    .max(999999999999.99, "Valor máximo excedido"),
  dataPublicacao: z.string().min(1, "Data de publicação é obrigatória"),
  dataAbertura: z.string().min(1, "Data de abertura é obrigatória"),
  dataEncerramento: z.string().optional(),
  status: z.enum(statusLicitacao).default("rascunho"),
  criterioJulgamento: z.enum([
    "menor_preco",
    "melhor_tecnica",
    "tecnica_preco",
    "maior_lance",
    "maior_desconto",
  ]),
  regimeExecucao: z
    .enum(["empreitada_preco_global", "empreitada_preco_unitario", "tarefa", "integral"])
    .optional(),
  observacoes: z.string().max(5000).optional(),
});

export const propostaSchema = z.object({
  licitacaoId: z.string().min(1, "Licitação é obrigatória"),
  empresaId: z.string().min(1, "Empresa é obrigatória"),
  valorTotal: z
    .number()
    .positive("Valor deve ser positivo")
    .max(999999999999.99, "Valor máximo excedido"),
  desconto: z.number().min(0).max(100).optional(),
  prazoEntrega: z.number().int().positive("Prazo deve ser positivo").optional(),
  validadeProposta: z.number().int().positive("Validade deve ser positiva").default(60),
  observacoes: z.string().max(5000).optional(),
  itens: z
    .array(
      z.object({
        descricao: z.string().min(1, "Descrição é obrigatória"),
        quantidade: z.number().positive("Quantidade deve ser positiva"),
        unidade: z.string().min(1, "Unidade é obrigatória"),
        valorUnitario: z.number().positive("Valor unitário deve ser positivo"),
        valorTotal: z.number().positive("Valor total deve ser positivo"),
      })
    )
    .min(1, "Proposta deve ter pelo menos 1 item"),
});

export const documentoSchema = z.object({
  nome: z.string().min(1, "Nome do documento é obrigatório").max(255),
  tipo: z.enum(tipoDocumento, {
    message: "Selecione um tipo de documento",
  }),
  descricao: z.string().max(1000).optional(),
  licitacaoId: z.string().optional(),
  propostaId: z.string().optional(),
  dataValidade: z.string().optional(),
  arquivo: z
    .object({
      nome: z.string(),
      tamanho: z.number().max(50 * 1024 * 1024, "Arquivo deve ter no máximo 50MB"),
      tipo: z.string(),
    })
    .optional(),
});

// ===== Types inferidos =====

export type Empresa = z.infer<typeof empresaSchema>;
export type Licitacao = z.infer<typeof licitacaoSchema>;
export type Proposta = z.infer<typeof propostaSchema>;
export type Documento = z.infer<typeof documentoSchema>;
