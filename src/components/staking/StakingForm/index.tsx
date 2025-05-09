import { HiddenField } from "@babylonlabs-io/core-ui";
import Image from "next/image";

import { StatusView } from "@/app/components/Staking/FinalityProviders/FinalityProviderTableStatusView";
import apiNotAvailable from "@/app/components/Staking/Form/States/api-not-available.svg";
import { Message } from "@/app/components/Staking/Form/States/Message";
import stakingUnavailableIcon from "@/app/components/Staking/Form/States/staking-unavailable.svg";
import walletIcon from "@/app/components/Staking/Form/States/wallet-icon.svg";
import { WalletNotConnected } from "@/app/components/Staking/Form/States/WalletNotConnected";
import { BBN_FEE_AMOUNT } from "@/app/constants";
import { useBalanceState } from "@/app/state/BalanceState";
import { AuthGuard } from "@/components/common/AuthGuard";
import { getNetworkConfigBTC } from "@/config/network/btc";
import { LoadingIcon, PromptBox } from "@/ui";

import { AmountField } from "./components/AmountField";
import { BBNFeeAmount } from "./components/BBNFeeAmount";
import { BTCFeeAmount } from "./components/BTCFeeAmount";
import { BTCFeeRate } from "./components/BTCFeeRate";
import { FeeSection } from "./components/FeeSection";
import { InfoAlert } from "./components/InfoAlert";
import { FormOverlay } from "./components/Overlay";
import { SubmitButton } from "./components/SubmitButton";
import { TermField } from "./components/TermField";
import { Total } from "./components/Total";

const { networkName } = getNetworkConfigBTC();

interface DelegationFormProps {
  loading?: boolean;
  blocked?: boolean;
  available?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  error?: string;
  stakingInfo?: {
    minFeeRate: number;
    maxFeeRate: number;
    defaultFeeRate: number;
    minStakingTimeBlocks: number;
    maxStakingTimeBlocks: number;
    minStakingAmountSat: number;
    maxStakingAmountSat: number;
    defaultStakingTimeBlocks?: number;
  };
}

export function DelegationForm({
  loading,
  blocked,
  available,
  disabled = false,
  hasError,
  error,
  stakingInfo,
}: DelegationFormProps) {
  const { stakableBtcBalance } = useBalanceState();

  if (loading) {
    return (
      <PromptBox className="py-[calc(10vh+16px)]">
        <StatusView
          className="flex-1 h-auto"
          icon={<LoadingIcon size="tilapia" />}
        />
      </PromptBox>
    );
  }

  if (blocked) {
    return (
      <Message
        title="Unavailable in Your Region"
        message={error ?? ""}
        icon={
          <Image
            src={walletIcon}
            alt="Unavailable in Your Region"
            width={120}
            height={122}
            className="rotate-12"
          />
        }
      />
    );
  }

  if (disabled) {
    return (
      <Message
        title="Staking Currently Unavailable"
        message="Staking is temporarily disabled due to network downtime. New stakes are paused until the network resumes."
        icon={
          <Image
            src={stakingUnavailableIcon}
            alt="Staking Unavailable"
            width={120}
            height={122}
          />
        }
      />
    );
  }

  if (!available) {
    return (
      <Message
        title="New Stakes Registration Temporarily Unavailable"
        message={
          <>
            Creation of new stakes will be available soon. Please check the live
            countdown on{" "}
            <a
              href="https://www.mintscan.io/babylon/block/139920"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-light hover:underline"
            >
              Mintscan
            </a>
            . Phase-1 Cap-1 stakers can register their stakes to Babylon Genesis
            from the Activity section once connected.
          </>
        }
        icon={
          <Image
            src={stakingUnavailableIcon}
            alt="Staking Not Started"
            width={120}
            height={122}
          />
        }
      />
    );
  }

  if (hasError) {
    return (
      <Message
        icon={
          <Image
            src={apiNotAvailable}
            alt="Staking is not available"
            width={120}
            height={122}
            className="rotate-12"
          />
        }
        title="Staking is not available"
        message={error ?? ""}
      />
    );
  }

  const maxAmount = Math.min(
    stakableBtcBalance,
    stakingInfo?.maxStakingAmountSat || 0,
  );

  return (
    <AuthGuard fallback={<WalletNotConnected />}>
      <div className="relative flex flex-1 flex-col gap-6">
        <h4 className="font-semibold text-h6 text-pretty font-mono">
          {networkName} Staking
        </h4>

        <InfoAlert />

        <div className="flex flex-1 flex-col">
          <FormOverlay>
            <TermField
              defaultValue={stakingInfo?.defaultStakingTimeBlocks}
              min={stakingInfo?.minStakingTimeBlocks}
              max={stakingInfo?.maxStakingTimeBlocks}
            />

            <AmountField
              min={stakingInfo?.minStakingAmountSat}
              max={maxAmount}
            />

            <HiddenField name="feeRate" defaultValue="0" />

            <HiddenField name="feeAmount" defaultValue="0" />

            <FeeSection>
              <div className="flex flex-col gap-4 mt-4">
                <BTCFeeRate defaultRate={stakingInfo?.defaultFeeRate} />
                <BTCFeeAmount />
                {BBN_FEE_AMOUNT && <BBNFeeAmount amount={BBN_FEE_AMOUNT} />}
              </div>

              <div className="divider my-4" />

              <Total />
            </FeeSection>
          </FormOverlay>

          <SubmitButton />
        </div>
      </div>
    </AuthGuard>
  );
}
