export interface ItemEdital {
  numero: number;
  descricao: string;
  codigoCatMat: string;
  unidadeMedida: string;
  requisicaoMinima: number;
  requisicaoMaxima: number;
  painelPrecos: number;
  valorTotal: number;
}

export const editalItensPorLicitacao: Record<string, ItemEdital[]> = {
  // Licitação 1 — Aquisição de Medicamentos (15 itens, 13 compatíveis)
  "1": [
    { numero: 1, descricao: "Dipirona sódica 500mg, caixa com 200 comprimidos", codigoCatMat: "BR0267837", unidadeMedida: "Caixa", requisicaoMinima: 500, requisicaoMaxima: 2000, painelPrecos: 19.50, valorTotal: 39000.00 },
    { numero: 2, descricao: "Paracetamol 750mg, caixa com 500 comprimidos", codigoCatMat: "BR0267921", unidadeMedida: "Caixa", requisicaoMinima: 300, requisicaoMaxima: 1500, painelPrecos: 34.00, valorTotal: 51000.00 },
    { numero: 3, descricao: "Álcool gel 70% antisséptico, frasco 500ml, caixa com 12", codigoCatMat: "BR0384512", unidadeMedida: "Caixa", requisicaoMinima: 200, requisicaoMaxima: 800, painelPrecos: 56.00, valorTotal: 44800.00 },
    { numero: 4, descricao: "Seringa descartável 10ml com agulha 25x7", codigoCatMat: "BR0412003", unidadeMedida: "Caixa c/ 1000", requisicaoMinima: 50, requisicaoMaxima: 200, painelPrecos: 150.00, valorTotal: 30000.00 },
    { numero: 5, descricao: "Amoxicilina 500mg, caixa com 100 cápsulas", codigoCatMat: "BR0268105", unidadeMedida: "Caixa", requisicaoMinima: 400, requisicaoMaxima: 1200, painelPrecos: 28.00, valorTotal: 33600.00 },
    { numero: 6, descricao: "Ibuprofeno 600mg, caixa com 200 comprimidos", codigoCatMat: "BR0268203", unidadeMedida: "Caixa", requisicaoMinima: 300, requisicaoMaxima: 1000, painelPrecos: 22.00, valorTotal: 22000.00 },
    { numero: 7, descricao: "Luva de procedimento látex tamanho M, caixa com 100", codigoCatMat: "BR0391205", unidadeMedida: "Caixa", requisicaoMinima: 500, requisicaoMaxima: 2000, painelPrecos: 32.00, valorTotal: 64000.00 },
    { numero: 8, descricao: "Máscara cirúrgica tripla descartável, caixa com 50", codigoCatMat: "BR0391310", unidadeMedida: "Caixa", requisicaoMinima: 1000, requisicaoMaxima: 5000, painelPrecos: 8.50, valorTotal: 42500.00 },
    { numero: 9, descricao: "Gaze estéril 7,5x7,5cm, pacote com 500", codigoCatMat: "BR0392001", unidadeMedida: "Pacote", requisicaoMinima: 200, requisicaoMaxima: 600, painelPrecos: 18.00, valorTotal: 10800.00 },
    { numero: 10, descricao: "Esparadrapo impermeável 10cm x 4,5m", codigoCatMat: "BR0392105", unidadeMedida: "Rolo", requisicaoMinima: 300, requisicaoMaxima: 1000, painelPrecos: 6.50, valorTotal: 6500.00 },
    { numero: 11, descricao: "Soro fisiológico 0,9% 500ml", codigoCatMat: "BR0268450", unidadeMedida: "Frasco", requisicaoMinima: 1000, requisicaoMaxima: 5000, painelPrecos: 4.20, valorTotal: 21000.00 },
    { numero: 12, descricao: "Termômetro digital clínico", codigoCatMat: "BR0415001", unidadeMedida: "Unidade", requisicaoMinima: 100, requisicaoMaxima: 500, painelPrecos: 15.00, valorTotal: 7500.00 },
    { numero: 13, descricao: "Algodão hidrófilo rolo 500g", codigoCatMat: "BR0392210", unidadeMedida: "Rolo", requisicaoMinima: 200, requisicaoMaxima: 800, painelPrecos: 12.00, valorTotal: 9600.00 },
    { numero: 14, descricao: "Desfibrilador externo automático portátil", codigoCatMat: "BR0510201", unidadeMedida: "Unidade", requisicaoMinima: 2, requisicaoMaxima: 10, painelPrecos: 8500.00, valorTotal: 85000.00 },
    { numero: 15, descricao: "Tomógrafo computadorizado 128 canais", codigoCatMat: "BR0520105", unidadeMedida: "Unidade", requisicaoMinima: 1, requisicaoMaxima: 2, painelPrecos: 2500000.00, valorTotal: 5000000.00 },
  ],

  // Licitação 2 — Serviços de Limpeza (9 itens, 2 compatíveis)
  "2": [
    { numero: 1, descricao: "Álcool gel 70% para higienização, frasco 500ml", codigoCatMat: "BR0384512", unidadeMedida: "Caixa c/ 12", requisicaoMinima: 100, requisicaoMaxima: 500, painelPrecos: 58.00, valorTotal: 29000.00 },
    { numero: 2, descricao: "Detergente líquido neutro 5 litros", codigoCatMat: "BR0601001", unidadeMedida: "Galão", requisicaoMinima: 200, requisicaoMaxima: 800, painelPrecos: 18.00, valorTotal: 14400.00 },
    { numero: 3, descricao: "Desinfetante hospitalar 5 litros", codigoCatMat: "BR0601105", unidadeMedida: "Galão", requisicaoMinima: 150, requisicaoMaxima: 600, painelPrecos: 25.00, valorTotal: 15000.00 },
    { numero: 4, descricao: "Luva de procedimento para limpeza M", codigoCatMat: "BR0391205", unidadeMedida: "Caixa c/ 100", requisicaoMinima: 100, requisicaoMaxima: 400, painelPrecos: 35.00, valorTotal: 14000.00 },
    { numero: 5, descricao: "Papel toalha interfolhado 2 dobras", codigoCatMat: "BR0602001", unidadeMedida: "Fardo", requisicaoMinima: 300, requisicaoMaxima: 1200, painelPrecos: 22.00, valorTotal: 26400.00 },
    { numero: 6, descricao: "Saco de lixo 100 litros reforçado", codigoCatMat: "BR0602105", unidadeMedida: "Pacote c/ 100", requisicaoMinima: 200, requisicaoMaxima: 800, painelPrecos: 28.00, valorTotal: 22400.00 },
    { numero: 7, descricao: "Limpador multiuso 500ml", codigoCatMat: "BR0601210", unidadeMedida: "Frasco", requisicaoMinima: 500, requisicaoMaxima: 2000, painelPrecos: 6.00, valorTotal: 12000.00 },
    { numero: 8, descricao: "Rodo profissional 60cm", codigoCatMat: "BR0603001", unidadeMedida: "Unidade", requisicaoMinima: 50, requisicaoMaxima: 200, painelPrecos: 18.00, valorTotal: 3600.00 },
    { numero: 9, descricao: "Vassoura de nylon profissional", codigoCatMat: "BR0603105", unidadeMedida: "Unidade", requisicaoMinima: 50, requisicaoMaxima: 200, painelPrecos: 15.00, valorTotal: 3000.00 },
  ],

  // Licitação 3 — Merenda Escolar (11 itens, 7 compatíveis)
  "3": [
    { numero: 1, descricao: "Arroz tipo 1, pacote 5kg", codigoCatMat: "BR0701001", unidadeMedida: "Pacote", requisicaoMinima: 2000, requisicaoMaxima: 10000, painelPrecos: 22.00, valorTotal: 220000.00 },
    { numero: 2, descricao: "Feijão carioca tipo 1, pacote 1kg", codigoCatMat: "BR0701105", unidadeMedida: "Pacote", requisicaoMinima: 3000, requisicaoMaxima: 15000, painelPrecos: 8.50, valorTotal: 127500.00 },
    { numero: 3, descricao: "Óleo de soja refinado 900ml", codigoCatMat: "BR0701210", unidadeMedida: "Frasco", requisicaoMinima: 1000, requisicaoMaxima: 5000, painelPrecos: 7.00, valorTotal: 35000.00 },
    { numero: 4, descricao: "Açúcar cristal 5kg", codigoCatMat: "BR0701315", unidadeMedida: "Pacote", requisicaoMinima: 1000, requisicaoMaxima: 5000, painelPrecos: 18.00, valorTotal: 90000.00 },
    { numero: 5, descricao: "Leite integral UHT 1 litro", codigoCatMat: "BR0702001", unidadeMedida: "Caixa c/ 12", requisicaoMinima: 2000, requisicaoMaxima: 8000, painelPrecos: 52.00, valorTotal: 416000.00 },
    { numero: 6, descricao: "Macarrão espaguete 500g", codigoCatMat: "BR0702105", unidadeMedida: "Pacote", requisicaoMinima: 2000, requisicaoMaxima: 10000, painelPrecos: 3.50, valorTotal: 35000.00 },
    { numero: 7, descricao: "Sal refinado iodado 1kg", codigoCatMat: "BR0702210", unidadeMedida: "Pacote", requisicaoMinima: 500, requisicaoMaxima: 2000, painelPrecos: 2.50, valorTotal: 5000.00 },
    { numero: 8, descricao: "Álcool gel 70% para cozinha, frasco 500ml", codigoCatMat: "BR0384512", unidadeMedida: "Caixa c/ 12", requisicaoMinima: 50, requisicaoMaxima: 200, painelPrecos: 56.00, valorTotal: 11200.00 },
    { numero: 9, descricao: "Geladeira industrial 4 portas 1000L", codigoCatMat: "BR0801001", unidadeMedida: "Unidade", requisicaoMinima: 5, requisicaoMaxima: 20, painelPrecos: 12000.00, valorTotal: 240000.00 },
    { numero: 10, descricao: "Fogão industrial 6 bocas", codigoCatMat: "BR0801105", unidadeMedida: "Unidade", requisicaoMinima: 5, requisicaoMaxima: 20, painelPrecos: 3500.00, valorTotal: 70000.00 },
    { numero: 11, descricao: "Freezer horizontal 500L", codigoCatMat: "BR0801210", unidadeMedida: "Unidade", requisicaoMinima: 5, requisicaoMaxima: 15, painelPrecos: 4200.00, valorTotal: 63000.00 },
  ],

  // Licitação 4 — Pavimentação (8 itens, 1 compatível)
  "4": [
    { numero: 1, descricao: "Massa asfáltica CBUQ faixa C", codigoCatMat: "BR0901001", unidadeMedida: "Tonelada", requisicaoMinima: 500, requisicaoMaxima: 2000, painelPrecos: 320.00, valorTotal: 640000.00 },
    { numero: 2, descricao: "Meio-fio de concreto pré-moldado", codigoCatMat: "BR0901105", unidadeMedida: "Metro", requisicaoMinima: 5000, requisicaoMaxima: 20000, painelPrecos: 18.00, valorTotal: 360000.00 },
    { numero: 3, descricao: "Brita graduada simples", codigoCatMat: "BR0901210", unidadeMedida: "m³", requisicaoMinima: 300, requisicaoMaxima: 1500, painelPrecos: 95.00, valorTotal: 142500.00 },
    { numero: 4, descricao: "Emulsão asfáltica RR-1C", codigoCatMat: "BR0901315", unidadeMedida: "Litro", requisicaoMinima: 10000, requisicaoMaxima: 50000, painelPrecos: 4.50, valorTotal: 225000.00 },
    { numero: 5, descricao: "Tinta para sinalização viária", codigoCatMat: "BR0902001", unidadeMedida: "Galão 18L", requisicaoMinima: 100, requisicaoMaxima: 400, painelPrecos: 280.00, valorTotal: 112000.00 },
    { numero: 6, descricao: "Tubo de concreto para drenagem 600mm", codigoCatMat: "BR0902105", unidadeMedida: "Metro", requisicaoMinima: 500, requisicaoMaxima: 2000, painelPrecos: 85.00, valorTotal: 170000.00 },
    { numero: 7, descricao: "Areia média lavada", codigoCatMat: "BR0902210", unidadeMedida: "m³", requisicaoMinima: 200, requisicaoMaxima: 1000, painelPrecos: 75.00, valorTotal: 75000.00 },
    { numero: 8, descricao: "Notebook corporativo para engenharia de campo", codigoCatMat: "BR0471301", unidadeMedida: "Unidade", requisicaoMinima: 2, requisicaoMaxima: 5, painelPrecos: 4500.00, valorTotal: 22500.00 },
  ],

  // Licitação 5 — Sistema de Gestão Pública (12 itens, 11 compatíveis)
  "5": [
    { numero: 1, descricao: "Notebook corporativo 15.6\" Intel Core i5, 16GB RAM, SSD 512GB", codigoCatMat: "BR0471301", unidadeMedida: "Unidade", requisicaoMinima: 50, requisicaoMaxima: 200, painelPrecos: 4400.00, valorTotal: 880000.00 },
    { numero: 2, descricao: "Servidor rack 2U Xeon, 64GB ECC, SSD 960GB RAID", codigoCatMat: "BR0471502", unidadeMedida: "Unidade", requisicaoMinima: 2, requisicaoMaxima: 8, painelPrecos: 29500.00, valorTotal: 236000.00 },
    { numero: 3, descricao: "Monitor LED 24 polegadas Full HD IPS", codigoCatMat: "BR0485220", unidadeMedida: "Unidade", requisicaoMinima: 50, requisicaoMaxima: 200, painelPrecos: 920.00, valorTotal: 184000.00 },
    { numero: 4, descricao: "Switch gerenciável 24 portas Gigabit + 4 SFP+", codigoCatMat: "BR0517625", unidadeMedida: "Unidade", requisicaoMinima: 5, requisicaoMaxima: 20, painelPrecos: 3900.00, valorTotal: 78000.00 },
    { numero: 5, descricao: "Computador desktop Intel Core i5, 16GB, SSD 256GB", codigoCatMat: "BR0471305", unidadeMedida: "Unidade", requisicaoMinima: 30, requisicaoMaxima: 100, painelPrecos: 3200.00, valorTotal: 320000.00 },
    { numero: 6, descricao: "Impressora multifuncional laser colorida A4", codigoCatMat: "BR0471401", unidadeMedida: "Unidade", requisicaoMinima: 10, requisicaoMaxima: 40, painelPrecos: 2800.00, valorTotal: 112000.00 },
    { numero: 7, descricao: "Nobreak senoidal 3kVA bivolt", codigoCatMat: "BR0471601", unidadeMedida: "Unidade", requisicaoMinima: 10, requisicaoMaxima: 30, painelPrecos: 2200.00, valorTotal: 66000.00 },
    { numero: 8, descricao: "Cabo de rede UTP Cat6, caixa 305m", codigoCatMat: "BR0517630", unidadeMedida: "Caixa", requisicaoMinima: 20, requisicaoMaxima: 80, painelPrecos: 450.00, valorTotal: 36000.00 },
    { numero: 9, descricao: "Teclado USB ABNT2 corporativo", codigoCatMat: "BR0471310", unidadeMedida: "Unidade", requisicaoMinima: 80, requisicaoMaxima: 300, painelPrecos: 45.00, valorTotal: 13500.00 },
    { numero: 10, descricao: "Mouse óptico USB 1200dpi", codigoCatMat: "BR0471315", unidadeMedida: "Unidade", requisicaoMinima: 80, requisicaoMaxima: 300, painelPrecos: 18.00, valorTotal: 5400.00 },
    { numero: 11, descricao: "Webcam Full HD 1080p com microfone", codigoCatMat: "BR0471320", unidadeMedida: "Unidade", requisicaoMinima: 30, requisicaoMaxima: 100, painelPrecos: 180.00, valorTotal: 18000.00 },
    { numero: 12, descricao: "Software de gestão integrada ERP - licença perpétua", codigoCatMat: "BR1001001", unidadeMedida: "Licença", requisicaoMinima: 1, requisicaoMaxima: 1, painelPrecos: 350000.00, valorTotal: 350000.00 },
  ],

  // Licitação 6 — Equipamentos de TI (12 itens, 9 compatíveis)
  "6": [
    { numero: 1, descricao: "Notebook corporativo 15.6\" para uso administrativo", codigoCatMat: "BR0471301", unidadeMedida: "Unidade", requisicaoMinima: 100, requisicaoMaxima: 500, painelPrecos: 4350.00, valorTotal: 2175000.00 },
    { numero: 2, descricao: "Servidor rack 2U para data center", codigoCatMat: "BR0471502", unidadeMedida: "Unidade", requisicaoMinima: 5, requisicaoMaxima: 15, painelPrecos: 30000.00, valorTotal: 450000.00 },
    { numero: 3, descricao: "Monitor LED 24\" Full HD para estação de trabalho", codigoCatMat: "BR0485220", unidadeMedida: "Unidade", requisicaoMinima: 100, requisicaoMaxima: 500, painelPrecos: 900.00, valorTotal: 450000.00 },
    { numero: 4, descricao: "Switch gerenciável 24 portas Gigabit", codigoCatMat: "BR0517625", unidadeMedida: "Unidade", requisicaoMinima: 10, requisicaoMaxima: 30, painelPrecos: 3850.00, valorTotal: 115500.00 },
    { numero: 5, descricao: "Desktop Intel Core i5 com monitor", codigoCatMat: "BR0471305", unidadeMedida: "Unidade", requisicaoMinima: 50, requisicaoMaxima: 200, painelPrecos: 3500.00, valorTotal: 700000.00 },
    { numero: 6, descricao: "Impressora laser monocromática A4", codigoCatMat: "BR0471401", unidadeMedida: "Unidade", requisicaoMinima: 20, requisicaoMaxima: 80, painelPrecos: 1800.00, valorTotal: 144000.00 },
    { numero: 7, descricao: "Nobreak senoidal online 3kVA", codigoCatMat: "BR0471601", unidadeMedida: "Unidade", requisicaoMinima: 15, requisicaoMaxima: 50, painelPrecos: 2400.00, valorTotal: 120000.00 },
    { numero: 8, descricao: "Cabo de rede UTP Cat6 305 metros", codigoCatMat: "BR0517630", unidadeMedida: "Caixa", requisicaoMinima: 30, requisicaoMaxima: 100, painelPrecos: 480.00, valorTotal: 48000.00 },
    { numero: 9, descricao: "Webcam HD com microfone integrado", codigoCatMat: "BR0471320", unidadeMedida: "Unidade", requisicaoMinima: 50, requisicaoMaxima: 200, painelPrecos: 190.00, valorTotal: 38000.00 },
    { numero: 10, descricao: "Central telefônica IP 100 ramais", codigoCatMat: "BR1002001", unidadeMedida: "Unidade", requisicaoMinima: 2, requisicaoMaxima: 5, painelPrecos: 45000.00, valorTotal: 225000.00 },
    { numero: 11, descricao: "Projetor multimídia 4000 lumens Full HD", codigoCatMat: "BR1002105", unidadeMedida: "Unidade", requisicaoMinima: 10, requisicaoMaxima: 30, painelPrecos: 4200.00, valorTotal: 126000.00 },
    { numero: 12, descricao: "Ar-condicionado split 60.000 BTU para sala de servidores", codigoCatMat: "BR1003001", unidadeMedida: "Unidade", requisicaoMinima: 3, requisicaoMaxima: 10, painelPrecos: 8500.00, valorTotal: 85000.00 },
  ],
};
