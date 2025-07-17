import { Card, Form, useFormContext } from "@babylonlabs-io/core-ui";
import { useEffect } from "react";

import { PromptBox } from "@/ui";
import { AuthGuard } from "@/ui/common/components/Common/AuthGuard";
import { Activity } from "@/ui/common/components/Delegations/Activity";
import { DelegationForm } from "@/ui/common/components/Staking/DelegationForm";
import { StakingModal } from "@/ui/common/components/Staking/StakingModal";
import { useStakingService } from "@/ui/common/hooks/services/useStakingService";
import { useStakingState } from "@/ui/common/state/StakingState";

function FinalityProviderAutoSelector() {
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue("finalityProvider", process.env.NEXT_PUBLIC_FINALITY_PROVIDER_PK, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  }, [setValue]);

  return null;
}

export function StakingForm() {
  const {
    loading,
    validationSchema,
    stakingInfo,
    hasError,
    blocked,
    disabled,
    errorMessage,
  } = useStakingState();
  const { displayPreview } = useStakingService();

  return (
    <Form
      schema={validationSchema}
      mode="onChange"
      reValidateMode="onChange"
      onSubmit={displayPreview}
    >
      <FinalityProviderAutoSelector />
      <AuthGuard
        fallback={
          <div className="flex flex-col mx-4 items-center justify-center">
            <PromptBox className="py-[10vh]">
              <DelegationForm
                loading={loading}
                blocked={blocked}
                disabled={disabled}
                hasError={hasError}
                error={errorMessage}
                stakingInfo={stakingInfo}
              />
            </PromptBox>
          </div>
        }
      >
        <div className="flex flex-col gap-6 2xl:flex-row mx-4 justify-center">
          <div className="flex-1 min-w-0 h-fit">
            <Activity />
          </div>
          <Card className="flex w-full 2xl:w-1/4 h-fit">
            <DelegationForm
              loading={loading}
              blocked={blocked}
              disabled={disabled}
              hasError={hasError}
              error={errorMessage}
              stakingInfo={stakingInfo}
            />
          </Card>
        </div>
      </AuthGuard>

      <StakingModal />
    </Form>
  );
}
