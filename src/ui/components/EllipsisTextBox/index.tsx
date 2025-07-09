import type { HTMLAttributes } from "react";

import { cx } from "@/ui";

export interface EllipsisTextBoxProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const EllipsisTextBox = ({
  children,
  className,
}: EllipsisTextBoxProps) => {
  return (
    <div
      className={cx(
        " overflow-hidden text-ellipsis whitespace-nowrap",
        className,
      )}
    >
      {children}
    </div>
  );
};
