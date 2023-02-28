// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@nft-template-v2/api",
    "@nft-template-v2/auth",
    "@nft-template-v2/db",
    "@nft-template-v2/constants",
  ],
  images: {
    domains: [
      "res.cloudinary.com",
      "nft-cdn.alchemy.com",
      "gateway.pinata.cloud",
      "ipfs.io",
      "nftstorage.link",
    ],
  },
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  typescript: { ignoreBuildErrors: !!process.env.CI },
};

export default config;
