import { AuthGuard } from "@/components/common/AuthGuard";
import { DelegationList } from "@/components/delegations/DelegationList";

import { Delegations } from "./Delegations";

export function Activity() {
  return (
    <AuthGuard>
      <Delegations />
      <DelegationList />
    </AuthGuard>
  );
}
