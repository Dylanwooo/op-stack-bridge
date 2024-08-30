"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  Wallet,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useTokenBalance } from "@/hooks";

enum BridgeMode {
  Deposit = "deposit",
  Withdraw = "withdraw",
}

export default function Component() {
  const [mode, setMode] = useState<BridgeMode>(BridgeMode.Deposit);
  const { formatted } = useTokenBalance();
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
      <main className="flex-grow flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          {/* MegaETH Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="font-bold text-xl">MegaETH</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={mode === BridgeMode.Deposit ? "active" : "default"}
                size="sm"
                className="rounded-full"
                onClick={() => setMode(BridgeMode.Deposit)}
              >
                Deposit
              </Button>
              <Button
                variant={mode === BridgeMode.Withdraw ? "active" : "default"}
                size="sm"
                className="rounded-full"
                onClick={() => setMode(BridgeMode.Withdraw)}
              >
                Withdraw
              </Button>
            </div>
          </div>

          {/* From/To Section */}
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <Image
                src="https://superbridge.app/img/network-ethereum.svg"
                alt="Ethereum logo"
                width={24}
                height={24}
              />
              <div>
                <p className="text-xs text-gray-500">
                  {mode === BridgeMode.Deposit ? "From" : "To"}
                </p>
                <p className="font-medium">Ethereum</p>
              </div>
            </div>
            {mode === BridgeMode.Deposit ? (
              <ArrowRight className="text-gray-400" />
            ) : (
              <ArrowLeft className="text-gray-400" />
            )}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">M</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">
                  {mode === BridgeMode.Deposit ? "To" : "From"}
                </p>
                <p className="font-medium">MegaETH</p>
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-4 bg-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <Input
                type="text"
                value={formatted}
                className="text-4xl font-bold w-full bg-transparent border-none outline-none p-0"
              />
              <Button
                variant="outline"
                size="sm"
                className="rounded-full flex items-center space-x-1 bg-white"
              >
                <Image
                  src="https://superbridge.app/img/network-ethereum.svg"
                  alt="Ethereum logo"
                  width={16}
                  height={16}
                />
                <span className="text-sm font-medium">ETH</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>$2.032</span>
              <span>{formatted} ETH available</span>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <ArrowRight className="text-gray-400" />
                <span className="text-sm">To address</span>
              </div>
              <span className="text-sm text-green-500">0x1F...88ec</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Wallet className="text-gray-400" />
                <span className="text-sm">
                  Receive on{" "}
                  {mode === BridgeMode.Deposit ? "MegaETH" : "Ethereum"}
                </span>
              </div>
              <span className="text-sm">$2.028 0.000798 ETH</span>
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
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
                <span className="text-sm">Network fees</span>
              </div>
              <span className="text-sm">$1.9726 0.0008 ETH</span>
            </div>
          </div>

          {/* Action Button */}
          <Button className="w-full bg-black text-white py-6 rounded-lg font-medium">
            {mode === BridgeMode.Deposit ? "Deposit" : "Withdraw"}
          </Button>
        </div>
      </main>
    </div>
  );
}
