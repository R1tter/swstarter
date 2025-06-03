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

    return NextResponse.json({ results: data.result || [] });
  } catch (err) {
    console.error('SWAPI.tech fetch error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
