export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const query = searchParams.get('query');

  // Ensure the provided type is supported
  const validTypes = ['people', 'films'];
  if (!type || !query || !validTypes.includes(type)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Map the correct search parameter
  const paramMap: Record<string, string> = {
    people: 'name',
    films: 'title',
  };

  const param = paramMap[type];
  const url = `https://www.swapi.tech/api/${type}?${param}=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`SWAPI.tech returned ${response.status}`);
    }

    const data = await response.json();

    // Normalize films for consistent output
    let results: { uid: string; name: string; url: string }[] = [];

    if (type === 'films') {
      // Fetch all films and filter manually by partial title
      const allFilmsRes = await fetch('https://www.swapi.tech/api/films');
      const allFilmsData = await allFilmsRes.json();
      if (Array.isArray(allFilmsData.result)) {
        results = allFilmsData.result
          .filter((film: unknown): film is { uid: string; url: string; title?: string; properties?: { title?: string } } => {
            if (typeof film !== 'object' || film === null) return false;
            const f = film as { title?: string; properties?: { title?: string } };
            const title = f.title || f.properties?.title || '';
            return typeof title === 'string' && title.toLowerCase().includes(query.toLowerCase());
          })
          .map((film: { uid: string; url: string; title?: string; properties?: { title?: string } }) => {
            const title = film.title || film.properties?.title || 'Unnamed';
            return {
              uid: film.uid,
              name: title,
              url: film.url,
            };
          });
      }
      return NextResponse.json({ results });
    }

    // For people keep the API result as is
    return NextResponse.json({ results: data.result || [] });
  } catch (err) {
    console.error('SWAPI.tech fetch error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
