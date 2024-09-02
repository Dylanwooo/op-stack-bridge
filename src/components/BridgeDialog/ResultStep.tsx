import React from "react";

interface ResultStepProps {
  isSuccess: boolean | null;
  onReset: () => void;
}

const ResultStep: React.FC<ResultStepProps> = ({ isSuccess, onReset }) => {
  return (
    <div className="result-step">
      <h2>Bridge Result</h2>
      {isSuccess === null ? (
        <p>Processing...</p>
      ) : isSuccess ? (
        <p>Bridge successful!</p>
      ) : (
        <p>Bridge failed. Please try again.</p>
      )}
      <button onClick={onReset}>Start New Bridge</button>
    </div>
  );
};

export default ResultStep;
