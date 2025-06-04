"use client";

import React from "react";
import { useSearch } from "../hooks/useSearch";
import ResultsList from "./ResultsList";

export default function SearchForm() {
  const {
    type,
    query,
    results,
    loading: isLoading,
    setType,
    setQuery,
    handleSearch,
  } = useSearch();

  const SEARCH_TYPES = ["people", "movies"] as const;

  const handleTypeChange = (option: "people" | "movies") => setType(option);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-[calc(100vh-45px)] p-2 md:p-0">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-5xl">
        <div className="bg-white border-2 border-gray-300 shadow-md rounded-md p-4 md:p-6 flex flex-col justify-between w-full md:w-[410px] h-auto md:h-[250px] mb-4 md:mb-0">
          <p className="text-base text-black font-medium mb-3">
            What are you searching for?
          </p>
          <div className="flex items-center font-bold gap-4 mb-3 text-base text-black">
            {SEARCH_TYPES.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value={option}
                  checked={type === option}
                  onChange={() => handleTypeChange(option)}
                  className="accent-blue-500 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white cursor-pointer"
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            ))}
          </div>

          <input
            className="w-full px-3 py-2 text-base font-bold border-2 border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-green-teal text-black"
            placeholder={
              type === "people"
                ? "e.g. Chewbacca, Yoda, Boba Fett"
                : "e.g. Return of the Jedi"
            }
            value={query}
            onChange={handleInputChange}
            aria-label={`Search ${type}`}
          />

          <button
            onClick={handleSearch}
            disabled={!query.trim() || isLoading}
            className={`w-full py-2 text-base font-bold rounded-full transition ${
              !query.trim()
                ? "bg-gray-300 text-white cursor-not-allowed"
                : "bg-green-500 text-white"
            }`}
          >
            {isLoading ? "Searching..." : "SEARCH"}
          </button>
        </div>

        <div className="bg-white border-2 border-gray-300 shadow-2xl rounded-md p-4 md:p-6 flex flex-col w-full md:w-[650px] h-auto md:h-[650px]">
          <h2 className="text-lg font-bold mb-2 text-gray-900">Results</h2>
          <hr className="mb-2 border-gray-300" />
          <ResultsList results={results} isLoading={isLoading} type={type} />
        </div>
      </div>
    </div>
  );
}
