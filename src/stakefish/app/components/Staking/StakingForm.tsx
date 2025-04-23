import { Card, Form, useFormContext } from "@babylonlabs-io/core-ui";
import { useEffect } from "react";

import { ResponsiveDialog } from "@/app/components/Modals/ResponsiveDialog";
import { Section } from "@/app/components/Section/Section";
import { useStakingService } from "@/app/hooks/services/useStakingService";
import { useStakingState } from "@/app/state/StakingState";
import { DelegationForm } from "@/components/staking/StakingForm";
import { StakingModal } from "@/components/staking/StakingModal";
import { getNetworkConfigBTC } from "@/config/network/btc";

const { networkName } = getNetworkConfigBTC();

function FinalityProviderAutoSelector() {
  const { setValue, reset } = useFormContext();

  useEffect(() => {
    setValue(
      "finalityProvider",
      "13d16cebc8d998efb5aa94d46a449ae2e0ebb29947922185a218eeda1788c52a",
      {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      },
    );
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
    available,
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
      <ResponsiveDialog open={open} onClose={onClose}>
        <Section title={`${networkName} Staking`}>
          <div className="flex flex-col gap-6 lg:flex-row">
            <Card className="flex">
              <DelegationForm
                loading={loading}
                available={available}
                blocked={blocked}
                disabled={disabled}
                hasError={hasError}
                error={errorMessage}
                stakingInfo={stakingInfo}
              />
            </Card>
          </div>
        </Section>
      </ResponsiveDialog>
      <StakingModal />
    </Form>
  );
}
