import React from "react";
import { useBridgeState } from "../Context";

interface InitialStepProps {
  onConfirm: () => void;
  validationError: string | null;
}

const InitialStep: React.FC<InitialStepProps> = ({
  onConfirm,
  validationError,
}) => {
  const { inputAmount, mode } = useBridgeState();

  return (
    <div className="initial-step">
      <h2>Confirm Bridge Details</h2>
      <p>Amount: {inputAmount}</p>
      <p>Mode: {mode}</p>
      {validationError && <p className="error">{validationError}</p>}
      <button onClick={onConfirm} disabled={!!validationError}>
        Confirm
      </button>
    </div>
  );
};

export default InitialStep;
