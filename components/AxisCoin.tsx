"use client";

export default function AxisCoin() {
  const stageSize = 300; // 👈 contenedor grande (como antes)
  const coinSize = 260;  // 👈 moneda grande
  const thickness = 22;  // 👈 grosor real
  const slices = 32;     // 👈 capas para volumen real

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

        {/* CANTO OSCURO Y GRUESO */}
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
          width: ${stageSize}px;
          height: ${stageSize}px;
          perspective: 1600px;
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
          background: #0b0f14;
          box-shadow: 0 26px 80px rgba(0, 0, 0, 0.65);
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

        /* CANTO OSCURO (NO DORADO, NO PLANO) */
        .edgeSlice {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(
            to right,
            #050608,
            #111318,
            #1c1f26,
            #0a0c10
          );
          box-shadow:
            inset 0 0 8px rgba(0, 0, 0, 0.6),
            inset 0 0 2px rgba(255, 255, 255, 0.04);
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
