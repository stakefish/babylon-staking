import { breakpoints } from "../theme/breakpoints";

import { DOTS, PERCENT_DECIMALS } from "./constants";
import { cx } from "./cx";
import { order } from "./order";
import {
  colorOpacity,
  decorativeColorSet,
  percentToHex,
  pxToFontVmin,
  pxToRem,
  spacingToPx,
  spacingToRem,
} from "./styles";

export {
  breakpoints,
  colorOpacity,
  cx,
  decorativeColorSet,
  order,
  percentToHex,
  pxToFontVmin,
  pxToRem,
  spacingToPx,
  spacingToRem,
};

export const isBrowser = () => typeof window !== "undefined";
export const isMobile = () =>
  isBrowser() && window.matchMedia("(pointer: coarse)").matches;

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const currency = (value: number) => {
  return formatter.format(value);
};

export const percent = (value: string) => {
  return Number.parseFloat(value).toFixed(PERCENT_DECIMALS);
};

export interface TruncatedAddressProps {
  address: string;
  prefix?: string;
  left: number;
  right?: number;
}
export const getTruncatedAddress = ({
  address,
  prefix = "",
  left = 6,
  right,
}: TruncatedAddressProps): string => {
  if (!address) return "";

  const rightChar = right ?? left;
  const leftPart = address.replace(prefix, "").substring(0, left);
  const rightPart = address.substring(address.length - rightChar);

  return `${prefix}${leftPart}${DOTS}${rightPart}`;
};

export function wait(ms: number): Promise<undefined> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function retry<R>(
  fn: () => Promise<R>,
  finished: (value: R) => boolean,
  delay: number | ((index: number, value: R) => number),
  attempts = Infinity,
) {
  const getDelay = typeof delay === "number" ? () => delay : delay;
  let value = await fn();
  let index = 1;

  while (!finished(value) && index <= attempts) {
    await wait(getDelay(index, value));
    value = await fn();
    index++;
  }

  return value;
}
