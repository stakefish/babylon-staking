import { socialLinks } from "@/data/socials";
import {
  Footer as FooterComponent,
  FooterProps,
  type SocialLinkProps,
} from "@/ui";
import { WEBSITE_URL } from "@/ui/common/utils/stakefish";
import { useMediaQueryContext } from "@/ui/context/ui/MediaQueryContext";

export const Footer = ({ fixed, menu, simple, ...props }: FooterProps) => {
  const { up } = useMediaQueryContext();
  const isSm = up?.flounder;
  const isMd = up?.salmon;

  const links = [
    {
      url: `${WEBSITE_URL}/terms-of-service`,
      title: "Terms of service",
    },
    {
      url: `${WEBSITE_URL}/privacy-policy`,
      title: "Privacy policy",
    },
    {
      url: `${WEBSITE_URL}/contact`,
      title: "Contact us",
    },
  ];

  return (
    <FooterComponent
      simple={simple}
      title="Staking has never been this easy."
      links={links}
      menu={menu}
      socials={socialLinks as SocialLinkProps[]}
      currentYear={new Date().getFullYear()}
      fixed={Boolean(isSm) && fixed}
      isMd={Boolean(isMd)}
      className="font-mono"
      {...props}
    />
  );
};
