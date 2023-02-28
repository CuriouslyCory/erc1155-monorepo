import { createTRPCRouter } from "./trpc";
import { authRouter } from "./router/auth";
import { alchemyRouter } from "./router/alchemy";
import { itemRouter } from "./router/item";

export const appRouter = createTRPCRouter({
  alchemy: alchemyRouter,
  item: itemRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
