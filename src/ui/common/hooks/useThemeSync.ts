import { useCallback, useEffect, useRef } from "react";

import {
  getCookie,
  setCookie,
  THEME_COOKIE_NAME,
} from "@/ui/componentsStakefish/utils";

type Theme = "light" | "dark";

interface UseThemeSyncProps {
  theme: string | undefined;
  setTheme: (theme: Theme) => void;
}

export const useThemeSync = ({ theme, setTheme }: UseThemeSyncProps) => {
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastKnownThemeRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      const channel = new BroadcastChannel("theme-sync");
      broadcastChannelRef.current = channel;

      channel.addEventListener("message", (event) => {
        if (event.data.type === "theme-change" && event.data.theme !== theme) {
          setTheme(event.data.theme as Theme);
        }
      });

      return () => {
        channel.close();
        broadcastChannelRef.current = null;
      };
    }
  }, [theme, setTheme]);

  const broadcastThemeChange = useCallback((newTheme: Theme) => {
    if (broadcastChannelRef.current) {
      broadcastChannelRef.current.postMessage({
        type: "theme-change",
        theme: newTheme,
      });
    }
  }, []);

  const checkThemeOnFocus = useCallback(() => {
    const cookieTheme = getCookie(THEME_COOKIE_NAME);
    if (cookieTheme && cookieTheme !== theme) {
      setTheme(cookieTheme as Theme);
    }
  }, [theme, setTheme]);

  const startPolling = useCallback(() => {
    if (pollingIntervalRef.current) return;

    pollingIntervalRef.current = setInterval(() => {
      const cookieTheme = getCookie(THEME_COOKIE_NAME);
      if (cookieTheme && cookieTheme !== lastKnownThemeRef.current) {
        lastKnownThemeRef.current = cookieTheme;
        if (cookieTheme !== theme) {
          setTheme(cookieTheme as Theme);
        }
      }
    }, 1000);
  }, [theme, setTheme]);

  const stopPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    lastKnownThemeRef.current = theme || null;

    window.addEventListener("focus", checkThemeOnFocus);

    if (!("BroadcastChannel" in window)) {
      startPolling();
    }

    return () => {
      window.removeEventListener("focus", checkThemeOnFocus);
      stopPolling();
    };
  }, [theme, checkThemeOnFocus, startPolling, stopPolling]);

  const updateTheme = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme);

      setCookie(THEME_COOKIE_NAME, newTheme);

      broadcastThemeChange(newTheme);
      lastKnownThemeRef.current = newTheme;
    },
    [setTheme, broadcastThemeChange],
  );

  useEffect(() => {
    const cookieTheme = getCookie(THEME_COOKIE_NAME);
    if (cookieTheme && cookieTheme !== theme) {
      setTheme(cookieTheme as Theme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { updateTheme };
};
