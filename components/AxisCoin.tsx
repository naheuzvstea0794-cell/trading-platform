"use client";

export default function AxisCoin() {
  const size = 240;      // 👈 tamaño total (ANTES estaba más grande)
  const coinSize = 200; // 👈 tamaño real de la moneda
  const thickness = 20; // 👈 grosor real
  const slices = 28;    // 👈 capas del canto (volumen)

  return (
    <div className="coinStage">
      <div className="coin">
        {/* FRONT */}
        <div className="face front">
          <img src="/assets/axis-front.jpeg" alt="AXIS front" />
        </div>

        {/* BACK */}
        <div className="face back">
          <img src="/assets/axis-back.jpeg" alt="AXIS back" />
        </div>

        {/* CANTO VOLUMÉTRICO */}
        {Array.from({ length: slices }).map((_, i) => {
          const z = -thickness / 2 + (i * thickness) / slices;
          return (
            <div
              key={i}
              className="edgeSlice"
              style={{ transform: `translateZ(${z}px)` }}
            />
          );
        })}
      </div>

      <style jsx>{`
        .coinStage {
          width: ${size}px;
          height: ${size}px;
          perspective: 1400px;
          display: grid;
          place-items: center;
        }

        .coin {
          width: ${coinSize}px;
          height: ${coinSize}px;
          position: relative;
          transform-style: preserve-3d;
          animation: spin 3s linear infinite;
        }

        .face {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          overflow: hidden;
          backface-visibility: hidden;
          box-shadow: 0 22px 70px rgba(0, 0, 0, 0.6);
          background: #0b0f14;
          z-index: 10;
        }

        .front {
          transform: translateZ(${thickness / 2}px);
        }

        .back {
          transform: rotateY(180deg)
            translateZ(${thickness / 2}px);
        }

        .face img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        /* CANTO CON VOLUMEN (NO PLANO) */
        .edgeSlice {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(
            to right,
            #2a1f07,
            #d4af37,
            #f6e39b,
            #8a6516
          );
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.35);
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
