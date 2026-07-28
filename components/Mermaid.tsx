
import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Clean the chart code from any common LLM formatting artifacts
  const cleanChart = (code: string) => {
    let cleaned = code.trim();
    if (cleaned.startsWith("```mermaid")) {
      cleaned = cleaned.replace("```mermaid", "");
    }
    if (cleaned.endsWith("```")) {
      cleaned = cleaned.slice(0, -3);
    }
    return cleaned.trim();
  };

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false, // We'll trigger it manually
      theme: "neutral",
      securityLevel: "loose",
      fontFamily: "Cairo, sans-serif",
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: "basis",
        nodeSpacing: 80,
        rankSpacing: 100,
        padding: 30,
      },
    });

    const renderChart = async () => {
      if (ref.current) {
        try {
          // Clear previous content to avoid duplicate rendering errors
          ref.current.innerHTML = cleanChart(chart);
          ref.current.removeAttribute("data-processed");
          
          // Re-render
          await mermaid.run({
            nodes: [ref.current],
          });
        } catch (err) {
          console.error("Mermaid rendering failed:", err);
          // Optional: Display a simple textual fallback if rendering fails completely
          if (ref.current) {
             ref.current.innerHTML = `<div class="p-4 text-amber-600 font-bold bg-amber-50 rounded-xl border border-amber-200 text-xs">تعذر عرض المخطط بشكل مرئي، يرجى مراجعة مبررات المواءمة أعلاه.</div>`;
          }
        }
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Scroll Indicator for Mobile */}
      <div className="md:hidden flex items-center gap-2 text-slate-400 font-bold text-[10px] animate-pulse">
        <span>← اسحب للعرض →</span>
      </div>

      <div className="w-full bg-slate-50/30 p-4 md:p-10 rounded-[2rem] border border-slate-100 shadow-inner overflow-x-auto overflow-y-hidden custom-scrollbar-v2 flex justify-center">
        <div 
          ref={ref} 
          className="mermaid min-w-[320px] md:min-w-[600px] flex justify-center py-4"
        >
          {cleanChart(chart)}
        </div>
      </div>
      
      <p className="text-slate-400 text-[10px] md:text-xs font-medium italic">
        * يتم توليد المخطط بناءً على العلاقة المنطقية بين المتغيرات.
      </p>
    </div>
  );
};

export default Mermaid;
