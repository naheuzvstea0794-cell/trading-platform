"use client";

import React from "react";

export default function AxisCoin() {
  const thickness = 40; // grosor (sube/baja aquí)
  const size = 260; // tamaño (sube/baja aquí)

  return (
    <div className="coinStage">
      <div
        className="coin"
        style={
          {
            ["--t" as any]: `${thickness}px`,
            ["--s" as any]: `${size}px`,
          } as any
        }
      >
        {/* FRONT */}
        <div className="face front" />

        {/* BACK */}
        <div className="face back" />

        {/* EDGE (un solo borde, pero sin “vacío”) */}
        <div className="edge" />
        <div className="edge2" />
      </div>

      <style jsx>{`
        .coinStage {
          width: 320px;
          height: 320px;
          perspective: 1200px;
          display: grid;
          place-items: center;
        }

        .coin {
          width: var(--s);
          height: var(--s);
          position: relative;
          transform-style: preserve-3d;
          animation: spin 3.2s linear infinite;
        }

        .face {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;

          /* clave: evita que se “vea” la otra cara y genere línea */
          backface-visibility: hidden;

          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
        }

        /* ✅ separo 0.6px para eliminar la línea del centro */
        .front {
          transform: translateZ(calc((var(--t) / 2) + 0.6px));
          background-image: url("/assets/axis-front.jpeg");
        }

        .back {
          transform: rotateY(180deg) translateZ(calc((var(--t) / 2) + 0.6px));
          background-image: url("/assets/axis-back.jpeg");
        }

        /* Borde oscuro grueso */
        .edge,
        .edge2 {
          position: absolute;
          top: 0;
          height: 100%;
          width: var(--t);
          left: calc(50% - (var(--t) / 2));
          border-radius: 999px;

          /* IMPORTANTE: que se vea por ambos lados (evita “barra vacía”) */
          backface-visibility: visible;

          /* borde oscuro con volumen */
          background: linear-gradient(
            to bottom,
            #050505 0%,
            #1a1a1a 22%,
            #0a0a0a 50%,
            #1a1a1a 78%,
            #050505 100%
          );
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.55),
            0 18px 60px rgba(0, 0, 0, 0.45);
        }

        /* Dos bordes cruzados (NO cilindro): evita que al girar se vea “hueco” */
        .edge {
          transform: rotateY(90deg) translateZ(0px);
        }
        .edge2 {
          transform: rotateY(90deg) rotateZ(90deg) translateZ(0px);
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
