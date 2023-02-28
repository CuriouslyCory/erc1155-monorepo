import { siteInfo } from "@nft-template-v2/constants";
import { type NextPage } from "next";
import Head from "next/head";
import { Hero } from "../features/hero/hero";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`${siteInfo.name} - Home`}</title>
        <meta name="description" content={siteInfo.name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center">
        <Hero />
      </main>
    </>
  );
};

export default Home;
