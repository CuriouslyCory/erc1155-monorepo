export type SupportedChains = 1 | 5;
type MultiChainAddress = {
  [key in SupportedChains]: string;
};

export const nftContractAddress: MultiChainAddress = {
  1: "",
  5: "0xCB94DE41439f43ABaE881Eb9E16FaD5077667B8B",
} as const;
