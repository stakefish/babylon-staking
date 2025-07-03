import { EmptyPrompt, PromptBox } from "@/ui";
import { getNetworkConfigBBN } from "@/ui/config/network/bbn";

const { networkFullName: bbnNetworkFullName } = getNetworkConfigBBN();

export const NoDelegations = () => (
  <PromptBox className="py-[10vh]">
    <EmptyPrompt
      title={`No ${bbnNetworkFullName} Stakes`}
      subtitle="This is where your registered stakes will be displayed."
    />
  </PromptBox>
);
