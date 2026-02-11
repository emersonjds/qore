import { faker } from "@faker-js/faker/locale/pt_BR";

export type LicitacaoStatus = "Ativa" | "Encerrada" | "Próxima";

export interface Licitacao {
  id: string;
  titulo: string;
  orgao: string;
  cidade: string;
  estado: string;
  valor: number;
  prazo: Date;
  descricao: string;
  status: LicitacaoStatus;
  categoria: string;
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

  return {
    id: faker.string.uuid(),
    titulo,
    orgao,
    cidade,
    estado: estadoObj.sigla,
    valor: faker.number.float({ min: 10000, max: 5000000, fractionDigits: 2 }),
    prazo,
    descricao,
    status,
    categoria,
  };
}

export function gerarLicitacoes(quantidade: number = 20): Licitacao[] {
  return Array.from({ length: quantidade }, () => gerarLicitacao());
}

// Dados estáticos para renderização consistente (SSR-friendly)
export const licitacoesMock: Licitacao[] = [
  {
    id: "1",
    titulo: "Aquisição de Medicamentos",
    orgao: "Prefeitura de Salvador",
    cidade: "Salvador",
    estado: "BA",
    valor: 300000,
    prazo: new Date("2025-11-30"),
    descricao:
      "Compra de medicamentos para abastecimento da farmácia popular.",
    status: "Ativa",
    categoria: "Saúde",
  },
  {
    id: "2",
    titulo: "Contratação de Serviços de Limpeza",
    orgao: "Tribunal de Justiça do Rio de Janeiro",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    valor: 80000,
    prazo: new Date("2024-10-09"),
    descricao:
      "Prestação de serviços contínuos de limpeza, asseio e conservação predial.",
    status: "Encerrada",
    categoria: "Serviços Gerais",
  },
  {
    id: "3",
    titulo: "Fornecimento de Merenda Escolar",
    orgao: "Governo do Estado de Minas Gerais",
    cidade: "Belo Horizonte",
    estado: "MG",
    valor: 2000000,
    prazo: new Date("2026-01-19"),
    descricao:
      "Registro de preços para aquisição de gêneros alimentícios para as escolas da rede municipal.",
    status: "Próxima",
    categoria: "Alimentação",
  },
  {
    id: "4",
    titulo: "Pavimentação de Vias Urbanas",
    orgao: "Prefeitura de Curitiba",
    cidade: "Curitiba",
    estado: "PR",
    valor: 1500000,
    prazo: new Date("2025-08-15"),
    descricao:
      "Execução de obras de pavimentação asfáltica em diversas vias do município.",
    status: "Ativa",
    categoria: "Infraestrutura",
  },
  {
    id: "5",
    titulo: "Sistema de Gestão Pública",
    orgao: "Secretaria de Educação de Recife",
    cidade: "Recife",
    estado: "PE",
    valor: 450000,
    prazo: new Date("2025-12-20"),
    descricao:
      "Implantação de sistema integrado de gestão administrativa.",
    status: "Ativa",
    categoria: "Tecnologia",
  },
];
