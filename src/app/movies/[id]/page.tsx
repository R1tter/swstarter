import DetailLayout from '@/components/DetailLayout';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type Params = {
  params: {
    id: string;
  };
};

type FilmResult = {
  uid: string;
  title: string;
  url: string;
  properties?: {
    title?: string;
    opening_crawl?: string;
    characters?: string[];
  };
};

type Character = { id: string; name: string };

async function fetchCharacterName(url: string): Promise<Character> {
  const idMatch = url.match(/people\/(\d+)/);
  const id = idMatch ? idMatch[1] : '';
  try {
    const res = await fetch(url);
    const data = await res.json();
    return { id, name: data.result?.properties?.name || id };
  } catch {
    return { id, name: id };
  }
}

export default async function MovieDetails({ params }: Params) {
  const res = await fetch(`https://www.swapi.tech/api/films/${params.id}`);
  const data = await res.json();
  const film: FilmResult = data.result;

  if (!film) return <div>Movie not found.</div>;

  const openingCrawl = (
    <p className="text-sm whitespace-pre-line">{film.properties?.opening_crawl || ''}</p>
  );

  let characterList: React.ReactNode = <span className="text-sm text-gray-500">No characters available.</span>;
  if (film.properties?.characters && film.properties.characters.length > 0) {
    const characterPromises = film.properties.characters.map(fetchCharacterName);
    const characters = await Promise.all(characterPromises);
    characterList = (
      <span className="text-sm">
        {characters.map((char, idx) => (
          <span key={char.id}>
            <Link
              href={`/people/${char.id}`}
              className="text-blue-600 underline hover:text-blue-800"
            >
              {char.name}
            </Link>
            {idx < characters.length - 1 && ', '}
          </span>
        ))}
      </span>
    );
  }

  // O título correto do filme está em film.properties?.title
  const movieTitle = film.properties?.title || film.title;

  return (
    <div className="bg-[#ededed] min-h-screen flex flex-col items-center text-black">
      <div className="flex flex-1 w-full justify-center items-start pt-[40px]">
        <DetailLayout
          title={movieTitle}
          leftTitle="Opening Crawl"
          leftContent={openingCrawl}
          rightTitle="Characters"
          rightContent={characterList}
        />
      </div>
    </div>
  );
}
