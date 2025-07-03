import { memo } from "react";

import { getNetworkConfigBTC } from "@/ui/common/config/network/btc";
import { usePrice } from "@/ui/common/hooks/client/api/usePrices";
import { useSystemStats } from "@/ui/common/hooks/client/api/useSystemStats";
import { satoshiToBtc } from "@/ui/common/utils/btc";
import { formatBTCTvl } from "@/ui/common/utils/formatBTCTvl";
import { DataWidget, StatsSection } from "@/ui/componentsStakefish/DataWidget";
import { useStakingState } from "../../state/StakingState";
import { NA_SYMBOL } from "../../utils/constants";

const { coinSymbol } = getNetworkConfigBTC();

const formatter = Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 2,
});

export const Stats = memo(() => {
  const {
    data: {
      total_active_tvl: totalActiveTVL = 0,
      active_tvl: activeTVL = 0,
      btc_staking_apr: stakingAPR,
    } = {},
    isLoading: isSystemStatsLoading,
  } = useSystemStats();

  const { stakingInfo, loading: isStakingInfoLoading } = useStakingState();
  const usdRate = usePrice(coinSymbol);

  const sections: StatsSection[] = [
    {
      title: {
        text: `Total ${coinSymbol} TVL`,
        tooltip: "Total number of Bitcoins staked in the protocol",
      },
      value: {
        text: totalActiveTVL
          ? formatBTCTvl(satoshiToBtc(totalActiveTVL), coinSymbol, usdRate)
          : NA_SYMBOL,
        isLoading: isSystemStatsLoading,
      },
      className: "col-span-1 flounder:col-span-2 whale:col-span-3 flex-col",
    },
    {
      title: {
        text: `Registered ${coinSymbol} TVL`,
        tooltip:
          "The total amount of Bitcoin that has been registered in the Babylon Genesis network",
      },
      value: {
        text: activeTVL
          ? formatBTCTvl(satoshiToBtc(activeTVL), coinSymbol, usdRate)
          : `0.00000000 ${coinSymbol}`,
        isLoading: isSystemStatsLoading,
      },
      className: "flex-col",
    },
    {
      title: { text: "Max/Min Staking Period" },
      value: {
        text: `${stakingInfo?.maxStakingTimeBlocks.toLocaleString()}/${stakingInfo?.minStakingTimeBlocks.toLocaleString()} ${coinSymbol} Blocks`,
        isLoading: isStakingInfoLoading,
      },
      className: "flex-col",
    },
    {
      title: {
        text: `${coinSymbol} Staking APR`,
        tooltip:
          "Annual Percentage Reward (APR) is a dynamic estimate of the annualized staking reward rate based on current network conditions, and it refers to staking rewards rather than traditional lending interest. Rewards are distributed in BABY tokens but shown as a Bitcoin-equivalent rate relative to the Bitcoin initially staked. APR is calculated using U.S. dollar values for Bitcoin and BABY from independent, reputable sources. The APR shown is an approximate figure that can fluctuate, and the displayed value may not always be completely accurate. Actual rewards are not guaranteed and may vary over time. Staking carries exposure to slashing and other risks",
      },
      value: {
        text: stakingAPR
          ? `${formatter.format(stakingAPR ? stakingAPR * 100 : 0)}%`
          : NA_SYMBOL,
        isLoading: isSystemStatsLoading,
      },
      className: "flex-col",
    },
    {
      title: { text: "" },
      value: {
        text: "",
        isLoading: false,
      },
      className: "flex-col whale:hidden hidden flounder:block",
    },
  ];

  return <DataWidget sections={sections} label="Babylon Bitcoin Staking" />;
});

Stats.displayName = "Stats";
