// src/pages/_app.tsx
import "../styles/globals.css";
import "../styles/fonts.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { publicProvider } from "@wagmi/core/providers/public";

import { api } from "~/utils/api";
import Layout from "~/features/layout";
import { EthereumClient, modalConnectors } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { siteInfo } from "@erc1155-template/constants";

const { chains, provider } = configureChains(
  [goerli, mainnet],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? "",
      priority: 0,
    }),
    publicProvider({ priority: 1 }),
  ],
);

const projectId = "8fa9e3f396df9b9a9b1a73a2fe1e4073";

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    version: "2",
    appName: siteInfo.name,
    chains,
    projectId,
  }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <WagmiConfig client={wagmiClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
