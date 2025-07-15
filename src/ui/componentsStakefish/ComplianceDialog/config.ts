import { GeolocationConfig } from "./geolocationService";

export const COMPLIANCE_CONFIG = {
  geolocation: {
    enabled: true,
    timeout: 5000, // 5 seconds
  } as GeolocationConfig,

  cookie: {
    name: "sg_compliance_approved",
    expiryDays: 365, // 1 year
    domain: (process.env.NODE_ENV === "development"
      ? ".localhost"
      : ".stake.fish") as string,
  },

  confidence: {
    minimum: 0.7,
    high: 0.9,
  },

  debug: process.env.NODE_ENV === "development",
} as const;

export const getComplianceConfig = () => {
  const config = {
    ...COMPLIANCE_CONFIG,
    geolocation: { ...COMPLIANCE_CONFIG.geolocation },
    cookie: { ...COMPLIANCE_CONFIG.cookie },
  };

  if (process.env.NEXT_PUBLIC_SINGAPORE_COMPLIANCE_ENABLED !== undefined) {
    config.geolocation.enabled =
      process.env.NEXT_PUBLIC_SINGAPORE_COMPLIANCE_ENABLED === "true";
  }

  if (process.env.NEXT_PUBLIC_SINGAPORE_COMPLIANCE_TIMEOUT) {
    config.geolocation.timeout = parseInt(
      process.env.NEXT_PUBLIC_SINGAPORE_COMPLIANCE_TIMEOUT,
      10,
    );
  }

  if (process.env.NEXT_PUBLIC_SINGAPORE_COMPLIANCE_COOKIE_DOMAIN) {
    config.cookie.domain =
      process.env.NEXT_PUBLIC_SINGAPORE_COMPLIANCE_COOKIE_DOMAIN;
  }

  return config;
};
