import { useState } from "react";

import { AlertBox, Button } from "@/ui";
import { InfoModal } from "@/ui/common/components/Modals/InfoModal";
import { useStakingState } from "@/ui/common/state/StakingState";
import { blocksToDisplayTime } from "@/ui/common/utils/time";

export function InfoAlert() {
  const [showMore, setShowMore] = useState(false);
  const { stakingInfo } = useStakingState();

  return (
    <AlertBox
      className="flex flex-row items-start justify-between"
      variant="neutral"
      showIcon={false}
      customizedContent={
        <>
          <div className="flex flex-col gap-1 grow">
            <h5 className="text-[14px] font-semibold font-sans">Please note</h5>
            <p className="text-callout font-sans text-pretty">
              You can unbond and withdraw your stake anytime with an unbonding
              time of {blocksToDisplayTime(stakingInfo?.unbondingTime)}.
            </p>
            <div className="mt-2">
              <Button
                size="sm"
                variant="text"
                color="secondary"
                rel="noopener noreferrer"
                className="cursor-pointer font-sans text-secondary-main/90 hover:text-secondary-main normal-case w-auto font-normal underline hover:no-underline"
                onClick={() => setShowMore(true)}
              >
                Learn More
              </Button>
            </div>
          </div>
          <InfoModal open={showMore} onClose={() => setShowMore(false)} />
        </>
      }
    ></AlertBox>
  );
}
