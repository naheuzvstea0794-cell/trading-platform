"use client";

import Image from "next/image";

export default function AxisCoin() {
  // Grosor del canto (px). Sube/baja este número si quieres más/menos grosor.
  const thickness = 18;

  return (
    <div className="coinStage">
      <div className="coin" style={{ ["--t" as any]: `${thickness}px` }}>
        {/* FRONT */}
        <div className="face front">
          <div className="imgWrap">
            <Image
              src="/axis-front.png"
              alt="AXIS front"
              fill
              priority
              sizes="180px"
              className="img"
            />
          </div>
        </div>

        {/* BACK */}
        <div className="face back">
          <div className="imgWrap">
            <Image
              src="/axis-back.png"
              alt="AXIS back"
              fill
              priority
              sizes="180px"
              className="img"
            />
          </div>
        </div>

        {/* EDGE (canto grueso) */}
        <div className="edge" />
      </div>

      <style jsx>{`
        .coinStage {
          width: 220px;
          height: 220px;
          perspective: 1000px;
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
          border-radius: 50%;
          overflow: hidden;
          backface-visibility: hidden;
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
        }

        /* Esto asegura que el fill de Next/Image tenga contenedor relativo */
        .imgWrap {
          position: relative;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        /* MUY IMPORTANTE: para que NO “dañe” el logo, lo mostramos completo y centrado */
        .img {
          object-fit: contain; /* mantiene el diseño original */
          object-position: center;
          filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.35));
        }

        .front {
          transform: translateZ(calc(var(--t) / 2));
        }

        .back {
          transform: rotateY(180deg) translateZ(calc(var(--t) / 2));
        }

        /* Un aro sutil encima (no altera tu logo, solo mejora presencia) */
        .face::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          pointer-events: none;
          box-shadow: inset 0 0 0 2px rgba(212, 175, 55, 0.28);
        }

        /* CANTO (GROSOR VISIBLE AL GIRAR) */
        .edge {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          width: var(--t);
          height: 100%;
          left: calc(50% - (var(--t) / 2));
          transform: rotateY(90deg);

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
