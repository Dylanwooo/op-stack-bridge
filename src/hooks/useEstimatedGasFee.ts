import { useMemo } from "react";
import { useEstimateFeesPerGas, useEstimateGas } from "wagmi";
import { sepolia, optimismSepolia } from "wagmi/chains";
import { encodeFunctionData, Hash } from "viem";
import { useAccount } from "wagmi";
import { Address, parseUnits } from "viem";
import { optimismPortalABI } from "@eth-optimism/contracts-ts";
import { useBridgeState } from "@/components/Context";

const OptimismPortalProxy = "0x16Fc5058F25648194471939df75CF27A2fdC48BC";

// TODO: currently only support ETH estimation, need to support ERC20
export const useEstimatedGasFee = () => {
  const { address } = useAccount();
  const { inputAmount, mode } = useBridgeState();

  const curChainId = mode === "deposit" ? sepolia?.id : optimismSepolia?.id;
  const estimateFeePerGas = useEstimateFeesPerGas({ chainId: curChainId });

  const parsedAmount = parseUnits(inputAmount ?? "0", 18);

  const calldata: Hash = address
    ? encodeFunctionData({
        abi: optimismPortalABI,
        functionName: "depositTransaction",
        args: [
          address as Address,
          parsedAmount,
          parseUnits("1", 5),
          false,
          "0x",
        ],
      })
    : "0x";

  const txData = {
    calldata,
    to: OptimismPortalProxy as Address,
    amount: parsedAmount,
  };

  const gasEstimate = useEstimateGas({
    chainId: sepolia?.id,
    data: txData.calldata ?? undefined,
    to: txData.to,
    value: txData.amount,
  });

  const gasPrice = useMemo(() => {
    if (!gasEstimate.data || !estimateFeePerGas.data?.maxFeePerGas) {
      return BigInt(0);
    }
    return estimateFeePerGas.data.maxFeePerGas * gasEstimate.data;
  }, [estimateFeePerGas.data?.maxFeePerGas, gasEstimate.data]);

  return gasPrice;
};
