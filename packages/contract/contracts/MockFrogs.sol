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

contract MockFrogs is ERC721AQueryable, Ownable, Pausable {
  constructor() ERC721A("Frogs", "FROG") {}

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
   * @dev Pauses all minting
   */
  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  function mint(uint256 quantity) public payable whenNotPaused {
    _safeMint(msg.sender, quantity);
  }

  /**
   * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
   */
  function tokenURI(
    uint256 tokenId
  ) public view virtual override(ERC721A, IERC721A) returns (string memory) {
    if (!_exists(tokenId))
      revert("ERC721Metadata: URI query for nonexistent token");

    string
      memory baseURI = "https://ipfs.io/ipfs/QmSLqKzm4jPjetsrGHkzGXMGv3CzHpCf7gui8N8MKxUmft/";
    string memory json = ".json";
    return
      bytes(baseURI).length != 0
        ? string(abi.encodePacked(baseURI, super._toString(tokenId), json))
        : "";
  }

  function withdraw() public payable onlyOwner {
    // withdraw total balance on contract
    (bool os, ) = payable(_msgSender()).call{value: address(this).balance}("");
    require(os);
  }
}
