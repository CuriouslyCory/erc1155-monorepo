import { ethers } from "ethers";

export const truncateAddress = (address: string, chars = 4): string => {
  const parsed = ethers.utils.getAddress(address);
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
};
