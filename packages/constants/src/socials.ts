import { FaDiscord, FaTwitter } from "react-icons/fa";

export const socialLinks = [
  {
    title: "Twitter",
    href: "https://twitter.com/",
    Icon: FaTwitter,
  } as const,
  {
    title: "Discord",
    href: "https://discord.gg/",
    Icon: FaDiscord,
  } as const,
] as const;
