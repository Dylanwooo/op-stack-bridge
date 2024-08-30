import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import BigNumber from "bignumber.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Formating amount
export function formatAmount(
  num: number | string,
  precision = 4,
  defaultVal = "0"
) {
  if (!num) return defaultVal;

  if (Number(num) < 1) return new BigNumber(num).dp(precision, 1).toString();

  return new BigNumber(num).dp(precision, 1).toNumber().toLocaleString("en-US");
}
