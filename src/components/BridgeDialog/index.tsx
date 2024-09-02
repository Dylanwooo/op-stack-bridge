import React, { useState } from "react";
import { useValidation } from "../../hooks/useValidation";
import { useBridgeState } from "../Context";
import InitialStep from "./InitialStep";
import ApprovalStep from "./ApprovalStep";
import BridgingStep from "./BridgingStep";
import ResultStep from "./ResultStep";

enum BridgeStep {
  Initial = "initial",
  Approval = "approval",
  Bridging = "bridging",
  Result = "result",
}

export const BridgeDialog: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<BridgeStep>(
    BridgeStep.Initial
  );
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const { inputAmount } = useBridgeState();
  const validationError = useValidation(inputAmount);

  const handleConfirm = () => {
    if (!validationError) {
      setCurrentStep(BridgeStep.Approval);
    }
  };

  const handleApprovalComplete = () => {
    setCurrentStep(BridgeStep.Bridging);
  };

  const handleBridgingComplete = (success: boolean) => {
    setIsSuccess(success);
    setCurrentStep(BridgeStep.Result);
  };

  const handleReset = () => {
    setCurrentStep(BridgeStep.Initial);
    setIsSuccess(null);
  };

  return (
    <div className="bridge-dialog">
      {currentStep === BridgeStep.Initial && (
        <InitialStep
          onConfirm={handleConfirm}
          validationError={validationError}
        />
      )}
      {currentStep === BridgeStep.Approval && <ApprovalStep />}
      {currentStep === BridgeStep.Bridging && (
        <BridgingStep onComplete={handleBridgingComplete} />
      )}
      {currentStep === BridgeStep.Result && (
        <ResultStep isSuccess={isSuccess} onReset={handleReset} />
      )}
    </div>
  );
};

export default BridgeDialog;
