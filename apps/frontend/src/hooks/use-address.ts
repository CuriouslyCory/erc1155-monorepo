import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import type { ZeroXAddress } from "../types/zero-x-address";

/**
 * Wrap wagmi's account adapater in a way that doesn't break hydration
 * @returns The current connected 0x address
 */
export const useAddress = () => {
  const { address: wagmiAddress } = useAccount();
  const [address, setAddress] = useState<ZeroXAddress | undefined>();

  useEffect(() => {
    setAddress(wagmiAddress);
  }, [wagmiAddress]);

  return address;
};
