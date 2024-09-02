import { useMemo } from "react";
import { useEstimatedGasFee } from "./useEstimatedGasFee";
import BigNumber from "bignumber.js";
import { useTokenBalance } from "./useBalance";
import { formatEther } from "viem";

export const useValidation = (inputAmount: string) => {
  const estimatedGasFee = useEstimatedGasFee();
  const { formatted: balance } = useTokenBalance();

  return useMemo(() => {
    if (!inputAmount || !balance || !estimatedGasFee) {
      return null;
    }

    const bnInputAmount = new BigNumber(inputAmount);
    const bnBalance = new BigNumber(balance);
    const bnGasFee = new BigNumber(formatEther(estimatedGasFee));

    const totalRequired = bnInputAmount.plus(bnGasFee);

    if (totalRequired.isGreaterThan(bnBalance)) {
      return "Insufficient balance";
    }

    return null;
  }, [inputAmount, balance, estimatedGasFee]);
};
