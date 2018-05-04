import React from 'react';

// Component to render the results of each calculator
export const PaypalResult = props => {
  let message = null;
  if (props.result.status === -1) message = 'Please enter a valid number';
  else if (props.result.status === 0) message = 'Please enter a value greater than 0';
  return (
    <div>
      {message !== null ? (
        <p className="result">{message}</p>
      ) : (
        <div>
          <p className="result">Total Fees: ${props.result.fees}</p>
          <p className="result">You Receive: ${props.result.receive}</p>
          <p className="result">
            Ask for: <b>${props.result.askFor}</b> if you want ${props.currValue.replace(
              /^0+/,
              ''
            )}
          </p>
          {props.shippingCost > 0 && props.checkBox ? (
            <p className="result">
              Grand Total: ${(props.result.receive - props.shippingCost).toFixed(2)}
            </p>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
};

export const GrailedResult = props => {
  let message = null;
  if (props.result.status === -1) message = 'Please enter a valid number';
  else if (props.result.status === 0) message = 'Please enter a value greater than 0';
  return (
    <div>
      {message !== null ? (
        <p className="result">{message}</p>
      ) : (
        <div>
          <p className="result">Paypal Fees: ${props.result.fees}</p>
          <p className="result">Grailed Fees: ${props.result.grailedFees}</p>
          <p className="result">You Receive: ${props.result.receive}</p>
          <p className="result">
            Ask for: <b>${props.result.askFor}</b> if you want ${
              props.currValue
            }
          </p>
          {props.shippingCost > 0 && props.checkBox ? (
            <p className="result">
              Grand Total: ${(props.result.receive - props.shippingCost).toFixed(2)}
            </p>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
};
export const StockXResult = props => {
  let message = null;
  if (props.result.status === -1) message = 'Please enter a valid number';
  else if (props.result.status === 0) message = 'Please enter a value greater than 0';
  return (
    <div>
      {message !== null ? (
        <p className="result">{message}</p>
      ) : (
        <div>
          <p className="result">
            Transaction Fees: ${props.result.transactionFee}
          </p>
          <p className="result">
            Payment Process Fees: ${props.result.payProcFee}
          </p>
          <p className="result">You Receive: ${props.result.receive}</p>
          <p className="result">
            Ask for: <b>${props.result.askFor}</b> if you want ${
              props.currValue
            }
          </p>
        </div>
      )}
    </div>
  );
};
