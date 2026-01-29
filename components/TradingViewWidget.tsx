"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView?: any;
  }
}

export default function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const loadWidget = () => {
      if (!containerRef.current || !window.TradingView) return;

      new window.TradingView.widget({
        autosize: true,
        symbol: "NASDAQ:AAPL",
        interval: "15",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "es",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tv_container",
      });
    };

    const existingScript = document.getElementById("tradingview-widget-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "tradingview-widget-script";
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = loadWidget;
      document.body.appendChild(script);
    } else {
      loadWidget();
    }
  }, []);

  return (
    <div style={{ height: 520, border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
      <div id="tv_container" ref={containerRef} style={{ height: "100%" }} />
    </div>
  );
}
