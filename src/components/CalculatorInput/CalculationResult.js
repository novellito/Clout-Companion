import React from 'react';

// Component to render the results of each calculator
export const PaypalResult = props => {
  return (
    <div>
      <p className="result">Total Fees: ${props.result.fees}</p>
      <p className="result">You Receive: ${props.result.receive}</p>
      <p className="result">
        Ask for: <b>${props.result.askFor}</b> if you want ${props.currValue}
      </p>
      {props.shippingCost > 0 && props.checkBox ? (
        <p className="result">
          Grand Total: ${props.result.receive - props.shippingCost}
        </p>
      ) : (
        ''
      )}
    </div>
  );
};

export const GrailedResult = props => {
  return (
    <div>
      <p className="result">Paypal Fees: ${props.result.fees}</p>
      <p className="result">Grailed Fees: ${props.result.grailedFees}</p>
      <p className="result">You Receive: ${props.result.receive}</p>
      <p className="result">
        Ask for: <b>${props.result.askFor}</b> if you want ${props.currValue}
      </p>
      {props.shippingCost > 0 && props.checkBox ? (
        <p className="result">
          Grand Total: ${props.result.receive - props.shippingCost}
        </p>
      ) : (
        ''
      )}
    </div>
  );
};
