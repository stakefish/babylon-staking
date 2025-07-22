import { PiWarningOctagonFill } from "react-icons/pi";

import { Button } from "@/ui/components/Button";

export const SfBanner = () => {
  return (
    <div className="flex flex-row gap-2 p-2 m-4 bg-backgroundWarningDefault border border-itemWarningMute text-sm text-itemWarningDefault items-center justify-between">
      <div className="flex flex-row gap-2 items-center">
        <PiWarningOctagonFill size={18} />
        <div className="font-sans">
          <strong>Important Update for Early Stakers:</strong> For users staked
          before 10 April 2025, you must register to join Phase 2 to earn
          rewards.{" "}
          <Button
            variant="text"
            size="sm"
            endIcon={{ iconKey: "share", size: 12 }}
            className="normal-case font-normal underline hover:no-underline"
            href="https://blog.stake.fish/how-to-stake-bitcoin-with-stakefish-on-babylon-phase-2"
            rel="noopener noreferrer"
          >
            Read more
          </Button>
        </div>
      </div>
    </div>
  );
};
