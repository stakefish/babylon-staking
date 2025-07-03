import { DelegationList } from "@/ui/components/Delegations/DelegationList";

import { Delegations } from "./Delegations";

export function Activity() {
  return (
    <section>
      <Delegations />
      <DelegationList />
    </section>
  );
}
