"use client";

import React from "react";

export default function AxisCoin() {
  // SOLO esto controla lo gruesa que se ve al girar:
  const thickness = 22;

  return (
    <div className="coinStage">
      <div className="coin" style={{ ["--t" as any]: `${thickness}px` }}>
        {/* FRONT (TU DISEÑO ORIGINAL) */}
        <div className="face front">
          <div className="faceInner">
            <div className="mark">AXIS</div>
            <div className="sub">WORKSPACE</div>
          </div>
        </div>

        {/* BACK (TU DISEÑO ORIGINAL) */}
        <div className="face back">
          <div className="faceInner">
            <div className="mark">AXIS</div>
            <div className="sub">WORKSPACE</div>
          </div>
        </div>

        {/* SOLO AÑADIDO: EDGE / CANTO */}
        <div className="edge" />
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
          overflow: hidden;
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
          backface-visibility: hidden;
        }

        .front {
          transform: translateZ(calc(var(--t) / 2));
          background: radial-gradient(circle at 30% 30%, #ffefb0 0%, #d4af37 35%, #7a5b12 100%);
          border: 2px solid rgba(255, 220, 120, 0.45);
        }

        .back {
          transform: rotateY(180deg) translateZ(calc(var(--t) / 2));
          background: radial-gradient(circle at 30% 30%, #ffe7a1 0%, #caa030 35%, #6b4f10 100%);
          border: 2px solid rgba(255, 220, 120, 0.35);
        }

        .faceInner {
          position: absolute;
          inset: 10px;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.12));
          border: 1px solid rgba(0, 0, 0, 0.25);
          display: grid;
          place-items: center;
          text-align: center;
        }

        .mark {
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #0b0b0b;
          font-size: 34px;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.35);
        }

        .sub {
          margin-top: -6px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: rgba(0, 0, 0, 0.75);
          font-size: 12px;
        }

        /* ✅ SOLO ESTO ES LO NUEVO: CANTO GROSOR */
        .edge {
          position: absolute;
          inset: 0;
          border-radius: 999px;

          /* ancho del canto = thickness */
          width: var(--t);
          height: 100%;
          left: calc(50% - (var(--t) / 2));

          /* se pone de lado para que se vea el grosor al girar */
          transform: rotateY(90deg);

          /* color del canto (se ve metálico) */
          background: linear-gradient(
            to bottom,
            #3a2a08 0%,
            #d4af37 15%,
            #8a6516 30%,
            #f6e39b 50%,
            #8a6516 70%,
            #d4af37 85%,
            #3a2a08 100%
          );

          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.35);
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
