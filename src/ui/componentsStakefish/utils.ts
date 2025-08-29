export const THEME_COOKIE_NAME = "stakefish:theme";

const DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ".stake.fish";

export const setCookie = (name: string, value: string, withExpiry = false) => {
  const expiryDate = new Date(Date.now() + 86400000 * 365);

  if (withExpiry) {
    document.cookie = `${name}=${value}; expires=${expiryDate.toUTCString()}; path=/; domain=${DOMAIN}`;
  } else {
    document.cookie = `${name}=${value}; path=/; domain=${DOMAIN}`;
  }
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const cookie = cookies.find((cookie) => cookie.trim().startsWith(`${name}=`));

  return cookie ? cookie.split("=")[1] : null;
};
