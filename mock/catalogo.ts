export type ProdutoStatus = "ativo" | "inativo" | "pendente";
export type NormaConformidade = "ABNT" | "ANVISA" | "INMETRO" | "ISO" | "MAPA";

export interface ProdutoConformidade {
  norma: NormaConformidade;
  codigo: string;
  descricao: string;
  validade?: string;
}

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  subcategoria: string;
  unidade: string;
  precoUnitario: number;
  imagemUrl: string;
  status: ProdutoStatus;
  codigoInterno: string;
  ncm: string;
  conformidades: ProdutoConformidade[];
  tags: string[];
  criadoEm: string;
  atualizadoEm: string;
  matchCount: number;
}

export interface CatalogoUpload {
  id: string;
  nomeArquivo: string;
  tamanho: string;
  tipo: "PDF" | "XLSX" | "CSV";
  dataUpload: string;
  produtosExtraidos: number;
  status: "processando" | "concluido" | "erro";
}

export const uploadsRecentes: CatalogoUpload[] = [
  {
    id: "u1",
    nomeArquivo: "catalogo_medicamentos_2025.pdf",
    tamanho: "4.2 MB",
    tipo: "PDF",
    dataUpload: "2025-06-10",
    produtosExtraidos: 48,
    status: "concluido",
  },
  {
    id: "u2",
    nomeArquivo: "equipamentos_ti_v3.xlsx",
    tamanho: "1.8 MB",
    tipo: "XLSX",
    dataUpload: "2025-06-08",
    produtosExtraidos: 32,
    status: "concluido",
  },
  {
    id: "u3",
    nomeArquivo: "insumos_limpeza.csv",
    tamanho: "320 KB",
    tipo: "CSV",
    dataUpload: "2025-06-12",
    produtosExtraidos: 0,
    status: "processando",
  },
];

export const produtosMock: Produto[] = [
  {
    id: "p1",
    nome: "Dipirona Sódica 500mg",
    descricao:
      "Comprimido analgésico e antitérmico, caixa com 200 unidades. Registro ANVISA válido. Indicado para dor e febre.",
    categoria: "Saúde",
    subcategoria: "Medicamentos",
    unidade: "Caixa c/ 200",
    precoUnitario: 18.9,
    imagemUrl: "https://placehold.co/280x200/e0f2fe/0284c7?text=Dipirona+500mg",
    status: "ativo",
    codigoInterno: "MED-001",
    ncm: "3004.90.69",
    conformidades: [
      {
        norma: "ANVISA",
        codigo: "MS 1.0573.0341",
        descricao: "Registro de medicamento válido",
        validade: "2027-03",
      },
      {
        norma: "ABNT",
        codigo: "NBR 14724",
        descricao: "Embalagem conforme norma de rotulagem",
      },
    ],
    tags: ["analgésico", "antitérmico", "genérico"],
    criadoEm: "2025-01-15",
    atualizadoEm: "2025-06-10",
    matchCount: 5,
  },
  {
    id: "p2",
    nome: "Paracetamol 750mg",
    descricao:
      "Comprimido para dor e febre. Embalagem com 500 unidades. Fabricação nacional com controle de qualidade ISO.",
    categoria: "Saúde",
    subcategoria: "Medicamentos",
    unidade: "Caixa c/ 500",
    precoUnitario: 32.5,
    imagemUrl: "https://placehold.co/280x200/dcfce7/166534?text=Paracetamol+750mg",
    status: "ativo",
    codigoInterno: "MED-002",
    ncm: "3004.90.69",
    conformidades: [
      {
        norma: "ANVISA",
        codigo: "MS 1.0573.0298",
        descricao: "Registro de medicamento válido",
        validade: "2026-11",
      },
      {
        norma: "ISO",
        codigo: "ISO 9001:2015",
        descricao: "Sistema de gestão da qualidade",
      },
    ],
    tags: ["analgésico", "antitérmico", "genérico"],
    criadoEm: "2025-01-15",
    atualizadoEm: "2025-06-10",
    matchCount: 4,
  },
  {
    id: "p3",
    nome: 'Notebook Corporativo 15.6"',
    descricao:
      "Intel Core i5-1335U, 16GB RAM DDR5, SSD 512GB NVMe, tela Full HD IPS antirreflexo. Garantia de 3 anos on-site.",
    categoria: "Tecnologia",
    subcategoria: "Computadores",
    unidade: "Unidade",
    precoUnitario: 4250.0,
    imagemUrl: "https://placehold.co/280x200/ede9fe/6d28d9?text=Notebook+i5",
    status: "ativo",
    codigoInterno: "TI-010",
    ncm: "8471.30.19",
    conformidades: [
      {
        norma: "INMETRO",
        codigo: "OCP-0042",
        descricao: "Certificação de segurança elétrica",
        validade: "2026-08",
      },
      {
        norma: "ISO",
        codigo: "ISO 14001:2015",
        descricao: "Gestão ambiental na fabricação",
      },
    ],
    tags: ["notebook", "corporativo", "intel", "i5"],
    criadoEm: "2025-02-20",
    atualizadoEm: "2025-06-08",
    matchCount: 8,
  },
  {
    id: "p4",
    nome: "Servidor Rack 2U",
    descricao:
      "Intel Xeon Silver 4314, 64GB ECC, 2x SSD 960GB RAID 1, fonte redundante 800W. Ideal para data centers e órgãos públicos.",
    categoria: "Tecnologia",
    subcategoria: "Servidores",
    unidade: "Unidade",
    precoUnitario: 28900.0,
    imagemUrl: "https://placehold.co/280x200/fef3c7/92400e?text=Servidor+Rack+2U",
    status: "ativo",
    codigoInterno: "TI-020",
    ncm: "8471.50.10",
    conformidades: [
      {
        norma: "INMETRO",
        codigo: "OCP-0098",
        descricao: "Certificação de segurança elétrica",
        validade: "2027-01",
      },
      {
        norma: "ISO",
        codigo: "ISO 27001:2022",
        descricao: "Segurança da informação",
      },
      {
        norma: "ABNT",
        codigo: "NBR ISO/IEC 27001",
        descricao: "Conformidade com padrões nacionais de segurança",
      },
    ],
    tags: ["servidor", "rack", "xeon", "data center"],
    criadoEm: "2025-03-01",
    atualizadoEm: "2025-06-08",
    matchCount: 6,
  },
  {
    id: "p5",
    nome: 'Monitor LED 24" Full HD',
    descricao:
      "Painel IPS, resolução 1920x1080, 75Hz, conexões HDMI e DisplayPort. Suporte VESA 100x100. Ideal para estações de trabalho.",
    categoria: "Tecnologia",
    subcategoria: "Periféricos",
    unidade: "Unidade",
    precoUnitario: 890.0,
    imagemUrl: "https://placehold.co/280x200/e0f2fe/0369a1?text=Monitor+LED+24",
    status: "ativo",
    codigoInterno: "TI-031",
    ncm: "8528.52.20",
    conformidades: [
      {
        norma: "INMETRO",
        codigo: "OCP-0115",
        descricao: "Eficiência energética nível A",
        validade: "2026-12",
      },
    ],
    tags: ["monitor", "led", "full hd", "ips"],
    criadoEm: "2025-02-20",
    atualizadoEm: "2025-05-30",
    matchCount: 3,
  },
  {
    id: "p6",
    nome: "Álcool Gel 70% 500ml",
    descricao:
      "Antisséptico para mãos, embalagem com bico dosador. Registro ANVISA. Caixa com 12 frascos.",
    categoria: "Saúde",
    subcategoria: "Insumos",
    unidade: "Caixa c/ 12",
    precoUnitario: 54.0,
    imagemUrl: "https://placehold.co/280x200/dcfce7/15803d?text=Álcool+Gel+70%25",
    status: "ativo",
    codigoInterno: "INS-005",
    ncm: "3808.94.29",
    conformidades: [
      {
        norma: "ANVISA",
        codigo: "25351.379218/2020-73",
        descricao: "Notificação de produto de higiene",
      },
      {
        norma: "ABNT",
        codigo: "NBR 14725",
        descricao: "Ficha de segurança de produtos químicos",
      },
    ],
    tags: ["álcool gel", "antisséptico", "higiene"],
    criadoEm: "2025-04-10",
    atualizadoEm: "2025-06-10",
    matchCount: 2,
  },
  {
    id: "p7",
    nome: "Seringa Descartável 10ml",
    descricao:
      "Seringa com agulha 25x7, estéril, embalagem individual. Caixa com 1000 unidades. Padrão hospitalar.",
    categoria: "Saúde",
    subcategoria: "Insumos",
    unidade: "Caixa c/ 1000",
    precoUnitario: 145.0,
    imagemUrl: "https://placehold.co/280x200/e0f2fe/0284c7?text=Seringa+10ml",
    status: "pendente",
    codigoInterno: "INS-008",
    ncm: "9018.31.19",
    conformidades: [
      {
        norma: "ANVISA",
        codigo: "80351120001",
        descricao: "Registro de produto médico",
        validade: "2026-05",
      },
      {
        norma: "INMETRO",
        codigo: "OCP-0201",
        descricao: "Certificação de dispositivo médico",
      },
      {
        norma: "ISO",
        codigo: "ISO 13485:2016",
        descricao: "Sistema de gestão para dispositivos médicos",
      },
    ],
    tags: ["seringa", "descartável", "hospitalar"],
    criadoEm: "2025-05-20",
    atualizadoEm: "2025-06-12",
    matchCount: 3,
  },
  {
    id: "p8",
    nome: "Switch Gerenciável 24 Portas",
    descricao:
      "Switch Layer 2, 24 portas Gigabit + 4 SFP+, gerenciamento via web e CLI. Suporte VLAN, QoS e SNMP.",
    categoria: "Tecnologia",
    subcategoria: "Redes",
    unidade: "Unidade",
    precoUnitario: 3750.0,
    imagemUrl: "https://placehold.co/280x200/fef9c3/854d0e?text=Switch+24P",
    status: "ativo",
    codigoInterno: "TI-045",
    ncm: "8517.62.59",
    conformidades: [
      {
        norma: "INMETRO",
        codigo: "OCP-0187",
        descricao: "Certificação de equipamento de telecomunicações",
        validade: "2027-03",
      },
    ],
    tags: ["switch", "rede", "gigabit", "gerenciável"],
    criadoEm: "2025-03-15",
    atualizadoEm: "2025-06-08",
    matchCount: 5,
  },
];

// Estatísticas do catálogo
export const catalogoStats = {
  totalProdutos: produtosMock.length,
  produtosAtivos: produtosMock.filter((p) => p.status === "ativo").length,
  produtosPendentes: produtosMock.filter((p) => p.status === "pendente").length,
  categorias: [...new Set(produtosMock.map((p) => p.categoria))].length,
  matchesTotal: produtosMock.reduce((acc, p) => acc + p.matchCount, 0),
  ultimaAtualizacao: "12/06/2025",
};
