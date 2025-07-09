import { Button } from "@/ui";

import { getNetworkConfigBTC } from "@/ui/common/config/network/btc";
import { useBTCWallet } from "@/ui/common/context/wallet/BTCWalletProvider";

import walletIcon from "./wallet-icon.svg";

export const WalletNotConnected = () => {
  const { open } = useBTCWallet();
  const { coinName } = getNetworkConfigBTC();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8">
      <div className="rotate-12">
        <img src={walletIcon} alt="Wallet" width={120} height={122} />
      </div>

      <div className="text-center">
        <h4 className="mb-2 font-sans font-bold text-h5">
          Connect wallets to start staking
        </h4>

        <p className="font-medium text-callout text-itemSecondaryDefault text-balance">
          To start staking your {coinName} first connect wallets then select a
          Finality Provider
        </p>
      </div>

      <Button application variant="outline" onClick={open}>
        Connect Wallets
      </Button>
    </div>
  );
};
