'use client';

import Link from 'next/link';

type ResultItem = {
  uid: string;
  name?: string;
  url: string;
};

type ResultsListProps = {
  results: ResultItem[];
};

export default function ResultsList({ results }: ResultsListProps) {
  if (!results || results.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        There are zero matches.
        <br />
        Use the form to search for People or Movies.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-300">
      {results.map((item) => {
        const id = item.uid;
        const url = item.url || '';
        const isFilm = url.includes('/films/');
        const type = isFilm ? 'movies' : 'people';
        const name = item.name || 'Unnamed';

        return (
          <li key={id} className="flex justify-between items-center px-4 py-2">
            <span className="text-gray-800 font-medium">{name}</span>
            <Link href={`/${type}/${id}`}>
              <button className="bg-green-500 text-white px-4 py-1 rounded-full hover:bg-green-600 transition">
                SEE DETAILS
              </button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
