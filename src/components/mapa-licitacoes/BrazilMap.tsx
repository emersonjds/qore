"use client";

import React from "react";
import { worldMill } from "@react-jvectormap/world";
import dynamic from "next/dynamic";
import type { GrupoEstado } from "@/lib/geo-utils";

const VectorMap = dynamic(
  () => import("@react-jvectormap/core").then((mod) => mod.VectorMap),
  { ssr: false }
);

type MarkerStyle = {
  initial: {
    fill: string;
    r: number;
  };
};

type Marker = {
  latLng: [number, number];
  name: string;
  style?: {
    fill: string;
    borderWidth: number;
    borderColor: string;
    stroke?: string;
    strokeOpacity?: number;
  };
};

interface BrazilMapProps {
  grupos: GrupoEstado[];
  userLat?: number | null;
  userLng?: number | null;
  estadoSelecionado: string | null;
  onMarkerClick: (estado: string) => void;
}

const BrazilMap: React.FC<BrazilMapProps> = ({
  grupos,
  userLat,
  userLng,
  estadoSelecionado,
  onMarkerClick,
}) => {
  const markers: Marker[] = [];

  // Marker verde para localização do usuário
  if (userLat != null && userLng != null) {
    markers.push({
      latLng: [userLat, userLng],
      name: "Sua localização",
      style: {
        fill: "#22c55e",
        borderWidth: 2,
        borderColor: "white",
        stroke: "#16a34a",
      },
    });
  }

  // Markers para cada estado com licitações
  for (const grupo of grupos) {
    const isSelected = grupo.estado === estadoSelecionado;
    markers.push({
      latLng: grupo.coordenadas,
      name: `${grupo.estado} — ${grupo.licitacoes.length} licitação(ões)`,
      style: {
        fill: isSelected ? "#eab308" : "#3b82f6",
        borderWidth: isSelected ? 2 : 1,
        borderColor: "white",
        stroke: isSelected ? "#ca8a04" : "#2563eb",
      },
    });
  }

  return (
    <div className="h-full w-full min-h-[400px]">
      <VectorMap
        map={worldMill}
        backgroundColor="transparent"
        markerStyle={
          {
            initial: {
              fill: "#3b82f6",
              r: 6,
            },
          } as MarkerStyle
        }
        markersSelectable={true}
        markers={markers}
        focusOn={{
          lat: -14.235,
          lng: -51.9253,
          scale: 3.5,
          x: 0.5,
          y: 0.5,
          animate: true,
        }}
        onMarkerClick={(_e, code) => {
          const index = Number(code);
          // O índice 0 é o marker do usuário se existir
          const offset = userLat != null && userLng != null ? 1 : 0;
          const grupoIndex = index - offset;
          if (grupoIndex >= 0 && grupoIndex < grupos.length) {
            onMarkerClick(grupos[grupoIndex].estado);
          }
        }}
        zoomOnScroll={false}
        zoomMax={12}
        zoomMin={1}
        zoomAnimate={true}
        zoomStep={1.5}
        regionStyle={{
          initial: {
            fill: "#D0D5DD",
            fillOpacity: 1,
            fontFamily: "Outfit",
            stroke: "none",
            strokeWidth: 0,
            strokeOpacity: 0,
          },
          hover: {
            fillOpacity: 0.7,
            cursor: "pointer",
            fill: "#059669",
            stroke: "none",
          },
          selected: {
            fill: "#059669",
          },
          selectedHover: {},
        }}
        regionLabelStyle={{
          initial: {
            fill: "#35373e",
            fontWeight: 500,
            fontSize: "13px",
            stroke: "none",
          },
          hover: {},
          selected: {},
          selectedHover: {},
        }}
      />
    </div>
  );
};

export default BrazilMap;
