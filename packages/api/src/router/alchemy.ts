import { z } from "zod";
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
        //GameItems collection on goerli, deploy your own and replace this address
        contractAddresses: ["0xBB461Fd70ab6DE225cC3019a7025C10CF9defcA4"],
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
