import React, { useState } from "react";

interface BridgingStepProps {
  onComplete: (success: boolean) => void;
}

const BridgingStep: React.FC<BridgingStepProps> = ({ onComplete }) => {
  return <div className="bridging-step"></div>;
};

export default BridgingStep;
