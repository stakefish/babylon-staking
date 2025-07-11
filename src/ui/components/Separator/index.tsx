import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cx } from "@/ui";

export type SeparatorProps = Omit<
  SeparatorPrimitive.SeparatorProps,
  "orientation"
>;

export const Separator = ({ className, ...props }: SeparatorProps) => {
  const classNames = cx("h-[1px] bg-itemPrimaryMute", className);

  return (
    <SeparatorPrimitive.Root
      orientation="horizontal"
      className={classNames}
      {...props}
    ></SeparatorPrimitive.Root>
  );
};
