import { licitacoesMock } from "./licitacoes";

export type StatusProposta =
  | "rascunho"
  | "submetida"
  | "em_analise"
  | "classificada"
  | "desclassificada"
  | "vencedora"
  | "recurso";

export interface PropostaMock {
  id: string;
  licitacaoId: string;
  numeroEdital: string;
  titulo: string;
  orgao: string;
  status: StatusProposta;
  valorTotal: number;
  qtdItens: number;
  dataEnvio: string;
  dataAtualizacao: string;
}

export const propostasMock: PropostaMock[] = [
  {
    id: "prop-1",
    licitacaoId: licitacoesMock[0].id,
    numeroEdital: licitacoesMock[0].numeroEdital,
    titulo: licitacoesMock[0].titulo,
    orgao: licitacoesMock[0].orgao,
    status: "vencedora",
    valorTotal: 312450.0,
    qtdItens: 13,
    dataEnvio: "2025-10-15",
    dataAtualizacao: "2025-11-28",
  },
  {
    id: "prop-2",
    licitacaoId: licitacoesMock[4].id,
    numeroEdital: licitacoesMock[4].numeroEdital,
    titulo: licitacoesMock[4].titulo,
    orgao: licitacoesMock[4].orgao,
    status: "em_analise",
    valorTotal: 498700.0,
    qtdItens: 11,
    dataEnvio: "2025-12-01",
    dataAtualizacao: "2025-12-05",
  },
  {
    id: "prop-3",
    licitacaoId: licitacoesMock[5].id,
    numeroEdital: licitacoesMock[5].numeroEdital,
    titulo: licitacoesMock[5].titulo,
    orgao: licitacoesMock[5].orgao,
    status: "submetida",
    valorTotal: 1185000.0,
    qtdItens: 9,
    dataEnvio: "2025-09-20",
    dataAtualizacao: "2025-09-20",
  },
  {
    id: "prop-4",
    licitacaoId: licitacoesMock[2].id,
    numeroEdital: licitacoesMock[2].numeroEdital,
    titulo: licitacoesMock[2].titulo,
    orgao: licitacoesMock[2].orgao,
    status: "classificada",
    valorTotal: 1950000.0,
    qtdItens: 7,
    dataEnvio: "2025-12-10",
    dataAtualizacao: "2026-01-08",
  },
  {
    id: "prop-5",
    licitacaoId: licitacoesMock[1].id,
    numeroEdital: licitacoesMock[1].numeroEdital,
    titulo: licitacoesMock[1].titulo,
    orgao: licitacoesMock[1].orgao,
    status: "desclassificada",
    valorTotal: 82300.0,
    qtdItens: 2,
    dataEnvio: "2024-09-25",
    dataAtualizacao: "2024-10-05",
  },
  {
    id: "prop-6",
    licitacaoId: licitacoesMock[3].id,
    numeroEdital: licitacoesMock[3].numeroEdital,
    titulo: licitacoesMock[3].titulo,
    orgao: licitacoesMock[3].orgao,
    status: "rascunho",
    valorTotal: 1650000.0,
    qtdItens: 1,
    dataEnvio: "2025-07-20",
    dataAtualizacao: "2025-07-20",
  },
  {
    id: "prop-7",
    licitacaoId: licitacoesMock[0].id,
    numeroEdital: licitacoesMock[0].numeroEdital,
    titulo: "Fornecimento de Insumos Médicos",
    orgao: "Secretaria de Saúde de Salvador",
    status: "recurso",
    valorTotal: 175200.0,
    qtdItens: 8,
    dataEnvio: "2025-11-05",
    dataAtualizacao: "2025-12-12",
  },
  {
    id: "prop-8",
    licitacaoId: licitacoesMock[5].id,
    numeroEdital: licitacoesMock[5].numeroEdital,
    titulo: "Modernização de Data Center",
    orgao: "Ministério Público de São Paulo",
    status: "submetida",
    valorTotal: 890000.0,
    qtdItens: 6,
    dataEnvio: "2025-09-28",
    dataAtualizacao: "2025-09-28",
  },
  {
    id: "prop-9",
    licitacaoId: licitacoesMock[4].id,
    numeroEdital: licitacoesMock[4].numeroEdital,
    titulo: "Consultoria em Gestão Pública",
    orgao: "Secretaria de Educação de Recife",
    status: "vencedora",
    valorTotal: 245000.0,
    qtdItens: 4,
    dataEnvio: "2025-11-18",
    dataAtualizacao: "2026-01-15",
  },
  {
    id: "prop-10",
    licitacaoId: licitacoesMock[2].id,
    numeroEdital: licitacoesMock[2].numeroEdital,
    titulo: "Kit de Alimentação Escolar",
    orgao: "Governo do Estado de Minas Gerais",
    status: "em_analise",
    valorTotal: 1320000.0,
    qtdItens: 5,
    dataEnvio: "2026-01-05",
    dataAtualizacao: "2026-01-10",
  },
];
