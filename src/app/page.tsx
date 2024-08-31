"use client";

import React, { useCallback } from "react";
import {
  ArrowRight,
  Clock,
  Wallet,
  ChartNetwork,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useTokenBalance, useEstimatedGasFee, useValidation } from "@/hooks";
import { useAccount } from "wagmi";
import { formatAddress, formatAmount } from "@/lib/utils";
import { MegaETHLogo } from "@/components/ui/MegaETHLogo";
import { useBridgeState, BridgeMode } from "@/components/Context";
import { formatEther } from "viem";

export default function Component() {
  const { mode, setMode, inputAmount, setInputAmount } = useBridgeState();

  const { formatted } = useTokenBalance();
  const { address } = useAccount();
  const estimatedGasFee = useEstimatedGasFee();
  const errMsg = useValidation(inputAmount);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputAmount(value);
    },
    [setInputAmount]
  );

  const handleSwitchMode = useCallback(
    (mode: BridgeMode) => {
      setMode(mode);
      setInputAmount("");
    },
    [setInputAmount, setMode]
  );

  return (
    <div className="min-h-screen bg-blue-500 flex flex-col">
      {/* Header */}
      <header className="w-full p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-white">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-500 font-bold">SB</span>
          </div>
          <span className="font-bold text-lg">SUPERBRIDGE</span>
        </div>
        <ConnectButton />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-4 pb-3">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          {/* MegaETH Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <MegaETHLogo />
              <span className="font-bold text-xl">MegaETH</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={mode === BridgeMode.Deposit ? "active" : "default"}
                size="sm"
                className="rounded-full"
                onClick={() => handleSwitchMode(BridgeMode.Deposit)}
              >
                Deposit
              </Button>
              <Button
                variant={mode === BridgeMode.Withdraw ? "active" : "default"}
                size="sm"
                className="rounded-full"
                onClick={() => handleSwitchMode(BridgeMode.Withdraw)}
              >
                Withdraw
              </Button>
            </div>
          </div>

          {/* From/To Section */}
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3 mb-4">
            {mode === BridgeMode.Deposit ? (
              <>
                <div className="flex items-center space-x-2">
                  <Image
                    src="https://superbridge.app/img/network-ethereum.svg"
                    alt="Ethereum logo"
                    width={24}
                    height={24}
                  />
                  <div>
                    <p className="text-xs text-gray-500">From</p>
                    <p className="font-medium">Ethereum</p>
                  </div>
                </div>
                <ArrowRight className="text-gray-400" />
                <div className="flex items-center space-x-2">
                  <MegaETHLogo />
                  <div>
                    <p className="text-xs text-gray-500">To</p>
                    <p className="font-medium">MegaETH</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <MegaETHLogo />
                  <div>
                    <p className="text-xs text-gray-500">From</p>
                    <p className="font-medium">MegaETH</p>
                  </div>
                </div>
                <ArrowRight className="text-gray-400" />
                <div className="flex items-center space-x-2">
                  <Image
                    src="https://superbridge.app/img/network-ethereum.svg"
                    alt="Ethereum logo"
                    width={24}
                    height={24}
                  />
                  <div>
                    <p className="text-xs text-gray-500">To</p>
                    <p className="font-medium">Ethereum</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Amount Input */}
          <div className="mb-4 bg-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <Input
                type="number"
                value={formatAmount(inputAmount)}
                onChange={handleInputChange}
                className="text-4xl flex-3 font-bold w-full bg-transparent border-none outline-none p-0 mr-1"
              />
              <Button
                variant="outline"
                size="sm"
                className="rounded-full flex-1 flex items-center space-x-1 bg-white"
              >
                {mode === BridgeMode.Deposit ? (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center">
                    <Image
                      src="https://superbridge.app/img/network-ethereum.svg"
                      alt="Ethereum logo"
                      width={22}
                      height={22}
                    />
                  </div>
                ) : (
                  <MegaETHLogo />
                )}
                <span className="text-sm font-medium">ETH</span>
              </Button>
            </div>
            <div className="flex justify-end text-sm text-gray-500">
              <span>
                {formatted} ETH <span className="text-gray-500">available</span>
              </span>
            </div>
          </div>

          {/* Error Message Area */}
          {errMsg && (
            <div className="mb-4 p-2 bg-red-100 border border-red-300 rounded-md flex items-center space-x-2">
              <AlertCircle className="text-red-500 h-5 w-5" />
              <span className="text-sm text-red-700">{errMsg}</span>
            </div>
          )}

          {/* Transaction Details */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <ArrowRight className="text-gray-400" />
                <span className="text-sm">To address</span>
              </div>
              <span className="text-sm text-green-500">
                {address ? formatAddress(address) : "-"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Wallet className="text-gray-400" />
                <span className="text-sm">
                  Receive on{" "}
                  {mode === BridgeMode.Deposit ? "MegaETH" : "Ethereum"}
                </span>
              </div>
              <span className="text-sm">{formatAmount(inputAmount)} ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock className="text-gray-400" />
                <span className="text-sm">Transfer time</span>
              </div>
              <span className="text-sm">~3 mins</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <ChartNetwork className="text-gray-400" />

                <span className="text-sm">Network fees</span>
              </div>
              <span className="text-sm">
                {formatEther(estimatedGasFee)} ETH
              </span>
            </div>
          </div>

          {/* Action Button */}
          <Button
            // @ts-ignore
            disabled={errMsg}
            className="w-full bg-black text-white py-6 rounded-lg font-medium"
          >
            {errMsg
              ? errMsg
              : mode === BridgeMode.Deposit
              ? "Deposit"
              : "Withdraw"}
          </Button>
        </div>
      </main>
    </div>
  );
}
