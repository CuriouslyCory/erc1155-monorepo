import { ethers } from "hardhat";

async function main() {
  const network = "goerli";
  const Erc721a = await ethers.getContractFactory("StandardERC721A");
  const erc721a = await Erc721a.deploy();

  await erc721a.deployed();

  console.log(`StandardERC721A deployed to ${erc721a.address}`);
  console.log(
    `\nVerify:\nnpx hardhat verify --network ${network} ${erc721a.address}`,
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
