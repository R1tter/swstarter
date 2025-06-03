import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { query, type } = await req.json();

  if (!query || !type) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  try {
    await prisma.searchLog.create({
      data: { query, type },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[TRACK ERROR]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
