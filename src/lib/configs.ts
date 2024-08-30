import { sepolia, optimismSepolia } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

// TODO: add megaETH network config
export const wagmiConfig = getDefaultConfig({
  appName: "OP Stack Bridge",
  ssr: true,
  projectId: "a8bb347f1c4dace3ec595a007fd8483f",
  chains: [sepolia, optimismSepolia],
});
