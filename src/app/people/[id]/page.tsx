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
    <div className="min-h-screen bg-[#f2f2f2] flex flex-col items-center justify-center text-gray-800">
      <div className="bg-white rounded shadow p-6 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">{person.name}</h1>
        <h2 className="text-lg font-semibold mb-2">Details</h2>
        <ul className="text-sm">
          <li><strong>Birth Year:</strong> {person.birth_year}</li>
          <li><strong>Gender:</strong> {person.gender}</li>
          <li><strong>Eye Color:</strong> {person.eye_color}</li>
          <li><strong>Hair Color:</strong> {person.hair_color}</li>
          <li><strong>Height:</strong> {person.height}</li>
          <li><strong>Mass:</strong> {person.mass}</li>
        </ul>
        <button
          onClick={() => history.back()}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full"
        >
          BACK TO SEARCH
        </button>
      </div>
    </div>
  );
}
