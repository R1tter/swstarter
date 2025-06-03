type Stats = {
  topQueries: { query: string; count: number }[];
  updatedAt: Date | null;
};

let cache: Stats = {
  topQueries: [],
  updatedAt: null,
};

export function getStats(): Stats {
  return cache;
}

export function setStats(data: Stats) {
  cache = data;
}
