import {
  Button,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@babylonlabs-io/core-ui";

import { getNetworkConfigBTC } from "@/ui/common/config/network/btc";
import { useNetworkInfo } from "@/ui/common/hooks/client/api/useNetworkInfo";
import { blocksToDisplayTime } from "@/ui/common/utils/time";

import { ResponsiveDialog } from "./ResponsiveDialog";

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
}

const { coinName } = getNetworkConfigBTC();

export function InfoModal({ open, onClose }: InfoModalProps) {
  const { data: networkInfo } = useNetworkInfo();

  const unbondingTime = blocksToDisplayTime(
    networkInfo?.params.bbnStakingParams?.latestParam?.unbondingTime,
  );
  const maxStakingPeriod = blocksToDisplayTime(
    networkInfo?.params.bbnStakingParams?.latestParam?.maxStakingTimeBlocks,
  );

  return (
    <ResponsiveDialog open={open} onClose={onClose}>
      <DialogHeader
        title="Stake Timelock and On-Demand Unbonding"
        onClose={onClose}
        className="text-accent-primary"
      />
      <DialogBody className="flex flex-col pb-8 pt-4 text-accent-primary gap-4">
        <div className="flex flex-col items-start gap-4">
          <div className="font-medium text-callout text-pretty">
            Stakes made through this dashboard are locked for up to{" "}
            {maxStakingPeriod}. You can on-demand unbond at any time, with
            withdrawal available after a {unbondingTime} unbonding period. If
            the maximum staking period expires, your stake becomes withdrawable
            automatically, with no need for prior unbonding.
          </div>
          <div className="font-medium text-callout text-itemSecondaryDefault text-pretty italic">
            Note: Timeframes are approximate, based on an average {coinName}{" "}
            block time of 10 minutes.
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex gap-4">
        <Button
          variant="contained"
          className="flex-1 text-xs sm:text-base"
          onClick={onClose}
        >
          Done
        </Button>
      </DialogFooter>
    </ResponsiveDialog>
  );
}
