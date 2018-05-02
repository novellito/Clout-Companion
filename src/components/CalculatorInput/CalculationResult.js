import React from 'react';

// Component to render the results of each calculator
export const PaypalResult = props => {
  return (
    <div>
      <p className="result">Total Fees: ${props.result.fees}</p>
      <p className="result">You Receive: ${props.result.receive}</p>
      <p className="result">Ask for: ${props.result.askFor}</p>
    </div>
  );
};

export const GrailedResult = props => {
  return (
    <div>
      <p className="result">Paypal Fees: ${props.result.fees}</p>
      <p className="result">Grailed Fees: ${props.result.grailedFees}</p>
      <p className="result">You Receive: ${props.result.receive}</p>
      <p className="result">Ask for: ${props.result.askFor}</p>
    </div>
  );
};
