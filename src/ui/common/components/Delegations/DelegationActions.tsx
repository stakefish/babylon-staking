import { Popover } from "@babylonlabs-io/core-ui";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { twJoin } from "tailwind-merge";

import { Button, ButtonProps, LoadingIcon } from "@/ui";
import { getNetworkConfigBBN } from "@/ui/common/config/network/bbn";
import { useBbnQuery } from "@/ui/common/hooks/client/rpc/queries/useBbnQuery";
import { useStakingManagerService } from "@/ui/common/hooks/services/useStakingManagerService";
import { useFinalityProviderState } from "@/ui/common/state/FinalityProviderState";
import { useStakingState } from "@/ui/common/state/StakingState";
import { DelegationState } from "@/ui/common/types/delegations";
import { FinalityProviderState } from "@/ui/common/types/finalityProviders";

const sharedButtonProps: ButtonProps = {
  application: true,
  variant: "text",
  size: "sm",
  color: "primary",
  className:
    "block normal-case font-normal !p-2 -my-2.5 !-mx-2 tracking-normal underline-offset-1",
};

const registerButtonProps: ButtonProps = {
  application: true,
  variant: "text",
  size: "xs",
  color: "primary",
  className:
    "block !p-2 -my-2.5 !-mx-2 tracking-wide underline-offset-2 underline decoration-orange40 hover:no-underline text-orange40",
};

interface DelegationActionsProps {
  state: string;
  intermediateState?: string;
  isEligibleForRegistration: boolean;
  isFpRegistered: boolean;
  stakingTxHashHex: string;
  finalityProviderPkHex: string;
  onRegistration: () => Promise<void>;
  onUnbond: (id: string) => void;
  onWithdraw: (id: string) => void;
}

export const DelegationActions: React.FC<DelegationActionsProps> = ({
  state,
  intermediateState,
  isEligibleForRegistration,
  isFpRegistered,
  stakingTxHashHex,
  finalityProviderPkHex,
  onRegistration,
  onUnbond,
  onWithdraw,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { getRegisteredFinalityProvider } = useFinalityProviderState();
  const { disabled } = useStakingState();
  const { isLoading } = useStakingManagerService();
  const isStakingManagerReady = !isLoading;

  const {
    balanceQuery: { data: bbnBalance = 0 },
  } = useBbnQuery();

  const { networkFullName, coinSymbol } = getNetworkConfigBBN();

  const finalityProvider = getRegisteredFinalityProvider(finalityProviderPkHex);
  const fpState = finalityProvider?.state;
  const isSlashed = fpState === FinalityProviderState.SLASHED;

  const hasInsufficientBalance = bbnBalance === 0;
  const insufficientBalanceMessage = hasInsufficientBalance
    ? `Insufficient ${coinSymbol} Balance in ${networkFullName} Wallet`
    : "";

  const getDelegationTooltip = () => {
    if (!isFpRegistered) {
      return "Registration is not available as your finality provider has not yet registered to Babylon Genesis.";
    }

    if (disabled) {
      return disabled.title;
    }

    if (state === DelegationState.ACTIVE && !isEligibleForRegistration) {
      return "Your Finality Provider has registered, however, only Phase-1 Cap-1 stakes are allowed to register at the moment. Please check the live countdown on <a href='https://www.mintscan.io/babylon/block/139920' target='_blank' rel='noopener noreferrer' class='text-accent-primary underline'>Mintscan</a>.";
    }

    return insufficientBalanceMessage;
  };

  // We no longer show the registration button when the unbonding transaction is pending
  if (intermediateState === DelegationState.INTERMEDIATE_UNBONDING) {
    return null;
  }

  // Unbonded
  if (
    state === DelegationState.UNBONDED &&
    intermediateState !== DelegationState.INTERMEDIATE_WITHDRAWAL
  ) {
    return (
      <div className="flex justify-start -my-2">
        <Button
          {...sharedButtonProps}
          onClick={() => onWithdraw(stakingTxHashHex)}
          disabled={
            intermediateState === DelegationState.INTERMEDIATE_WITHDRAWAL
          }
        >
          Withdraw
        </Button>
      </div>
    );
  }

  // If FP is slashed, only show unbond button
  if (
    isSlashed &&
    intermediateState !== DelegationState.INTERMEDIATE_WITHDRAWAL
  ) {
    return (
      <div className="flex justify-start -my-2">
        <Button
          {...sharedButtonProps}
          onClick={() => onUnbond(stakingTxHashHex)}
          disabled={!isStakingManagerReady}
          className="flex items-center gap-1"
        >
          Unbond
          {!isStakingManagerReady && (
            <LoadingIcon size="goldfish" className="text-accent-primary" />
          )}
        </Button>
      </div>
    );
  }

  // Active, eligible for registration
  if (state === DelegationState.ACTIVE || isEligibleForRegistration) {
    const tooltipId = `tooltip-registration-${stakingTxHashHex}`;

    return (
      <div
        className="flex justify-start -my-2"
        data-tooltip-id={tooltipId}
        data-tooltip-html={getDelegationTooltip()}
      >
        <div className="flex items-center gap-1">
          <Button
            {...registerButtonProps}
            onClick={onRegistration}
            disabled={
              Boolean(disabled) ||
              intermediateState ===
                DelegationState.INTERMEDIATE_TRANSITIONING ||
              (state === DelegationState.ACTIVE &&
                !isEligibleForRegistration) ||
              hasInsufficientBalance
            }
          >
            Register
          </Button>
          <Tooltip
            id={tooltipId}
            className="tooltip-wrap"
            clickable={true}
            delayHide={500}
          />
        </div>

        <button
          ref={setAnchorEl}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          className="ml-1 py-2 px-0 hover:bg-secondary-highlight rounded"
        >
          <IoMdMore className="size-4" />
        </button>

        <Popover
          open={isPopoverOpen}
          anchorEl={anchorEl}
          placement="bottom-end"
          onClickOutside={() => setIsPopoverOpen(false)}
          className="bg-surface p-4 rounded border border-secondary-strokeLight w-48 shadow-md"
        >
          <Button
            variant="menuItem"
            size="xs"
            application
            onClick={() => {
              if (isStakingManagerReady) {
                onUnbond(stakingTxHashHex);
                setIsPopoverOpen(false);
              }
            }}
            className={twJoin(
              "flex items-center gap-1 text-accent-primary transition-all",
              isStakingManagerReady
                ? "hover:brightness-125"
                : "opacity-50 cursor-not-allowed",
            )}
          >
            Unbond
            {!isStakingManagerReady && (
              <LoadingIcon
                size="goldfish"
                className="text-accent-primary ml-1"
              />
            )}
          </Button>
        </Popover>
      </div>
    );
  }

  return null;
};
