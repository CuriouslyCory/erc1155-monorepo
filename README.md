# ERC1155 NFT Template

## Credits

This [Turborepo](https://turbo.build/) implementation of the [create-t3-app](https://create.t3.gg) stack was originally created by [Julius Marminge](https://github.com/juliusmarminge). Original template can be found [here](https://github.com/t3-oss/create-t3-turbo).

[Hardhat](https://hardhat.org/) has made managing and deploying smart contracts so much better!

Thank you to all of the contributors to these amazing projects!

## How to use this project

The short answer:

- Click Use this template button
- Deploy your repository to [Vercel](https://vercel.com)
- Pop the url into the [deploy script](/packages/contract/scripts/deploy.ts)
- deploy the contract to goerli (`turbo 1555:deploy:goerli`), and then test!

The longer answer...

<img src="/erc1155-template.png" alt="Explainer Graphic" title="Package outline">

The [NextJs](https://nextjs.org) frontend, found at [/apps/frontend/](/apps/frontend/), provides a website, but more importantly API endpoints that serve your metadata. This can quickly be deployed to [Vercel](https://vercel.com) to have you up and running in minutes! Your data will be found @ https://yourverceldomain.vercel.app/api/item/{itemId}

The data is being served to the api path through a [tRPC router](https://trpc.io) ([/pakcages/api/src/router/item.ts](/pakcages/api/src/router/item.ts)) where you can customize your data. Whether you want to pull data from a database or define it as a static object, you can do it here. There is a prisma client attached to the router so you can easily define a database schema (or pull from an existing database) and use it to host your data.

The Solidity contract [/packages/contract/contracts/standard-erc1155.sol](/packages/contract/contracts/standard-erc1155.sol) is a simple ERC1155 contract that allows you to mint and burn tokens. It also provides a function to set the metadata URI for each token. This URI is what the marketplaces and other data aggregators will use to look up the metadata for each token. Add your vercel domain to the [deploy script](/packages/contract/scripts/deploy.ts) and deploy the contract to goerli.

## Quick Start

To get it running, follow the steps below:

### Local setup dependencies

1. Project requires [npm](https://nodejs.org/en/download/). Follow the instructions specific to your OS to install it.
2. Click "Use this template" up above.
3. Clone your new repository and browse to the file location in your terminal
4. ```bash
   # Install pnpm globally
   npm i -g pnpm

   # Install turbo globally
   npm install -g turbo

   # clone repository
   git clone <github repo address>
   cd erc1155-template

   # Install dependencies
   pnpm i

   # Configure environment variables.
   # There is an `.env.example` in the root directory you can use for reference
   cp .env.example .env

   # Start the dev server
   npm run dev
   ```

You should see output showing the dev server is live and available at https://localhost:3000, or an alternate port if 3000 is being used on your system already.

## Other Notable Commands

- `turbo contract:test` - Run the smart contract tests
- `turbo 1155:deploy:goerli` - Deploy the smart contract to goerli

## Notable paths/files

| File Path                                                                  | Primary Use                | Notes                                                         |
| -------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------- |
| [`apps/frontend`](/apps/frontend)                                          | Next.js frontend           | Public frontend exposing the metadata api                     |
| [`packages/api/src/router/item.ts`](packages/api/src/router/item.ts)       | Token Metadata Definitions | Logic to look up and render metadata                          |
| [`packages/constants/src/contract.ts`](packages/constants/src/contract.ts) | Contract addresses         | This is where the contract addresses are stored               |
| [`packages/contract`](packages/contract)                                   | Smart contract             | This is where the smart contract and related tests are stored |
| [`packages/contract/contracts`](packages/contract/contracts)               | Contract Code              | The actual solidity code for the contract                     |
| [`packages/contract/test`](packages/contract/test)                         | Smart contract tests       | This is where the smart contract tests are stored             |

## Smart contract deployment

1. Follow the "Quick Start" above to prepare your environment
2. Run test suite to ensure everything is working as expected
   ```bash
   # Deploy contracts to mainnet
   turbo contract:test
   ```
3. Deploy contracts to goerli

   ```bash
   # Deploy contracts to mainnet
   turbo 1155:deploy:goerli

   # should provide some output that ends with something like this:
   # npx hardhat verify --network mainnet 0x790d0c76Fa8F8Fbd73F55518D6B98A1Eb9de0CfF
   # copy the above npx command
   cd packages/contract
   # paste copied npx command
   npx hardhat verify --network mainnet 0x790d0c76Fa8F8Fbd73F55518D6B98A1Eb9de0CfF

   ```

4. Commit the file to your git repo `git commit -am "update contract address" && git push`

## Preview/Production Deployment

### Next.js

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com/). If you have ever deployed a Turborepo app there, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

#### Create a new project on Vercel:

- Add new => project from your [team dashboard](https://vercel.com/dashboard)
- Import from Git Repository => Github
- Name your project (e.g. `my-curious-nft-project`)
- Framework Preset: Next.js
- Select the `apps/frontend` folder as the root directory (should be default)
- Expand the build and output settings and apply the following configuration:
  - Build Command: `cd ../.. && npx turbo run build --filter=frontend`
  - Output Directory: default/no change
  - Install command: `pnpm install --store=node_modules/.pnpm-store`
  - Development command: default/no change
- Expand the environment variables section copy your entire .env file and paste into the first field

## Environment Variable Information

- _Currently unused, but needs to be defined_
  Variable Name | Value
  --- | ---
  DATABASE_URL | file:./db.sqlite

- NextAuth. Currently unused, but great if you want to have auth in the future.
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
  NEXT_PUBLIC_ALCHEMY_API_KEY | Copied from above unless you want to seperate front and back

- _IMPORTANT_ The following hardhat vars are **only required locally** for deploying contracts and do not need to be configured on vercel
  Variable Name | Value
  --- | ---
  ETHERSCAN_API_KEY | Created at https://etherscan.io/myapikey
  DEPLOYMENT_PK | Ethereum private key for deployment. Must have enough ETH to cover gas costs.

3. Done! Your app should successfully deploy. |

## References

The stack originates from [create-t3-app](https://github.com/t3-oss/create-t3-app).
