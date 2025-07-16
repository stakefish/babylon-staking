import { COMPLIANCE_CONFIG } from "./config";

export const setComplianceCookie = () => {
  const expiryDate = new Date(Date.now() + 86400000 * 365);
  document.cookie = `${COMPLIANCE_CONFIG.cookie.name}=true; expires=${expiryDate.toUTCString()}; path=/; domain=${COMPLIANCE_CONFIG.cookie.domain}`;
};

export const getComplianceCookie = (): boolean => {
  if (typeof document === "undefined") return false;

  const cookies = document.cookie.split(";");
  const complianceCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${COMPLIANCE_CONFIG.cookie.name}=`),
  );

  return complianceCookie ? complianceCookie.split("=")[1] === "true" : false;
};
