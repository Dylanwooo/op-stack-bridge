import React, { createContext, useContext, useState, ReactNode } from "react";

export enum BridgeMode {
  Deposit = "deposit",
  Withdraw = "withdraw",
}

interface BridgeContextType {
  mode: BridgeMode;
  setMode: (mode: BridgeMode) => void;
  inputAmount: string;
  setInputAmount: (amount: string) => void;
}

const BridgeContext = createContext<BridgeContextType | undefined>(undefined);

export function BridgeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<BridgeMode>(BridgeMode.Deposit);
  const [inputAmount, setInputAmount] = useState<string>("");

  return (
    <BridgeContext.Provider
      value={{ mode, setMode, inputAmount, setInputAmount }}
    >
      {children}
    </BridgeContext.Provider>
  );
}

export function useBridgeState() {
  const context = useContext(BridgeContext);
  if (context === undefined) {
    throw new Error("useBridge must be used within a BridgeProvider");
  }
  return context;
}
