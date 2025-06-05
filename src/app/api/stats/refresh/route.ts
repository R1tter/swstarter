import prisma from '@/lib/prisma';
import { setStats } from '@/lib/statsCache';
import { NextResponse } from 'next/server';

export async function POST() {
  const logs = await prisma.searchLog.findMany();
  const counter = new Map<string, number>();

  logs.forEach((log) => {
    const key = log.query.toLowerCase().trim();
    counter.set(key, (counter.get(key) || 0) + 1);
  });

  const total = logs.length;
  const topQueries = Array.from(counter.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([query, count]) => ({
      query,
      count,
      percentage: total > 0 ? Number(((count / total) * 100).toFixed(2)) : 0
    }));

  setStats({
    topQueries,
    updatedAt: new Date(),
  });

  return NextResponse.json({ ok: true, topQueries });
}
