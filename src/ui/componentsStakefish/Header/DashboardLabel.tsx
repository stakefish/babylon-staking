import { cx } from "class-variance-authority";

import { Button } from "@/ui";
import { getLinkProps } from "@/ui/common/utils/stakefish";

export const DashboardLabel = ({ className }: { className?: string }) => {
  return (
    <Button
      variant="text"
      size="sm"
      {...getLinkProps("/")}
      href="/"
      className={cx("!no-underline", className)}
    >
      <div className="flex items-center gap-1.5">
        <span
          className={cx(
            "capitalize text-desktopCallout underline-offset-1",
            "underline",
          )}
        >
          Dashboard
        </span>
      </div>
    </Button>
  );
};
