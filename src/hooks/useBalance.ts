import { useBalance, useAccount } from "wagmi";
import { GetBalanceData } from "wagmi/query";

export const useTokenBalance = () => {
  const { address } = useAccount();
  const { data = {} } = useBalance({
    address,
  });

  return data as GetBalanceData;
};
