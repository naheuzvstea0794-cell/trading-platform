"use client";

import React from "react";

export default function AxisCoin() {
  const thickness = 40; // grosor lateral

  return (
    <div className="coinStage">
      <div className="coin" style={{ ["--t" as any]: `${thickness}px` }}>
        {/* FRONT */}
        <div className="face front" />
        {/* BACK */}
        <div className="face back" />
        {/* EDGE */}
        <div className="edge" />
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
          width: 260px;
          height: 260px;
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
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);

          /* 🔥 recorte visual: “solo círculo interno” */
          background-size: 180%;
          background-position: center;
          background-repeat: no-repeat;
          background-color: transparent;
        }

        .front {
          transform: translateZ(calc(var(--t) / 2));
          background-image: url("/assets/axis-front.jpeg");
        }

        .back {
          transform: rotateY(180deg) translateZ(calc(var(--t) / 2));
          background-image: url("/assets/axis-back.jpeg");
        }

        /* Lateral oscuro */
        .edge {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          transform: rotateY(90deg);
          width: var(--t);
          height: 100%;
          left: calc(50% - (var(--t) / 2));
          background: linear-gradient(
            to bottom,
            #0f0f0f 0%,
            #1c1c1c 20%,
            #000 50%,
            #1c1c1c 80%,
            #0f0f0f 100%
          );
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.8);
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
