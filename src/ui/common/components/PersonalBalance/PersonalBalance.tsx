import { DataWidget, StatsSection } from "@/ui/componentsStakefish/DataWidget";

import { NA_SYMBOL } from "@/ui/common/utils/constants";

import { getNetworkConfigBBN } from "@/ui/common/config/network/bbn";
import { getNetworkConfigBTC } from "@/ui/common/config/network/btc";
import { useUTXOs } from "@/ui/common/hooks/client/api/useUTXOs";
import { useRewardsService } from "@/ui/common/hooks/services/useRewardsService";
import { useIsMobileView } from "@/ui/common/hooks/useBreakpoint";
import { useBalanceState } from "@/ui/common/state/BalanceState";
import { useRewardsState } from "@/ui/common/state/RewardState";
import { ubbnToBaby } from "@/ui/common/utils/bbn";
import { satoshiToBtc } from "@/ui/common/utils/btc";

import { ClaimRewardModal } from "../Modals/ClaimRewardModal";
import { ClaimStatusModal } from "../Modals/ClaimStatusModal/ClaimStatusModal";
import { ActionComponent } from "../Stats/ActionComponent";

const { networkName: bbnNetworkName, coinSymbol: bbnCoinSymbol } =
  getNetworkConfigBBN();
const { coinSymbol } = getNetworkConfigBTC();

export function PersonalBalance() {
  // Load reward state
  const {
    loading: rewardLoading,
    processing,
    showRewardModal,
    showProcessingModal,
    closeProcessingModal,
    closeRewardModal,
    bbnAddress,
    rewardBalance,
    transactionFee,
    transactionHash,
    setTransactionHash,
  } = useRewardsState();

  // Load balance state
  const {
    bbnBalance,
    stakableBtcBalance,
    stakedBtcBalance,
    inscriptionsBtcBalance,
    loading: isBalanceLoading,
  } = useBalanceState();

  const { allUTXOs = [], confirmedUTXOs = [] } = useUTXOs();
  const hasUnconfirmedUTXOs = allUTXOs.length > confirmedUTXOs.length;

  const { claimRewards, showPreview } = useRewardsService();

  const isMobile = useIsMobileView();
  const formattedRewardBalance = ubbnToBaby(rewardBalance);

  const sections: StatsSection[] = [
    {
      title: {
        text: "Active stake",
        tooltip: "Your total amount of active stake.",
      },
      value: {
        text: stakedBtcBalance
          ? `${`${satoshiToBtc(stakedBtcBalance)} ${coinSymbol}`}`
          : NA_SYMBOL,
        isLoading: isBalanceLoading,
      },
      className: "col-span-1 flounder:col-span-2 whale:col-span-3 flex-col",
    },
    {
      title: {
        text: "Stakable Balance",
        tooltip: inscriptionsBtcBalance
          ? `You have ${satoshiToBtc(inscriptionsBtcBalance)} ${coinSymbol} that contains inscriptions. To use this in your stakable balance unlock them within the menu.`
          : "Stakable balance only includes confirmed Bitcoin balance of your wallet. It does not include balance stemming from pending transactions.",
      },
      value: {
        text: stakableBtcBalance
          ? `${satoshiToBtc(stakableBtcBalance).toFixed(8)} ${coinSymbol}`
          : NA_SYMBOL,
        isLoading: isBalanceLoading || hasUnconfirmedUTXOs,
      },
      className: "flex-col",
    },
    {
      title: {
        text: `${isMobile ? "BABY" : bbnNetworkName} Balance`,
      },
      value: {
        text: bbnBalance
          ? `${ubbnToBaby(bbnBalance)} ${bbnCoinSymbol}`
          : NA_SYMBOL,
        isLoading: isBalanceLoading,
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
    {
      title: { text: `${isMobile ? "BABY" : bbnNetworkName} Rewards` },
      value: {
        text: `${
          formattedRewardBalance
            ? `${formattedRewardBalance} ${bbnCoinSymbol}`
            : NA_SYMBOL
        }`,
        isLoading: rewardLoading,
      },
      className: "flex-col ",
      button: formattedRewardBalance ? (
        <ActionComponent
          className="h-5"
          title="Claim"
          onAction={showPreview}
          isDisabled={!rewardBalance || processing}
        />
      ) : undefined,
    },
  ];

  return (
    <div>
      <DataWidget label="Your staking" sections={sections} />

      <ClaimRewardModal
        processing={processing}
        open={showRewardModal}
        onClose={closeRewardModal}
        onSubmit={claimRewards}
        receivingValue={`${formattedRewardBalance}`}
        address={bbnAddress}
        transactionFee={transactionFee}
      />

      <ClaimStatusModal
        open={showProcessingModal}
        onClose={() => {
          closeProcessingModal();
          setTransactionHash("");
        }}
        loading={processing}
        transactionHash={transactionHash}
      />
    </div>
  );
}
