import { useCallback, useEffect, useState } from "react";

export interface TopQuery {
  query: string;
  count: number;
  percentage: number;
}

export interface Stats {
  topQueries: TopQuery[];
  updatedAt: string | null;
}

export function useStats() {
  const [data, setData] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/stats");
    setData(await res.json());
    setLoading(false);
  }, []);

  const refreshStats = useCallback(async () => {
    setRefreshing(true);
    await fetch("/api/stats/refresh", { method: "POST" });
    await fetchStats();
    setRefreshing(false);
  }, [fetchStats]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { data, loading, refreshing, refreshStats };
}
