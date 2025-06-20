import { useState } from 'react';

export type ResultItem = {
  uid: string;
  name: string;
  url: string;
  properties?: {
    name?: string;
  };
};

export function useSearch() {
  const [type, setType] = useState<'people' | 'movies'>('people');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      // Normalize the type for the API
      const apiType = type === 'movies' ? 'films' : type;
      const res = await fetch(`/api/search?type=${apiType}&query=${encodeURIComponent(query)}`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch results.');
      }
      const raw = await res.json();

      type RawResult = {
        uid?: string;
        name?: string;
        url?: string;
        properties?: {
          name?: string;
        };
      };
      const parsedResults = (raw.results || []).map((r: RawResult) => ({
        uid: r.uid ?? '',
        url: r.url ?? '',
        name: r.name || r.properties?.name || 'Unnamed',
      }));

      setResults(parsedResults);
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, type }),
      });
    } catch (error) {
      console.error('Search error:', error);
      if (error instanceof Error) {
        alert(error.message || 'Failed to fetch results.');
      } else {
        alert('Failed to fetch results.');
      }
    } finally {
      setLoading(false);
      setQuery('');
    }
  };

  return {
    type,
    query,
    results,
    loading,
    setType,
    setQuery,
    handleSearch,
  };
}
