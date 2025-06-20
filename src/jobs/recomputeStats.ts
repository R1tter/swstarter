import cron from 'node-cron';
import prisma from '@/lib/prisma';
import { setStats } from '@/lib/statsCache';
import { computeTopQueries } from '@/lib/statsUtils';

export function startStatsCron() {
  cron.schedule('*/5 * * * *', async () => {
    console.log('[CRON] Recomputing statistics...');

    const logs = await prisma.searchLog.findMany();
    const topQueries = computeTopQueries(logs);

    setStats({
      topQueries,
      updatedAt: new Date(),
    });

    console.log('[CRON] Statistics updated.');
  });
}
