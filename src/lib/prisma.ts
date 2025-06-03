import { PrismaClient } from '@prisma/client';

declare global {
  // Permite reutilizar o PrismaClient entre reloads no dev
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
