# NFT Template v2

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

1. Project requires [npm](https://nodejs.org/en/download/). Follow the instructions specific to your OS to install it.
2. Clone this repository and browse to the file location in your terminal

- From github desktop you can find the file location by looking at the file path in file => clone repository
- Once you have that open the command prompt (win + r => cmd)
- Change directory to the file path `cd <file path>` (e.g. `cd C:\Users\username\Documents\The-Forge` (don't forget to add the `The-Forge` at the end as it won't be in the github file path)
- You can run `explorer .` to open the file explorer in the current directory
- Or you can run `notepad ./filename` to open a file in notepad

3. ```bash
   # Install pnpm globally
   npm i -g pnpm

   # Install turbo globally
   npm install -g turbo

   # clone repository
   git clone <github repo address>
   cd nft-template-v2

   # Install dependencies
   pnpm i

   # Configure environment variables.
   # There is an `.env.example` in the root directory you can use for reference
   cp .env.example .env

   # Start the dev server
   npm run dev
   ```

You should see output showing the dev server is live and available at https://localhost:3000, or an alternate port if 3000 is being used on your system already.

## Notable paths/files

| File Path                                                                  | Primary Use          | Notes                                                         |
| -------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------- |
| [`apps/frontend`](/apps/frontend)                                          | Next.js frontend     | Public frontend exposing the metadata api                     |
| [`packages/constants/src/contract.ts`](packages/constants/src/contract.ts) | Contract addresses   | This is where the contract addresses are stored               |
| [`packages/contract`](packages/contract)                                   | Smart contract       | This is where the smart contract and related tests are stored |
| [`packages/contract/contracts`](packages/contract/contracts)               | Contract Code        | The actual solidity code for the contract                     |
| [`packages/contract/test`](packages/contract/test)                         | Smart contract tests | This is where the smart contract tests are stored             |

## Smart contract deployment (do before frontend deployment)

1. Follow the "Quick Start" above to prepare your environment
2. Run test suite to ensure everything is working as expected
   ```bash
   # Deploy contracts to mainnet
   turbo contract:test
   ```
3. Deploy contracts to mainnet

   ```bash
   # Deploy contracts to mainnet
   turbo contract:deploy:mainnet

   # should provide some output that ends with something like this:
   # npx hardhat verify --network mainnet 0x790d0c76Fa8F8Fbd73F55518D6B98A1Eb9de0CfF
   # copy the above npx command
   cd packages/contract
   # paste copied npx command
   npx hardhat verify --network mainnet 0x790d0c76Fa8F8Fbd73F55518D6B98A1Eb9de0CfF

   ```

4. Update the contract address in the constants package
   Open the file [`packages/constants/src/contract.ts`](packages/constants/src/contract.ts) and fill the empty `contractAddress` entry
   ```Typescript
   export const contractAddress: MultiChainAddress = {
      1: "<enter new contract address here>",
      5: "0x86AA7Fdb444AB65e2c6ce4108B2900368e45693C",
   } as const;
   ```
5. Commit the file to your git repo `git commit -am "update contract address" && git push`

## Preview/Production Deployment

### Next.js

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com/). If you have ever deployed a Turborepo app there, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

#### Create a new project on Vercel:

- Add new => project from your [team dashboard](https://vercel.com/dashboard)
- Import from Git Repository => Github
- Name your project (e.g. `forge-nft-frontend`)
- Framework Preset: Next.js
- Select the `apps/frontend` folder as the root directory (should be default)
- Expand the build and output settings and apply the following configuration:
  - Build Command: `cd ../.. && npx turbo run build --filter=frontend`
  - Output Directory: default/no change
  - Install command: `pnpm install --store=node_modules/.pnpm-store`
  - Development command: default/no change
- Expand the environment variables section and enter the following:

  - _Currently unused, but needs to be defined_
    Variable Name | Value
    --- | ---
    DATABASE_URL | file:./db.sqlite

  - NextAuth. Currently unused, but could be very useful in the future.
    Variable Name | Value
    --- | ---
    NEXTAUTH_SECRET | any-random-string
    NEXTAUTH_URL | http://localhost:3000
    DISCORD_CLIENT_ID | add a space
    DISCORD_CLIENT_SECRET | add a space

  - Alchemy. Used for nft data lookup, and on-chain actions
    Variable Name | Value
    --- | ---
    ALCHEMY_API_KEY | Create account and generate key for ethereum at https://dashboard.alchemy.com/
    NEXT_PUBLIC_ALCHEMY_API_KEY | Duplicate of above, but for client side use. Create account and generate key for ethereum at https://dashboard.alchemy.com/

- _IMPORTANT_ The following hardhat vars are **only required locally** for deploying contracts and do not need to be configured on vercel
  Variable Name | Value
  --- | ---
  ETHERSCAN_API_KEY | Created at https://etherscan.io/myapikey
  DEPLOYMENT_PK | Ethereum private key for deployment. Must have enough ETH to cover gas costs.

3. Done! Your app should successfully deploy. |

## References

The stack originates from [create-t3-app](https://github.com/t3-oss/create-t3-app).
