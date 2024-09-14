import { createRouter } from '@trpc/server';
import { userRouter } from './user';
import { productRouter } from './product';
import { orderRouter } from './order';
import { messageRouter } from './message';

export const appRouter = createRouter()
  .merge('user.', userRouter)
  .merge('product.', productRouter)
  .merge('order.', orderRouter)
  .merge('message.', messageRouter);

export type AppRouter = typeof appRouter;
