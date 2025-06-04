import PageHeader from '@/components/pageHeader';
import DetailLayout from '@/components/DetailLayout';
import React from 'react';

export const dynamic = 'force-dynamic';

// Tipos externos
interface Person {
  name: string;
  birth_year: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
}
interface FilmSummary {
  uid: string;
  url: string;
  properties?: {
    title?: string;
    characters?: string[];
  };
}

type Params = {
  params: {
    id: string;
  };
};

// Utilitário para buscar filmes do personagem
async function getPersonFilms(personId: string): Promise<{ id: string; title: string }[]> {
  const filmsRes = await fetch('https://www.swapi.tech/api/films');
  const filmsData = await filmsRes.json();
  if (!Array.isArray(filmsData.result)) return [];
  return filmsData.result
    .filter((film: FilmSummary) => film.properties?.characters?.some((url) => url.endsWith(`/people/${personId}`)))
    .map((film: FilmSummary) => ({
      id: film.uid,
      title: film.properties?.title || film.uid,
    }));
}

export default async function PersonDetails({ params }: Params) {
  const res = await fetch(`https://www.swapi.tech/api/people/${params.id}`);
  const data = await res.json();
  const person: Person | undefined = data.result?.properties;

  if (!person) return <div>Person not found.</div>;

  const details = (
    <ul className="text-sm">
      <li>Birth Year: {person.birth_year}</li>
      <li>Gender: {person.gender}</li>
      <li>Eye Color: {person.eye_color}</li>
      <li>Hair Color: {person.hair_color}</li>
      <li>Height: {person.height}</li>
      <li>Mass: {person.mass}</li>
    </ul>
  );

  // Busca filmes do personagem de forma isolada
  let movies: React.ReactNode = <span className="text-sm text-gray-500">No movies available.</span>;
  try {
    const films = await getPersonFilms(params.id);
    if (films.length > 0) {
      movies = (
        <ul className="text-sm">
          {films.map((film) => (
            <li key={film.id}>
              <a href={`/movies/${film.id}`} className="text-blue-600 underline hover:text-blue-800">
                {film.title}
              </a>
            </li>
          ))}
        </ul>
      );
    }
  } catch {
    // Silencia erros de rede
  }

  return (
    <div className="bg-[#ededed] min-h-screen flex flex-col items-center text-black">
      <PageHeader />
      <div className="flex flex-1 w-full justify-center items-start pt-[40px]">
        <DetailLayout
          title={person.name}
          leftTitle="Details"
          leftContent={details}
          rightTitle="Movies"
          rightContent={movies}
        />
      </div>
    </div>
  );
}
