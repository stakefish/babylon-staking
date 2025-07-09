import Link from "next/link";

import { Box, Button, ButtonProps, Header as HeaderComponent, cx } from "@/ui";
import { useMediaQueryContext } from "@/ui/context/ui/MediaQueryContext";

export interface HeaderProps {
  active?: boolean;
  monochromeLogo?: boolean;
  pictogramOnly?: boolean;
  className?: string;
  variant?: "dark";
}

export const Header = ({
  active = true,
  monochromeLogo,
  className,
  variant,
  pictogramOnly = true,
  ...props
}: HeaderProps) => {
  const { up } = useMediaQueryContext();

  const isSm = Boolean(up?.flounder);
  const forcedDarkMode = variant === "dark";

  const activeButtonProps: ButtonProps = {
    color: active && !isSm ? "secondary" : "transparent",
    variant: active && !isSm ? "outline" : "primary",
    className: cx(
      "ring-0 flounder:gap-1 gap-1 tracking-tight flounder:tracking-normal",
      forcedDarkMode && !active && "text-neutral100",
    ),
  };

  const actionsContent = (
    <Box flex className="gap-3.5 trout:gap-1">
      <Button
        size="sm"
        Element={Link}
        href="/"
        endIcon={{ iconKey: "chevronRight", size: isSm ? 16 : 14 }}
        tabIndex={0}
        {...activeButtonProps}
      >
        Dashboard
      </Button>
    </Box>
  );

  return (
    <HeaderComponent
      filled={active}
      bordered={active}
      ElementLogo={Link}
      monochromeLogo={monochromeLogo}
      actionsContent={actionsContent}
      className={className}
      variant={variant}
      pictogramOnly={pictogramOnly}
      {...props}
    />
  );
};
