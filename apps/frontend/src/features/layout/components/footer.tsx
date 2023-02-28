import { routes, siteInfo, socialLinks } from "@nft-template-v2/constants";
import Link from "next/link";

export const Footer = (): JSX.Element => {
  return (
    <footer className="mt-10 w-full bg-[#171415] py-6 text-white">
      <div className="mx-2 flex flex-col items-center justify-between md:mx-20 md:flex-row">
        <p className="mb-3 text-sm font-semibold md:mb-0">
          Copyright {siteInfo.name} {new Date().getFullYear()}
        </p>
        <div className="flex flex-col gap-5">
          <ul className="mb-6 flex flex-col items-center md:mb-0 md:flex-row">
            {routes.map((route) => (
              <li key={`footer-route-${route.title}`} className="mr-3">
                <Link href={route.path}>
                  <button className="inline-block text-gray-600 hover:text-white">
                    {route.title}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex items-center justify-center md:justify-end">
            {socialLinks.map((social) => (
              <li className="mr-3" key={`footer-social-${social.title}`}>
                <a href={social.href}>
                  <social.Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
