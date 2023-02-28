import { ethers } from "hardhat";

async function main() {
  const network = "goerli";
  const uri = "https://erc1155-monorepo-frontend.vercel.app/api/item/{id}.json";
  const GameItems = await ethers.getContractFactory("GameItems");
  const tokenName = "GameItems";
  const tokenSymbol = "GITM";
  const gameItems = await GameItems.deploy(uri, tokenName, tokenSymbol);

  await gameItems.deployed();

  console.log(`GameItems deployed to ${gameItems.address}`);
  console.log(
    `\nVerify:\nnpx hardhat verify --network ${network} ${gameItems.address} "${uri}" "${tokenName}" ${tokenSymbol}`,
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
