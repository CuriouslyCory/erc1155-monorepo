import "@nomiclabs/hardhat-ethers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ethereumRpcUri } from "@nft-template-v2/constants";
import {
  BigNumber,
  BigNumberish,
  providers,
  Signer,
  utils,
  Wallet,
} from "ethers";

export const getSigner = (privateKey: string): Signer => {
  const provider = new providers.JsonRpcProvider(ethereumRpcUri);
  const wallet = new Wallet(privateKey, provider);
  return wallet;
};

export const signPayload = async (
  signer: Signer,
  contractAddress: string,
  tokenId: BigNumberish,
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

describe("ForgeNft", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployForgeNftFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    if (!owner || !otherAccount) throw new Error("No accounts found");

    const ForgeNft = await ethers.getContractFactory("StandardERC721A");
    const forgeNft = await ForgeNft.deploy();
    const fixture = { forgeNft, owner, otherAccount };
    return fixture;
  }

  async function deployFrogftFixture() {
    // Contracts are deployed using the first signer/account by default
    const [frogOwner, otherFrogAccount] = await ethers.getSigners();
    if (!frogOwner || !otherFrogAccount) throw new Error("No accounts found");

    const MockFrogs = await ethers.getContractFactory("MockFrogs");
    const mockFrogs = await MockFrogs.deploy();
    const fixture = { mockFrogs, frogOwner, otherFrogAccount };
    return fixture;
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { forgeNft } = await loadFixture(deployForgeNftFixture);

      expect(await forgeNft.name()).to.equal("Basic NFT");
      expect(await forgeNft.symbol()).to.equal("BASC");
    });
  });

  describe("Management Functions", function () {
    describe("Pause", function () {
      it("Should revert with the right error if user isn't allowed to pause", async function () {
        const { forgeNft, otherAccount } = await loadFixture(
          deployForgeNftFixture,
        );

        await expect(forgeNft.connect(otherAccount).pause()).to.be.revertedWith(
          "Ownable: caller is not the owner",
        );
      });
    });
  });

  describe("Minting", function () {
    describe("Should be able to Mint", function () {
      it("Should Mint", async function () {
        const { forgeNft, otherAccount } = await loadFixture(
          deployForgeNftFixture,
        );
        const { mockFrogs } = await loadFixture(deployFrogftFixture);
        // mint a frog to verify ownership
        await mockFrogs.connect(otherAccount).mint(44);

        // create a new mint window
        await forgeNft.createMintWindow(
          BigNumber.from(Math.round(Date.now() / 1000 - 100)),
          BigNumber.from(Math.round(Date.now() / 1000 + 100)),
          utils.parseEther("0.01"),
        );

        // configure options for minting
        const options = { value: ethers.utils.parseEther("0.01") };
        const testContractAddress = mockFrogs.address;
        const testTokenId = 43;
        const testCid = "QmTeBdWXXjbH7uRZmUaigAfMtcU7bWFzirLDuKtAEAC8T1";
        const signer = getSigner(process.env.SIGNER_PK ?? "");

        // generate a signature
        const signature = await signPayload(
          signer,
          testContractAddress,
          testTokenId,
          testCid,
        );

        // mint and get the receipt
        const receipt = await (
          await forgeNft.connect(otherAccount).mint(
            testContractAddress, // frogs contract address
            testTokenId, // tokenId
            testCid, //cid
            signature,
            options,
          )
        ).wait();

        // validate new balance
        expect(await forgeNft.balanceOf(otherAccount.address)).to.equal(
          BigNumber.from(1),
        );

        // validate token exists
        expect(await forgeNft.tokenURI(0)).not.to.be.revertedWith(
          "ERC721Metadata: URI query for nonexistent token",
        );

        // validate CID matches
        expect(await forgeNft.tokenURI(0)).to.equal(
          `ipfs://${testCid}/metadata.json`,
        );
      });
    });
  });
});
