import { ethereumRpcUri } from "@nft-template-v2/constants";
import { providers, Signer, utils, Wallet } from "ethers";

export const getSigner = (privateKey: string): Signer => {
  const provider = new providers.JsonRpcProvider(ethereumRpcUri);
  const wallet = new Wallet(privateKey, provider);
  return wallet;
};

export const signPayload = async (
  signer: Signer,
  contractAddress: string,
  tokenId: number,
  cid: string,
) => {
  const payload = utils.defaultAbiCoder.encode(
    ["address", "uint256", "string"],
    [contractAddress, tokenId, cid],
  );
  const payloadHash = utils.keccak256(payload);
  const signature = await signer.signMessage(utils.arrayify(payloadHash));
  return signature;
};
