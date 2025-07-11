import { NetworkConfig } from "@/ui/common/config/network";
import { BbnStakingParamsVersion } from "@/ui/common/types/networkInfo";

import { ConfirmationModal } from "./ConfirmationModal";

interface UnbondModalProps {
  processing: boolean;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  networkConfig: NetworkConfig;
  param: BbnStakingParamsVersion | null;
}

export const SlashingModal = (props: UnbondModalProps) => {
  const { networkConfig, param } = props;
  const slashingRate = (param?.slashing?.slashingRate ?? 0) * 100;

  return (
    <ConfirmationModal title="Withdraw Balance" {...props}>
      <div className="font-medium text-callout text-itemSecondaryDefault text-pretty pt-8 pb-10">
        Your finality provider equivocated (double-voted) leading to{" "}
        {slashingRate}% of your stake getting slashed. You are about to withdraw
        the remaining balance. A transaction fee will be deducted from your
        stake by the {networkConfig.btc.networkName} network.
      </div>
    </ConfirmationModal>
  );
};
