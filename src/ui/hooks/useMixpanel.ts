"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useBTCWallet } from "../context/wallet/BTCWalletProvider";
import { Mixpanel } from "../utils/mixpanel";

export function useMixpanelIdentify() {
  const { address: activeAccount } = useBTCWallet();
  useEffect(() => {
    if (activeAccount) Mixpanel.identify(`${activeAccount}`);
    else Mixpanel.reset();
  }, [activeAccount]);
}

export function useMixpanelPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      Mixpanel.track_pageview();
    }
  }, [pathname, searchParams]);
}
