'use client';

import { useState } from 'react';
import ResultsList from './ResultsList';

type ResultItem = {
  uid: string;
  name: string;
  url: string;
  properties?: {
    name?: string;
  };
};

export default function SearchForm() {
  const [type, setType] = useState<'people' | 'movies'>('people');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(`/api/search?type=${type}&query=${query}`);
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

      // 🔄 Registrar a busca para estatísticas
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, type }),
      });

    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-[15px] mt-[40px] w-full max-w-[720px] mx-auto">
      {/* Formulário de busca */}
      <div className="bg-white p-[15px] rounded-[2px] shadow-md w-[205px] h-[115px] border border-[#dadada]">
        <div className="mb-2 text-sm text-gray-900 font-medium">
          What are you searching for?
        </div>
        <div className="flex items-center gap-3 mb-2 text-sm">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="type"
              value="people"
              checked={type === 'people'}
              onChange={() => setType('people')}
            />
            People
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="type"
              value="movies"
              checked={type === 'movies'}
              onChange={() => setType('movies')}
            />
            Movies
          </label>
        </div>

        <input
          className="w-full px-2 py-[5px] text-sm border border-[#dadada] rounded-[2px] mb-[10px]"
          placeholder={
            type === 'people'
              ? 'e.g. Chewbacca, Yoda, Boba Fett'
              : 'e.g. Return of the Jedi'
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={handleSearch}
          disabled={!query.trim() || loading}
          className={`w-full py-[6px] text-sm font-bold rounded-full transition ${
            !query.trim()
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {loading ? 'Searching...' : 'SEARCH'}
        </button>
      </div>

      {/* Resultados */}
      <div className="bg-white rounded-[2px] shadow-md p-[15px] w-[291px] h-[291px] border border-[#dadada]">
        <h2 className="text-sm font-semibold mb-2 text-gray-900">Results</h2>
        <hr className="mb-2 border-gray-300" />
        <ResultsList results={results} />
      </div>
    </div>
  );
}
