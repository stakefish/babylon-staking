export interface GeolocationResponse {
  country_code?: string;
  country?: string;
  ip?: string;
  timezone?: string;
  region?: string;
  city?: string;
}

export interface GeolocationConfig {
  enabled: boolean;
  apiKey?: string;
  timeout?: number;
}

export const SINGAPORE_INDICATORS = {
  countryCode: "SG",
  countryName: "Singapore",
  timezone: "Asia/Singapore",
  languageCodes: ["en-SG", "zh-SG", "ms-SG", "ta-SG"],
  currency: "SGD",
} as const;

const GEOLOCATION_SERVICES = [
  {
    name: "ipapi.co",
    url: "https://ipapi.co/json/",
    transform: (data: any): GeolocationResponse => ({
      country_code: data.country_code,
      country: data.country_name,
      timezone: data.timezone,
      region: data.region,
      city: data.city,
    }),
  },
  {
    name: "ip-api.com",
    url: "http://ip-api.com/json/",
    transform: (data: any): GeolocationResponse => ({
      country_code: data.countryCode,
      country: data.country,
      timezone: data.timezone,
      region: data.regionName,
      city: data.city,
    }),
  },
  {
    name: "ipinfo.io",
    url: "https://ipinfo.io/json",
    transform: (data: any): GeolocationResponse => ({
      country_code: data.country,
      country: data.country,
      timezone: data.timezone,
      region: data.region,
      city: data.city,
    }),
  },
];

/**
 * Detect if user is from Singapore using IP geolocation
 */
export const detectSingaporeByIP = async (
  config: GeolocationConfig = { enabled: true, timeout: 5000 },
): Promise<boolean> => {
  if (!config.enabled) {
    return false;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    config.timeout || 5000,
  );

  try {
    for (const service of GEOLOCATION_SERVICES) {
      try {
        const response = await fetch(service.url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (response.ok) {
          const data = await response.json();
          const geoData = service.transform(data);

          if (
            geoData.country_code === SINGAPORE_INDICATORS.countryCode ||
            geoData.country === SINGAPORE_INDICATORS.countryName
          ) {
            return true;
          }

          if (geoData.country_code || geoData.country) {
            return false;
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError") {
          throw error;
        }
        console.warn(`Geolocation service ${service.name} failed:`, error);
      }
    }

    return detectSingaporeByTimezone();
  } catch (error) {
    console.error("All geolocation services failed:", error);
    return detectSingaporeByTimezone();
  } finally {
    clearTimeout(timeoutId);
  }
};

/**
 * Detect Singapore users by timezone and browser language preferences
 */
export const detectSingaporeByTimezone = (): boolean => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone === SINGAPORE_INDICATORS.timezone) {
      return true;
    }

    const languages = navigator.languages || [navigator.language];

    if (
      languages.some((lang) =>
        SINGAPORE_INDICATORS.languageCodes.includes(lang as any),
      )
    ) {
      return true;
    }

    if (languages.some((lang) => lang.toLowerCase().includes("sg"))) {
      return true;
    }

    const currency = Intl.NumberFormat().resolvedOptions().currency;
    if (currency === SINGAPORE_INDICATORS.currency) {
      return true;
    }

    const timeFormatter = new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    const timeString = timeFormatter.format(new Date());

    if (
      timeString.includes(":") &&
      !timeString.includes("AM") &&
      !timeString.includes("PM")
    ) {
      const offset = new Date().getTimezoneOffset();
      if (offset === -480) {
        // UTC+8
        return true;
      }
    }

    return false;
  } catch (error) {
    console.warn("Timezone detection failed:", error);
    return false;
  }
};

/**
 * Enhanced Singapore detection combining multiple methods
 */
export const detectSingaporeUser = async (
  config: GeolocationConfig = { enabled: true, timeout: 5000 },
): Promise<{ isSingapore: boolean; method: string; confidence: number }> => {
  try {
    const ipResult = await detectSingaporeByIP(config);
    if (ipResult) {
      return { isSingapore: true, method: "ip-geolocation", confidence: 0.9 };
    }

    const timezoneResult = detectSingaporeByTimezone();
    if (timezoneResult) {
      return {
        isSingapore: true,
        method: "timezone-language",
        confidence: 0.7,
      };
    }

    return { isSingapore: true, method: "none", confidence: 0.5 };
  } catch (error) {
    console.error("Singapore detection failed:", error);
    return { isSingapore: false, method: "error", confidence: 0.0 };
  }
};
