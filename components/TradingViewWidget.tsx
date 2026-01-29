"use client";

export default function TradingViewWidget() {
  // Cambia el símbolo aquí si quieres (ej: OANDA:XAUUSD)
  const symbol = encodeURIComponent("OANDA:XAUUSD");

  const src =
    `https://s.tradingview.com/widgetembed/?` +
    `symbol=${symbol}` +
    `&interval=15` +
    `&hidesidetoolbar=0` +
    `&symboledit=1` +
    `&saveimage=0` +
    `&toolbarbg=f1f3f6` +
    `&studies=%5B%5D` +
    `&theme=light` +
    `&style=1` +
    `&timezone=Etc%2FUTC` +
    `&locale=es` +
    `&enable_publishing=0`;

  return (
    <div style={{ height: 600, border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
      <iframe
        src={src}
        style={{ width: "100%", height: "100%", border: 0 }}
        allowFullScreen
      />
    </div>
  );
}
