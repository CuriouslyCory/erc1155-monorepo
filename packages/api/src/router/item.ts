import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

/**
 * Type def for our item metadata
 */
export type GameItem = {
  name: string;
  description: string;
  image: string;
  strength?: number;
  value?: number;
};

/**
 * In a real world application you would probably store this information in a database or external flatfile.
 */
const metadata: readonly GameItem[] = [
  {
    name: "Gold",
    description:
      "Simple gold coin with a face of a king on one side and a dragon on the other.",
    image: "https://erc1155-monorepo-frontend.vercel.app/gold-coin.png",
    value: 1,
  },
  {
    name: "Thor's hammer",
    description: "Mjölnir, the legendary hammer of the Norse god of thunder.",
    image: "https://erc1155-monorepo-frontend.vercel.app/mjolnir.png",
    strength: 20,
  },
  {
    name: "Athena's Shield",
    description:
      "A symbol of protection and wisdom associated with the Greek goddess Athena, depicted with a Gorgon's head and adorned with images of mythical creatures and battles.",
    image: "https://erc1155-monorepo-frontend.vercel.app/athenas-shield.png",
    strength: 20,
  },
] as const;

/**
 * Item router validates the input and returns the item metadata if it exists.
 */
export const itemRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => metadata),
  getById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ input }) => {
      return {
        itemId: input.id,
        ...(metadata[input.id] ?? { error: "Not Found" }),
      };
    }),
});
