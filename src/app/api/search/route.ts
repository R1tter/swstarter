export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const query = searchParams.get('query');

  // Garantir que o tipo seja suportado
  const validTypes = ['people', 'films'];
  if (!type || !query || !validTypes.includes(type)) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
  }

  // Mapear o tipo de parâmetro de busca correto
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

    // Ajuste para filmes: garantir formato compatível
    let results: { uid: string; name: string; url: string }[] = [];

    if (type === 'films') {
      // Busca todos os filmes e filtra manualmente pelo título (busca parcial)
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

    // Para people, mantém o formato atual
    return NextResponse.json({ results: data.result || [] });
  } catch (err) {
    console.error('SWAPI.tech fetch error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
