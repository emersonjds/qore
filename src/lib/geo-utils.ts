import type { Licitacao } from "../../mock/licitacoes";

/** Coordenadas (lat, lng) das capitais dos 27 estados brasileiros */
export const ESTADO_COORDENADAS: Record<string, [number, number]> = {
  AC: [-9.9754, -67.8249],
  AL: [-9.6658, -35.735],
  AM: [-3.119, -60.0217],
  AP: [0.034, -51.0694],
  BA: [-12.9714, -38.5124],
  CE: [-3.7172, -38.5433],
  DF: [-15.7975, -47.8919],
  ES: [-20.3155, -40.3128],
  GO: [-16.6869, -49.2648],
  MA: [-2.5297, -44.2825],
  MG: [-19.9167, -43.9345],
  MS: [-20.4697, -54.6201],
  MT: [-15.601, -56.0974],
  PA: [-1.4558, -48.5024],
  PB: [-7.115, -34.863],
  PE: [-8.0476, -34.877],
  PI: [-5.0892, -42.8019],
  PR: [-25.4284, -49.2733],
  RJ: [-22.9068, -43.1729],
  RN: [-5.7945, -35.211],
  RO: [-8.7612, -63.9004],
  RR: [2.8195, -60.6714],
  RS: [-30.0346, -51.2177],
  SC: [-27.5954, -48.548],
  SE: [-10.9091, -37.0677],
  SP: [-23.5505, -46.6333],
  TO: [-10.1689, -48.3317],
};

/**
 * Calcula a distância em km entre dois pontos usando a fórmula de Haversine.
 */
export function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Raio da Terra em km
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export interface GrupoEstado {
  estado: string;
  coordenadas: [number, number];
  licitacoes: Licitacao[];
  distanciaKm: number | null;
}

/**
 * Agrupa licitações por estado, calcula distância ao usuário e ordena por proximidade.
 * Se a posição do usuário não estiver disponível, distanciaKm será null e a ordem é alfabética.
 */
export function agruparPorEstado(
  licitacoes: Licitacao[],
  userLat?: number | null,
  userLng?: number | null
): GrupoEstado[] {
  const mapa = new Map<string, Licitacao[]>();

  for (const lic of licitacoes) {
    const grupo = mapa.get(lic.estado) || [];
    grupo.push(lic);
    mapa.set(lic.estado, grupo);
  }

  const grupos: GrupoEstado[] = [];

  for (const [estado, lics] of mapa) {
    const coordenadas = ESTADO_COORDENADAS[estado];
    if (!coordenadas) continue;

    const distanciaKm =
      userLat != null && userLng != null
        ? Math.round(haversine(userLat, userLng, coordenadas[0], coordenadas[1]))
        : null;

    grupos.push({ estado, coordenadas, licitacoes: lics, distanciaKm });
  }

  grupos.sort((a, b) => {
    if (a.distanciaKm != null && b.distanciaKm != null) {
      return a.distanciaKm - b.distanciaKm;
    }
    return a.estado.localeCompare(b.estado);
  });

  return grupos;
}
