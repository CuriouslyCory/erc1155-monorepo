import "@nomiclabs/hardhat-ethers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ethereumRpcUri } from "@nft-template-v2/constants";
import { BigNumber, providers, Signer, Wallet } from "ethers";

export const getSigner = (privateKey: string): Signer => {
  const provider = new providers.JsonRpcProvider(ethereumRpcUri);
  const wallet = new Wallet(privateKey, provider);
  return wallet;
};

describe("GameItems", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployGameItemsFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    if (!owner || !otherAccount) throw new Error("No accounts found");

    const GameItems = await ethers.getContractFactory("GameItems");
    const gameItems = await GameItems.deploy(
      "https://erc1155-monorepo-frontend.vercel.app/api/item/{id}.json",
      "GameItems",
      "GITM",
    );
    const fixture = { gameItems, owner, otherAccount };
    return fixture;
  }

  describe("Deployment", function () {
    it("Should deploy with correct settings", async function () {
      const { gameItems } = await loadFixture(deployGameItemsFixture);

      // validate CID matches
      expect(await gameItems.uri(1)).to.equal(
        `https://erc1155-monorepo-frontend.vercel.app/api/item/{id}.json`,
      );
    });
  });

  describe("Minting", function () {
    describe("Should be able to Mint", function () {
      it("Should Mint", async function () {
        const { gameItems, otherAccount } = await loadFixture(
          deployGameItemsFixture,
        );

        // configure options for minting
        const options = { value: ethers.utils.parseEther("0.01") };

        // mint and get the receipt
        const receipt = await (
          await gameItems.mint(otherAccount.address, 1, 1, [], options)
        ).wait();

        // validate new balance
        expect(await gameItems.balanceOf(otherAccount.address, 1)).to.equal(
          BigNumber.from(1),
        );
      });
    });
  });
});
