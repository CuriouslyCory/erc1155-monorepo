import Link from "next/link";
import { ConnectButton } from "../../../components/connect-button";

export const Header = (): JSX.Element => {
  return (
    <header className="mx-2 mb-5 mt-5 flex font-oxygen md:mx-10">
      <div className="mr-auto flex gap-5">
        <Link href="/">Home</Link>
        <Link href="/mint">Mint</Link>
      </div>
      <div className="">
        <ConnectButton className="ml-auto" />
      </div>
    </header>
  );
};

export default Header;
