import { PiWarningOctagonFill } from "react-icons/pi";

export const SfBanner = () => {
  return (
    <div className="flex flex-row gap-2 p-2 m-4 bg-backgroundWarningDefault border border-itemWarningMute text-sm text-itemWarningDefault items-center justify-between">
      <div className="flex flex-row gap-2 items-center">
        <PiWarningOctagonFill size={18} />
        <div className="font-sans">
          <strong>Important Update for Early Stakers:</strong> For users staked
          before 10 April 2025, you must register to join Phase 2 to earn
          rewards.{" "}
          <a
            href="https://blog.stake.fish/how-to-stake-bitcoin-with-stakefish-on-babylon-phase-2"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};
