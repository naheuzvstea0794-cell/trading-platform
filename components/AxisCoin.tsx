"use client";

import React from "react";

export default function AxisCoin() {
  const thickness = 40; // grosor
  const size = 260; // tamaño moneda (antes estaba más grande)
  const segments = 72; // más segmentos = canto más sólido

  // radio del cilindro (aprox)
  const radius = size / 2;

  return (
    <div className="coinStage">
      <div
        className="coin"
        style={
          {
            ["--t" as any]: `${thickness}px`,
            ["--s" as any]: `${size}px`,
            ["--r" as any]: `${radius}px`,
          } as any
        }
      >
        {/* FRONT */}
        <div className="face front" />

        {/* BACK */}
        <div className="face back" />

        {/* EDGE (cilindro con tiras) */}
        <div className="edgeWrap" aria-hidden="true">
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className="edgeSeg"
              style={
                {
                  ["--i" as any]: i,
                  ["--n" as any]: segments,
                } as any
              }
            />
          ))}
        </div>
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
          animation: spin 3.5s linear infinite;
        }

        .face {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          overflow: hidden;
          backface-visibility: hidden;
          transform-style: preserve-3d;

          /* recorte visual: “solo círculo interno” */
          background-size: 180%;
          background-position: center;
          background-repeat: no-repeat;

          /* ayuda a esconder “seams” */
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
          outline: 1px solid rgba(0, 0, 0, 0.18);
        }

        /* ✅ separo un poquito para evitar la línea (z-fighting) */
        .front {
          transform: translateZ(calc((var(--t) / 2) + 0.6px));
          background-image: url("/assets/axis-front.jpeg");
        }

        .back {
          transform: rotateY(180deg) translateZ(calc((var(--t) / 2) + 0.6px));
          background-image: url("/assets/axis-back.jpeg");
        }

        .edgeWrap {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
        }

        /* cada tira del canto */
        .edgeSeg {
          position: absolute;
          top: 0;
          left: 50%;
          height: 100%;
          width: 6px; /* grosor visual del canto */
          transform-style: preserve-3d;

          /* cilindro */
          transform:
            rotateY(calc((360deg / var(--n)) * var(--i)))
            translateZ(calc(var(--r) - 3px))
            translateX(-50%);

          /* canto oscuro */
          background: linear-gradient(
            to bottom,
            #0b0b0b 0%,
            #1a1a1a 22%,
            #050505 50%,
            #1a1a1a 78%,
            #0b0b0b 100%
          );

          /* suaviza el “vacío/barra” */
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.55);
          opacity: 0.98;
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
