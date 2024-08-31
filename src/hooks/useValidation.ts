import { useMemo } from "react";
import { useEstimatedGasFee } from "./useEstimatedGasFee";
import BigNumber from "bignumber.js";
import { useTokenBalance } from "./useBalance";
import { formatEther } from "viem";

export const useValidation = (inputAmount: string) => {
  const estimatedGasFee = useEstimatedGasFee();

  const { formatted } = useTokenBalance();

  return useMemo(() => {
    if (!inputAmount || !formatted) {
      return null;
    }

    const bnInputAmount = new BigNumber(inputAmount);
    const balance = new BigNumber(formatted);

    const totalRequired = bnInputAmount.plus(
      formatEther(BigInt(estimatedGasFee.toString()))
    );

    if (totalRequired.isGreaterThan(balance)) {
      return "Insufficient balance";
    }

    return null;
  }, [inputAmount, formatted, estimatedGasFee]);
};
