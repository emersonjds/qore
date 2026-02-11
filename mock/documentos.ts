export type DocumentoStatus = "valido" | "vencendo" | "vencido" | "pendente";
export type DocumentoTipo = "PDF" | "JPG" | "PNG" | "DOCX";

export interface DocumentoCategoria {
  id: string;
  nome: string;
  descricao: string;
  obrigatorio: boolean;
}

export interface DocumentoLicitacaoRef {
  licitacaoId: string;
  numeroEdital: string;
  titulo: string;
  exigido: boolean;
  /** Se o documento atende a exigência dessa licitação */
  atende: boolean;
  mensagem?: string;
}

export interface Documento {
  id: string;
  nome: string;
  descricao: string;
  categoria: DocumentoCategoria;
  tipo: DocumentoTipo;
  tamanho: string;
  dataUpload: string;
  dataValidade: string | null;
  status: DocumentoStatus;
  diasParaVencer: number | null;
  arquivoUrl: string;
  licitacoes: DocumentoLicitacaoRef[];
}

// Categorias de documentos para licitações
export const categoriasDocumento: DocumentoCategoria[] = [
  {
    id: "habilitacao",
    nome: "Habilitação Jurídica",
    descricao: "Documentos de constituição e regularidade da empresa",
    obrigatorio: true,
  },
  {
    id: "fiscal",
    nome: "Regularidade Fiscal",
    descricao: "Certidões fiscais e tributárias",
    obrigatorio: true,
  },
  {
    id: "trabalhista",
    nome: "Regularidade Trabalhista",
    descricao: "Certidões trabalhistas e previdenciárias",
    obrigatorio: true,
  },
  {
    id: "tecnica",
    nome: "Qualificação Técnica",
    descricao: "Atestados de capacidade técnica e certificações",
    obrigatorio: true,
  },
  {
    id: "economica",
    nome: "Qualificação Econômico-Financeira",
    descricao: "Balanço patrimonial e demonstrações financeiras",
    obrigatorio: true,
  },
  {
    id: "complementar",
    nome: "Documentos Complementares",
    descricao: "Declarações, procurações e outros documentos",
    obrigatorio: false,
  },
];

export const documentosMock: Documento[] = [
  {
    id: "d1",
    nome: "Contrato Social Consolidado",
    descricao:
      "Última alteração contratual consolidada com registro na Junta Comercial.",
    categoria: categoriasDocumento[0],
    tipo: "PDF",
    tamanho: "2.1 MB",
    dataUpload: "2025-01-10",
    dataValidade: null,
    status: "valido",
    diasParaVencer: null,
    arquivoUrl: "#",
    licitacoes: [
      {
        licitacaoId: "1",
        numeroEdital: "045/2025",
        titulo: "Aquisição de Medicamentos",
        exigido: true,
        atende: true,
      },
      {
        licitacaoId: "5",
        numeroEdital: "091/2025",
        titulo: "Sistema de Gestão Pública",
        exigido: true,
        atende: true,
      },
    ],
  },
  {
    id: "d2",
    nome: "Certidão Negativa de Débitos Federais",
    descricao:
      "Certidão conjunta RFB/PGFN referente a tributos federais e à dívida ativa da União.",
    categoria: categoriasDocumento[1],
    tipo: "PDF",
    tamanho: "340 KB",
    dataUpload: "2025-04-15",
    dataValidade: "2025-10-15",
    status: "valido",
    diasParaVencer: 120,
    arquivoUrl: "#",
    licitacoes: [
      {
        licitacaoId: "1",
        numeroEdital: "045/2025",
        titulo: "Aquisição de Medicamentos",
        exigido: true,
        atende: true,
      },
      {
        licitacaoId: "4",
        numeroEdital: "078/2025",
        titulo: "Pavimentação de Vias Urbanas",
        exigido: true,
        atende: true,
      },
      {
        licitacaoId: "5",
        numeroEdital: "091/2025",
        titulo: "Sistema de Gestão Pública",
        exigido: true,
        atende: true,
      },
    ],
  },
  {
    id: "d3",
    nome: "Certidão Negativa de Débitos Estaduais",
    descricao: "Certidão de regularidade fiscal emitida pela Secretaria da Fazenda do Estado.",
    categoria: categoriasDocumento[1],
    tipo: "PDF",
    tamanho: "280 KB",
    dataUpload: "2025-02-20",
    dataValidade: "2025-07-05",
    status: "vencendo",
    diasParaVencer: 18,
    arquivoUrl: "#",
    licitacoes: [
      {
        licitacaoId: "1",
        numeroEdital: "045/2025",
        titulo: "Aquisição de Medicamentos",
        exigido: true,
        atende: false,
        mensagem: "Documento vence antes da data de abertura do certame.",
      },
      {
        licitacaoId: "5",
        numeroEdital: "091/2025",
        titulo: "Sistema de Gestão Pública",
        exigido: true,
        atende: false,
        mensagem: "Validade insuficiente. Renove antes de 20/12/2025.",
      },
    ],
  },
  {
    id: "d4",
    nome: "Certidão de Regularidade do FGTS",
    descricao: "Certificado de regularidade do empregador junto ao FGTS (CRF).",
    categoria: categoriasDocumento[2],
    tipo: "PDF",
    tamanho: "190 KB",
    dataUpload: "2024-12-01",
    dataValidade: "2025-05-30",
    status: "vencido",
    diasParaVencer: -20,
    arquivoUrl: "#",
    licitacoes: [
      {
        licitacaoId: "1",
        numeroEdital: "045/2025",
        titulo: "Aquisição de Medicamentos",
        exigido: true,
        atende: false,
        mensagem: "DOCUMENTO VENCIDO. Renove imediatamente para participar.",
      },
      {
        licitacaoId: "4",
        numeroEdital: "078/2025",
        titulo: "Pavimentação de Vias Urbanas",
        exigido: true,
        atende: false,
        mensagem: "DOCUMENTO VENCIDO. Necessário para habilitação.",
      },
      {
        licitacaoId: "5",
        numeroEdital: "091/2025",
        titulo: "Sistema de Gestão Pública",
        exigido: true,
        atende: false,
        mensagem: "DOCUMENTO VENCIDO. Bloqueante para envio de proposta.",
      },
    ],
  },
  {
    id: "d5",
    nome: "Certidão Negativa de Débitos Trabalhistas",
    descricao: "CNDT emitida pelo Tribunal Superior do Trabalho.",
    categoria: categoriasDocumento[2],
    tipo: "PDF",
    tamanho: "210 KB",
    dataUpload: "2025-05-10",
    dataValidade: "2025-11-10",
    status: "valido",
    diasParaVencer: 145,
    arquivoUrl: "#",
    licitacoes: [
      {
        licitacaoId: "1",
        numeroEdital: "045/2025",
        titulo: "Aquisição de Medicamentos",
        exigido: true,
        atende: true,
      },
    ],
  },
  {
    id: "d6",
    nome: "Atestado de Capacidade Técnica",
    descricao:
      "Atestado emitido pela Prefeitura de Campinas referente ao fornecimento de equipamentos de TI.",
    categoria: categoriasDocumento[3],
    tipo: "PDF",
    tamanho: "1.5 MB",
    dataUpload: "2025-03-22",
    dataValidade: null,
    status: "valido",
    diasParaVencer: null,
    arquivoUrl: "#",
    licitacoes: [
      {
        licitacaoId: "5",
        numeroEdital: "091/2025",
        titulo: "Sistema de Gestão Pública",
        exigido: true,
        atende: true,
      },
      {
        licitacaoId: "6",
        numeroEdital: "034/2025",
        titulo: "Aquisição de Equipamentos de TI",
        exigido: true,
        atende: true,
      },
    ],
  },
  {
    id: "d7",
    nome: "Balanço Patrimonial 2024",
    descricao:
      "Balanço patrimonial e demonstrações contábeis do último exercício social, registrado na Junta Comercial.",
    categoria: categoriasDocumento[4],
    tipo: "PDF",
    tamanho: "4.8 MB",
    dataUpload: "2025-04-30",
    dataValidade: null,
    status: "valido",
    diasParaVencer: null,
    arquivoUrl: "#",
    licitacoes: [
      {
        licitacaoId: "4",
        numeroEdital: "078/2025",
        titulo: "Pavimentação de Vias Urbanas",
        exigido: true,
        atende: true,
      },
    ],
  },
  {
    id: "d8",
    nome: "Certidão Negativa de Falência",
    descricao:
      "Certidão negativa de falência e recuperação judicial emitida pelo Poder Judiciário.",
    categoria: categoriasDocumento[4],
    tipo: "PDF",
    tamanho: "520 KB",
    dataUpload: "2025-01-25",
    dataValidade: "2025-07-25",
    status: "vencendo",
    diasParaVencer: 38,
    arquivoUrl: "#",
    licitacoes: [
      {
        licitacaoId: "4",
        numeroEdital: "078/2025",
        titulo: "Pavimentação de Vias Urbanas",
        exigido: true,
        atende: true,
      },
    ],
  },
  {
    id: "d9",
    nome: "Alvará de Funcionamento",
    descricao: "Alvará de localização e funcionamento emitido pela Prefeitura.",
    categoria: categoriasDocumento[0],
    tipo: "PDF",
    tamanho: "890 KB",
    dataUpload: "2025-02-15",
    dataValidade: "2025-12-31",
    status: "valido",
    diasParaVencer: 198,
    arquivoUrl: "#",
    licitacoes: [],
  },
  {
    id: "d10",
    nome: "Declaração de ME/EPP",
    descricao:
      "Declaração de enquadramento como Microempresa ou Empresa de Pequeno Porte, conforme LC 123/2006.",
    categoria: categoriasDocumento[5],
    tipo: "PDF",
    tamanho: "120 KB",
    dataUpload: "2025-01-05",
    dataValidade: null,
    status: "pendente",
    diasParaVencer: null,
    arquivoUrl: "#",
    licitacoes: [
      {
        licitacaoId: "1",
        numeroEdital: "045/2025",
        titulo: "Aquisição de Medicamentos",
        exigido: false,
        atende: false,
        mensagem: "Recomendado para usufruir de benefícios da LC 123/2006.",
      },
    ],
  },
];

// Estatísticas calculadas
export function getDocumentoStats() {
  const total = documentosMock.length;
  const validos = documentosMock.filter((d) => d.status === "valido").length;
  const vencendo = documentosMock.filter((d) => d.status === "vencendo").length;
  const vencidos = documentosMock.filter((d) => d.status === "vencido").length;
  const pendentes = documentosMock.filter((d) => d.status === "pendente").length;

  // Alertas: documentos que impedem participação em licitações
  const bloqueios = documentosMock.flatMap((doc) =>
    doc.licitacoes
      .filter((l) => l.exigido && !l.atende)
      .map((l) => ({
        documentoId: doc.id,
        documentoNome: doc.nome,
        documentoStatus: doc.status,
        licitacaoId: l.licitacaoId,
        edital: l.numeroEdital,
        licitacaoTitulo: l.titulo,
        mensagem: l.mensagem ?? "Documento não atende à exigência.",
      }))
  );

  return { total, validos, vencendo, vencidos, pendentes, bloqueios };
}
