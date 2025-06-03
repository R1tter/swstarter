import PageHeader from '@/components/pageHeader';
import DetailLayout from '@/components/DetailLayout';

export const dynamic = 'force-dynamic';

type Params = {
  params: {
    id: string;
  };
};

export default async function PersonDetails({ params }: Params) {
  const res = await fetch(`https://www.swapi.tech/api/people/${params.id}`);
  const data = await res.json();
  const person = data.result?.properties;

  if (!person) return <div>Person not found.</div>;

  // Monta o conteúdo dos detalhes
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

  // Busca todos os filmes e filtra os que contêm este personagem
  let movies = <span className="text-sm text-gray-500">No movies available.</span>;
  try {
    const filmsRes = await fetch('https://www.swapi.tech/api/films');
    const filmsData = await filmsRes.json();
    if (Array.isArray(filmsData.result)) {
      type FilmSummary = { uid: string; url: string; properties?: { title?: string; characters?: string[] } };
      const films: { id: string; title: string }[] = filmsData.result.filter((film: FilmSummary) => {
        return film.properties?.characters?.some((url: string) => url.endsWith(`/people/${params.id}`));
      }).map((film: FilmSummary) => ({
        id: film.uid,
        title: film.properties?.title || film.uid,
      }));
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
    }
  } catch {}

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
