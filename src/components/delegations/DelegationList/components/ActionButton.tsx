import { DELEGATION_ACTIONS as ACTIONS } from "@/app/constants";
import { ActionType } from "@/app/hooks/services/useDelegationService";
import {
  DelegationV2StakingState as DelegationState,
  DelegationWithFP,
} from "@/app/types/delegationsV2";
import { FinalityProviderState } from "@/app/types/finalityProviders";
import { Hint } from "@/components/common/Hint";
import { Button } from "@/ui";

interface ActionButtonProps {
  tooltip?: string | JSX.Element;
  delegation: DelegationWithFP;
  onClick?: (action: ActionType, delegation: DelegationWithFP) => void;
}

type Actions = Record<
  string,
  Record<string, { action: ActionType; title: string }>
>;

const ACTION_BUTTON_PROPS: Actions = {
  [FinalityProviderState.ACTIVE]: {
    [DelegationState.VERIFIED]: {
      action: ACTIONS.STAKE,
      title: "Stake",
    },
    [DelegationState.ACTIVE]: {
      action: ACTIONS.UNBOND,
      title: "Unbond",
    },
    [DelegationState.EARLY_UNBONDING_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_EARLY_UNBONDING,
      title: "Withdraw",
    },
    [DelegationState.TIMELOCK_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_TIMELOCK,
      title: "Withdraw",
    },
    [DelegationState.TIMELOCK_SLASHING_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_TIMELOCK_SLASHING,
      title: "Withdraw",
    },
    [DelegationState.EARLY_UNBONDING_SLASHING_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_EARLY_UNBONDING_SLASHING,
      title: "Withdraw",
    },
  },
  [FinalityProviderState.INACTIVE]: {
    [DelegationState.VERIFIED]: {
      action: ACTIONS.STAKE,
      title: "Stake",
    },
    [DelegationState.ACTIVE]: {
      action: ACTIONS.UNBOND,
      title: "Unbond",
    },
    [DelegationState.EARLY_UNBONDING_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_EARLY_UNBONDING,
      title: "Withdraw",
    },
    [DelegationState.TIMELOCK_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_TIMELOCK,
      title: "Withdraw",
    },
    [DelegationState.TIMELOCK_SLASHING_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_TIMELOCK_SLASHING,
      title: "Withdraw",
    },
    [DelegationState.EARLY_UNBONDING_SLASHING_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_EARLY_UNBONDING_SLASHING,
      title: "Withdraw",
    },
  },
  [FinalityProviderState.JAILED]: {
    [DelegationState.VERIFIED]: {
      action: ACTIONS.STAKE,
      title: "Stake",
    },
    [DelegationState.ACTIVE]: {
      action: ACTIONS.UNBOND,
      title: "Unbond",
    },
    [DelegationState.EARLY_UNBONDING_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_EARLY_UNBONDING,
      title: "Withdraw",
    },
    [DelegationState.TIMELOCK_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_TIMELOCK,
      title: "Withdraw",
    },
    [DelegationState.TIMELOCK_SLASHING_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_TIMELOCK_SLASHING,
      title: "Withdraw",
    },
    [DelegationState.EARLY_UNBONDING_SLASHING_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_EARLY_UNBONDING_SLASHING,
      title: "Withdraw",
    },
  },
  [FinalityProviderState.SLASHED]: {
    [DelegationState.ACTIVE]: {
      action: ACTIONS.UNBOND,
      title: "Unbond",
    },
    [DelegationState.EARLY_UNBONDING_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_EARLY_UNBONDING,
      title: "Withdraw",
    },
    [DelegationState.TIMELOCK_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_TIMELOCK,
      title: "Withdraw",
    },
    [DelegationState.TIMELOCK_SLASHING_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_TIMELOCK_SLASHING,
      title: "Withdraw",
    },
    [DelegationState.EARLY_UNBONDING_SLASHING_WITHDRAWABLE]: {
      action: ACTIONS.WITHDRAW_ON_EARLY_UNBONDING_SLASHING,
      title: "Withdraw",
    },
  },
};

export function ActionButton({
  delegation,
  tooltip,
  onClick,
}: ActionButtonProps) {
  const buttonProps =
    ACTION_BUTTON_PROPS[delegation.fp?.state]?.[delegation.state];

  if (!buttonProps) return null;

  return (
    <Hint tooltip={tooltip} attachToChildren wrapperClassName="-my-2.5">
      <Button
        application
        variant="text"
        size="xs"
        color="primary"
        className="block !p-2 -my-2.5 !-mx-2 tracking-wide underline-offset-2 underline decoration-itemSecondaryDefault hover:no-underline"
        onClick={() => onClick?.(buttonProps.action, delegation)}
      >
        {buttonProps.title}
      </Button>
    </Hint>
  );
}
