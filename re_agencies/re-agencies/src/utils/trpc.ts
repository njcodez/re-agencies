import { createTRPCNext } from '@trpc/next';
import { AppRouter } from '../server/routers/_app';

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      url: process.env.NEXT_PUBLIC_TRPC_URL as string, // Make sure this is set in your .env
    };
  },
  ssr: false, // Adjust based on your needs
});
