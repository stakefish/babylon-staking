import { useCallback } from "react";

import { Button, type ButtonProps } from "@/ui";
import { useAppState } from "@/ui/common/state";

type ThemeTogglerProps = {
  buttonProps?: ButtonProps;
};
export const ThemeToggler = ({ buttonProps }: ThemeTogglerProps) => {
  const { theme, setTheme } = useAppState();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  return (
    <Button
      size="sm"
      color="transparent"
      icon={{ iconKey: theme === "light" ? "moon" : "sun", size: 16 }}
      onClick={toggleTheme}
      {...buttonProps}
    />
  );
};
