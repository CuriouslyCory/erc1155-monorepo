import { Alchemy, Network } from "alchemy-sdk";
import { BigNumberish } from "ethers";

export const getAlchemyClient = () => {
  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API key.
    network: Network.ETH_GOERLI, // Replace with your network.
  };

  return new Alchemy(settings);
};

export const getNftMetadata = async (
  contractAddress: string,
  tokenId: BigNumberish,
) => {
  const alchemy = getAlchemyClient();
  return alchemy.nft.getNftMetadata(contractAddress, tokenId, {});
};

export const getOwnedNftFromContract = async (
  ownerAddress: string,
  contractAddress: string,
): Promise<ReturnType<typeof alchemy.nft.getNftsForOwner>> => {
  const alchemy = getAlchemyClient();
  return alchemy.nft.getNftsForOwner(ownerAddress, {
    contractAddresses: [contractAddress],
    omitMetadata: true,
    pageSize: 1,
  });
};
