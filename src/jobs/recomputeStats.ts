import cron from 'node-cron';
import prisma from '@/lib/prisma';
import { setStats } from '@/lib/statsCache';

export function startStatsCron() {
  cron.schedule('*/5 * * * *', async () => {
    console.log('[CRON] Recomputing stats...');

    const logs = await prisma.searchLog.findMany();
    const counter = new Map<string, number>();

    logs.forEach((log) => {
      const key = log.query.toLowerCase().trim();
      counter.set(key, (counter.get(key) || 0) + 1);
    });

    const topQueries = Array.from(counter.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([query, count]) => ({ query, count }));

    setStats({
      topQueries,
      updatedAt: new Date(),
    });

    console.log('[CRON] Stats updated.');
  });
}
