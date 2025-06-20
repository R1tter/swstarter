"use client";

import Link from "next/link";
import type { ResultItem } from "@/hooks/useSearch";

type ResultsListProps = {
  results: ResultItem[];
  type?: "people" | "movies";
  isLoading?: boolean;
};

export default function ResultsList({
  results,
  isLoading,
  type,
}: ResultsListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full min-h-[180px]">
        <span className="text-gray-300 font-bold text-center text-lg">
          Searching...
        </span>
      </div>
    );
  }
  if (!results || results.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full min-h-[180px]">
        <span className="text-gray-300 font-bold text-center text-lg">
          No results found.
          <br />
          Use the form to search for People or Movies.
        </span>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-300 flex-1 overflow-y-auto pr-2 min-h-0 max-h-full">
      {results.map((item) => {
        const id = item.uid;
        const url = item.url || "";
        const itemType: "people" | "movies" =
          type || (url.includes("/films/") ? "movies" : "people");
        const name = item.name || item.properties?.name || "Unnamed";

        return (
          <li
            key={id}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4 px-0 py-2 min-h-[44px]"
          >
            <span
              className="text-gray-800 font-bold truncate max-w-full sm:max-w-[60%] text-base sm:text-[17px] mb-2 sm:mb-0"
              title={name}
            >
              {name}
            </span>
            <Link
              href={`/${itemType}/${id}`}
              className="flex-shrink-0 bg-green-500 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-green-600 transition text-[15px] font-bold min-w-full sm:min-w-[120px] text-center block cursor-pointer sm:ml-auto sm:mt-0 mt-2"
            >
              VIEW DETAILS
            </Link>
          </li>
        );
      })}
      <hr className="border-t border-gray-200" />
    </ul>
  );
}
