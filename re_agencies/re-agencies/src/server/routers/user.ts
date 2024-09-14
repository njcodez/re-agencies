import { createRouter } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../db'; // Assuming prisma client is set up in db.ts

export const userRouter = createRouter()
  .query('getAll', {
    resolve: async () => {
      return prisma.user.findMany();
    },
  })
  .mutation('create', {
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      address: z.string().optional(),
      phone: z.string().optional(),
    }),
    resolve: async ({ input }) => {
      return prisma.user.create({
        data: input,
      });
    },
  });
