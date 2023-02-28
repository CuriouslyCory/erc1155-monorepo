import { Web3Button } from "@web3modal/react";
import clsx from "clsx";
import { useDisconnect } from "wagmi";
import { useAddress } from "../hooks/use-address";
import { Button } from "./ui/button";

type ConnectButtonProps = {
  className?: string;
};

export const ConnectButton = ({
  className,
}: ConnectButtonProps): JSX.Element => {
  const address = useAddress();
  const { disconnect } = useDisconnect();

  return (
    <div className={clsx("md:border-0 md:text-sm md:font-medium", className)}>
      {!address && <Web3Button icon="hide" />}
      {address && <Button onClick={() => disconnect()}>Disconnect</Button>}
    </div>
  );
};
