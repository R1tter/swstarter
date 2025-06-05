import React from "react";
import { TopQuery } from "@/hooks/useStats";

export default function PieChart({ data }: { data: TopQuery[] }) {
  const colors = ["#2563eb", "#22d3ee", "#f59e42", "#f43f5e", "#a78bfa"];
  let acc = 0;
  const slices = data.map((q, i) => {
    const start = (acc / 100) * 2 * Math.PI;
    const end = ((acc + q.percentage) / 100) * 2 * Math.PI;
    acc += q.percentage;
    const x1 = 100 + 100 * Math.sin(start);
    const y1 = 100 - 100 * Math.cos(start);
    const x2 = 100 + 100 * Math.sin(end);
    const y2 = 100 - 100 * Math.cos(end);
    const largeArc = q.percentage > 50 ? 1 : 0;
    const d = `M100,100 L${x1},${y1} A100,100 0 ${largeArc} 1 ${x2},${y2} Z`;
    return (
      <path
        key={q.query}
        d={d}
        fill={colors[i % colors.length]}
        stroke="#fff"
        strokeWidth={2}
        className="cursor-pointer"
      >
        <title>{`${q.query}: ${q.count} (${q.percentage}%)`}</title>
      </path>
    );
  });
  return (
    <svg viewBox="0 0 200 200" width={220} height={220} className="mx-auto">
      {slices}
    </svg>
  );
}
