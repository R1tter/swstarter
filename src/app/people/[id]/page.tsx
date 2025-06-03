import BackButton from '@/components/BackButton';
import PageHeader from '@/components/pageHeader';

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

  return (
    <div className="bg-[#ededed] min-h-screen flex flex-col items-center">
      <PageHeader />
      <div className="flex flex-1 w-full justify-center items-start pt-[40px]">
        <div className="bg-white border border-blue-300 rounded-md shadow p-8 w-full max-w-[900px] min-h-[450px] flex flex-col">
          <div className="mb-6">
            <h1 className="text-xl font-bold mb-4">{person.name}</h1>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-start">
              <div className="w-full md:w-1/2 flex flex-col">
                <h2 className="text-base font-semibold mb-2">Details</h2>
                <hr className="mb-2 border-[#ededed]" />
                <ul className="text-sm">
                  <li>Birth Year: {person.birth_year}</li>
                  <li>Gender: {person.gender}</li>
                  <li>Eye Color: {person.eye_color}</li>
                  <li>Hair Color: {person.hair_color}</li>
                  <li>Height: {person.height}</li>
                  <li>Mass: {person.mass}</li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 flex flex-col">
                <h2 className="text-base font-semibold mb-2">Movies</h2>
                <hr className="mb-2 border-[#ededed]" />
                {/* Aqui você pode renderizar os filmes se tiver essa informação */}
              </div>
            </div>
          </div>
          <div className="flex justify-start mt-auto">
            <BackButton />
          </div>
        </div>
      </div>
    </div>
  );
}
