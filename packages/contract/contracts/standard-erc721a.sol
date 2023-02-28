// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

import "erc721a/contracts/ERC721A.sol";
import "erc721a/contracts/extensions/ERC721AQueryable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract StandardERC721A is
  ERC721AQueryable,
  ReentrancyGuard,
  Ownable,
  Pausable
{
  event FeeChange(uint256 feeAmt);
  event Minted(uint256 tokenId, address owner);

  mapping(uint256 => string) private _tokenCid;
  uint256 public feeAmt = 0.01 ether;
  address messageSigner = 0x5841989513b7751fd52927DC73eC4A8F7394848C;
  uint256 maxSupply = 500;
  uint256 public activeFrom = 0;
  uint256 public activeUntil = 0;

  constructor() ERC721A("Basic NFT", "BASC") {}

  function supportsInterface(
    bytes4 interfaceId
  ) public view virtual override(ERC721A, IERC721A) returns (bool) {
    // The interface IDs are constants representing the first 4 bytes of the XOR of
    // all function selectors in the interface. See: https://eips.ethereum.org/EIPS/eip-165
    // e.g. `bytes4(i.functionA.selector ^ i.functionB.selector ^ ...)`
    return
      interfaceId == 0x01ffc9a7 || // ERC165 interface ID for ERC165.
      interfaceId == 0x80ac58cd || // ERC165 interface ID for ERC721.
      interfaceId == 0x5b5e139f; // ERC165 interface ID for ERC721Metadata.
  }

  /**
   * @dev Sets up a mint window for a specific time period
   * @param fromTimestamp UTC timestamp in seconds for when mint should open
   * @param toTimestamp  UTC timestamp in seconds for when mint should close
   * @param newFeeAmount Amount in gwei to charge for minting
   */
  function createMintWindow(
    uint256 fromTimestamp,
    uint256 toTimestamp,
    uint256 newFeeAmount
  ) public onlyOwner {
    activeFrom = fromTimestamp;
    activeUntil = toTimestamp;
    feeAmt = newFeeAmount;
  }

  /**
   * @dev Pauses all minting
   */
  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  /**
   * @dev Update the signer address
   * @param newAddress New signer address
   */
  function updateSigner(address newAddress) public onlyOwner {
    require(newAddress != address(0), "Invalid address");
    messageSigner = newAddress;
  }

  /**
   *
   * @param contractAddress Contract address for the parent NFT
   * @param cid CID of the NFT metadata
   * @param signature Signature verifying the CID/CA pair
   */
  function mint(
    address contractAddress,
    uint256 tokenId,
    string memory cid,
    bytes memory signature
  ) public payable whenNotPaused nonReentrant {
    require(block.timestamp >= activeFrom, "Minting not yet open");
    require(block.timestamp <= activeUntil, "Minting has closed");
    require(totalSupply() + 1 <= maxSupply, "Max supply reached");
    if (owner() != msg.sender) {
      require(msg.value >= feeAmt, "Insufficiant funds");
    }
    require(
      verifySignature(contractAddress, tokenId, cid, signature),
      "Invalid signature"
    );
    require(
      IERC721(contractAddress).ownerOf(tokenId) == msg.sender,
      "Not owner"
    );

    _safeMint(msg.sender, 1);
    _tokenCid[super._nextTokenId() - 1] = cid;

    emit Minted(super._nextTokenId() - 1, msg.sender);
  }

  /**
   * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
   */
  function tokenURI(
    uint256 tokenId
  ) public view virtual override(ERC721A, IERC721A) returns (string memory) {
    if (!_exists(tokenId))
      revert("ERC721Metadata: URI query for nonexistent token");

    string memory baseURI = "ipfs://";
    return
      bytes(baseURI).length != 0
        ? string(
          abi.encodePacked(baseURI, _tokenCid[tokenId], "/metadata.json")
        )
        : "";
  }

  function setFee(uint256 newFee) public onlyOwner nonReentrant {
    feeAmt = newFee;
    emit FeeChange(newFee);
  }

  function withdraw() public payable onlyOwner nonReentrant {
    // withdraw total balance on contract
    (bool os, ) = payable(_msgSender()).call{value: address(this).balance}("");
    require(os);
  }

  /** INTERNAL FUNCTIONS **/
  function verifySignature(
    address contractAddress,
    uint256 tokenId,
    string memory cid,
    bytes memory signature
  ) internal view returns (bool) {
    require(signature.length == 65, "Invalid signature length");
    uint8 v;
    bytes32 r;
    bytes32 s;

    (v, r, s) = splitSignature(signature);

    if (v < 27) {
      v += 27;
    }
    require(v == 27 || v == 28, "Invalid signature version");

    bytes32 payloadHash = keccak256(abi.encode(contractAddress, tokenId, cid));
    bytes32 messageHash = keccak256(
      abi.encodePacked("\x19Ethereum Signed Message:\n32", payloadHash)
    );
    return ecrecover(messageHash, v, r, s) == messageSigner;
  }

  function splitSignature(
    bytes memory _sig
  ) internal pure returns (uint8, bytes32, bytes32) {
    require(_sig.length == 65);

    bytes32 r;
    bytes32 s;
    uint8 v;

    assembly {
      // first 32 bytes, after the length prefix
      r := mload(add(_sig, 32))
      // second 32 bytes
      s := mload(add(_sig, 64))
      // final byte (first byte of the next 32 bytes)
      v := byte(0, mload(add(_sig, 96)))
    }
    return (v, r, s);
  }
}
