import { PropsWithChildren } from "react";

import { ResponsiveDialog } from "@/app/components/Modals/ResponsiveDialog";

import { StakingForm } from "../Staking/StakingForm";

interface StakeNowModalProps {
  className?: string;
  open: boolean;
  onClose: () => void;
}

export const StakeNowModal = ({
  className,
  open,
  onClose,
}: PropsWithChildren<StakeNowModalProps>) => {
  return (
    <ResponsiveDialog className={className} open={open} onClose={onClose}>
      <StakingForm />
    </ResponsiveDialog>
  );
};
