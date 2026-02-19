import { faker } from "@faker-js/faker/locale/pt_BR";

export type LicitacaoStatus = "Ativa" | "Encerrada" | "Próxima";

export type LicitacaoModalidade =
  | "Pregão Eletrônico"
  | "Concorrência"
  | "Tomada de Preços"
  | "Convite"
  | "Dispensa"
  | "Inexigibilidade";

export interface MatchAnalise {
  /** Score geral de compatibilidade (0–100) */
  score: number;
  /** Qtd de itens do edital que batem com o catálogo */
  itensCompativeis: number;
  /** Total de itens exigidos no edital */
  totalItensEdital: number;
  /** Palavras-chave do edital que bateram com o catálogo */
  keywordsMatch: string[];
}

export interface Licitacao {
  id: string;
  numeroEdital: string;
  titulo: string;
  orgao: string;
  cidade: string;
  estado: string;
  valor: number;
  prazo: Date;
  descricao: string;
  status: LicitacaoStatus;
  categoria: string;
  modalidade: LicitacaoModalidade;
  favoritada?: boolean;
  /** Resultado da análise de compatibilidade com o catálogo da empresa */
  match: MatchAnalise;
}

const categorias = [
  "Saúde",
  "Educação",
  "Infraestrutura",
  "Tecnologia",
  "Serviços Gerais",
  "Alimentação",
  "Segurança",
  "Transporte",
];

const estados = [
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "RS", nome: "Rio Grande do Sul" },
  { sigla: "PR", nome: "Paraná" },
  { sigla: "PE", nome: "Pernambuco" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "PA", nome: "Pará" },
  { sigla: "GO", nome: "Goiás" },
  { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "DF", nome: "Distrito Federal" },
];

const orgaos = [
  "Prefeitura de {cidade}",
  "Governo do Estado de {estado}",
  "Tribunal de Justiça de {estado}",
  "Secretaria de Saúde de {cidade}",
  "Secretaria de Educação de {cidade}",
  "Ministério Público de {estado}",
  "Câmara Municipal de {cidade}",
  "SESI {estado}",
];

const titulosBase: Record<string, string[]> = {
  Saúde: [
    "Aquisição de Medicamentos",
    "Compra de Equipamentos Hospitalares",
    "Contratação de Serviços de Saúde",
    "Fornecimento de Insumos Médicos",
  ],
  Educação: [
    "Fornecimento de Merenda Escolar",
    "Aquisição de Material Didático",
    "Reforma de Escolas Municipais",
    "Contratação de Transporte Escolar",
  ],
  Infraestrutura: [
    "Pavimentação de Vias Urbanas",
    "Construção de Ponte",
    "Reforma de Prédios Públicos",
    "Manutenção de Vias Públicas",
  ],
  Tecnologia: [
    "Aquisição de Equipamentos de TI",
    "Contratação de Serviços de Cloud",
    "Sistema de Gestão Pública",
    "Modernização de Data Center",
  ],
  "Serviços Gerais": [
    "Contratação de Serviços de Limpeza",
    "Serviços de Vigilância Patrimonial",
    "Manutenção Predial",
    "Serviços de Jardinagem",
  ],
  Alimentação: [
    "Fornecimento de Refeições",
    "Aquisição de Gêneros Alimentícios",
    "Serviço de Catering",
    "Kit de Alimentação",
  ],
  Segurança: [
    "Aquisição de Viaturas",
    "Sistemas de Monitoramento",
    "Equipamentos de Segurança",
    "Contratação de Vigilância",
  ],
  Transporte: [
    "Locação de Veículos",
    "Manutenção de Frota",
    "Aquisição de Ônibus",
    "Serviços de Transporte Coletivo",
  ],
};

const descricoes: Record<string, string[]> = {
  Saúde: [
    "Compra de medicamentos para abastecimento da farmácia popular.",
    "Aquisição de equipamentos para unidades de saúde do município.",
    "Contratação de profissionais de saúde para atendimento emergencial.",
  ],
  Educação: [
    "Registro de preços para aquisição de gêneros alimentícios para as escolas da rede municipal.",
    "Fornecimento de livros e materiais pedagógicos para a rede pública de ensino.",
    "Reforma e adequação de unidades escolares.",
  ],
  Infraestrutura: [
    "Execução de obras de pavimentação asfáltica em diversas vias do município.",
    "Construção e reforma de equipamentos públicos.",
    "Serviços de engenharia para manutenção da infraestrutura urbana.",
  ],
  Tecnologia: [
    "Aquisição de computadores, servidores e periféricos para modernização tecnológica.",
    "Contratação de serviços especializados em tecnologia da informação.",
    "Implantação de sistema integrado de gestão administrativa.",
  ],
  "Serviços Gerais": [
    "Prestação de serviços contínuos de limpeza, asseio e conservação predial.",
    "Contratação de empresa especializada em serviços de manutenção geral.",
    "Serviços de apoio administrativo e operacional.",
  ],
  Alimentação: [
    "Fornecimento de refeições prontas para servidores e assistidos.",
    "Aquisição de alimentos para programas de assistência social.",
    "Serviços de preparo e distribuição de alimentação.",
  ],
  Segurança: [
    "Aquisição de veículos e equipamentos para a guarda municipal.",
    "Instalação e manutenção de câmeras de monitoramento em vias públicas.",
    "Contratação de serviços de vigilância armada e desarmada.",
  ],
  Transporte: [
    "Locação de veículos para atender a demanda administrativa do município.",
    "Manutenção preventiva e corretiva da frota de veículos oficiais.",
    "Aquisição de veículos para transporte público municipal.",
  ],
};

const modalidades: LicitacaoModalidade[] = [
  "Pregão Eletrônico",
  "Concorrência",
  "Tomada de Preços",
  "Convite",
  "Dispensa",
  "Inexigibilidade",
];

function gerarNumeroEdital(): string {
  const ano = faker.date.recent({ days: 365 }).getFullYear();
  const numero = faker.number.int({ min: 1, max: 999 }).toString().padStart(3, "0");
  return `${numero}/${ano}`;
}

function gerarLicitacao(): Licitacao {
  const categoria = faker.helpers.arrayElement(categorias);
  const estadoObj = faker.helpers.arrayElement(estados);
  const cidade = faker.location.city();

  const orgaoTemplate = faker.helpers.arrayElement(orgaos);
  const orgao = orgaoTemplate
    .replace("{cidade}", cidade)
    .replace("{estado}", estadoObj.nome);

  const titulo = faker.helpers.arrayElement(titulosBase[categoria]);
  const descricao = faker.helpers.arrayElement(descricoes[categoria]);

  const statusOpcoes: LicitacaoStatus[] = ["Ativa", "Encerrada", "Próxima"];
  const status = faker.helpers.arrayElement(statusOpcoes);

  const agora = new Date();
  let prazo: Date;
  if (status === "Encerrada") {
    prazo = faker.date.between({
      from: new Date(agora.getFullYear() - 1, 0, 1),
      to: agora,
    });
  } else if (status === "Ativa") {
    prazo = faker.date.between({
      from: agora,
      to: new Date(agora.getFullYear() + 1, 0, 1),
    });
  } else {
    prazo = faker.date.between({
      from: new Date(agora.getFullYear() + 1, 0, 1),
      to: new Date(agora.getFullYear() + 2, 0, 1),
    });
  }

  const totalItensEdital = faker.number.int({ min: 3, max: 25 });
  const itensCompativeis = faker.number.int({ min: 0, max: totalItensEdital });
  const score = totalItensEdital > 0
    ? Math.round((itensCompativeis / totalItensEdital) * 100)
    : 0;

  const keywordsPool = [
    "medicamento", "insumo", "equipamento", "computador", "servidor",
    "limpeza", "manutenção", "reforma", "transporte", "alimentação",
    "software", "consultoria", "material didático", "veículo", "uniforme",
  ];

  return {
    id: faker.string.uuid(),
    numeroEdital: gerarNumeroEdital(),
    titulo,
    orgao,
    cidade,
    estado: estadoObj.sigla,
    valor: faker.number.float({ min: 10000, max: 5000000, fractionDigits: 2 }),
    prazo,
    descricao,
    status,
    categoria,
    modalidade: faker.helpers.arrayElement(modalidades),
    match: {
      score,
      itensCompativeis,
      totalItensEdital,
      keywordsMatch: faker.helpers.arrayElements(keywordsPool, { min: 1, max: 5 }),
    },
  };
}

export function gerarLicitacoes(quantidade: number = 20): Licitacao[] {
  return Array.from({ length: quantidade }, () => gerarLicitacao());
}

// Dados estáticos para renderização consistente (SSR-friendly)
export const licitacoesMock: Licitacao[] = [
  {
    id: "1",
    numeroEdital: "045/2025",
    titulo: "Aquisição de Medicamentos",
    orgao: "Prefeitura de Salvador",
    cidade: "Salvador",
    estado: "BA",
    valor: 347850.0,
    prazo: new Date("2025-11-30"),
    descricao:
      "Compra de medicamentos para abastecimento da farmácia popular e unidades básicas de saúde.",
    status: "Ativa",
    categoria: "Saúde",
    modalidade: "Pregão Eletrônico",
    match: {
      score: 87,
      itensCompativeis: 13,
      totalItensEdital: 15,
      keywordsMatch: ["medicamento", "insumo", "equipamento"],
    },
  },
  {
    id: "2",
    numeroEdital: "012/2024",
    titulo: "Contratação de Serviços de Limpeza",
    orgao: "Tribunal de Justiça do Rio de Janeiro",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    valor: 89500.0,
    prazo: new Date("2024-10-09"),
    descricao:
      "Prestação de serviços contínuos de limpeza, asseio e conservação predial.",
    status: "Encerrada",
    categoria: "Serviços Gerais",
    modalidade: "Concorrência",
    match: {
      score: 23,
      itensCompativeis: 2,
      totalItensEdital: 9,
      keywordsMatch: ["limpeza"],
    },
  },
  {
    id: "3",
    numeroEdital: "003/2026",
    titulo: "Fornecimento de Merenda Escolar",
    orgao: "Governo do Estado de Minas Gerais",
    cidade: "Belo Horizonte",
    estado: "MG",
    valor: 2150000.0,
    prazo: new Date("2026-01-19"),
    descricao:
      "Registro de preços para aquisição de gêneros alimentícios para as escolas da rede municipal.",
    status: "Próxima",
    categoria: "Alimentação",
    modalidade: "Pregão Eletrônico",
    match: {
      score: 64,
      itensCompativeis: 7,
      totalItensEdital: 11,
      keywordsMatch: ["alimentação", "insumo"],
    },
  },
  {
    id: "4",
    numeroEdital: "078/2025",
    titulo: "Pavimentação de Vias Urbanas",
    orgao: "Prefeitura de Curitiba",
    cidade: "Curitiba",
    estado: "PR",
    valor: 1875000.0,
    prazo: new Date("2025-08-15"),
    descricao:
      "Execução de obras de pavimentação asfáltica em diversas vias do município.",
    status: "Ativa",
    categoria: "Infraestrutura",
    modalidade: "Tomada de Preços",
    match: {
      score: 12,
      itensCompativeis: 1,
      totalItensEdital: 8,
      keywordsMatch: ["manutenção"],
    },
  },
  {
    id: "5",
    numeroEdital: "091/2025",
    titulo: "Sistema de Gestão Pública",
    orgao: "Secretaria de Educação de Recife",
    cidade: "Recife",
    estado: "PE",
    valor: 523000.0,
    prazo: new Date("2025-12-20"),
    descricao:
      "Implantação de sistema integrado de gestão administrativa.",
    status: "Ativa",
    categoria: "Tecnologia",
    modalidade: "Pregão Eletrônico",
    match: {
      score: 92,
      itensCompativeis: 11,
      totalItensEdital: 12,
      keywordsMatch: ["software", "servidor", "computador", "consultoria"],
    },
  },
  {
    id: "6",
    numeroEdital: "034/2025",
    titulo: "Aquisição de Equipamentos de TI",
    orgao: "Ministério Público de São Paulo",
    cidade: "São Paulo",
    estado: "SP",
    valor: 1250000.0,
    prazo: new Date("2025-09-30"),
    descricao:
      "Aquisição de computadores, servidores e periféricos para modernização tecnológica do parque computacional.",
    status: "Ativa",
    categoria: "Tecnologia",
    modalidade: "Pregão Eletrônico",
    match: {
      score: 78,
      itensCompativeis: 9,
      totalItensEdital: 12,
      keywordsMatch: ["computador", "servidor", "equipamento"],
    },
  },
  {
    id: "7",
    numeroEdital: "021/2025",
    titulo: "Locação de Veículos",
    orgao: "Governo do Estado do Rio Grande do Sul",
    cidade: "Porto Alegre",
    estado: "RS",
    valor: 620000.0,
    prazo: new Date("2025-10-15"),
    descricao:
      "Locação de veículos para atender a demanda administrativa do governo estadual.",
    status: "Ativa",
    categoria: "Transporte",
    modalidade: "Pregão Eletrônico",
    match: {
      score: 45,
      itensCompativeis: 4,
      totalItensEdital: 9,
      keywordsMatch: ["veículo", "manutenção"],
    },
  },
  {
    id: "8",
    numeroEdital: "056/2025",
    titulo: "Sistemas de Monitoramento",
    orgao: "Secretaria de Segurança de Fortaleza",
    cidade: "Fortaleza",
    estado: "CE",
    valor: 980000.0,
    prazo: new Date("2025-12-01"),
    descricao:
      "Instalação e manutenção de câmeras de monitoramento em vias públicas da capital.",
    status: "Ativa",
    categoria: "Segurança",
    modalidade: "Concorrência",
    match: {
      score: 56,
      itensCompativeis: 5,
      totalItensEdital: 9,
      keywordsMatch: ["equipamento", "software", "manutenção"],
    },
  },
  {
    id: "9",
    numeroEdital: "089/2025",
    titulo: "Aquisição de Gêneros Alimentícios",
    orgao: "Prefeitura de Belém",
    cidade: "Belém",
    estado: "PA",
    valor: 415000.0,
    prazo: new Date("2026-02-28"),
    descricao:
      "Aquisição de alimentos para programas de assistência social e merenda escolar.",
    status: "Próxima",
    categoria: "Alimentação",
    modalidade: "Pregão Eletrônico",
    match: {
      score: 71,
      itensCompativeis: 10,
      totalItensEdital: 14,
      keywordsMatch: ["alimentação", "insumo", "uniforme"],
    },
  },
  {
    id: "10",
    numeroEdital: "067/2025",
    titulo: "Reforma de Prédios Públicos",
    orgao: "Governo do Estado de Goiás",
    cidade: "Goiânia",
    estado: "GO",
    valor: 3200000.0,
    prazo: new Date("2025-07-20"),
    descricao:
      "Construção e reforma de equipamentos públicos no estado de Goiás.",
    status: "Encerrada",
    categoria: "Infraestrutura",
    modalidade: "Tomada de Preços",
    match: {
      score: 33,
      itensCompativeis: 3,
      totalItensEdital: 9,
      keywordsMatch: ["manutenção", "reforma"],
    },
  },
  {
    id: "11",
    numeroEdital: "102/2025",
    titulo: "Contratação de Serviços de Limpeza",
    orgao: "Tribunal de Justiça de Santa Catarina",
    cidade: "Florianópolis",
    estado: "SC",
    valor: 175000.0,
    prazo: new Date("2025-11-10"),
    descricao:
      "Prestação de serviços contínuos de limpeza, asseio e conservação das dependências do tribunal.",
    status: "Ativa",
    categoria: "Serviços Gerais",
    modalidade: "Dispensa",
    match: {
      score: 29,
      itensCompativeis: 2,
      totalItensEdital: 7,
      keywordsMatch: ["limpeza"],
    },
  },
  {
    id: "12",
    numeroEdital: "015/2026",
    titulo: "Modernização de Data Center",
    orgao: "Ministério Público do Distrito Federal",
    cidade: "Brasília",
    estado: "DF",
    valor: 4500000.0,
    prazo: new Date("2026-03-15"),
    descricao:
      "Aquisição de equipamentos e serviços para modernização do data center do MPDFT.",
    status: "Próxima",
    categoria: "Tecnologia",
    modalidade: "Pregão Eletrônico",
    match: {
      score: 88,
      itensCompativeis: 14,
      totalItensEdital: 16,
      keywordsMatch: ["servidor", "computador", "software", "equipamento"],
    },
  },
];
