import { z } from "zod";
import { collections } from "@nft-template-v2/constants";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getAlchemyClient } from "../common/alchemy";

export const alchemyRouter = createTRPCRouter({
  getCompatibleNfts: publicProcedure
    .input(
      z.object({
        address: z.string().startsWith("0x"),
        pageKey: z.string().optional(),
      }),
    )
    .query(({ input }) => {
      const alchemy = getAlchemyClient();
      return alchemy.nft.getNftsForOwner(input?.address ?? "", {
        contractAddresses: [...collections.entries()].map(
          ([, c]) => c.contractAddress,
        ),
        pageKey: input.pageKey,
      });
    }),
  getOwnedNftsFromCollection: publicProcedure
    .input(
      z.object({
        address: z.string().startsWith("0x"),
        contractAddress: z.string().startsWith("0x"),
        pageKey: z.string().optional(),
      }),
    )
    .query(({ input }) => {
      const alchemy = getAlchemyClient();
      return alchemy.nft.getNftsForOwner(input?.address ?? "", {
        contractAddresses: [input.contractAddress],
        pageKey: input.pageKey,
      });
    }),
});
