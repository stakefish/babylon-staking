"use client";

import type { PropsWithChildren } from "react";

import {
  useMixpanelIdentify,
  useMixpanelPageTracker,
} from "@/ui/common/hooks/useMixpanel";

export const MixpanelTracker = ({
  children,
}: PropsWithChildren<Record<never, never>>) => {
  useMixpanelIdentify();
  useMixpanelPageTracker();
  return <>{children}</>;
};
