"use client";

export default function AxisCoin() {
  // SOLO cambia este número para más/menos grosor
  const thickness = 18;

  return (
    <div className="coinStage">
      <div className="coin" style={{ ["--t" as any]: `${thickness}px` }}>
        {/* FRONT */}
        <div className="face front">
          <img className="img" src="/assets/axis-front.jpeg" alt="AXIS front" />
        </div>

        {/* BACK */}
        <div className="face back">
          <img className="img" src="/assets/axis-back.jpeg" alt="AXIS back" />
        </div>

        {/* EDGE / CANTO */}
        <div className="edge" />
      </div>

      <style jsx>{`
        .coinStage {
          width: 220px;
          height: 220px;
          perspective: 1100px;
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
          overflow: hidden;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
          z-index: 2;
          background: #0b0f14;
        }

        .front {
          transform: translateZ(calc(var(--t) / 2));
        }

        .back {
          transform: rotateY(180deg) translateZ(calc(var(--t) / 2));
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        /* CANTO */
        .edge {
          position: absolute;
          inset: 0;
          border-radius: 999px;

          width: var(--t);
          height: 100%;
          left: calc(50% - (var(--t) / 2));
          transform: rotateY(90deg);
          z-index: 1;

          background: linear-gradient(
            to bottom,
            #2a1f07 0%,
            #d4af37 15%,
            #8a6516 30%,
            #f6e39b 50%,
            #8a6516 70%,
            #d4af37 85%,
            #2a1f07 100%
          );

          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.35);
          filter: drop-shadow(0 10px 16px rgba(0, 0, 0, 0.35));
        }

        /* aro sutil para que se vea premium pero NO tapa el logo */
        .face::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 999px;
          pointer-events: none;
          box-shadow: inset 0 0 0 2px rgba(212, 175, 55, 0.18);
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
