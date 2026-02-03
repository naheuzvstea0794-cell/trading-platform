"use client";

import Image from "next/image";

export default function AxisCoin() {
  // Grosor del canto (sube/baja este número si quieres más o menos)
  const thickness = 18;

  return (
    <div className="coinStage">
      <div className="coin" style={{ ["--t" as any]: `${thickness}px` }}>
        {/* FRONT */}
        <div className="face front">
          <Image
            src="/axis-front.png"
            alt="AXIS front"
            fill
            className="img"
            priority
          />
        </div>

        {/* BACK */}
        <div className="face back">
          <Image
            src="/axis-back.png"
            alt="AXIS back"
            fill
            className="img"
            priority
          />
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
        }

        .front {
          transform: translateZ(calc(var(--t) / 2));
        }

        .back {
          transform: rotateY(180deg) translateZ(calc(var(--t) / 2));
        }

        .img {
          object-fit: contain;
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
