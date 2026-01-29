"use client";

export default function AxisCoin() {
  return (
    <div className="coinWrap">
      <div className="coin">
        <div className="side front" />
        <div className="side back" />
      </div>

      <style jsx>{`
        .coinWrap {
          width: 320px;
          height: 320px;
          perspective: 1200px;
          display: grid;
          place-items: center;
        }

        .coin {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: spin 3.8s linear infinite;
        }

        .side {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          overflow: hidden;
          backface-visibility: hidden;
          border: 1px solid rgba(212, 175, 55, 0.45);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
          background-size: cover;
          background-position: center;
        }

        .front {
          background-image: url("/assets/axis-front.jpeg");
          transform: rotateY(0deg) translateZ(8px);
        }

        .back {
          background-image: url("/assets/axis-back.jpeg");
          transform: rotateY(180deg) translateZ(8px);
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
