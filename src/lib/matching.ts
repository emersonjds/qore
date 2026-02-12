import { type Produto } from "@/../mock/catalogo";
import { type ItemEdital } from "@/../mock/edital-itens";

export interface ItemPropostaComMatch {
  itemEdital: ItemEdital;
  matched: boolean;
  produtoMatch: Produto | null;
  precoSugerido: number;
  similaridade: number;
}

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function calcularSimilaridade(descricaoEdital: string, produto: Produto): number {
  const descNorm = normalizar(descricaoEdital);
  const nomeNorm = normalizar(produto.nome);
  const descProdNorm = normalizar(produto.descricao);
  const tagsNorm = produto.tags.map(normalizar);

  let score = 0;

  // Comparar palavras do nome do produto com a descrição do edital
  const palavrasNome = nomeNorm.split(" ").filter((p) => p.length > 2);
  const palavrasEdital = descNorm.split(" ").filter((p) => p.length > 2);

  const matchesNome = palavrasNome.filter((p) => descNorm.includes(p));
  if (palavrasNome.length > 0) {
    score += (matchesNome.length / palavrasNome.length) * 60;
  }

  // Comparar tags
  const matchesTags = tagsNorm.filter((tag) => descNorm.includes(tag));
  if (tagsNorm.length > 0) {
    score += (matchesTags.length / tagsNorm.length) * 25;
  }

  // Comparar palavras da descrição do produto
  const palavrasDescProd = descProdNorm.split(" ").filter((p) => p.length > 3);
  const matchesDesc = palavrasDescProd.filter((p) => palavrasEdital.includes(p));
  if (palavrasDescProd.length > 0) {
    score += (matchesDesc.length / palavrasDescProd.length) * 15;
  }

  return Math.min(score, 100);
}

export function matchItensEdital(
  itensEdital: ItemEdital[],
  catalogo: Produto[]
): ItemPropostaComMatch[] {
  const catalogoAtivo = catalogo.filter((p) => p.status !== "inativo");

  return itensEdital.map((item) => {
    let melhorMatch: Produto | null = null;
    let melhorScore = 0;

    for (const produto of catalogoAtivo) {
      const score = calcularSimilaridade(item.descricao, produto);
      if (score > melhorScore) {
        melhorScore = score;
        melhorMatch = produto;
      }
    }

    const threshold = 30;
    const matched = melhorScore >= threshold;

    return {
      itemEdital: item,
      matched,
      produtoMatch: matched ? melhorMatch : null,
      precoSugerido: matched && melhorMatch ? melhorMatch.precoUnitario : item.painelPrecos,
      similaridade: Math.round(melhorScore),
    };
  });
}
