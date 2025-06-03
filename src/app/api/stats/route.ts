import { getStats } from '@/lib/statsCache';
import { startStatsCron } from '@/jobs/recomputeStats';
import { NextResponse } from 'next/server';

startStatsCron(); // start the cron once

export async function GET() {
  const stats = getStats();
  return NextResponse.json(stats);
}
