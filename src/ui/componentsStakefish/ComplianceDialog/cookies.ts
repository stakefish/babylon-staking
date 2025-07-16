import { getComplianceConfig } from "./config";

export const COMPLIANCE_COOKIE_NAME = getComplianceConfig().cookie.name;

const DOMAIN = getComplianceConfig().cookie.domain;

export const setComplianceCookie = () => {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  console.log("Setting compliance cookie", COMPLIANCE_COOKIE_NAME, DOMAIN);

  document.cookie = `${COMPLIANCE_COOKIE_NAME}=true; expires=${expiryDate.toUTCString()}; path=/; domain=${DOMAIN}; SameSite=None; Secure; HttpOnly`;
};

export const getComplianceCookie = (): boolean => {
  if (typeof document === "undefined") return false;

  const cookies = document.cookie.split(";");
  const complianceCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${COMPLIANCE_COOKIE_NAME}=`),
  );

  return complianceCookie ? complianceCookie.split("=")[1] === "true" : false;
};

export const clearComplianceCookie = () => {
  document.cookie = `${COMPLIANCE_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${DOMAIN}`;
};
