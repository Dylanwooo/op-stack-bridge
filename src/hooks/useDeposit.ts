import { sepolia, optimismSepolia } from "wagmi/chains";
import { useBridgeState } from "@/components/Context";

const NETWORK_TYPE = "op";

export const useDeposit = () => {
  const { mode } = useBridgeState();
  const curChainId = mode === "deposit" ? sepolia?.id : optimismSepolia?.id;
};
