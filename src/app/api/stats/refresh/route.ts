import prisma from '@/lib/prisma';
import { setStats } from '@/lib/statsCache';
import { computeTopQueries } from '@/lib/statsUtils';
import { NextResponse } from 'next/server';

export async function POST() {
  const logs = await prisma.searchLog.findMany();
  const topQueries = computeTopQueries(logs);

  setStats({
    topQueries,
    updatedAt: new Date(),
  });

  return NextResponse.json({ ok: true, topQueries });
}
