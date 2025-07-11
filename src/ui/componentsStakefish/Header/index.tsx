import { useWalletConnect } from "@babylonlabs-io/wallet-connector";
import Link from "next/link";

import { Header as HeaderComponent } from "@/ui";
import { Connect } from "@/ui/common/components/Wallet/Connect";
import { useAppState } from "@/ui/common/state";
import { WEBSITE_URL } from "@/ui/common/utils/stakefish";

import { DashboardLabel } from "./DashboardLabel";
import { NetworkDropdown } from "./NetworkDropdown";
import { ThemeToggler } from "./ThemeToggler";

export const Header = () => {
  const { isLoading: loading } = useAppState();
  const { open } = useWalletConnect();

  const frontMenu = (
    <div className="flex items-center justify-center gap-4">
      <DashboardLabel className="hidden perch:block" />
    </div>
  );

  const actionContent = (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center gap-2">
        {/* <StakeButton className="text-desktopCallout flounder:text-desktopCallout flounder:hidden" /> */}
        <ThemeToggler
          buttonProps={{
            variant: "outline",
            color: "secondary",
            className: "ring-1 ring-inset !p-2",
          }}
        />
      </div>
      <div className="flex items-center gap-2 relative">
        <NetworkDropdown />
        <Connect loading={loading} onConnect={open} />
      </div>
    </div>
  );

  return (
    <HeaderComponent
      filled
      bordered
      pictogramOnly
      ElementLogo={Link}
      frontMenu={frontMenu}
      actionsContent={actionContent}
      className="w-screen py-2"
      logoUrl={WEBSITE_URL}
    />
  );
};
