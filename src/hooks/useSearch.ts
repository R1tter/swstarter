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
      // Corrige o tipo para a API
      const apiType = type === 'movies' ? 'films' : type;
      const res = await fetch(`/api/search?type=${apiType}&query=${query}`);
      const raw = await res.json();

      const parsedResults = (raw.results || []).map((r: unknown) => {
        const item = r as ResultItem & { properties?: { name?: string } };
        return {
          uid: item.uid,
          url: item.url || '',
          name: item.name || item.properties?.name || 'Unnamed',
        };
      });

      setResults(parsedResults);
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, type }),
      });
    } catch (error) {
      console.error('Search error:', error);
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
