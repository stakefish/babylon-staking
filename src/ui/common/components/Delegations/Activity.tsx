import { DelegationList } from "@/ui/common/components/Delegations/DelegationList";

import { Delegations } from "./Delegations";

export function Activity() {
  return (
    <section>
      <Delegations />
      <DelegationList />
    </section>
  );
}
