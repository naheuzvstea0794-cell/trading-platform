"use client";

import React from "react";

export default function AxisCoin() {
  /**
   * Ajustes rápidos:
   * - innerRadius: qué tanto "recortamos" (más pequeño = recorta más)
   * - zoom: agranda la imagen dentro del círculo (para que no se vea el aro externo)
   */
  const innerRadius = 0.33; // Ajustado para cubrir la parte negra
  const zoom = 1.8; // Agrandado para cubrir completamente el borde negro

  return (
    <div className="coinStage">
      <div
        className="coin"
        style={
          {
            ["--r" as any]: innerRadius,
            ["--z" as any]: zoom,
          } as React.CSSProperties
        }
      >
        {/* FRONT */}
        <div className="face front" />

        {/* BACK */}
        <div className="face back" />
      </div>

      <style jsx>{`
        .coinStage {
          width: 220px;
          height: 220px;
          perspective: 900px;
          display: grid;
          place-items: center;
        }

        .coin {
          width: 180px;
          height: 180px;
          position: relative;
          transform-style: preserve-3d;
          animation: spin 2.6s linear infinite;
        }

        .face {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
        }

        /* Recorte visual solo del círculo interno */
        .face::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 999px;

          /* Imagen como fondo */
          background-repeat: no-repeat;
          background-position: center;
          background-size: calc(var(--z) * 100%) calc(var(--z) * 100%);

          /* Mascara circular (solo círculo interno visible) */
          -webkit-mask-image: radial-gradient(
            circle at 50% 50%,
            #000 0 calc(var(--r) * 100%),
            transparent calc(var(--r) * 100% + 0.6%)
          );
          mask-image: radial-gradient(
            circle at 50% 50%,
            #000 0 calc(var(--r) * 100%),
            transparent calc(var(--r) * 100% + 0.6%)
          );
        }

        .front {
          transform: translateZ(1px);
        }
        .front::before {
          background-image: url("/assets/axis-front.jpeg");
        }

        .back {
          transform: rotateY(180deg) translateZ(1px);
        }
        .back::before {
          background-image: url("/assets/axis-back.jpeg");
        }

        @keyframes spin {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
}