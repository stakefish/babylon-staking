import { useCallback } from "react";

import { Button, type ButtonProps } from "@/ui";
import { useThemeSync } from "@/ui/common/hooks/useThemeSync";
import { useAppState } from "@/ui/common/state";

type ThemeTogglerProps = {
  buttonProps?: ButtonProps;
};
export const ThemeToggler = ({ buttonProps }: ThemeTogglerProps) => {
  const { theme, setTheme } = useAppState();
  const { updateTheme } = useThemeSync({ theme, setTheme });

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    updateTheme(newTheme);
  }, [theme, updateTheme]);

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
