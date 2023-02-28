import { collections, Layer } from "@nft-template-v2/constants";
import { NFTStorage, File } from "nft.storage";
import { BigNumberish } from "ethers";
import { getNftMetadata } from "./alchemy";
export const getNftStorageClient = () => {
  return new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY ?? "" });
};

type UploadNftParams = {
  fileBuffer: Buffer;
  name: string;
  layerIds: number[];
  contractAddress: string;
  tokenId: BigNumberish;
};

export const uploadNft = async ({
  fileBuffer,
  name,
  layerIds,
  contractAddress,
  tokenId,
}: UploadNftParams) => {
  // get nft.storage client
  const nftStorageClient = getNftStorageClient();

  // generate metadata
  const layers = getLayersFromId(layerIds, contractAddress);
  const collection = collections.get(contractAddress);

  const nft = await getNftMetadata(contractAddress, tokenId);

  const newAttributes = layers.map((layer) => ({
    trait_type: layer.attribute,
    value: layer.name,
  }));

  const originalAttributes = nft?.rawMetadata?.attributes?.map((attr) => ({
    trait_type: attr.trait_type,
    value: attr?.value ?? "",
  }));

  const metaData = {
    description: "Forge NFT",
    external_url: "https://forge.nft",
    image: new File([fileBuffer], `${name}-image.webp`, { type: "image/webp" }),
    name: `${collection?.prefix ? collection?.prefix + " " : ""}${nft.title}${
      collection?.suffix ? " " + collection?.suffix : ""
    }`,
    attributes: originalAttributes?.concat(newAttributes),
  };

  // upload to nft.storage
  const storeResult = await nftStorageClient.store(metaData);
  return storeResult.ipnft;
};

const getLayersFromId = (layerIds: number[], contractAddress: string) => {
  return layerIds
    .map((id) =>
      collections.get(contractAddress)?.layers.find((l) => l.id === id),
    )
    .filter((entry) => !!entry) as Layer[];
};
