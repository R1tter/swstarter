// Utility functions for computing statistics
export interface TopQuery {
  query: string;
  count: number;
  percentage: number;
}

// Compute the most frequent queries
export function computeTopQueries(logs: { query: string }[]): TopQuery[] {
  const counter = new Map<string, number>();

  logs.forEach((log) => {
    const key = log.query.toLowerCase().trim();
    counter.set(key, (counter.get(key) || 0) + 1);
  });

  const total = logs.length;
  return Array.from(counter.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([query, count]) => ({
      query,
      count,
      percentage: total > 0 ? Number(((count / total) * 100).toFixed(2)) : 0,
    }));
}
