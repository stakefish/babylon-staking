import { GeolocationConfig } from "./geolocationService";

export const COMPLIANCE_CONFIG = {
  geolocation: {
    enabled: true,
    timeout: 5000, // 5 seconds
  } as GeolocationConfig,

  cookie: {
    name: "sg_compliance_approved",
    expiryDays: 365, // 1 year
    domain:
      process.env.NEXT_PUBLIC_SINGAPORE_COMPLIANCE_COOKIE_DOMAIN ||
      ".stake.fish",
  },

  confidence: {
    minimum: 0.7,
    high: 0.9,
  },

  debug: process.env.NODE_ENV === "development",
} as const;
