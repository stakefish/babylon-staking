import { Delegation } from "@/ui/common/types/delegations";

export const toLocalStorageIntermediateDelegation = (
  stakingTxHashHex: string,
  stakerPkHex: string,
  finalityProviderPkHex: string,
  stakingValueSat: number,
  stakingTxHex: string,
  timelock: number,
  state: string,
): Delegation => ({
  stakingTxHashHex,
  stakerPkHex,
  finalityProviderPkHex,
  state,
  stakingValueSat,
  stakingTx: {
    txHex: stakingTxHex,
    outputIndex: 0,
    startTimestamp: new Date().toISOString(),
    startHeight: 0,
    timelock,
  },
  isOverflow: false,
  isEligibleForTransition: false,
  unbondingTx: undefined,
});
