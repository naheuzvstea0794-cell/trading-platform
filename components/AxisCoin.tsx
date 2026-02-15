"use client";

import React from "react";

export default function AxisCoin() {
  const size = 260;       // tamaño del “área” donde vive la moneda
  const coinSize = 180;   // tamaño REAL del círculo (solo el círculo interno)
  const thickness = 34;   // grosor del borde cuando gira (oscuro)

  return (
    <div
      className="stage"
      style={
        {
          ["--stage" as any]: `${size}px`,
          ["--coin" as any]: `${coinSize}px`,
          ["--t" as any]: `${thickness}px`,
        } as any
      }
    >
      <div className="coin">
        {/* FRONT (recortado: solo círculo interno) */}
        <div className="face front" />

        {/* BACK (recortado: solo círculo interno) */}
        <div className="face back" />

        {/* EDGE: UNA SOLA PIEZA (sin “palo”) */}
        <div className="edge" />
      </div>

      <style jsx>{`
        .stage {
          width: var(--stage);
          height: var(--stage);
          display: grid;
          place-items: center;
          perspective: 1200px;
        }

        .coin {
          width: var(--coin);
          height: var(--coin);
          position: relative;
          transform-style: preserve-3d;
          animation: spin 3.2s linear infinite;
        }

        .face {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          overflow: hidden;

          /* evita artefactos */
          backface-visibility: hidden;

          /* solo círculo interno (recorte real) */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;

          box-shadow: 0 26px 70px rgba(0, 0, 0, 0.55);
        }

        /* ✅ separo un poquito para eliminar “línea”/costura */
        .front {
          transform: translateZ(calc((var(--t) / 2) + 0.6px));
          background-image: url("/assets/axis-front.jpeg");
        }

        .back {
          transform: rotateY(180deg) translateZ(calc((var(--t) / 2) + 0.6px));
          background-image: url("/assets/axis-back.jpeg");
        }

        /* ✅ borde grueso oscuro SOLO cuando está de lado */
        .edge {
          position: absolute;
          top: 0;
          height: 100%;
          width: var(--t);
          left: calc(50% - (var(--t) / 2));
          border-radius: 999px;

          transform: rotateY(90deg);

          /* borde oscuro con “volumen” */
          background: linear-gradient(
            to bottom,
            #050505 0%,
            #171717 18%,
            #070707 50%,
            #171717 82%,
            #050505 100%
          );

          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6),
            0 18px 60px rgba(0, 0, 0, 0.45);
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
