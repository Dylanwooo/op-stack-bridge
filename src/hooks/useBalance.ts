import { useBalance, useAccount } from "wagmi";
import { GetBalanceData } from "wagmi/query";
import { useBridgeState, BridgeMode } from "../components/Context";
import { sepolia, optimismSepolia } from "wagmi/chains";

export const useTokenBalance = () => {
  const { address } = useAccount();
  const { mode } = useBridgeState();
  const { data = {} } = useBalance({
    address,
    chainId: mode === BridgeMode.Deposit ? sepolia.id : optimismSepolia.id,
  });

  return data as GetBalanceData;
};
