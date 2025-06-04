'use client';

import React from 'react';
import { useSearch } from '../hooks/useSearch';
import ResultsList from './ResultsList';

export default function SearchForm() {
  const {
    type,
    query,
    results,
    loading,
    setType,
    setQuery,
    handleSearch,
  } = useSearch();

  // Handlers
  const handleTypeChange = (option: 'people' | 'movies') => setType(option);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-45px)]">
      <div className="flex gap-8">
        {/* Search Container */}
        <div className="bg-gray-50 border-2 border-gray-300 shadow-md rounded-md p-6 flex flex-col justify-between w-[410px] h-[250px]">
          <p className="text-base text-black font-medium mb-2">
            What are you searching for?
          </p>
          <div className="flex items-center font-bold gap-4 mb-3 text-base text-black">
            {(['people', 'movies'] as const).map((option) => (
              <label key={option} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="type"
                  value={option}
                  checked={type === option}
                  onChange={() => handleTypeChange(option)}
                  className="#0094ff"
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            ))}
          </div>

          <input
            className="w-full px-3 py-2 text-base font-bold border-2 border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-teal text-black"
            placeholder={
              type === 'people'
                ? 'e.g. Chewbacca, Yoda, Boba Fett'
                : 'e.g. Return of the Jedi'
            }
            value={query}
            onChange={handleInputChange}
            aria-label={`Search ${type}`}
          />

          <button
            onClick={handleSearch}
            disabled={!query.trim() || loading}
            className={`w-full py-2 text-base font-bold rounded-full transition mt-auto ${
              !query.trim()
                ? 'bg-gray-300 text-white cursor-not-allowed'
                : 'bg-green-500 text-white'
            }`}
            style={{ background: !query.trim() ? undefined : undefined }}
          >
            {loading ? 'Searching...' : 'SEARCH'}
          </button>
        </div>

        {/* Results Container */}
        <div className="bg-white border-2 border-gray-300 shadow-2xl rounded-md p-6 flex flex-col w-[650px] h-[650px]">
          <h2 className="text-lg font-bold mb-2 text-gray-900">Results</h2>
          <hr className="mb-2 border-gray-300" />
          <ResultsList results={results} loading={loading} type={type} />
        </div>
      </div>
    </div>
  );
}
