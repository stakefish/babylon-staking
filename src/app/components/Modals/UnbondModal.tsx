import { useNetworkInfo } from "@/app/hooks/client/api/useNetworkInfo";
import { getNetworkConfigBTC } from "@/config/network/btc";
import { satoshiToBtc } from "@/utils/btc";
import { maxDecimals } from "@/utils/maxDecimals";
import { blocksToDisplayTime } from "@/utils/time";

import { ConfirmationModal } from "./ConfirmationModal";

interface UnbondModalProps {
  processing: boolean;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
const { networkName, coinSymbol } = getNetworkConfigBTC();

export const UnbondModal = ({
  open,
  onClose,
  onSubmit,
  processing,
}: UnbondModalProps) => {
  const { data: networkInfo } = useNetworkInfo();

  if (!networkInfo) {
    return null;
  }

  const unbondingTime = blocksToDisplayTime(
    networkInfo.params.bbnStakingParams.latestParam.unbondingTime,
  );
  const unbondingFeeBtc = maxDecimals(
    satoshiToBtc(
      networkInfo.params.bbnStakingParams.latestParam.unbondingFeeSat,
    ),
    8,
  );

  return (
    <ConfirmationModal
      title="Unbond"
      processing={processing}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <div className="font-medium text-callout text-itemSecondaryDefault text-balance pb-8 pt-4">
        You are about to unbond your stake before its expiration. A transaction
        fee of{" "}
        <span className="text-itemPrimaryDefault">
          {unbondingFeeBtc} {coinSymbol}
        </span>{" "}
        will be deduced from your stake by the{" "}
        <span className="text-itemPrimaryDefault">{networkName}</span> network.
        <br /> <br />
        The expected unbonding time will be about{" "}
        <span className="text-itemPrimaryDefault">{unbondingTime}</span>. After
        unbonded, you will need to use this dashboard to withdraw your stake for
        it to appear in your wallet.
      </div>
    </ConfirmationModal>
  );
};
