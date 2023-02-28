import { ZeroXAddress } from "./types";

export type Layer = {
  id: number;
  order: number;
  attribute: string;
  name: string;
  image: string; // relative path to the image from the public folder
};

export type Collection = {
  contractAddress: ZeroXAddress;
  name: string;
  prefix?: string;
  suffix?: string;
  image: string; // relative path to the image from the public folder`
  layers: Layer[];
};

const collectionData = {
  "0xa608535Fe3A4E9E9Da4Ff4a854D0cdBaC9Df5256": {
    contractAddress: "0xa608535Fe3A4E9E9Da4Ff4a854D0cdBaC9Df5256",
    name: "Bored Ape Yacht Club",
    prefix: "Chaotic BAYC",
    suffix: "",
    image: "bayc-logo.png",
    layers: [
      {
        id: 1,
        order: 8,
        attribute: "Mouth",
        name: "Toothy Maw",
        image: "bayc-toothy-maw.png",
      },
      {
        id: 2,
        order: 8,
        attribute: "Mouth",
        name: "Graboid",
        image: "bayc-graboid.png",
      },
      {
        id: 9,
        order: 8,
        attribute: "Mouth",
        name: "Squid Mouth",
        image: "bayc-tentacles01.png",
      },
      {
        id: 10,
        order: 8,
        attribute: "Mouth",
        name: "Snarl",
        image: "bayc-snarl01.png",
      },
      {
        id: 11,
        order: 8,
        attribute: "Mouth",
        name: "Venom Tongue",
        image: "bayc-venom-tongue.png",
      },
      {
        id: 3,
        order: 7,
        attribute: "Head",
        name: "Robo Dreads",
        image: "bayc-visor01.png",
      },
      {
        id: 4,
        order: 3,
        attribute: "Head",
        name: "Dual Visor",
        image: "bayc-visor.png",
      },
      {
        id: 5,
        order: 1,
        attribute: "Back",
        name: "Back Claw",
        image: "bayc-bmechaarm.png",
      },
      {
        id: 6,
        order: 2,
        attribute: "Body",
        name: "Get Eaten",
        image: "bayc-glutton-monster.png",
      },
      {
        id: 7,
        order: 4,
        attribute: "Head",
        name: "Get Eaten",
        image: "bayc-head-canister.png",
      },
      {
        id: 8,
        order: 8,
        attribute: "Mouth",
        name: "Open Horror",
        image: "bayc-openmaw.png",
      },
      {
        id: 12,
        order: 6,
        attribute: "Body",
        name: "Dread Armor",
        image: "bayc-mechabod01.png",
      },
    ],
  } as Collection,
  "0x140F70fCcEBF16FcdF700078B02aed0fb852eDe9": {
    contractAddress: "0x140F70fCcEBF16FcdF700078B02aed0fb852eDe9",
    name: "Neo Tokyo",
    image: "neotokyo-collection.avif",
    layers: [
      {
        id: 3,
        order: 1,
        attribute: "teeth",
        name: "Bridge",
        image: "troll-teeth-1.png",
      },
      {
        id: 2,
        order: 1,
        attribute: "glasses",
        name: "Sweet Glasses",
        image: "troll-glasses-1.png",
      },
    ],
  } as Collection,
  "0x140F70fCcEBF16FcdF700078B02aed0fb852eDe8": {
    contractAddress: "0x140F70fCcEBF16FcdF700078B02aed0fb852eDe8",
    name: "Azuki",
    image: "azuki-collection.avif",
    layers: [
      {
        id: 1,
        order: 1,
        attribute: "teeth",
        name: "Bridge",
        image: "troll-teeth-1.png",
      },
      {
        id: 2,
        order: 1,
        attribute: "glasses",
        name: "Sweet Glasses",
        image: "troll-glasses-1.png",
      },
    ],
  } as Collection,
  "0xasdfasdfasdfasddfas": {
    contractAddress: "0xasdfasdfasdfasdweqr",
    name: "The Vogu Collective",
    image: "vogu-collection.avif",
    layers: [
      {
        id: 1,
        order: 1,
        attribute: "teeth",
        name: "Bridge",
        image: "troll-teeth-1.png",
      },
      {
        id: 2,
        order: 1,
        attribute: "glasses",
        name: "Sweet Glasses",
        image: "troll-glasses-1.png",
      },
    ],
  } as Collection,
  "0x9v463v56v45364563466v45646": {
    contractAddress: "0x9v463v56v45364563466v45646",
    name: "Project Jira",
    image: "pg-collection.png",
    layers: [
      {
        id: 1,
        order: 1,
        attribute: "teeth",
        name: "Bridge",
        image: "troll-teeth-1.png",
      },
      {
        id: 2,
        order: 1,
        attribute: "glasses",
        name: "Sweet Glasses",
        image: "troll-glasses-1.png",
      },
    ],
  } as Collection,
  "0x9v463546v45364563466v45646": {
    contractAddress: "0x9v463546v45364563466v45646",
    name: "????????",
    image: "questionmark.png",
    layers: [
      {
        id: 1,
        order: 1,
        attribute: "teeth",
        name: "Bridge",
        image: "troll-teeth-1.png",
      },
      {
        id: 2,
        order: 1,
        attribute: "glasses",
        name: "Sweet Glasses",
        image: "troll-glasses-1.png",
      },
    ],
  } as Collection,
  "0x9v463546v45364563466v456466": {
    contractAddress: "0x9v463546v45364563466v456466",
    name: "?????????",
    image: "questionmark.png",
    layers: [
      {
        id: 1,
        order: 1,
        attribute: "teeth",
        name: "Bridge",
        image: "troll-teeth-1.png",
      },
      {
        id: 2,
        order: 1,
        attribute: "glasses",
        name: "Sweet Glasses",
        image: "troll-glasses-1.png",
      },
    ],
  } as Collection,
};
export const collections = new Map<string, Collection>(
  Object.entries(collectionData),
);
