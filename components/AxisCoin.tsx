"use client";

import Image from "next/image";

export default function AxisCoin() {
  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <div className="coinWrap">
        <div className="coin">
          {/* Frente */}
          <div className="side front">
            <Image
              src="/assets/axis-front.jpg"
              alt="AXIS Workspace Logo"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Reverso */}
          <div className="side back">
            <Image
              src="/assets/axis-back.jpg"
              alt="AXIS Workspace Coin"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .coinWrap {
          width: 320px;
          height: 320px;
          perspective: 1200px;
        }

        .coin {
          position: relative;
          width: 100%;
          height: 100%;
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
        }

        .front {
          transform: rotateY(0deg) translateZ(8px);
        }

        .back {
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