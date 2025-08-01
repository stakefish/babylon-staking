import { FaBitcoin } from "react-icons/fa";

import { Hint } from "@/ui/common/components/Common/Hint";
import { DelegationActions } from "@/ui/common/components/Delegations/DelegationActions";
import { getNetworkConfigBTC } from "@/ui/common/config/network/btc";
import { DOCUMENTATION_LINKS } from "@/ui/common/constants";
import { useFinalityProviderState } from "@/ui/common/state/FinalityProviderState";
import {
  DelegationState as DelegationStateEnum,
  type Delegation as DelegationInterface,
} from "@/ui/common/types/delegations";
import { FinalityProviderState } from "@/ui/common/types/finalityProviders";
import { satoshiToBtc } from "@/ui/common/utils/btc";
import { getState, getStateTooltip } from "@/ui/common/utils/getState";
import { maxDecimals } from "@/ui/common/utils/maxDecimals";
import { durationTillNow } from "@/ui/common/utils/time";
import { trim } from "@/ui/common/utils/trim";

import { DelegationCell } from "./components/DelegationCell";

interface DelegationProps {
  currentTime: number;
  delegation: DelegationInterface;
  onWithdraw: (id: string) => void;
  onUnbond: (id: string) => void;
  onRegistration: (delegation: DelegationInterface) => Promise<void>;
  // This attribute is set when an action has been taken by the user
  // that should change the status but the back-end
  // has not had time to reflect this change yet
  intermediateState?: string;
}

const { coinName, mempoolApiUrl } = getNetworkConfigBTC();

interface FinalityProviderDisplayProps {
  fpName: string;
  isSlashed: boolean;
  isJailed: boolean;
}

const FinalityProviderDisplay: React.FC<FinalityProviderDisplayProps> = ({
  fpName,
  isSlashed,
  isJailed,
}) => {
  if (isSlashed) {
    return (
      <Hint
        tooltip={
          <span>
            This finality provider has been slashed.{" "}
            <a
              className="text-error-main"
              target="_blank"
              href={DOCUMENTATION_LINKS.TECHNICAL_PRELIMINARIES}
            >
              Learn more
            </a>
          </span>
        }
        status="error"
      >
        <span className="text-error-main">{fpName}</span>
      </Hint>
    );
  }

  if (isJailed) {
    return (
      <Hint
        tooltip={
          <span>
            This finality provider has been jailed.{" "}
            <a
              className="text-secondary-main"
              target="_blank"
              href={DOCUMENTATION_LINKS.TECHNICAL_PRELIMINARIES}
            >
              Learn more
            </a>
          </span>
        }
        status="error"
      >
        <span className="text-error-main">{fpName}</span>
      </Hint>
    );
  }

  return <>{fpName}</>;
};

const DelegationState: React.FC<{
  displayState: string;
  isSlashed: boolean;
  isFPResgistered: boolean;
}> = ({ displayState, isSlashed, isFPResgistered }) => {
  const renderStateTooltip = () => {
    if (!isFPResgistered) {
      return "Your Finality Provider is not registered on Babylon Genesis. You need to wait for their registration to become eligible to register your stake to Babylon Genesis";
    }

    if (isSlashed) {
      return (
        <span>
          This finality provider has been slashed.{" "}
          <a
            className="text-secondary-main"
            target="_blank"
            href={DOCUMENTATION_LINKS.TECHNICAL_PRELIMINARIES}
          >
            Learn more
          </a>
        </span>
      );
    }

    if (displayState === DelegationStateEnum.OVERFLOW) {
      return "Stake was over the Phase-1 staking cap it was created in";
    }

    return getStateTooltip(displayState);
  };

  const renderState = () => {
    if (isSlashed) {
      return <span className="text-error-main">Slashed</span>;
    }
    return getState(displayState);
  };

  return (
    <Hint
      tooltip={renderStateTooltip()}
      status={isSlashed ? "warning" : "default"}
      wrapperClassName="whitespace-pre-line break-words"
    >
      {renderState()}
    </Hint>
  );
};

export const Delegation: React.FC<DelegationProps> = ({
  currentTime,
  delegation,
  onWithdraw,
  onUnbond,
  onRegistration,
  intermediateState,
}) => {
  const {
    stakingTx,
    stakingTxHashHex,
    state,
    stakingValueSat,
    isOverflow,
    finalityProviderPkHex,
    isEligibleForTransition,
  } = delegation;

  const { startTimestamp } = stakingTx;

  const { getRegisteredFinalityProvider, getFinalityProviderName } =
    useFinalityProviderState();

  const finalityProvider = getRegisteredFinalityProvider(finalityProviderPkHex);
  const fpState = finalityProvider?.state;
  const fpName = getFinalityProviderName(finalityProviderPkHex) ?? "-";
  const isActive = state === DelegationStateEnum.ACTIVE;
  const isFpRegistered = finalityProvider !== null;
  const isSlashed = fpState === FinalityProviderState.SLASHED;
  const isJailed = fpState === FinalityProviderState.JAILED;

  const displayState =
    isOverflow && isActive
      ? DelegationStateEnum.OVERFLOW
      : intermediateState || state;

  return (
    <>
      <tr className="bg-surface app-table-row table-row">
        <DelegationCell className="whitespace-pre-line break-words">
          {durationTillNow(startTimestamp, currentTime)}
        </DelegationCell>

        <DelegationCell>
          <FinalityProviderDisplay
            fpName={fpName}
            isSlashed={isSlashed}
            isJailed={isJailed}
          />
        </DelegationCell>

        <DelegationCell>
          <div className="flex gap-1 items-center">
            <FaBitcoin className="text-primary" />
            <p>
              {maxDecimals(satoshiToBtc(stakingValueSat), 8)} {coinName}
            </p>
          </div>
        </DelegationCell>

        <DelegationCell>
          <a
            href={`${mempoolApiUrl}/tx/${stakingTxHashHex}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {trim(stakingTxHashHex)}
          </a>
        </DelegationCell>
        {/*
          we need to center the text without the tooltip
          add its size 12px and gap 4px, 16/2 = 8px
          */}
        <DelegationCell>
          <DelegationState
            displayState={displayState}
            isSlashed={isSlashed}
            isFPResgistered={isFpRegistered}
          />
        </DelegationCell>

        <DelegationCell>
          <DelegationActions
            state={state}
            intermediateState={intermediateState}
            isEligibleForRegistration={isEligibleForTransition}
            isFpRegistered={isFpRegistered}
            stakingTxHashHex={stakingTxHashHex}
            finalityProviderPkHex={finalityProviderPkHex}
            onRegistration={() => onRegistration(delegation)}
            onUnbond={onUnbond}
            onWithdraw={onWithdraw}
          />
        </DelegationCell>
      </tr>
    </>
  );
};
