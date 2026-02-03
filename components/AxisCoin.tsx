"use client";

export default function AxisCoin() {
  return (
    <div className="coinStage">
      <div className="coin">
        {/* FRONT */}
        <div className="face front">
          <img
            className="img"
            src="/assets/axis-front.jpeg"
            alt="AXIS front"
          />
        </div>

        {/* BACK */}
        <div className="face back">
          <img
            className="img"
            src="/assets/axis-back.jpeg"
            alt="AXIS back"
          />
        </div>
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
          overflow: hidden;
          backface-visibility: hidden;
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
        }

        .front {
          transform: translateZ(1px);
        }

        .back {
          transform: rotateY(180deg) translateZ(1px);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
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
