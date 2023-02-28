import { ethers } from "hardhat";

async function main() {
  const network = "goerli";
  const ForgeNft = await ethers.getContractFactory("StandardERC721A");
  const forgeNft = await ForgeNft.deploy();

  await forgeNft.deployed();

  console.log(`StandardERC721A deployed to ${forgeNft.address}`);
  console.log(
    `\nVerify:\nnpx hardhat verify --network ${network} ${forgeNft.address}`,
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
