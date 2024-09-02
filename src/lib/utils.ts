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
  if (num === 0 || num === "0") return "0";
  if (!num) return defaultVal;

  const bn = new BigNumber(num);

  if (bn.isLessThan(1)) {
    return bn.toFixed(precision);
  }

  if (bn.isInteger()) {
    return bn.toFormat(0, {
      groupSize: 3,
      groupSeparator: ",",
      decimalSeparator: ".",
    });
  }

  return bn.toFormat(precision, {
    groupSize: 3,
    groupSeparator: ",",
    decimalSeparator: ".",
  });
}
