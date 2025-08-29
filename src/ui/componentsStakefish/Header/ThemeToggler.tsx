import { useCallback, useEffect } from "react";

import { Button, type ButtonProps } from "@/ui";
import { useAppState } from "@/ui/common/state";

import { getCookie, setCookie, THEME_COOKIE_NAME } from "../utils";

type ThemeTogglerProps = {
  buttonProps?: ButtonProps;
};
export const ThemeToggler = ({ buttonProps }: ThemeTogglerProps) => {
  const { theme, setTheme } = useAppState();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
    setCookie(THEME_COOKIE_NAME, theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  useEffect(() => {
    const theme = getCookie(THEME_COOKIE_NAME);
    if (theme) {
      setTheme(theme as "light" | "dark");
    }
  }, [setTheme]);

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
